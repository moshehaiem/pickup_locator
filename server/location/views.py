from rest_framework import viewsets
from .serializers import LocationSerializer
from .models import Location


class LocationView(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()
