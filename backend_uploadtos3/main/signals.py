from django.db.models.signals import post_save
from django.dispatch import receiver
from main.models import Run
from main.tasks import celery_task


@receiver(post_save, sender=Run)
def upload_to_s3bucket(sender, **kwargs):
    pending_runs = Run.objects.filter(status='Pending')
    for run in pending_runs:
        celery_task.delay(run.run)
