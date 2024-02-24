from django.db import models
from ..models.teacher_models import Teacher

class Module(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    description = models.TextField()

    def get_teachers(self):
        return Teacher.objects.filter(
            teachmodule__module=self
        )




