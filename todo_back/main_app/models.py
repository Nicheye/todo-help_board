from django.db import models
from authentification .models import User 
# Create your models here.

class Todo_Card(models.Model):
	name = models.CharField(max_length=200)
	description = models.CharField(max_length=1500)
	created_by = models.ForeignKey(User,on_delete=models.CASCADE,related_name="creator_of_todo_card")
	created_at = models.DateTimeField(auto_now_add=True)
	created_till = models.DateField(auto_now_add=False)
	is_helping = models.BooleanField(default=False)
	is_closed = models.BooleanField(default=False)

class HelpCard(models.Model):
	card = models.ForeignKey(Todo_Card,on_delete = models.CASCADE,related_name="help_card")
	prize = models.CharField(max_length=100)
	created_by = models.ForeignKey(User,on_delete=models.CASCADE,default=2)
	
