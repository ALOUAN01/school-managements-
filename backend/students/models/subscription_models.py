from django.db import models
from .student_models import Student
from .studentclass_models import StudentClass


class Subscription(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name="subscriptions")
    classe = models.ForeignKey(StudentClass, on_delete=models.CASCADE, related_name="subscriptions")

    class Meta:
        unique_together = (
            'student', 'classe',
        )
