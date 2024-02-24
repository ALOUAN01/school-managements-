from django.db import models


class Student(models.Model):
    studentId = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to="images/")
    FirstName = models.CharField(max_length=100)
    LastName = models.CharField(max_length=100)
    Email = models.EmailField(max_length=100)
    academic_level = models.CharField(max_length=100)
    date_of_birth = models.CharField(max_length=100)
    Place_of_birth = models.CharField(max_length=200)
    Gender = models.CharField(max_length=100)
    address = models.TextField(max_length=100)
