import os, sys
sys.path.append('/home/rober/Descargas/debiancount')
os.environ['DJANGO_SETTINGS_MODULE'] = 'debiancount.settings'
import django.core.handlers.wsgi
_application = django.core.handlers.wsgi.WSGIHandler()
def application(environ, start_response):
	environ['PATH_INFO'] = environ['SCRIPT_NAME'] + environ['PATH_INFO']
	if environ['wsgi.url_scheme'] == 'https':
		environ['HTTPS'] = 'on'
	return _application(environ, start_response)
