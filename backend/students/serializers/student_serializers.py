from rest_framework import serializers
from ..models.student_models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('studentId',
                  'image',
                  'FirstName',
                  'LastName',
                  'Email',
                  'academic_level',
                  'date_of_birth',
                  'Place_of_birth',
                  'Gender',
                  'address')














class StudentShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = (
            'studentId',
            'image',
            'FirstName',
            'LastName',
            'Email',
            'academic_level',
        )
