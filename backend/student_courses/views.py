from django.shortcuts import render, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from .models import StudentCourse, User
from .serializers import StudentCourseSerializer, GradedCourseSerializer

# Create your views here.
#USERS

@api_view(['GET'])
@permission_classes([AllowAny])
def student_users(request):
    """/api/users/all/  These are students with classes. GET users with courses
    """
    student_courses = StudentCourse.objects.all()
    serializer = StudentCourseSerializer(student_courses, many=True)
    print('GET users with courses, all_student users', student_courses)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_by_id(request, user):
    """api/users/<user by id number>
    """
    user_received = StudentCourse.objects.filter(user=user)
    serializer = GradedCourseSerializer(user_received, many=True)
    print('get user by id', user_received)
    return Response(serializer.data)

# Get all logged in user's courses, aka transcript
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_studentcourses(request):
    users_courses = StudentCourse.objects.filter(user_id=request.user.id)
    serializer = StudentCourseSerializer(users_courses, many=True)
    return Response(serializer.data)

#Get all studentcourses that need grades
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_ungraded_studentcourses(request):
    ungraded_courses = StudentCourse.objects.filter(grade_received=None)
    serializer = StudentCourseSerializer(ungraded_courses, many=True)
    return Response(serializer.data)

# GRADES
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_grades(request):
    """api/grades/get
    """
    # this_grade = StudentCourse.objects.filter(grade_received=grade_received)
    serializer = GradedCourseSerializer(data=request.data)
    print('get grades')
    if serializer.is_valid():
        serializer.save()
        print('get grades')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_gpa(request):
    """api/users/grades/gpa  ##USER?
    """
    #query for all studentcourses for logged in user, find the grades and average them
    gpa_received = StudentCourse.objects.filter(gpa__gte=0)
    serializer = StudentCourseSerializer(data=request.data)
    print('get GPA')
    if serializer.is_valid():
        serializer.save()
        print('get GPA', gpa_received)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])   #by name
def change_grades(request):
    """api/users/grades/change/
    """    
    # grade_received = StudentCourse.objects.filter(grade_received=grade_received)
    # print('POST change courses', grade_received)
    serializer = GradedCourseSerializer(data=request.data)
    print('change grades')
    if serializer.is_valid():
        serializer.save()
        print('POST change grades')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE']) 
def delete_grades(request):
    """api/users/grades/delete/
    """
    print('deleted grades')
    grade_deleted= get_object_or_404(StudentCourse)
    serializer = StudentCourseSerializer(grade_deleted) 
    return Response(serializer.data)


#COURSES

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_studentcourses(request):
    """/api/courses/all/
    """
    course = StudentCourse.objects.all()
    serializer = StudentCourseSerializer(course, many=True)
    print('get_all_courses', course)
    return Response(serializer.data)

@api_view(['PUT']) 
def change_studentcourses(request):
    """api/users/courses/change/
    """
    serializer = StudentCourseSerializer(data=request.data)
    print('Postman body student_id, course_id')
    if serializer.is_valid():
        serializer.save()
        print('POST change courses')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Used for when a logged-in student registers for a new course
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_studentcourses(request):
    """api/users/courses/new     
    """
    serializer = StudentCourseSerializer(data=request.data)
    print('create courses')
    if serializer.is_valid():
        serializer.save(user=request.user)
        print('create courses')
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE']) 
def delete_studentcourses(request):
    """api/users/courses/delete/
    """
    course_deleted= get_object_or_404(StudentCourse)
    serializer = StudentCourseSerializer(course_deleted) 
    print('delete_courses', course_deleted)
    return Response(serializer.data)


# How to get a user
# How to assign a course
# How to assign a grade




        