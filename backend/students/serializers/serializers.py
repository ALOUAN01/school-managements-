# serializers.py
from rest_framework import serializers
from ..models.grade_models import Grade
from ..models.student_models import Student
from ..models.module_models import Module
from ..models.absence import Absence


class StudentdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('studentId',
                  'FirstName',
                  'LastName')


class ModuledSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = '__all__'


class GradedSerializer(serializers.ModelSerializer):
    module = ModuledSerializer()
    student = StudentdSerializer()

    class Meta:
        model = Grade
        fields = ('id', 'module', 'student', 'grade')


class AbsenceSerializer(serializers.ModelSerializer):
    module = ModuledSerializer()
    student = StudentdSerializer()

    class Meta:
        model = Absence
        fields = ('id', 'module', 'student', 'nbrH')