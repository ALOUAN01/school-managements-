from rest_framework import serializers
from ..models.subscription_models import Subscription
from ..serializers.student_serializers import StudentShortSerializer


class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ('student',
                  'classe'

                  )


class SubscriptionGetSerializer(serializers.ModelSerializer):
    student = StudentShortSerializer()

    class Meta:
        model = Subscription
        fields = ('student',
                  'classe'
                  )
