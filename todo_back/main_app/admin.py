from django.contrib import admin

# Register your models here.
from .models import Todo_Card,HelpCard
admin.site.register(Todo_Card)
admin.site.register(HelpCard)