from django.shortcuts import render
from django.forms.models import model_to_dict

from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .serializers import RunsURLSerializer
from .models import Run


class RunsStatusView(ListAPIView):
    serializer_class = RunsURLSerializer

    def get_queryset(self):
        runs = Run.objects.all()
        return runs


class RunsUploadView(APIView):
    serializer_class = RunsURLSerializer
    """
    payload data needed....

    crawler_name, run_started_at to constitute the name attr
    run_id which will be the run attr
    url attribute which will be the run url passed for upload, will be the  url attr

    """

    def post(self, request,  *args, **kwargs):
        crawler_name = self.request.data.get('crawler')
        run_started_at = self.request.data.get('run_started_at')
        run_id = self.kwargs.get("run_id")
        run_url = self.request.data.get("run_url")

        run = Run()
        run.name = f"{crawler_name}_{run_id}_{run_started_at}"
        run.run = run_id
        run.url = run_url
        run.save()

        return Response(model_to_dict(run))
