from django.contrib import admin

from location.models import Location


class LocationAdmin(admin.ModelAdmin):
    list_display = ('address', 'city', 'state', 'zip',
                    'athletes_present', 'athletes_needed', 'start_time', 'end_time')


admin.site.register(Location, LocationAdmin)
