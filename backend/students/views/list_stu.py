from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from ..models.student_models import Student
from..models.studentclass_models import StuClass
from..models.subscription_models import Subscription

def students_in_class(request, class_name):
    stu_class = get_object_or_404(StuClass, class_name=class_name)
    students = Student.objects.filter(subscription__classe=stu_class)
    data = [
        {
            'studentId': student.studentId,
            'FirstName': student.FirstName,
            'LastName': student.LastName,
            'academic_level': student.academic_level,
            # Add other student fields as needed
        }
        for student in students
    ]
    return JsonResponse(data, safe=False)