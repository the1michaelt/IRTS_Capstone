from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_all_courses),
    path('available/', views.get_available),   
    path('delete/<str:name>/', views.delete_courses),
    path('create/', views.create_courses),
    path('find/', views.find_courses),
    path('current/', views.get_current_studentcourses),

]