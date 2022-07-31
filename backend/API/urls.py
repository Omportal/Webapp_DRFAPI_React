from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    path('items/', views.ItemsList.as_view(), name='items'),
    # path('post/', views.post_response),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
