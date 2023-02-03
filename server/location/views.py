from rest_framework import viewsets
from .serializers import LocationSerializer
from .models import Location


class LocationViewSet(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

    def get_queryset(self):
        queryset = Location.objects.all()
        neLatitude = self.request.query_params.get("neLatitude", None)
        neLongitude = self.request.query_params.get("neLongitude", None)
        swLatidude = self.request.query_params.get("swLatidude", None)
        swLongitude = self.request.query_params.get("swLongitude", None)
        if neLatitude:
            queryset = queryset.filter(latitude__lte=int(neLatitude))
        if neLongitude:
            queryset = queryset.filter(longitude__lte=int(neLongitude))
        if swLatidude:
            queryset = queryset.filter(latitude__gte=int(swLatidude))
        if swLongitude:
            queryset = queryset.filter(longitude__gte=int(swLongitude))

        return queryset

    def list(self, request, *args, **kwargs):
        return super().list(request, args, kwargs)
