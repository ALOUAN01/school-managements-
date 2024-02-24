
from rest_framework.views import APIView
from ..serializers.absence_serializer import AbsenceSerializer, AbsenceGetSerializer
from django.http.response import JsonResponse
from ..models.absence import Absence
from rest_framework.response import Response


class AbsenceView(APIView):

    def get_absence(self, pk):
        try:
            absence = Absence.objects.get(id=pk)
            return absence
        except:
            return JsonResponse("Absence Does Not Exist", safe=False)

    def get(self, request, pk=None):
        if pk:
            data = self.get_absence(pk)
            serializer = AbsenceGetSerializer(data)
        else:
            data = Absence.objects.all()
            serializer = AbsenceGetSerializer(data, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        serializer =AbsenceSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Absence Created Successfully", safe=False)
        return JsonResponse("Failed to Add Absence", safe=False)

    def put(self, request, pk=None):
        absence_to_update = Absence.objects.get(id=pk)
        serializer = AbsenceSerializer(instance=absence_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Absence Updated Successfully", safe=False)
        return JsonResponse("Failed to Update Absence")

    def delete(self, request, pk=None):
        absence_to_delete = Absence.objects.get(id=pk)
        absence_to_delete.delete()
        return JsonResponse("Absence Deleted Successfully", safe=False)






