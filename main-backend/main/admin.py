from django.contrib import admin
from .models import Reparaciones, Modelo, Marca, Tipo, Aceptado, Cliente


admin.site.register(Reparaciones)
admin.site.register(Modelo)
admin.site.register(Marca)
admin.site.register(Tipo)
admin.site.register(Aceptado)
admin.site.register(Cliente)