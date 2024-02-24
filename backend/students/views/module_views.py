
from rest_framework.views import APIView
from ..serializers.module_serializers import ModuleSerializer
from django.http.response import JsonResponse
from ..models.module_models import Module
from rest_framework.response import Response


class ModuleView(APIView):

    def get_module(self, pk):
        try:
            module = Module.objects.get(id=pk)
            return module
        except:
            return JsonResponse("Module Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_module(pk)
            serializer = ModuleSerializer(data)
        else:
            data = Module.objects.all()
            serializer = ModuleSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer =ModuleSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Module Created Successfully", safe=False)
        return JsonResponse("Failed to Add Module", safe=False)

    def put(self, request, pk=None):
        module_to_update = Module.objects.get(id=pk)
        serializer = ModuleSerializer(instance=module_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Course Updated Successfully", safe=False)
        return JsonResponse("Failed to Update Course")

    def delete(self, request, pk=None):
        module_to_delete = Module.objects.get(id=pk)
        module_to_delete.delete()
        return JsonResponse("Module Deleted Successfully", safe=False)






