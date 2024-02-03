from rest_framework import serializers
from .models import Todo_Card,HelpCard
from authentification.models import User
from authentification.serializers import UserSerializer
class TodoSerializer(serializers.ModelSerializer):
	created_by = serializers.SerializerMethodField()
	
	class Meta:
		model = Todo_Card
		fields = ['name','description','created_by','created_at','is_helping','created_till','id','is_closed']
	def get_created_by(self,obj):
		try:
			
			# data = User.objects.get(id=obj.created_by.id)
			# ser = UserSerializer(data)
			# return ser.data
			return obj.created_by.username
		except:
			pass
class HelpSerializer(serializers.ModelSerializer):
	card = serializers.SerializerMethodField()
	telegram = serializers.SerializerMethodField()
	class Meta:
		model = HelpCard
		fields = ['card','prize','telegram']

	def get_card(self,obj):
		
		obj  = TodoSerializer(obj.card)
		
		return obj.data
	def get_telegram(self,obj):
		
		return obj.card.created_by.telegram