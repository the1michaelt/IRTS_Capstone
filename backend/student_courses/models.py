from django.db import models
from authentication.models import User
from courses.models import Course

# Create your models here.
class StudentCourse(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    course = models.ForeignKey(Course, on_delete=models.CASCADE) 
    grade_received = models.IntegerField(blank=True, null=True) 
    credits_received = models.IntegerField(blank=True, null=True) 

