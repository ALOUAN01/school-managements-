from rest_framework import serializers
from ..models.teacher_models import Teacher


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ('teacherid',
                  'image',
                  'FirstName',
                  'LastName',
                  'Email',
                  'Nbr_group',
                  'diploma',
                  'state',
                  )
