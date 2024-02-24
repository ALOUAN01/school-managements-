
from rest_framework.views import APIView
from ..serializers.teacher_serializers import TeacherSerializer
from django.http.response import JsonResponse
from ..models.teacher_models import Teacher
from rest_framework.response import Response


class TeacherView(APIView):

    def get_teacher(self, pk):
        try:
            teacher = Teacher.objects.get(teacherid=pk)
            return teacher
        except:
            return JsonResponse("Teacher Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_teacher(pk)
            serializer = TeacherSerializer(data)
        else:
            data = Teacher.objects.all()
            serializer = TeacherSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = TeacherSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Teacher Created Successfully", safe=False)
        return JsonResponse("Failed to Add Teacher", safe=False)

    def put(self, request, pk=None):
        teacher_to_update = Teacher.objects.get(teacherid=pk)
        serializer = TeacherSerializer(instance=teacher_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Teacher Updated Successfully", safe=False)
        return JsonResponse("Failed to Update Teacher")

    def delete(self, request, pk=None):
        teacher_to_delete = Teacher.objects.get(teacherid=pk)
        teacher_to_delete.delete()
        return JsonResponse("Teacher Deleted Successfully", safe=False)






