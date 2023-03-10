from django.db import models
import uuid


class Location(models.Model):
    location_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=True)
    latitude = models.FloatField(blank=False, null=False)
    longitude = models.FloatField(blank=False, null=False)
    athletes_present = models.IntegerField(blank=False, null=False)
    athletes_needed = models.IntegerField(blank=False, null=False)
    date = models.DateField(blank=False, null=False)
    start_time = models.TimeField(blank=False, null=False)
    end_time = models.TimeField(blank=False, null=False)
    message = models.TextField(blank=True, null=True)
