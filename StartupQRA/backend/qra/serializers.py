from rest_framework import serializers
from .models import Client, Tariff, Membership

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ['id', 'unique_id', 'full_name']

class TariffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tariff
        fields = ['id', 'name', 'price', 'start_date', 'end_date',
                  'max_visits', 'is_morning', 'is_evening', 'is_active']

class MembershipSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    tariff = TariffSerializer(read_only=True)

    class Meta:
        model = Membership
        fields = ['id', 'client', 'tariff', 'start_date', 'visit_count']
