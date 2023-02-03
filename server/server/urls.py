from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from location.views import LocationViewSet

router = routers.DefaultRouter()
router.register(r'locations', LocationViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
]
