from rest_framework.views import APIView
from ..serializers.studentclasss_serializers import StuClassSerializer
from django.http.response import JsonResponse
from ..models.studentclass_models import StudentClass
from django.http.response import Http404
from rest_framework.response import Response


class StuClassView(APIView):

    def get_stuclass(self, pk):
        try:
            stuclass = StudentClass.objects.get(id=pk)
            return stuclass
        except:
            return JsonResponse("class Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_stuclass(pk)
            serializer = StuClassSerializer(data)
        else:
            data = StudentClass.objects.all()
            serializer = StuClassSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = StuClassSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("class Created Successfully", safe=False)
        return JsonResponse("Failed to Add class", safe=False)

    def put(self, request, pk=None):
        stuclass_to_update = StudentClass.objects.get(id=pk)
        serializer = StuClassSerializer(instance=stuclass_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("class Updated Successfully", safe=False)
        return JsonResponse("Failed to Update class")

    def delete(self, request, pk=None):
        stuclass_to_delete = StudentClass.objects.get(id=pk)
        stuclass_to_delete.delete()
        return JsonResponse("class Deleted Successfully", safe=False)
