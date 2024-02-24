from rest_framework import serializers
from ..models.grade_models import Grade
from ..serializers.student_serializers import StudentShortSerializer
from ..serializers.module_serializers import ModuleSerializer


class GradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grade
        fields = ('id',
                  'student',
                  'module',
                  'grade'
                  )


class GradeGetSerializer(serializers.ModelSerializer):
    student = StudentShortSerializer()
    module = ModuleSerializer()

    class Meta:
        model = Grade
        fields = ('id',
                  'student',
                  'module',
                  'grade'
                  )
