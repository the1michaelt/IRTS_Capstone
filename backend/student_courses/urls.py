from django.urls import path, include
from . import views

urlpatterns = [
    path('enroll_student_into_courses/', views.enroll_student_into_courses), 
    path('admin_views_studentcourses/<int:user_id>/', views.admin_views_studentcourses), 
    path('get_transcript/', views.get_transcript), 
    path('get_gpa/', views.get_gpa),
    path('get_calculate_gpa/<int:user_id>/', views.get_calculate_gpa),
    path('calculate_credits/<int:user_id>/', views.calculate_credits_earned),
    path('get_semester_by_credits/<int:user_id>/', views.get_semester_by_credits),
    path('get_scheduled_courses/', views.get_scheduled_courses),
    path('grade_course_object/<int:student_course_id>/', views.grade_course_object), 
    path('get_graded_courses/', views.get_graded_courses),
    path('delete_courses/<int:pk>/', views.delete_courses),
            
]



