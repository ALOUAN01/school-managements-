from rest_framework import serializers
from ..models.absence import Absence
from ..serializers.student_serializers import StudentShortSerializer
from ..serializers.module_serializers import ModuleSerializer


class AbsenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Absence
        fields = ('id',
                  'student',
                  'module',
                  'nbrH'
                  )


class AbsenceGetSerializer(serializers.ModelSerializer):
    student = StudentShortSerializer()
    module = ModuleSerializer()

    class Meta:
        model = Absence
        fields = ('id',
                  'student',
                  'module',
                  'nbrH'
                  )
