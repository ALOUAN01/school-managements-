from django.db import models
from .student_models import Student
from .module_models import Module


class Grade(models.Model):
    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    module = models.ForeignKey(Module, on_delete=models.CASCADE)
    grade = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        unique_together = (
            'student', 'module',
        )
