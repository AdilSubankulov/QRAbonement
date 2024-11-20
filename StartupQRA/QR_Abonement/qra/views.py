from rest_framework import serializers  # Импортируем serializers
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Client, Tariff, Membership
from .serializers import ClientSerializer, TariffSerializer, MembershipSerializer

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = [IsAdminUser]

class TariffViewSet(viewsets.ModelViewSet):
    queryset = Tariff.objects.all()
    serializer_class = TariffSerializer
    permission_classes = [IsAdminUser]

class MembershipViewSet(viewsets.ModelViewSet):
    queryset = Membership.objects.select_related('client', 'tariff')
    serializer_class = MembershipSerializer
    permission_classes = [IsAdminUser]

    def perform_create(self, serializer):
        client_id = self.request.data.get('client')
        tariff_id = self.request.data.get('tariff')

        # Проверяем, существует ли клиент с указанным ID
        try:
            client = Client.objects.get(id=client_id)
        except Client.DoesNotExist:
            raise serializers.ValidationError("Client with the provided ID does not exist")

        # Проверяем, существует ли тариф с указанным ID
        try:
            tariff = Tariff.objects.get(id=tariff_id)
        except Tariff.DoesNotExist:
            raise serializers.ValidationError("Tariff with the provided ID does not exist")

        # Сохраняем объект Membership с уже связанными моделями
        serializer.save(client=client, tariff=tariff)

    @action(detail=True, methods=['post'])
    def add_visit(self, request, pk=None):
        membership = self.get_object()
        if membership.add_visit():
            return Response({"status": "Visit added"})
        return Response({"status": "Limit reached or membership not active"}, status=400)
