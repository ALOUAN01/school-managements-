from django.urls import path
from .views.student_views import StudentView
from .views.stuclasss_views import StuClassView
from .views.teacher_views import TeacherView
from .views.module_views import ModuleView
from .views.grade_views import GradeView
from .views.absence_views import AbsenceView
from .views.teachmodule_views import TeachModuleView
from .views.subscription_views import SubscriptionView
from .views.subscription_views import remove_student_from_class
from .views.classmodule_views import ClassModuleView
from .views.views import StudentGradesView, StudentAbsenceView
from .views.subscription_views import SubscriptionDeleteAPIView
from .views.classmodule_views import ClassModuleDeleteAPIView
from .views.teachmodule_views import TeachModuleDeleteAPIView
urlpatterns = [
    path('students/', StudentView.as_view()),
    path("students/<int:pk>/", StudentView.as_view()),
    path('teachers/', TeacherView.as_view()),
    path('teachers/<int:pk>/', TeacherView.as_view()),
    path('classe/', StuClassView.as_view()),
    path("classe/<int:pk>/", StuClassView.as_view()),
    path('module/', ModuleView.as_view()),
    path('module/<int:pk>/', ModuleView.as_view()),
    path('grade/', GradeView.as_view()),
    path('grade/<int:pk>/', GradeView.as_view()),
    path('absence/', AbsenceView.as_view()),
    path('absence/<int:pk>/', AbsenceView.as_view()),
    path('subscription/', SubscriptionView.as_view()),
    path('subscription/<int:pk>/', SubscriptionView.as_view()),
    path('teachmodule/', TeachModuleView.as_view()),
    path('teachmodule/<int:pk>/', TeachModuleView.as_view()),
    path('subscription/<int:student_id>/<int:class_id>/', remove_student_from_class, name='remove_student_from_class'),
    path('classmodule/', ClassModuleView.as_view()),
    path('classmodule/<int:pk>/', ClassModuleView.as_view()),
    path('api/student/<int:student_id>/grades/', StudentGradesView.as_view(), name='student-grades'),
    path('api/student/<int:student_id>/absences/', StudentAbsenceView.as_view(), name='student-absences'),
    path('api/student/<int:student_id>/class/<int:class_id>/delete/', SubscriptionDeleteAPIView.as_view(), name='subscription-delete'),
    path('api/class/<int:stuclass_id>/module/<int:module_id>/delete/', ClassModuleDeleteAPIView.as_view(), name='classmodule-delete'),
    path('api/teacher/<int:teacher_id>/module/<int:module_id>/delete/', TeachModuleDeleteAPIView.as_view(), name='teachmodule-delete'),

]
