from rest_framework import serializers
from ..models.module_models import Module
from ..serializers.teacher_serializers import TeacherSerializer


class ModuleSerializer(serializers.ModelSerializer):
    teachers = serializers.SerializerMethodField()

    class Meta:
        model = Module
        fields = ('id',
                  'title',
                  'description',
                  'teachers'
                  )

    def get_teachers(self, instance):
        teachers = instance.get_teachers()
        serializer = TeacherSerializer(teachers, many=True)
        return serializer.data


class ModuleShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        fields = (
            'id',
            'title',
            'description'
        )
