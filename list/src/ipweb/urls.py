from django.conf.urls import include, url
from django.contrib import admin
from django.views.generic.base import TemplateView
from register.urls import urlpatterns as reg

urlpatterns = [
               url(r'^api/v1/register/', include(reg)),
               url(r'^admin/', include(admin.site.urls)),
               url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

               # pages

               url('panel/index.html', TemplateView.as_view(template_name='index.html'), name='index'),
               url('^.*$', TemplateView.as_view(template_name='index.html'), name='index')
               ]
