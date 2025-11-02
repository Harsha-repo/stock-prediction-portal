from django.urls import path

from accounts.views import Register_view
from accounts.views import protected_view
from api.views import StockPrdictionAPIView


from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView



urlpatterns = [
    
    path('register/', Register_view.as_view(), name='register'),
    
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('protected/', protected_view.as_view(), name='protected'),

    # api prediction path
    path('predict/', StockPrdictionAPIView.as_view(), name='predict'),


    
    ]