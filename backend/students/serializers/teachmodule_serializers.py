from rest_framework import serializers
from ..models.teachmodule_models import TeachModule
from ..serializers.teacher_serializers import TeacherSerializer
from ..serializers.module_serializers import ModuleSerializer


class TeachModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeachModule
        fields = ('id',
                  'teacher',
                  'module'
                  )


class TeachModuleGetSerializer(serializers.ModelSerializer):
    teacher = TeacherSerializer()
    module = ModuleSerializer()

    class Meta:
        model = TeachModule
        fields = ('id',
                  'teacher',
                  'module'
                  )
