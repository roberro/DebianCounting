# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Remove `managed = False` lines for those models you wish to give write DB access
# Feel free to rename the models, but don't rename db_table values or field names.
#
# Also note: You'll have to insert the output of 'django-admin.py sqlcustom [appname]'
# into your database.
from __future__ import unicode_literals

from django.db import models

class AuthGroup(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(unique=True, max_length=80)
    class Meta:
        managed = False
        db_table = 'auth_group'

class AuthGroupPermissions(models.Model):
    id = models.IntegerField(primary_key=True)
    group = models.ForeignKey(AuthGroup)
    permission = models.ForeignKey('AuthPermission')
    class Meta:
        managed = False
        db_table = 'auth_group_permissions'

class AuthPermission(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=50)
    content_type = models.ForeignKey('DjangoContentType')
    codename = models.CharField(max_length=100)
    class Meta:
        managed = False
        db_table = 'auth_permission'

class AuthUser(models.Model):
    id = models.IntegerField(primary_key=True)
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField()
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=30)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.CharField(max_length=75)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'auth_user'

class AuthUserGroups(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(AuthUser)
    group = models.ForeignKey(AuthGroup)
    class Meta:
        managed = False
        db_table = 'auth_user_groups'

class AuthUserUserPermissions(models.Model):
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(AuthUser)
    permission = models.ForeignKey(AuthPermission)
    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'

class DjangoContentType(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=100)
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    class Meta:
        managed = False
        db_table = 'django_content_type'

class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()
    class Meta:
        managed = False
        db_table = 'django_session'

class DjangoSite(models.Model):
    id = models.IntegerField(primary_key=True)
    domain = models.CharField(max_length=100)
    name = models.CharField(max_length=50)
    class Meta:
        managed = False
        db_table = 'django_site'

class Filesetch(models.Model):
    id = models.BigIntegerField(primary_key=True)
    file = models.CharField(max_length=255)
    language = models.CharField(max_length=16)
    sloc = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'filesetch'

class Fileshamm(models.Model):
    id = models.BigIntegerField(primary_key=True)
    file = models.CharField(max_length=255)
    language = models.CharField(max_length=16)
    sloc = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'fileshamm'

class Fileslenny(models.Model):
    id = models.BigIntegerField(primary_key=True)
    file = models.CharField(max_length=255)
    language = models.CharField(max_length=16)
    sloc = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'fileslenny'

class Filespotato(models.Model):
    id = models.BigIntegerField(primary_key=True)
    file = models.CharField(max_length=255)
    language = models.CharField(max_length=16)
    sloc = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'filespotato'

class Filessarge(models.Model):
    id = models.BigIntegerField(primary_key=True)
    file = models.CharField(max_length=255)
    language = models.CharField(max_length=16)
    sloc = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'filessarge'

class Filesslink(models.Model):
    id = models.BigIntegerField(primary_key=True)
    file = models.CharField(max_length=255)
    language = models.CharField(max_length=16)
    sloc = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'filesslink'

class Fileswoody(models.Model):
    id = models.BigIntegerField(primary_key=True)
    file = models.CharField(max_length=255)
    language = models.CharField(max_length=16)
    sloc = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'fileswoody'

class Packagesetch(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    version = models.CharField(max_length=32)
    slocs = models.BigIntegerField()
    files = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'packagesetch'

class Packageshamm(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    version = models.CharField(max_length=32)
    slocs = models.BigIntegerField()
    files = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'packageshamm'

class Packageslenny(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    version = models.CharField(max_length=32)
    slocs = models.BigIntegerField()
    files = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'packageslenny'

class Packagespotato(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    version = models.CharField(max_length=32)
    slocs = models.BigIntegerField()
    files = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'packagespotato'

class Packagessarge(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    version = models.CharField(max_length=32)
    slocs = models.BigIntegerField()
    files = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'packagessarge'

class Packagesslink(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    version = models.CharField(max_length=32)
    slocs = models.BigIntegerField()
    files = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'packagesslink'

class Packageswoody(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=64)
    version = models.CharField(max_length=32)
    slocs = models.BigIntegerField()
    files = models.IntegerField()
    class Meta:
        managed = False
        db_table = 'packageswoody'

