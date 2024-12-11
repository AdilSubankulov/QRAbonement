from django.db import models
from django.utils import timezone
from datetime import timedelta

class Client(models.Model):
    unique_id = models.CharField(max_length=100, unique=True)
    full_name = models.CharField(max_length=100)

    def __str__(self):
        return self.full_name

class Tariff(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateField()
    end_date = models.DateField()
    max_visits = models.PositiveIntegerField()
    is_morning = models.BooleanField(default=False)
    is_evening = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Membership(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='memberships')
    tariff = models.ForeignKey(Tariff, on_delete=models.CASCADE, related_name='memberships')
    start_date = models.DateField(default=timezone.now)
    visit_count = models.PositiveIntegerField(default=0)

    def end_date(self):
        if self.tariff.end_date:
            return self.start_date + timedelta(days=(self.tariff.end_date - self.tariff.start_date).days)
        return None

    def is_active(self):
        if self.tariff.max_visits and self.visit_count >= self.tariff.max_visits:
            return False
        if self.end_date() and timezone.now().date() > self.end_date():
            return False
        return self.tariff.is_active

    def add_visit(self):
        if self.is_active():
            self.visit_count += 1
            self.save()
            return True
        return False

    def __str__(self):
        return f"{self.client.full_name} - {self.tariff.name}"
