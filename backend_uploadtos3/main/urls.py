from django.urls import path, include, re_path
from rest_framework import routers
from.views import RunsUploadView, RunsStatusView

urlpatterns = [
    path('upload/runs', RunsStatusView.as_view(),
         name='upload runs view'),
    re_path(r'^upload/(?P<run_id>[a-f0-9]{32})$', RunsUploadView.as_view(),
            name='upload runs view')
]
