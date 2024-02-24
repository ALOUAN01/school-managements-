from django.contrib import admin

from .models.module_models import Module
from .models.teacher_models import Teacher
from .models.student_models import Student
from .models.studentclass_models import StudentClass
from .models.grade_models import Grade
from .models.teachmodule_models import TeachModule
from .models.subscription_models import Subscription
from .models.classmodule_models import ClassModule
from .models.absence import Absence

models_list = [Student, Teacher, Module, Grade, StudentClass, TeachModule, Subscription, ClassModule, Absence]
admin.site.register(models_list)
