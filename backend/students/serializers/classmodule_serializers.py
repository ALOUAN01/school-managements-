from rest_framework import serializers
from ..models.classmodule_models import ClassModule


class ClassModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassModule
        fields = (
                  'student_class',
                  'module',
                  )
