from django.contrib import admin
from django.urls import path, include, re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("qra.urls")),  # Используйте include для подключения маршрутов из другого модуля
    path('auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls')),  # new
    re_path(r'^auth/', include('djoser.urls.authtoken')),  # new
]
