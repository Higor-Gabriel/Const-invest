from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from clientes.views import ListaClientesInadimplentesViewsets, RegistrarUsuarioViewsets, LoginViewsets

router = DefaultRouter()

router.register(r'clientes-inadimplentes', ListaClientesInadimplentesViewsets)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('registrar/', RegistrarUsuarioViewsets.as_view(), name='registrar_usuario'),
    path('login/', LoginViewsets.as_view(), name='login'),
]
