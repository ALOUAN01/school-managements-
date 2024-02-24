from rest_framework.views import APIView
from rest_framework.response import Response
from ..models.student_models import Student
from ..models.grade_models import Grade
from ..models.absence import Absence
from ..serializers.serializers import GradedSerializer, AbsenceSerializer

class StudentGradesView(APIView):
    def get(self, request, student_id):
        grades = Grade.objects.filter(student_id=student_id)
        serializer = GradedSerializer(grades, many=True)
        return Response(serializer.data)




class StudentAbsenceView(APIView):
    def get(self, request, student_id):
        absences = Absence.objects.filter(student_id=student_id)
        serializer = AbsenceSerializer(absences, many=True)
        return Response(serializer.data)