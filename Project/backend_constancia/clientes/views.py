from django.utils.decorators import method_decorator
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.viewsets import ModelViewSet
from rest_framework import filters
from .models import Cliente
from .serializers import ClienteSerializer
import jwt
from datetime import datetime, timedelta
from django.conf import settings


class ListaClientesInadimplentesViewsets(ModelViewSet):
    serializer_class = ClienteSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['nome', 'valor_inadimplencia', 'data_inadimplencia']

    queryset = Cliente.objects.filter(valor_inadimplencia__gt=0, data_inadimplencia__isnull=False)


class RegistrarUsuarioViewsets(APIView):
    def post(self, request, *args, **kwargs):
        # Extrair dados do request
        username = request.data.get('username')
        password = request.data.get('password')
        # Verificar se o usuário já existe
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Nome de usuário já está em uso'}, status=status.HTTP_400_BAD_REQUEST)

        # Criar novo usuário
        user = User.objects.create_user(username=username, password=password)

        # Retornar resposta de sucesso
        return Response({'success': 'Usuário registrado com sucesso'}, status=status.HTTP_201_CREATED)


class LoginViewsets(APIView):
    def post(self, request, *args, **kwargs):
        # Extrair dados do request
        username = request.data.get('username')
        password = request.data.get('password')

        # Autenticar usuário
        user = authenticate(request, username=username, password=password)

        if user is not None:
            # Gerar token JWT
            token = self.generate_jwt_token(user)

            # Retornar token JWT
            return Response({'token': token})
        else:
            # Credenciais inválidas
            return Response({'error': 'Usuário ou senha inválidos'}, status=status.HTTP_401_UNAUTHORIZED)

    def generate_jwt_token(self, user):
        payload = {
            'user_id': user.id,
            'exp': datetime.utcnow() + timedelta(days=1)  # Define a expiração do token
        }
        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return token.decode('utf-8')
