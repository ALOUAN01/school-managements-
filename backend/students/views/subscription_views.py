from rest_framework.views import APIView
from ..serializers.subscription_serializers import SubscriptionSerializer
from ..serializers.subscription_serializers import SubscriptionGetSerializer
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
from ..models.subscription_models import Subscription
from ..models.student_models import Student
from ..models.studentclass_models import StudentClass
from django.http.response import Http404
from rest_framework.response import Response
from rest_framework import status

class SubscriptionView(APIView):

    def get_subscription(self, pk):
        try:
            subscription = Subscription.objects.get(id=pk)
            return subscription
        except:
            return JsonResponse("Subscription Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_subscription(pk)
            serializer = SubscriptionGetSerializer(data)
        else:
            data = Subscription.objects.all()
            serializer = SubscriptionGetSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer = SubscriptionSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Subscription Created Successfully", safe=False)
        return JsonResponse("Failed to Add Subscription", safe=False)

    def put(self, request, pk=None):
        subscription_to_update = Subscription.objects.get(id=pk)
        serializer = SubscriptionSerializer(instance=subscription_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Subscription Updated Successfully", safe=False)
        return JsonResponse("Failed to Update Subscription")

    def delete(self, request, pk=None):
        subscription_to_delete = Subscription.objects.get(id=pk)
        subscription_to_delete.delete()
        return JsonResponse("Subscription Deleted Successfully", safe=False)


def remove_student_from_class(request, student_id, class_id):
    try:
        student = Student.objects.get(studentId=student_id)
        student_class = StudentClass.objects.get(id=class_id)
        Subscription.objects.filter(student=student, classe=student_class).delete()
        return JsonResponse({'message': 'Student removed from class successfully'})
    except (Student.DoesNotExist, StudentClass.DoesNotExist):
        return JsonResponse({'error': 'Student or Class not found'}, status=404)



class SubscriptionDeleteAPIView(APIView):

    def delete(self, request, student_id, class_id):
        student = get_object_or_404(Student, pk=student_id)
        student_class = get_object_or_404(StudentClass, pk=class_id)
        subscription = get_object_or_404(Subscription, student=student, classe=student_class)
        subscription.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

