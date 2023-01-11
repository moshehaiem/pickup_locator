from django.db import models


class Location(models.Model):
    address = models.CharField(max_length=120)
    city = models.CharField(max_length=120)
    state = models.CharField(max_length=120)
    zip = models.CharField(max_length=120)
    latitude = models.FloatField()
    longitude = models.FloatField()
    athletes_present = models.IntegerField()
    athletes_needed = models.IntegerField()
    start_time = models.DateTimeField(blank=False, null=False)
    end_time = models.DateTimeField(blank=False, null=False)
    message = models.TextField()
