from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *
from .views import home
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'certifications', CertificationViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('', home, name='home'),
    path("api/contact/", submit_contact_form, name="submit_contact_form"),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
