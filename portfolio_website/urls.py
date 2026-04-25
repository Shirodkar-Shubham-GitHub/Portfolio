from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from portfolio.views import ExperienceViewSet, home, submit_contact_form

router = DefaultRouter()
router.register(r'experience', ExperienceViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),  # ✅ keep this
    path('api/', include(router.urls)),
    path("api/contact/", submit_contact_form, name="submit_contact_form"),
    # path('', home, name='home'),
    path('', include('portfolio.urls')),  # optional (if needed)
]

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)