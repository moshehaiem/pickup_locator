import datetime
from rest_framework import viewsets
from .serializers import LocationSerializer
from .models import Location


class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

    def get_queryset(self):
        queryset = Location.objects.all()
        ne_latitude = self.request.query_params.get("ne_latitude", None)
        ne_longitude = self.request.query_params.get("ne_longitude", None)
        sw_latidude = self.request.query_params.get("sw_latidude", None)
        sw_longitude = self.request.query_params.get("sw_longitude", None)
        athletes_needed_low = self.request.query_params.get(
            "athletes_needed_low", None
        )
        athletes_needed_high = self.request.query_params.get("athletes_needed_high", None)
        athletes_present_low = self.request.query_params.get(
            "athletes_present_low", None
        )
        athletes_present_high = self.request.query_params.get(
            "athletes_present_high", None
        )
        date = self.request.query_params.get("date", None)
        start_time = self.request.query_params.get("start_time", None)
        end_time = self.request.query_params.get("end_time", None)
        if ne_latitude:
            queryset = queryset.filter(latitude__lte=int(ne_latitude))
        if ne_longitude:
            queryset = queryset.filter(longitude__lte=int(ne_longitude))
        if sw_latidude:
            queryset = queryset.filter(latitude__gte=int(sw_latidude))
        if sw_longitude:
            queryset = queryset.filter(longitude__gte=int(sw_longitude))
        if athletes_needed_low:
            queryset = queryset.filter(athletes_needed__gte=int(athletes_needed_low))
        if athletes_needed_high:
            queryset = queryset.filter(athletes_needed__lte=int(athletes_needed_high))
        if athletes_present_low:
            queryset = queryset.filter(
                athletes_present__gte=int(athletes_present_low)
            )
        if athletes_present_high:
            queryset = queryset.filter(athletes_present__lte=int(athletes_present_high))
        if date:
            queryset = queryset.filter(date=date)
        if start_time:
            queryset = queryset.filter(start_time__gte=start_time)
        if end_time:
            queryset = queryset.filter(end_time__lte=end_time)

        return queryset

    def list(self, request, *args, **kwargs):
        return super().list(request, args, kwargs)
