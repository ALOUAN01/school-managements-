
from rest_framework.views import APIView
from ..serializers.teachmodule_serializers import TeachModuleSerializer
from django.http.response import JsonResponse
from ..models.teachmodule_models import TeachModule
from rest_framework.response import Response
from ..serializers.teachmodule_serializers import TeachModuleGetSerializer
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from ..models.teacher_models import Teacher
from ..models.module_models import Module
from rest_framework import status

class TeachModuleView(APIView):

    def get_teachmodule(self, pk):
        try:
            teachmodule = TeachModule.objects.get(id=pk)
            return teachmodule
        except:
            return JsonResponse("Teacher Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_teachmodule(pk)
            serializer = TeachModuleGetSerializer(data)
        else:
            data = TeachModule.objects.all()
            serializer = TeachModuleGetSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = TeachModuleSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Teacher Created Successfully", safe=False)
        return JsonResponse("Failed to Add Teacher", safe=False)

    def put(self, request, pk=None):
        teachmodule_to_update = TeachModule.objects.get(id=pk)
        serializer = TeachModuleSerializer(instance=teachmodule_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Teacher Updated Successfully", safe=False)
        return JsonResponse("Failed to Update Teacher")

    def delete(self, request, pk=None):
        teachmodule_to_delete = TeachModule.objects.get(id=pk)
        teachmodule_to_delete.delete()
        return JsonResponse("Teacher Deleted Successfully", safe=False)




class TeachModuleDeleteAPIView(APIView):
    def delete(self, request, teacher_id, module_id):
            teacher = get_object_or_404(Teacher, pk=teacher_id)
            module = get_object_or_404(Module, pk=module_id)
            teachmodule = get_object_or_404(TeachModule, teacher=teacher, module=module)
            teachmodule.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

