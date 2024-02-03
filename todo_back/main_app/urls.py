
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views
from . import views
urlpatterns = [
    path('',views.MainRetrieve.as_view()),
	path('<int:id>',views.MainRetrieve.as_view()),
	path('help',views.HelperView.as_view()),
	path('help/<int:id>',views.HelperView.as_view())
    
]
