from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'debianapp.views.home', name='home'),
		url(r'^staticshamm/$', 'debianapp.views.staticshamm'),
		url(r'^macrostaticshamm/$', 'debianapp.views.macrostaticshamm'),
		url(r'^cocomohamm/$', 'debianapp.views.cocomohamm'),
		url(r'^paqueteshamm/$', 'debianapp.views.paqueteshamm'),
		url(r'^tablapackname/$', 'debianapp.views.tablapackname'),
		url(r'^tablapackfiles/$', 'debianapp.views.tablapackfiles'),
		url(r'^graficas/$', 'debianapp.views.graficas'),
		url(r'^searchpack/$', 'debianapp.views.searchpack'),
		url(r'^estatico/(?P<path>.*)$', 'django.views.static.serve',
			{'document_root': '/home/rober/Descargas/debiancount/static'}),
    # url(r'^debiancount/', include('debiancount.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
