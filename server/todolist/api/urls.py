from django.urls import path
from .views import get_todo, create_todo, todo_detail

urlpatterns = [
    path('tarefas/', get_todo, name='get_todo'),
    path('tarefas/criar/', create_todo, name='create_todo'),
    path('tarefas/<int:pk>/', todo_detail, name='todo_detail'),
]