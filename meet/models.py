# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User

class Meting(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    elevation = models.FloatField(null=True)
    hacc = models.FloatField(null=True)
    vacc = models.FloatField(null=True)
    sensor = models.CharField(max_length=64)
    phone = models.CharField(max_length=64,null=True,blank=True)
    entity = models.CharField(max_length=50,default='EC')
    unit = models.CharField(max_length=20, default='µS/cm')
    value = models.FloatField()
    date = models.DateTimeField()

    def __unicode__(self):
        return unicode(self.pk)
    
