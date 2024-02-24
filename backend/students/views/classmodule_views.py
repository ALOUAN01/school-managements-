
from rest_framework.views import APIView
from ..serializers.classmodule_serializers import ClassModuleSerializer
from django.http.response import JsonResponse
from ..models.classmodule_models import ClassModule
from rest_framework.response import Response
from ..models.studentclass_models import StudentClass
from ..models.module_models import Module
from ..models.classmodule_models import ClassModule
from rest_framework import status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
class ClassModuleView(APIView):

    def get_grade(self, pk):
        try:
            grade = ClassModule.objects.get(id=pk)
            return grade
        except:
            return JsonResponse("ClassModule Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_grade(pk)
            serializer = ClassModuleSerializer(data)
        else:
            data = ClassModule.objects.all()
            serializer = ClassModuleSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = ClassModuleSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("ClassModule Created Successfully", safe=False)
        return JsonResponse("Failed to Add ClassModule", safe=False)

    def put(self, request, pk=None):
        classModule_to_update = ClassModule.objects.get(id=pk)
        serializer = ClassModuleSerializer(instance=classModule_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("ClassModule Updated Successfully", safe=False)
        return JsonResponse("Failed to Update ClassModule")

    def delete(self, request, pk=None):
        classModule_to_delete = ClassModule.objects.get(id=pk)
        classModule_to_delete.delete()
        return JsonResponse("ClassModule Deleted Successfully", safe=False)



class ClassModuleDeleteAPIView(APIView):
    def delete(self, request, stuclass_id, module_id):
            student_classs = get_object_or_404(StudentClass, pk=stuclass_id)
            module = get_object_or_404(Module, pk=module_id)
            classmodule = get_object_or_404(ClassModule, student_class=student_classs, module=module)
            classmodule.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)

