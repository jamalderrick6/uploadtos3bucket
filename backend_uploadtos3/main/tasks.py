import os
import sys
from django.forms import model_to_dict
import requests
import boto3
from botocore.exceptions import ClientError
import logging
import datetime
from .amazon_access import CARTIER_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY

from .models import Run

from celery import Task, shared_task


"""
upload file to s3 bucket
"""
class UploadToBucket:
    def __init__(self, run_id):
        self.run = Run.objects.filter(run = run_id).first()
        print("run in class", self.run)
        run_object = model_to_dict(self.run)
        self.run_id = run_id
        self.filename = run_object["name"]
        self.run_url = run_object["url"]
        self.total = 0
        self.uploaded = 0
        self.bucket = CARTIER_BUCKET

        self.session = boto3.Session(
            aws_secret_access_key=AWS_SECRET_ACCESS_KEY,
            aws_access_key_id=AWS_ACCESS_KEY_ID
        )

        self.download_run()

    def update_status(self, attri, status):
        if attri == "status":
            self.run.status = status
        elif  attri == "started_at":
            self.run.started_at = status
        elif attri == "done_at":
            self.run.done_at = status
        else:
            self.run.upload_status = status
        self.run.save()

    def download_run(self, dest_folder="runs"):
        """
        this function downloads the file from url into a destination folder called runs
        """
        if not os.path.exists(dest_folder):
            os.makedirs(dest_folder)

        file_path = os.path.join(dest_folder, self.filename)
        response = requests.get(self.run_url, stream=True)
        print("response", response)
        total_length = int(response.headers.get('content-length'))

        if response.ok:
            self.update_status("status", "Downloading")
            print("file is downloading...", os.path.abspath(file_path))
            with open(file_path, 'wb') as f:
                dl = 0
                for chunk in response.iter_content(chunk_size=1024 * 8):
                    if chunk:
                        dl += len(chunk)
                        f.write(chunk)
                        done = int(50 * dl / total_length)
                        sys.stdout.write('\r[{}{}]'.format(
                            '█' * done, '.' * (50-done)))
                        sys.stdout.flush()
                        f.flush()
                        os.fsync(f.fileno())
            print(f"file {self.filename} is downloaded")
            self.upload_to_s3_bucket(file_path)
        else:
            print(
                f"Download failed: status code {response.status_code}\n{response.text}")

    def upload_progress(self, size):
        self.update_status("status", "Uploading")
        if self.total == 0:
            return
        self.uploaded += size
        upload_status = int(self.uploaded / self.total * 100)
        self.update_status('upload_status', upload_status)
        sys.stdout.write("uploading..... {} %".format(upload_status))
        sys.stdout.flush()

    def upload_to_s3_bucket(self, file_path):
        self.total = os.stat(file_path).st_size
        print("Uploading to s3 bucket....")
        s3 = self.session.resource('s3')
        try:
            self.update_status("started_at", datetime.datetime.now())
            s3.meta.client.upload_file(
                file_path, self.bucket, self.filename, Callback=self.upload_progress)
            self.update_status("status", "Done")
            self.update_status("done_at", datetime.datetime.now())
            print("Uploading to s3 bucket done")
        except ClientError as e:
            logging.error(e)
            self.update_status("Failed")
        self.delete_downloaded_file(file_path)

    def delete_downloaded_file(self, file_path):
        print(f"deleting {self.filename}....")
        os.remove(file_path)
        print(f"{self.filename} deleted..")


# if __name__ == "__main__":
#     instance = UploadToBucket()

@shared_task
def celery_task(run_id):
    UploadToBucket(run_id)
