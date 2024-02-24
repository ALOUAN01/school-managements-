from django.db import models


class Teacher(models.Model):
    teacherid = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='images')
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    Email = models.EmailField(max_length=100)
    Nbr_group = models.CharField(max_length=100)
    diploma = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
