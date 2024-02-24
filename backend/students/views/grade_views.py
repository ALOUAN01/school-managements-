
from rest_framework.views import APIView
from ..serializers.grade_serializers import GradeSerializer, GradeGetSerializer
from django.http.response import JsonResponse
from ..models.grade_models import Grade
from rest_framework.response import Response


class GradeView(APIView):

    def get_grade(self, pk):
        try:
            grade = Grade.objects.get(id=pk)
            return grade
        except:
            return JsonResponse("Grade Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_grade(pk)
            serializer = GradeGetSerializer(data)
        else:
            data = Grade.objects.all()
            serializer = GradeGetSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer =GradeSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Grade Created Successfully", safe=False)
        return JsonResponse("Failed to Add Grade", safe=False)

    def put(self, request, pk=None):
        grade_to_update = Grade.objects.get(id=pk)
        serializer = GradeSerializer(instance=grade_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Grade Updated Successfully", safe=False)
        return JsonResponse("Failed to Update Grade")

    def delete(self, request, pk=None):
        grade_to_delete = Grade.objects.get(id=pk)
        grade_to_delete.delete()
        return JsonResponse("Grade Deleted Successfully", safe=False)






