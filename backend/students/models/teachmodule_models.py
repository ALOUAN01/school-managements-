from django.db import models
from .module_models import Module
from .teacher_models import Teacher


class TeachModule(models.Model):
    id = models.AutoField(primary_key=True)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE, related_name="teachmodule")
    module = models.ForeignKey(Module, on_delete=models.CASCADE, related_name="teachmodule")

    class Meta:
        unique_together = (
            'teacher', 'module',
        )
