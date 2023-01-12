from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from location import views

router = routers.DefaultRouter()
router.register(r'locations', views.LocationView, 'location')

urlpatterns = [
    path("admin/", admin.site.urls),
    path('api/', include(router.urls)),
]
