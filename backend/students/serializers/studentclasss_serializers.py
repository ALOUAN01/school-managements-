from rest_framework import serializers
from ..models.studentclass_models import StudentClass
from ..serializers.student_serializers import StudentShortSerializer
from ..serializers.module_serializers import ModuleShortSerializer
from ..models.subscription_models import Subscription

class StuClassSerializer(serializers.ModelSerializer):
    students = serializers.SerializerMethodField()
    modules = serializers.SerializerMethodField()

    class Meta:
        model = StudentClass
        fields = ('id',
                  'class_name',
                  'students',
                  'modules'
                  )

    def get_modules(self, instance):
        modules = instance.get_modules()
        serializer = ModuleShortSerializer(modules, many=True)
        return serializer.data

    def get_students(self, instance):
        students = instance.get_students()
        serializer = StudentShortSerializer(students, many=True)
        return serializer.data
