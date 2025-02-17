from django.contrib import admin
from .models import User, Reparaciones, Modelo, Marca, Tipo, Aceptado, Cliente

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email'] 

admin.site.register(User, UserAdmin)
admin.site.register(Reparaciones)
admin.site.register(Modelo)
admin.site.register(Marca)
admin.site.register(Tipo)
admin.site.register(Aceptado)
admin.site.register(Cliente)