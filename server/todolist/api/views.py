from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import TodoItem
from .serializer import TodoItemSerializer

@api_view(['GET'])
def get_todo(request):
    todoList = TodoItem.objects.all()
    serializedData = TodoItemSerializer(todoList, many=True).data
    return Response(serializedData, status=status.HTTP_200_OK)
    
@api_view(['POST'])
def create_todo(request):
    data = request.data
    serializer = TodoItemSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def todo_detail(request, pk):
    try:
        todo = TodoItem.objects.get(pk=pk)
    except TodoItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        todo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        data = request.data
        serializer = TodoItemSerializer(todo, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)