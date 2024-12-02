from django.contrib import admin
from .models import Client, Tariff, Membership

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ['unique_id', 'full_name', 'email']
    search_fields = ['full_name', 'email']

@admin.register(Tariff)
class TariffAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'duration_type', 'start_date', 'end_date',
                    'max_visits', 'is_active']
    list_filter = ['is_active', 'is_morning', 'is_evening']
    search_fields = ['name']

@admin.register(Membership)
class MembershipAdmin(admin.ModelAdmin):
    list_display = ['client', 'tariff', 'start_date', 'visit_count']
    list_filter = ['start_date']
    search_fields = ['client__full_name', 'tariff__name']
