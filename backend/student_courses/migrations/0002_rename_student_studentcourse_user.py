# Generated by Django 4.0.4 on 2022-11-30 20:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('student_courses', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='studentcourse',
            old_name='student',
            new_name='user',
        ),
    ]
