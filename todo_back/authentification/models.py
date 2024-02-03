from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
	username = models.CharField(max_length=255,unique=True)
	email = models.CharField(max_length=255)
	password = models.CharField(max_length=255)
	telegram = models.CharField(max_length=52,default="")
	USERNAME_FIELD = 'username'
	REQUIRED_FIELDS = []