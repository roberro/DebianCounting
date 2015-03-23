from models import *
from django.shortcuts import render
from django.core import serializers
from django.utils import simplejson
from django.core.cache import cache
from django.db.models import Sum
from django.db.models import Count
from collections import Counter

# Create your views here.
from django.http import HttpResponse, HttpResponseNotFound, HttpResponseNotAllowed, HttpResponseRedirect
from django.shortcuts import render_to_response
import time
#Medir tiempo
#t1 = time.time()
#print(time.time() - t1)
#Busqueda de objetos en la BBDD
def busquedaobjs(Files,Packages):
	allobjsF = Files.objects.all()	
	allobjsP = Packages.objects.all()
	return (allobjsF,allobjsP)

#Crea la lista con los lenguajes que existen en la tabla Files	
def crearlista(allobjs):
	lenguajes= []

	for obj in allobjs:
		if not obj.language in lenguajes:
			lenguajes.append(obj.language)
	return lenguajes

#Crea la lista con los paquetes que existen en la tabla Packages	
def crearlistaPack(allobjs):
	packages= []
	
	for obj in allobjs:
		if not obj.name in packages:
			packages.append(obj.name)
	return packages

#Calcula los porcentajes
def calculaporcentaje(total, parcial):
	porcentaje= (float(parcial)*100)/float(total)
	porcentaje=round(porcentaje,3)
	return porcentaje

#Calcula la media
def media(lista):
	suma = 0
	for l in lista:
		suma = suma + l
	longlist = len(lista)
	mean = float(suma) / float(longlist)
	mean = round(mean,2)
	return mean

# Division de floats
def division(sloc,files):
	if files != 0:
		div = (float(sloc))/(float(files))
		div = round(div,2)
	else:
		div = 0
	return div

#Calcula el numero de SLOCS en Files
def numerosloc(objsleng):
	
	numsloc = 0
	for objleng in objsleng:
		numsloc = numsloc + objleng.sloc
	return numsloc

#Calcula el numero total de Slocs
def numerototal(totales):	
	numtotal = 0
	for total in totales:
		numtotal = numtotal + total.sloc
	return numtotal

#Calcula el numero de paquetes
def numeropack(packs):
	numsloc = 0
	entra = 0
	for pack in packs:
		if pack.id != entra:
			numsloc = numsloc + 1
			entra = pack.id
		
	return numsloc

# Creacion de las tablas statics 


def tablastachamm(Files,Packages,fich):
	t1 = time.time()
	lenguajes = fich.objects.values_list('language',flat=True)
	lenguajes = list(set(lenguajes))
	listatotal = []
	listaslocdivfil = []
	listafildivpack = []
	listaslocdivpack = []
	i=0
	numtotalporcsloc=0
	numtotalporcpack=0
	numtotalporcfil=0
	numtotalpackfin=0
	numtotalsloc=fich.objects.aggregate(Sum('sloc')) 
	numtotalsloc = numtotalsloc["sloc__sum"]
	numtotalpack = Packages.count()
	numtotalfiles = Files.count()

	for lenguaje in lenguajes:
		listahamm = []

		objsleng = fich.objects.filter(language=lenguaje)

		numsloc=numerosloc(objsleng)

		numporsloc = calculaporcentaje(numtotalsloc,numsloc)

		numtotalporcsloc= numtotalporcsloc + numporsloc
		
		numpackages = numeropack(objsleng)
		numtotalpackfin = numtotalpackfin + numpackages

		numporpack=calculaporcentaje(numtotalpack,numpackages) 

		numtotalporcpack= numtotalporcpack + numporpack
		numfiles=objsleng.count()

		numporfiles = calculaporcentaje(numtotalfiles,numfiles)

		numtotalporcfil= numtotalporcfil+numporfiles
		slocdivfil=division(numsloc,numfiles)
		diccionario = {"lenguaje":lenguaje,"numsloc":numsloc,"numporsloc":numporsloc,"npack":numpackages,
		"nporpack":numporpack,"numfiles":numfiles,"numporfiles":numporfiles,"slocdivfil":slocdivfil}
		listatotal.append(diccionario)

		listaslocdivfil.append(slocdivfil)
		fildivpack=division(numfiles,numpackages)
		listafildivpack.append(fildivpack)
		slocdivpack=division(numsloc,numpackages)
		listaslocdivpack.append(slocdivpack)

	numtotalporcpack = round(numtotalporcpack,3)
	numtotalporcfil = round(numtotalporcfil,2)
	print("El tiempo total funcion tablastacham es")
	print(time.time() - t1)
	return (listatotal,listaslocdivfil,listafildivpack,listaslocdivpack,numtotalsloc)

###Creacion de las tablas macrostatics
def tablasmacro(Files,Packages,fich):
	t1 = time.time()
	lista=[]
	numtotalpack = Packages.count()
	lista.append({"name":"Packages","num":numtotalpack})

	numtotalfiles = Files.count()
	lista.append({"name":"Files","num":numtotalfiles})

	numtotalsloc=fich.objects.aggregate(Sum('sloc')) 
	numtotalsloc = numtotalsloc["sloc__sum"]
	lista.append({"name":"SLOC","num":numtotalsloc})

	meanslocdivfile=division(numtotalsloc,numtotalfiles)
	lista.append({"name":"SLOC/files","num":meanslocdivfile})
	meanfiledivpack=division(numtotalfiles,numtotalpack)
	lista.append({"name":"files/packages","num":meanfiledivpack})
	meanslocdivpack=division(numtotalsloc,numtotalpack)
	lista.append({"name":"SLOC/packages","num":meanslocdivpack})
	print("El tiempo total macrostatics es")
	print(time.time() - t1)
	return lista	

####
def personasmes(numtotalsloc):
	ksloc = float(numtotalsloc)/1000
	personmonth = (ksloc**(1.05))*2.4
	personmonth = round(personmonth,2)
	return personmonth

def mesesestimados(personmonth):
	monthstimate = 2.5*(personmonth**0.38)
	monthstimate = round(monthstimate,2)
	return monthstimate

def developerestimado(personmonth,monthstimate):
	if monthstimate != 0:
		developers = personmonth/monthstimate
		developers = round(developers,2)
	else:
		developers = 0
	return developers	

def costesfinales(personyear,yearstimate):
	coste = personyear * yearstimate * 56286
	coste = int(round(coste,0))
	return coste
#Calculo de los datos con el modelo COCOMO
def COCOMO(Files,fich):
	t1 = time.time()
	numtotalsloc=fich.objects.aggregate(Sum('sloc')) 
	numtotalsloc = numtotalsloc["sloc__sum"]
	lista = []
	lista.append({"numsloc":numtotalsloc})
	personmonth=personasmes(numtotalsloc)
	lista.append({"personmonth":personmonth})
	personyear = personmonth/12
	personyear = round(personyear,2)
	lista.append({"personyear":personyear})
	monthstimate= mesesestimados(personmonth)
	lista.append({"monthstimate":monthstimate})
	yearstimate = monthstimate/12
	yearstimate = round(yearstimate,2)
	lista.append({"yearstimate":yearstimate})
	developers = developerestimado(personmonth, monthstimate)
	lista.append({"developers":developers})
	coste = costesfinales(personyear, yearstimate)
	lista.append({"coste":coste})
	cocomo = {"numsloc":numtotalsloc,"personmonth":personmonth,"personyear":personyear,"monthstimate":monthstimate,
			"yearstimate":yearstimate,"developers":developers,"coste":coste}

	return cocomo
	
#calculo de las tablas de packages.
def tablaspackages(Packages,allobjsPack):
	listatotal = []

	for pack in allobjsPack:
		
		slocdivpack = division(pack.slocs,pack.files)		
		personmonth=personasmes(pack.slocs)		
		monthstimate= mesesestimados(personmonth)	
		developers = developerestimado(personmonth, monthstimate)	
		coste = costesfinales(personmonth, monthstimate)	
		diccionario = {"name":pack.name,"version":pack.version,"slocs":pack.slocs,"files":pack.files,
		"slocdivpack":slocdivpack,"personmonth":personmonth,"monthstimate":monthstimate,"developers":developers,
		"coste":coste}
		listatotal.append(diccionario)
	
	return listatotal
	

def home(request):
	return render_to_response("debian1.html")


def searchpack(request):

	if request.method == u'GET':
		data=[]
		namepack = request.GET[u'namepack']
		namepack = namepack.split('_')
		if (namepack[1] != "undefined"): 
			namevs = namepack[1].split(")")
			if (namevs[0] == "Hamm"):
				lista = list(Packageshamm.objects.filter(name__icontains=namepack[0]))
			elif (namevs[0] == "Slink"):
				lista = list(Packagesslink.objects.filter(name__icontains=namepack[0]))
			elif (namevs[0] == "Potato"):
				lista = list(Packagespotato.objects.filter(name__icontains=namepack[0]))
			elif (namevs[0] == "Woody"):
				lista = list(Packageswoody.objects.filter(name__icontains=namepack[0]))
			elif (namevs[0] == "Sarge"):
				lista = list(Packagessarge.objects.filter(name__icontains=namepack[0]))
			elif (namevs[0] == "Etch"):
				lista = list(Packagesetch.objects.filter(name__icontains=namepack[0]))
			elif (namevs[0] == "Lenny"):
				lista = list(Packageslenny.objects.filter(name__icontains=namepack[0]))
			for l in lista:
				data.append(l.name)
		
		json = simplejson.dumps(data)
		return HttpResponse(json, mimetype='application/json')		

#Tabla de estadisticas. 
def staticshamm(request):
	if request.method == u'GET':
		namepack = request.GET[u'namepack']
		namepack = namepack.split('_')
		print("ENTRA EN STATICS " + namepack[1])
		valor = cache.get('stat_' + namepack[1])
		print(valor)
		if (not valor):
			if (namepack[1] == "hamm"):
				listaobj = busquedaobjs(Fileshamm,Packageshamm)
				listastatic = tablastachamm(listaobj[0], listaobj[1],Fileshamm)  
			elif (namepack[1] == "slink"):
				listaobj = busquedaobjs(Filesslink,Packagesslink)
				listastatic = tablastachamm(listaobj[0], listaobj[1],Filesslink)   
			elif (namepack[1] == "potato"):
				listaobj = busquedaobjs(Filespotato,Packagespotato)
				listastatic = tablastachamm(listaobj[0], listaobj[1],Filespotato)   
			elif (namepack[1] == "woody"):
				listaobj = busquedaobjs(Fileswoody,Packageswoody)
				listastatic = tablastachamm(listaobj[0], listaobj[1],Fileswoody)   
			elif (namepack[1] == "sarge"):
				listaobj = busquedaobjs(Filessarge,Packagessarge)
				listastatic = tablastachamm(listaobj[0], listaobj[1],Filessarge)   
			elif (namepack[1] == "etch"):
				listaobj = busquedaobjs(Filesetch,Packagesetch)
				listastatic = tablastachamm(listaobj[0], listaobj[1],Filesetch)   
			elif (namepack[1] == "lenny"):
				listaobj = busquedaobjs(Fileslenny,Packageslenny)
				listastatic = tablastachamm(listaobj[0], listaobj[1],Fileslenny)   
			
			cache.set('stat_' + namepack[1], listastatic,None)
		else: 
			listastatic = valor

		json = simplejson.dumps(listastatic[0])

		return HttpResponse(json, mimetype='application/json')


#Tabla de macroestadisticas.
def macrostaticshamm(request):
	if request.method == u'GET':
		namepack = request.GET[u'namepack']
		namepack = namepack.split('_')
		if (namepack[1] == "hamm"):
			listaobj = busquedaobjs(Fileshamm,Packageshamm)
			listamacro = tablasmacro(listaobj[0], listaobj[1],Fileshamm)  
		elif (namepack[1] == "slink"):
			listaobj = busquedaobjs(Filesslink,Packagesslink)
			listamacro = tablasmacro(listaobj[0], listaobj[1],Filesslink) 
		elif (namepack[1] == "potato"):
			listaobj = busquedaobjs(Filespotato,Packagespotato)
			listamacro = tablasmacro(listaobj[0], listaobj[1],Filespotato) 
		elif (namepack[1] == "woody"):
			listaobj = busquedaobjs(Fileswoody,Packageswoody)
			listamacro = tablasmacro(listaobj[0], listaobj[1],Fileswoody) 
		elif (namepack[1] == "sarge"):
			listaobj = busquedaobjs(Filessarge,Packagessarge)
			listamacro = tablasmacro(listaobj[0], listaobj[1],Filessarge) 
		elif (namepack[1] == "etch"):
			listaobj = busquedaobjs(Filesetch,Packagesetch)
			listamacro = tablasmacro(listaobj[0], listaobj[1],Filesetch) 
		elif (namepack[1] == "lenny"):
			listaobj = busquedaobjs(Fileslenny,Packageslenny)
			listamacro = tablasmacro(listaobj[0], listaobj[1],Fileslenny) 
			 
		json = simplejson.dumps(listamacro)

		return HttpResponse(json, mimetype='application/json')



#Tabla cocomo.
def cocomohamm(request):
	if request.method == u'GET':
		namepack = request.GET[u'namepack']
		namepack = namepack.split('_')

		if (namepack[1] == "hamm"):
			listaobj = busquedaobjs(Fileshamm,Packageshamm)
			listacocomo = COCOMO(listaobj[0],Fileshamm)
		elif (namepack[1] == "slink"):
			listaobj = busquedaobjs(Filesslink,Packagesslink)
			listacocomo = COCOMO(listaobj[0],Filesslink)
		elif (namepack[1] == "potato"):
			listaobj = busquedaobjs(Filespotato,Packagespotato)
			listacocomo = COCOMO(listaobj[0],Filespotato)
		elif (namepack[1] == "woody"):
			listaobj = busquedaobjs(Fileswoody,Packageswoody)
			listacocomo = COCOMO(listaobj[0],Fileswoody)
		elif (namepack[1] == "sarge"):
			listaobj = busquedaobjs(Filessarge,Packagessarge)
			listacocomo = COCOMO(listaobj[0],Filessarge)
		elif (namepack[1] == "etch"):
			listaobj = busquedaobjs(Filesetch,Packagesetch)
			listacocomo = COCOMO(listaobj[0],Filesetch)
		elif (namepack[1] == "lenny"):
			listaobj = busquedaobjs(Fileslenny,Packageslenny)
			listacocomo = COCOMO(listaobj[0],Fileslenny)

		json = simplejson.dumps(listacocomo)
		return HttpResponse(json, mimetype='application/json')


#Tabla de paquetes.
def paqueteshamm(request):
	if request.method == u'GET':
		namepack = request.GET[u'namepack']
		namepack = namepack.split('_')
		
		if (namepack[1] == "hamm"):
			listaobj = busquedaobjs(Fileshamm,Packageshamm)
			listapacks = tablaspackages(Packageshamm, listaobj[1])
		elif (namepack[1] == "slink"):
			listaobj = busquedaobjs(Filesslink,Packagesslink)
			listapacks = tablaspackages(Packagesslink, listaobj[1])
		elif (namepack[1] == "potato"):
			listaobj = busquedaobjs(Filespotato,Packagespotato)
			listapacks = tablaspackages(Packagespotato, listaobj[1])
		elif (namepack[1] == "woody"):
			listaobj = busquedaobjs(Fileswoody,Packageswoody)
			listapacks = tablaspackages(Packageswoody, listaobj[1])
		elif (namepack[1] == "sarge"):
			listaobj = busquedaobjs(Filessarge,Packagessarge)
			listapacks = tablaspackages(Packagessarge, listaobj[1])
		elif (namepack[1] == "etch"):
			listaobj = busquedaobjs(Filesetch,Packagesetch)
			listapacks = tablaspackages(Packagesetch, listaobj[1])	
		elif (namepack[1] == "lenny"):
			listaobj = busquedaobjs(Fileslenny,Packageslenny)
			listapacks = tablaspackages(Packageslenny, listaobj[1])

		json = simplejson.dumps(listapacks)

		return HttpResponse(json, mimetype='application/json')



#Tabla de paquetes pinchando el nombre.
def paquetesname(Files,Packages, nombre):
	lenguajes= []
	lista = []
	i = 0
	aux = 0
	sumasloc= 0
	sumafiles = 0
	objpack = Packages.objects.get(name=nombre)
	idobjpack = objpack.id
	objs= Files.objects.filter(id=idobjpack)
	totalsloc = numerototal(objs)
	totalfiles = objs.count()
	for obj in objs:
			if not obj.language in lenguajes:
				lenguajes.append(obj.language)
				if (aux != 0):
					numporsloc = calculaporcentaje(totalsloc,sumasloc)
					numporfiles = calculaporcentaje(totalfiles,sumafiles)
					slocdivfil=division(sumasloc,sumafiles)
					diccionario = {"language":lenguajes[i],"slocs":sumasloc,
					"numporsloc":numporsloc,"files":sumafiles,"numporfiles":numporfiles,"slocdivfil":slocdivfil}
					lista.append(diccionario)
					i = i+1
					sumafiles = 0
					sumasloc = 0 

				sumafiles = sumafiles + 1
				sumasloc= sumasloc + obj.sloc
				aux = 1
			else:
				sumasloc= sumasloc + obj.sloc
				sumafiles = sumafiles + 1

	numporsloc = calculaporcentaje(totalsloc,sumasloc)
	numporfiles = calculaporcentaje(totalfiles,sumafiles)
	slocdivfil=division(sumasloc,sumafiles)
	numporsloc = calculaporcentaje(totalsloc,sumasloc)
	numporfiles = calculaporcentaje(totalfiles,sumafiles)
	slocdivfil=division(sumasloc,sumafiles)
	diccionario = {"language":lenguajes[i],"slocs":sumasloc,
	"numporsloc":numporsloc,"files":sumafiles,"numporfiles":numporfiles,"slocdivfil":slocdivfil}
	lista.append(diccionario)
	cocomo = COCOMO(objs,Files)
	lista.append(cocomo)
	return lista


def tablapackname(request):
	if request.method == u'GET':
		namepack = request.GET[u'namepack']
		namepack = namepack.split('_')

		if (namepack[1] == "hamm"):
			listapack = paquetesname(Fileshamm,Packageshamm,namepack[0])
		elif (namepack[1] == "slink"):
			listapack = paquetesname(Filesslink,Packagesslink,namepack[0])
		elif (namepack[1] == "potato"):
			listapack = paquetesname(Filespotato,Packagespotato,namepack[0])
		elif (namepack[1] == "woody"):
			listapack = paquetesname(Fileswoody,Packageswoody,namepack[0])
		elif (namepack[1] == "sarge"):
			listapack = paquetesname(Filessarge,Packagessarge,namepack[0])
		elif (namepack[1] == "etch"):
			listapack = paquetesname(Filesetch,Packagesetch,namepack[0])
		elif (namepack[1] == "lenny"):
			listapack = paquetesname(Fileslenny,Packageslenny,namepack[0])

		json = simplejson.dumps(listapack)

		return HttpResponse(json, mimetype='application/json')


#Tabla de paquetes pinchando files.
def paquetesfiles(Files,Packages, nombre):
	lista=[]
	objpack = Packages.objects.get(name=nombre)
	idobjpack = objpack.id
	objs= Files.objects.filter(id=idobjpack)
	for obj in objs:
		diccionario = {"filename":obj.file,"language":obj.language,"slocs":obj.sloc}
		lista.append(diccionario)
	return lista


def tablapackfiles(request):
	if request.method == u'GET':
		namepack = request.GET[u'namepack']
		namepack = namepack.split('_')

		if (namepack[1] == "hamm"):
			listapack = paquetesfiles(Fileshamm,Packageshamm,namepack[0])
		elif (namepack[1] == "slink"):
			listapack = paquetesfiles(Filesslink,Packagesslink,namepack[0])
		elif (namepack[1] == "potato"):
			listapack = paquetesfiles(Filespotato,Packagespotato,namepack[0])
		elif (namepack[1] == "woody"):
			listapack = paquetesfiles(Fileswoody,Packageswoody,namepack[0])
		elif (namepack[1] == "sarge"):
			listapack = paquetesfiles(Filessarge,Packagessarge,namepack[0])
		elif (namepack[1] == "etch"):
			listapack = paquetesfiles(Filesetch,Packagesetch,namepack[0])
		elif (namepack[1] == "lenny"):
			listapack = paquetesfiles(Fileslenny,Packageslenny,namepack[0])				

		json = simplejson.dumps(listapack)
		return HttpResponse(json, mimetype='application/json')

def pielang(fich):
	t1=time.time()
	datos = []
	lenguajes = []
	lenguajes = fich.objects.values_list('language',flat=True)
	lenguajes = list(set(lenguajes))

	for lenguaje in lenguajes:
			aux = []
			objsleng = fich.objects.filter(language=lenguaje)
			numsloc=numerosloc(objsleng)
			aux.append(lenguaje)
			aux.append(numsloc)
			datos.append(aux)
	datos.sort(key=lambda x:x[1] )
	datos.reverse()
	print("El tiempo total GRAFICA PIELANG")
	print(time.time() - t1)
	return datos

# Calcular Graficas
def graficas(request):
	if request.method == u'GET':
		data=[]
		namepack = request.GET[u'namepack']
		namepack = namepack.split('_')
		if (namepack[0] == "ghamm"):
			namepackbbdd= Packageshamm;
			namefilesbbdd=Fileshamm;
		elif(namepack[0] == "gslink"):
			namepackbbdd= Packagesslink;
			namefilesbbdd=Filesslink;	
		elif(namepack[0] == "gpotato"):
			namepackbbdd= Packagespotato;
			namefilesbbdd=Filespotato;	
		elif(namepack[0] == "gwoody"):
			namepackbbdd= Packageswoody;
			namefilesbbdd=Fileswoody;	
		elif(namepack[0] == "gsarge"):
			namepackbbdd= Packagessarge;
			namefilesbbdd=Filessarge;
		elif(namepack[0] == "getch"):
			namepackbbdd= Packagesetch;
			namefilesbbdd=Filesetch;	
		elif(namepack[0] == "glenny"):
			namepackbbdd= Packageslenny;
			namefilesbbdd=Fileslenny;
		elif (namepack[0]== "hammhist"):
			files = Fileshamm.objects.filter(language=namepack[1])
			for i in files:
				data.append(i.sloc)
		elif (namepack[0]== "slinkhist"):
			files = Filesslink.objects.filter(language=namepack[1])
			for i in files:
				data.append(i.sloc)
		elif (namepack[0]== "potatohist"):
			files = Filespotato.objects.filter(language=namepack[1])
			for i in files:
				data.append(i.sloc)
		elif (namepack[0]== "woodyhist"):
			files = Fileswoody.objects.filter(language=namepack[1])
			for i in files:
				data.append(i.sloc)
		elif (namepack[0]== "sargehist"):
			files = Filessarge.objects.filter(language=namepack[1])
			for i in files:
				data.append(i.sloc)
		elif (namepack[0]== "etchhist"):
			files = Filesetch.objects.filter(language=namepack[1])
			for i in files:
				data.append(i.sloc)
		elif (namepack[0]== "lennyhist"):
			files = Fileslenny.objects.filter(language=namepack[1])
			for i in files:
				data.append(i.sloc)

		if (namepack[1] == "packsloc"):
			data = list(namepackbbdd.objects.values_list('slocs', flat=True))
		elif (namepack[1] == "filespack"):
			data = list(namepackbbdd.objects.values_list('files', flat=True))
		elif (namepack[1] == "slocfile"):
			listaobj = busquedaobjs(namefilesbbdd,namepackbbdd)
			for i in listaobj[1]:
				if (i.files != 0):
					data.append(i.slocs/i.files)
		elif (namepack[1] == "langsloc"):
			valor = cache.get(namepack[1] + '_graphpie_' + namepack[0])
			if (not valor):	
				data = pielang(namefilesbbdd)
				cache.set(namepack[1] + '_graphpie_' + namepack[0], data,None)
			else:
				data = valor	
		elif (namepack[1] == "packsize"):
			data = list(namepackbbdd.objects.values_list('slocs', flat=True))
		elif (namepack[1] == "packsizelog"):
			data = list(namepackbbdd.objects.values_list('slocs', flat=True))
		elif (namepack[1] == "numlangpack"):
			valor = cache.get(namepack[1] + '_graphlang_' + namepack[0])
			if (not valor):	
				packs = namepackbbdd.objects.all()
				for pack in packs:
					listapack = paquetesname(namefilesbbdd,namepackbbdd,pack.name)
					data.append(len(listapack))

				cache.set(namepack[1] + '_graphlang_' + namepack[0], data,None)
			else:
				data = valor		
		elif (namepack[1] == "numfilepack"):
			valor = cache.get(namepack[1] + '_graphfilepack_' + namepack[0])
			if (not valor):
				packs = namepackbbdd.objects.all()
				for pack in packs:
					listapack = paquetesfiles(namefilesbbdd,namepackbbdd,pack.name)
					data.append(len(listapack))

				cache.set(namepack[1] + '_graphlang_' + namepack[0], data,None)
			else:
				data = valor	

		#hist(data,listaobj[1].count(), color='blue')
		#savefig('static/histhamm.png')
		#show()
		json = simplejson.dumps(data)
		return HttpResponse(json, mimetype='application/json')

