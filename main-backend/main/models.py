from django.db import models

# Create your models here.
class Cliente(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=65)
    address = models.CharField(max_length=50)
    personal_phone = models.IntegerField(blank=True, null=True)
    work_phone = models.IntegerField(blank=True, null=True)
    cellphone = models.IntegerField(blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    contact = models.CharField(max_length=60)  
    
    class Meta:
        managed = False
        db_table = 'cliente'

    def __str__(self):
        return f"{self.id} - {self.name} - {self.address}"

class Modelo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=60) 
    
    class Meta:
        managed = False
        db_table = 'modelo'

    def __str__(self):
        return f"{self.id} - {self.name}"

class Marca(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)  
    
    class Meta:
        managed = False
        db_table = 'marca'
    
    def __str__(self):
        return f"{self.id} - {self.name}"

class Tipo(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'tipo'
    
    def __str__(self):
        return f"{self.id} - {self.name}"
    
class Aceptado(models.Model):
    # Choice field.
    id = models.AutoField(primary_key=True)
    confirmation = models.CharField(max_length=15,blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = 'aceptado'

    def __str__(self):
        return f"{self.id} - {self.confirmation}"
    
class Reparaciones(models.Model):
    id = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, models.DO_NOTHING, blank=True, null=True)
    marca = models.ForeignKey(Marca, models.DO_NOTHING, blank=True, null=True)
    modelo = models.ForeignKey(Modelo, models.DO_NOTHING, blank=True, null=True)
    tipo = models.ForeignKey(Tipo, models.DO_NOTHING, blank=True, null=True)
    
    entry_date = models.DateField(blank=True, null=True)
    budget_date = models.DateField(blank=True, null=True)
    delivery_date = models.DateField(blank=True, null=True)
    
    serial_num = models.CharField(max_length=100, blank=True, null=True)
    failure = models.CharField(max_length=250, blank=True, null=True)
    repair = models.CharField(max_length=250, blank=True, null=True)
    
    spare_cost = models.IntegerField(blank=True, null=True)
    labor_cost = models.IntegerField(blank=True, null=True)
    pending_payment = models.IntegerField(blank=True, null=True)

    confirmation = models.ForeignKey(Aceptado, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reparaciones'

    def __str__(self):
        return f"{self.id} - {self.cliente.name} - {self.entry_date}"