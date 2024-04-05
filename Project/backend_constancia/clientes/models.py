from django.db import models


class Cliente(models.Model):
    nome = models.CharField(max_length=100)
    valor_inadimplencia = models.DecimalField(max_digits=10, decimal_places=2)
    data_inadimplencia = models.DateField()
