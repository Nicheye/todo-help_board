from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly
from .models import Todo_Card,HelpCard
from django.shortcuts import get_object_or_404
from django.db.models import Max, Value
from .serializers import TodoSerializer,HelpSerializer
from rest_framework.response import Response
from django.utils import timezone
from rest_framework import status
# Create your views here.
import datetime
class MainRetrieve(APIView):
	permission_classes = [IsAuthenticated,]
	def get(self,request,*args,**kwargs):
		id = kwargs.get("id",None)
		if id is not None:
			try:
				todo = Todo_Card.objects.get(id=id,created_by = request.user)
				todo_ser = TodoSerializer(todo)
				return Response({"data":todo_ser.data})
			except:
				return Response({"data":"no mathces"})
		
		
		todos = Todo_Card.objects.filter(created_by=request.user,is_closed=False)
		
		

		todos_ser = TodoSerializer(todos,many=True)
		# print(todos_ser.data)
		return Response({"todos":todos_ser.data})
		
		
	def post(self,request):
		data =request.data
		data['created_by'] = request.user
		todo = TodoSerializer(data=data)
		
		if todo.is_valid(raise_exception=True):
			inst = todo.save(created_by=request.user)
			return Response({"todo":todo.data})

	def patch(self,request,*args,**kwargs):
		id = kwargs.get("id",None)
		if id is not None:
			instance = Todo_Card.objects.get(id=id)
			
			if  request.data['name'] != "":
				instance.name = request.data['name']
			if  request.data['description'] != "":
				instance.description = request.data['description']
			if  request.data['created_till'] != "":
				instance.created_till = request.data['created_till']
				
			if 'is_closed' in request.data and request.data['is_closed'] != "":
						instance.is_closed = request.data['is_closed']
						try:
							if request.data['is_closed'] ==True:
								t_f = HelpCard.objects.get(card=instance)
								t_f.delete()
						except:
							pass
			instance.save()
			ser = TodoSerializer(instance)
			return Response({"data":ser.data})
	def delete(self,request,*args,**kwargs):
		id = kwargs.get("id",None)
		if id is not None:
			instance =Todo_Card.objects.get(id=id,created_by=request.user)

			instance.delete()
			return Response({"data":"successfully deleted"})
		
class HelperView(APIView):
	permission_classes = [IsAuthenticatedOrReadOnly,]
	def get(self,request,**kwargs):
		id = kwargs.get("id",None)
		if id is not None:
			try:
				help = HelpCard.objects.get(id=id)
				
				help_ser = HelpSerializer(help)
				return Response({"data":help_ser.data})
			except:
				return Response({"data":"no mathces"})
		items= HelpCard.objects.filter().order_by('-id')
		items_serializer = HelpSerializer(items,many=True)
		return Response({"data":items_serializer.data})
	def post(self,request,*args,**kwargs):
		id = kwargs.get("id",None)
		if id is not None:
			help_obj =HelpCard()
			card = Todo_Card.objects.get(id=id,created_by=request.user)
			
			check = HelpCard.objects.filter(card=card)
			if check.count()>0:
				return Response({"data":'already exists'})
			else:
				card.is_helping = True
				card.save()
				help_obj.card = card
				help_obj.prize = request.data['prize']
				help_obj.save()
				ser_obj = HelpSerializer(help_obj)
				return Response({"data":ser_obj.data})
		
	def patch(self, request, *args, **kwargs):
		id = kwargs.get('id', None)
		if id is not None:
				try:
					todo_inst = Todo_Card.objects.get(id=id)
					instance = HelpCard.objects.get(card=todo_inst)

					# Check if 'prize' key exists in request.data
					if 'prize' in request.data and request.data['prize'] != "":
						instance.prize = request.data['prize']

					
					if 'status' in request.data and request.data['status'] == False:
						instance.delete()
						
						todo_inst.is_helping=False
						todo_inst.save()
						return Response({"data": "deleted"})

					instance.save()
					ser = HelpSerializer(instance)
					return Response({"data": ser.data})
				except Todo_Card.DoesNotExist:
					return Response({"error": "Todo_Card not found"}, status=status.HTTP_404_NOT_FOUND)
				except HelpCard.DoesNotExist:
					return Response({"error": "HelpCard not found"}, status=status.HTTP_404_NOT_FOUND)
				except Exception as e:
					return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

		return Response({"error": "ID not provided"}, status=status.HTTP_400_BAD_REQUEST)
        
	


    

	

        
		

	
						
					
