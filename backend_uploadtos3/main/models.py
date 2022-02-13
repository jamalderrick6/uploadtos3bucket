from django.db import models


class Run(models.Model):
    UPLOAD_STATUS = (
        ("Pending", "pending"),
        ("Downloading", "downloading"),
        ("Uploading", "uploading"),
        ("Success", "success"),
        ("Failed", "failed"),
    )
    name = models.CharField(max_length=100)
    run = models.CharField(max_length=100, unique=True)
    url = models.URLField(max_length=1000)
    status = models.CharField(
        max_length=50, choices=UPLOAD_STATUS, default="Pending")
    upload_status = models.IntegerField(default=0)
    started_at = models.DateTimeField(null=True)
    done_at = models.DateTimeField(null=True)
