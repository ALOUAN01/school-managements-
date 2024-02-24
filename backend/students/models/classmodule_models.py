from django.db import models
from ..models.studentclass_models import StudentClass
from ..models.module_models import Module


class ClassModule(models.Model):

    student_class = models.ForeignKey(StudentClass, on_delete=models.CASCADE, related_name="classmodules")
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="classmodules")

    class Meta:
        unique_together = (
            'student_class', 'module',
        )
