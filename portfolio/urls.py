from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ExperienceViewSet, home, submit_contact_form

router = DefaultRouter()
router.register(r'experience', ExperienceViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', home, name='home'),
    path("api/contact/", submit_contact_form, name="submit_contact_form"),
]
