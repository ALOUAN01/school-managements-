from django.db import models
from ..models.student_models import Student
from ..models.module_models import Module


class StudentClass(models.Model):
    id = models.AutoField(primary_key=True)
    class_name = models.CharField(max_length=100)

    def get_students(self):
        return Student.objects.filter(
            subscriptions__classe=self
        )

    def get_modules(self):
        return Module.objects.filter(
            classmodules__student_class=self
        )
