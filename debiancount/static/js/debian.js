 $(function() {
	$( "#accordion" ).accordion({collapsible: true});
	$( "#tabs" ).tabs();
	$( "#hamm" ).tabs();
	$( "#slink" ).tabs();
	$( "#potato" ).tabs();
	$( "#woody" ).tabs();
	$( "#sarge" ).tabs();
	$( "#etch" ).tabs();
	$( "#lenny" ).tabs();
 	$( document ).tooltip();
 	$( "button:first" ).button({
		icons: {
			primary: "ui-icon-search"
		},
		text: false
	})

	 $( "#search_pack" ).autocomplete({

		source: function( request, response ) {
		 	var namevs = $(".cabecera").text();
		 	var namevs = namevs.split("(");
			$.ajax({
				url: "/searchpack",
				type:'GET',
				data: {
					"namepack": request.term + "_" + namevs[1]
				},
				success: function( data ) {
					response( data );
				}
			});
		},
		minLength: 2,
		select: function( event, ui ) {	
		 	var namevs = $(".cabecera").text();
		 	var namevs = namevs.split("(");
		 	var namevs = namevs[1].split(")");
		 	var namepack = 	ui.item.label + "_" + namevs[0].toLowerCase();
			requestpackname = ajaxpackname(namepack);
		},
		open: function() {
			$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
		},
		close: function() {
			$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
		}
	});


//Cargamos los paquetes con una llamada AJAX.
function ajaxpacks(namepack){
						var name = namepack.split("_");
						var request = $.ajax({
								type:'GET',
								data:{"namepack":namepack},
								beforeSend: function(){
									$("#Principal").html("")
									$("#Principal").addClass("loading");
								},
								success: function(json) {
									paquetes(json,name[1],"name");
								},
								complete: function() {
									$("#Principal").removeClass("loading");
								},
								url: "/paqueteshamm"
						});
		return request;
}

function cargaefecto(ident,direccion){
	$(ident).slideUp('5000','easeInOutSine', function(){
    	$( ident ).load( direccion, function(){
    		$(ident).slideDown('5000','easeInOutSine');
    	});
	});
}
// Cargamos con AJAX las paginas alojadas en static/html
			//Cargamos paginas index.
			$("#Index").click(function() {
				$(".cabecera").html("Debian Counting");
				cargaefecto("#Principal","/estatico/html/index/index.html");
			});
			$("#indexhamm").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.0 (Hamm)");
				cargaefecto("#Principal" ,"/estatico/html/index/indexhamm.html" );
 		  });
			$("#indexslink").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.1 (Slink)");
				cargaefecto( "#Principal","/estatico/html/index/indexslink.html" );
 		  });
			$("#indexpotato").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.2 (Potato)");
				cargaefecto( "#Principal" ,"/estatico/html/index/indexpotato.html" );
 		  });
			$("#indexwoody").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.0 (Woody)");
				cargaefecto( "#Principal" , "/estatico/html/index/indexwoody.html" );
 		  });
			$("#indexsarge").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.1 (Sarge)");
				cargaefecto( "#Principal" , "/estatico/html/index/indexsarge.html" );
 		  });
			$("#indexetch").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 4.0 (Etch)");
				cargaefecto( "#Principal" , "/estatico/html/index/indexetch.html" );
 		  });
			$("#indexlenny").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 5.0 (Lenny)");
				cargaefecto( "#Principal" , "/estatico/html/index/indexlenny.html" );
 		  });

			//Cargamos paginas about.
			$("#abouthamm").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.0 (Hamm)");
				cargaefecto( "#Principal" , "/estatico/html/about/abouthamm.html" );
 		  });
			$("#aboutslink").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.1 (Slink)");
				cargaefecto( "#Principal","/estatico/html/about/aboutslink.html" );
 		  });
			$("#aboutpotato").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.2 (Potato)");
				cargaefecto( "#Principal" ,"/estatico/html/about/aboutpotato.html" );
 		  });
			$("#aboutwoody").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.0 (Woody)");
				cargaefecto( "#Principal" , "/estatico/html/about/aboutwoody.html" );
 		  });
			$("#aboutsarge").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.1 (Sarge)");
				cargaefecto( "#Principal" , "/estatico/html/about/aboutsarge.html" );
 		  });
			$("#aboutetch").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 4.0 (Etch)");
				cargaefecto( "#Principal" , "/estatico/html/about/aboutetch.html" );
 		  });
			$("#aboutlenny").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 5.0 (Lenny)");
				cargaefecto( "#Principal" , "/estatico/html/about/aboutlenny.html" );
 		  });


			//Cargamos paginas packages.
			$("#packages_hamm").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.0 (Hamm)");
				//$( "#Principal" ).load( "/estatico/html/paquetes/paqueteshamm.html" );
				var namepack = this.id;
				requestpack = ajaxpacks(namepack);
				
 		  });

			$("#packages_slink").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.1 (Slink)");
				//$( "#Principal" ).load( "/estatico/html/paquetes/paquetesslink.html" );
				var namepack = this.id;
				requestpack = ajaxpacks(namepack);
 		  });
			$("#packages_potato").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.2 (Potato)");
				//$( "#Principal" ).load( "/estatico/html/paquetes/paquetespotato.html" );
				var namepack = this.id;
				requestpack = ajaxpacks(namepack);
 		  });
			$("#packages_woody").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.0 (Woody)");
				//$( "#Principal" ).load( "/estatico/html/paquetes/paqueteswoody.html" );
				var namepack = this.id;
				requestpack = ajaxpacks(namepack);
 		  });
			$("#packages_sarge").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.1 (Sarge)");
				//$( "#Principal" ).load( "/estatico/html/paquetes/paquetessarge.html" );
				var namepack = this.id;
				requestpack = ajaxpacks(namepack);
 		  });
			$("#packages_etch").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 4.0 (Etch)");
				//$( "#Principal" ).load( "/estatico/html/paquetes/paquetesetch.html" );
				var namepack = this.id;
				requestpack = ajaxpacks(namepack);
 		  });
			$("#packages_lenny").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 5.0 (Lenny)");
				//$( "#Principal" ).load( "/estatico/html/paquetes/paqueteslenny.html" );
				var namepack = this.id;
				requestpack = ajaxpacks(namepack);
 		  });

			//Cargamos paginas graphs.
			$("#graphs_hamm").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.0 (Hamm)");
				cargaefecto( "#Principal", "/estatico/html/graphs/graphshamm.html" );
 		  });
			$("#graphs_slink").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.1 (Slink)");
				cargaefecto( "#Principal" ,"/estatico/html/graphs/graphsslink.html" );
 		  });
			$("#graphs_potato").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.2 (Potato)");
				cargaefecto( "#Principal" , "/estatico/html/graphs/graphspotato.html" );
 		  });
			$("#graphs_woody").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.0 (Woody)");
				cargaefecto( "#Principal" , "/estatico/html/graphs/graphswoody.html" );
 		  });
			$("#graphs_sarge").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.1 (Sarge)");
				cargaefecto( "#Principal" , "/estatico/html/graphs/graphssarge.html" );
 		  });
			$("#graphs_etch").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 4.0 (Etch)");
				cargaefecto( "#Principal", "/estatico/html/graphs/graphsetch.html" );
 		  });
			$("#graphs_lenny").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 5.0 (Lenny)");
				cargaefecto( "#Principal" , "/estatico/html/graphs/graphslenny.html" );
 		  });

			//Cargamos paginas FAQ.
			$("#faqhamm").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.0 (Hamm)");
				cargaefecto( "#Principal" ,"/estatico/html/FAQhamm.html" );
 		  });

			//Cargamos paginas credits.
			$(".creditsP").click(function() {
				if($(this).attr("id") == "creditshamm"){$(".cabecera").html("SLOCCount Web for Debian 2.0 (Hamm)");
																	cargaefecto( "#Principal" , "/estatico/html/credits/creditshamm.html" );}
				if($(this).attr("id") == "creditsslink"){$(".cabecera").html("SLOCCount Web for Debian 2.1 (Slink)");
																	cargaefecto( "#Principal" , "/estatico/html/credits/creditsslink.html" );}
				if($(this).attr("id") == "creditspotato"){$(".cabecera").html("SLOCCount Web for Debian 2.2 (Potato)");
																	cargaefecto( "#Principal" , "/estatico/html/credits/creditspotato.html" );}
				if($(this).attr("id") == "creditswoody"){$(".cabecera").html("SLOCCount Web for Debian 3.0 (Woody)");
																	cargaefecto( "#Principal" , "/estatico/html/credits/creditswoody.html" );}
				if($(this).attr("id") == "creditssarge"){$(".cabecera").html("SLOCCount Web for Debian 3.1 (Sarge)");
																	cargaefecto( "#Principal" , "/estatico/html/credits/creditssarge.html" );}
				if($(this).attr("id") == "creditsetch"){$(".cabecera").html("SLOCCount Web for Debian 4.0 (Etch)");
																	cargaefecto( "#Principal" , "/estatico/html/credits/creditsetch.html" );}
				if($(this).attr("id") == "creditslenny"){$(".cabecera").html("SLOCCount Web for Debian 5.0 (Lenny)");
																	cargaefecto( "#Principal" , "/estatico/html/credits/creditslenny.html" );}
				
 		  });


// Lista de paquetes
function ordenarpor(array,orden){
	if (orden == "name" || orden == "version" || orden == "language" || orden == "filename"){
	    return array.sort(function(a, b) {
	        var x = a[orden]; var y = b[orden];
	        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
	    });
	}else{
	    return array.sort(function(a, b) {
	        var x = a[orden]; var y = b[orden];
	        return ((y < x) ? -1 : ((y > x) ? 1 : 0));
	    });
	}
};

function paquetes(json,nombre,orden){
	var sumasloc = 0;
	var sumafiles = 0;
	var sumaperson = 0;
  var sumamonthst = 0;
  var sumadev = 0;
	var sumacoste = 0;
	var totslocdivpack = 0;
	var html = '<div class="apartado"><div class="tablas"><div id="packs-hamm" class="packs"><b>Packages</b></div></div><table class="'+ nombre +'" align="center"><tbody class="pack"><tr class="tablas"><td width="12%" align="center" valign="top">#</td><td class="orden" width="12%" align="center" valign="top" title="Order by Nombre">Name</td><td class="orden" width="12%" align="center" valign="top" title="Order by Version">Version</td><td class="orden" width="12%" align="center" valign="top" title="Order by SLOCs">SLOCs</td><td class="orden" width="12%" align="center" valign="top" title="Order by Files">Files</td><td width="12%" align="center" valign="top">SLOCs/file</td><td width="12%" align="center" valign="top">Person - months</td><td width="12%" align="center" valign="top">Schedule (months)</td><td width="12%" align="center" valign="top">Avg. developers</td><td width="12%" align="center" valign="top">Cost Estimation</td></tr>';
		/*json.sort(function (a, b){
		    return (b.name - a.name)
		})*/
		json = ordenarpor(json,orden);
		for (i=0;i<json.length;i++){
			var j = i+1;		
			var cont = '<tr><td width="10%" align="center" valign="top"> ' + j +'</td>';
			var name = '<td width="12%" id ="'+json[i].name +'_'+ nombre +'" class="packname" align="center" valign="top"> ' + json[i].name +'</td>';
			var version = '<td width="12%" align="center" valign="top">'+ json[i].version +' </td>';
			var slocs = '<td width="12%" align="center" valign="top">'+ json[i].slocs +'</td>';	
			var sumasloc = sumasloc + json[i].slocs;
			var files = '<td width="12%" id ="'+json[i].name +'_'+ nombre +'" class="packfiles" align="center" valign="top">'+ json[i].files +'</td>';
			var sumafiles = sumafiles + json[i].files;
			var slocdivpack = '<td width="12%" align="center" valign="top">'+ json[i].slocdivpack +'</td>';	
			var personmonth = '<td width="12%" align="center" valign="top">'+ json[i].personmonth +'</td>';	
			var sumaperson = sumaperson + json[i].personmonth;
			var monthstim = '<td width="12%" align="center" valign="top">'+ json[i].monthstimate +'</td>';	
			var sumamonthst = sumamonthst + json[i].monthstimate;
			var developers = '<td width="12%" align="center" valign="top">'+ json[i].developers +'</td>';
			var sumadev = sumadev + json[i].developers;
			var coste = '<td width="12%" align="center" valign="top">'+ json[i].coste +'</td></tr>';
			var sumacoste = sumacoste + json[i].coste;
			var aux = cont + name + version + slocs + files + slocdivpack + personmonth + monthstim + developers + coste;
			var html = html + aux;
		}
		var totslocdivpack = sumasloc / sumafiles;
		var cont = '<tr><td width="10%" align="center" valign="top"></td>';
		var name = '<td width="12%" align="center" valign="top"> Total </td>';
		var version = '<td width="12%" align="center" valign="top"> </td>';
		var slocs = '<td width="12%" align="center" valign="top">'+ sumasloc +'</td>';	
		var files = '<td width="12%" align="center" valign="top">'+ sumafiles +'</td>';		
		var slocdivpack = '<td width="12%" align="center" valign="top">'+ Math.round(totslocdivpack * 1000) / 1000 +'</td>';	
		var personmonth = '<td width="12%" align="center" valign="top">'+ Math.round(sumaperson * 1000) / 1000 +'</td>';	
		var monthstim = '<td width="12%" align="center" valign="top">'+ Math.round(sumamonthst * 1000) / 1000 +'</td>';	
		var developers = '<td width="12%" align="center" valign="top">'+ Math.round(sumadev * 1000) / 1000 +'</td>';
		var coste = '<td width="12%" align="center" valign="top">'+ sumacoste +'</td></tr>';
		var aux = cont + name + version + slocs + files + slocdivpack + personmonth + monthstim + developers + coste;
		var html = html + aux;
		html = html + '</tbody></table></div>';

    $("#Principal").html(html);
}
			
	$(document).on('click', '.orden', function(){ 
		nombre= this.parentNode.parentNode.parentNode.className;
		tipopack = this.parentNode.parentNode.className;
		orden = this.innerHTML.toLowerCase();
		if (tipopack == "pack"){
			paquetes(JSON.parse(requestpack.responseText),nombre,orden);
		}else if (tipopack == "packnombre"){
			namepack= this.parentNode.parentNode.parentNode.parentNode.className;	
			packnombre(JSON.parse(requestpackname.responseText),namepack,nombre,orden);
		}else if (tipopack == "packfichero"){
			namepack= this.parentNode.parentNode.parentNode.parentNode.className;
			packfiles(JSON.parse(requestpackfiles.responseText),namepack,nombre,orden);
		}
	});
/*
		$(document).on('click', '.packs', function(){ 
				var namepack = this.id;
				var name = namepack.split("-");
				$("#pack"+name[1]).slideToggle("slow", function(){
					if (requestpack.status != 200){$("#pack"+name[1]).addClass("loading");}
				});
		});

*/
//tablas de paquetes pinchando nombres.
function packnombre(json,namepack,nombre,orden){
		var html = '<div class="apartado"><div class="tablas">Package '+ namepack +'</div><div class="'+ namepack +'"><table class="'+ nombre +'" width="98%" align="center"><tbody class="packnombre"><tr class = "tablas"><td width="10%" align="center" valign="top">#</td><td class="orden" width="15%" title="Order by Language" align="center" valign="top">Language</td><td class="orden" width="15%" title="Order by SLOCs" align="center" valign="top">SLOCs</td><td width="15%" align="center" valign="top">%SLOCs</td><td class="orden" title="Order by Files" width="15%" align="center" valign="top">Files</td><td width="15%" align="center" valign="top">%Files</td><td width="15%" align="center" valign="top">SLOCs/Files</td></tr>';
		var sumasloc= 0;var sumaporsloc= 0;var sumapack= 0;var sumaporpack= 0;var sumafiles= 0;var sumaporfiles= 0;var sumaslocdivfil = 0;
		cocomo = json.pop();
		json = ordenarpor(json,orden);
		for (i=0;i<json.length;i++){
			var j = i+1;		
			var cont = '<tr><td width="10%" align="center" valign="top"> ' + j +'</td>';
			var leng = '<td width="15%" align="center" valign="top"> ' + json[i].language +'</td>';
			var sloc = '<td width="15%" align="center" valign="top">'+ json[i].slocs +' </td>';
			var sumasloc = sumasloc + json[i].slocs;
			var porsloc = '<td width="15%" align="center" valign="top">'+ json[i].numporsloc +'%</td>';	
			var sumaporsloc = sumaporsloc + json[i].numporsloc;
			var files = '<td width="15%" align="center" valign="top">'+ json[i].files +'</td>';	
			var sumafiles = sumafiles + json[i].files;
			var porfiles = '<td width="15%" align="center" valign="top">'+ json[i].numporfiles +'%</td>';	
			var sumaporfiles = sumaporfiles + json[i].numporfiles;
			var sdivf = '<td width="15%" align="center" valign="top">'+ json[i].slocdivfil +'</td></tr>';
			var aux = cont + leng + sloc + porsloc + files + porfiles + sdivf;
			var html = html + aux;
		}
		var sumaslocdivfil = sumasloc / sumafiles;
		var cont = '<tr><td width="10%" align="center" valign="top"> </td>';
		var leng = '<td width="15%" align="center" valign="top"> Total </td>';
		var sloc = '<td width="15%" align="center" valign="top">'+ sumasloc +' </td>';
		var porsloc = '<td width="15%" align="center" valign="top">'+ Math.round(sumaporsloc) +'%</td>';	
		var files = '<td width="15%" align="center" valign="top">'+ sumafiles +'</td>';	
		var porfiles = '<td width="15%" align="center" valign="top">'+ Math.round(sumaporfiles) +'%</td>';	
		var sdivf = '<td width="15%" align="center" valign="top">'+ Math.round(sumaslocdivfil * 1000) / 1000 +'</td></tr>';
		var aux = cont + leng + sloc + porsloc + files + porfiles + sdivf;
		var html = html + aux;
	var com = '<tr><td class ="tablas" width="66%" valign="top">';
	var medio = '</td><td class ="tablas" width="34%" valign="top">';
	var final = '</td></tr>';	
	var htmlaux = '<div class="apartado"><div class="tablas">Estimations done with Basic COCOMO model (also known as COCOMO I)</div><div><table align="center" width="98%"><tbody>'+ com + 'Total Physical Source Lines of Code (SLOC)'+ medio +cocomo.numsloc + final + com + 'Development Effort Estimate, Person-Years (Person-Months)' + medio + cocomo.personyear + '('+cocomo.personmonth+')'+final+ '<tr><td class ="tablas" colspan = "2" align="center" valign="top">(Basic COCOMO model, Person-Months = 2.4 * (KSLOC**1.05))</td></tr>' + com + 'Schedule Estimate, Years (Months)'+ medio + cocomo.yearstimate + '(' + cocomo.monthstimate +')'+ '<tr><td class ="tablas" colspan = "2" align="center" valign="top">(Basic COCOMO model, Months = 2.5 * (person-months**0.38))</td></tr>' + com + 'Estimated Average Number of Developers (Effort/Schedule)'+ medio + cocomo.developers+ final + com + 'Total Estimated Cost to Develop' + medio + cocomo.coste + '$'+ final + '<tr><td class ="tablas" colspan = "2" align="center" valign="top">(average salary = $56,286/year, overhead = 2.40))</td></tr><tr><td class ="tablas" colspan = "2" align="center" valign="top">(This numbers are computed as if it were a unique software project, not the union of independent projects) (It can be treated as the upper bound estimation. See FAQ for more details)</td></tr></tbody></table></div></div>';	
	var html = html+ '</tbody></table></div></div>' + htmlaux
 $("#dialog").html(html);
	$("#dialog").dialog({
			title: "Package: "+namepack,
			autoOpen: false,
			show: {
				effect:"slide",
				duration: 1000
			},
			hide: {
				effect: "slide",
				duration: 1000
			},
			modal: true,
			width: 900,
			heigth: 600,

	}).dialog("open");
}
		$(document).on('click', '.packname', function(){ 
				var namepack = this.id;
				requestpackname = ajaxpackname(namepack);

		});

function ajaxpackname(namepack){
		var name = namepack.split("_");
		request = $.ajax({
			type:'GET',
			data:{"namepack":namepack},
			beforeSend: function(){
				$("#cargando").addClass("loading");
			},
			success: function(json) {
				packnombre(json,name[0],name[1],"slocs");					
			},
			complete: function() {
				$("#cargando").removeClass("loading");
			},
			url: "/tablapackname"
		});
		return request;
}

//Tablas de paquetes pinchando files.
function packfiles(json,namepack,nombre,orden){
	json = ordenarpor(json,orden);
  	var sumasloc = 0;
	var html = '<div class="apartado"><div class="tablas">Package: '+ namepack +'</div><div class="'+ namepack +'"><table class="'+ nombre +'" width="98%" align="center"><tbody class="packfichero"><tr class="tablas"><td width="12%" align="center" valign="top">Rank</td><td class="orden" width="12%" title="Order by Nombre" align="center" valign="top">Filename</td><td class="orden" width="12%" title="Order by Language" align="center" valign="top">Language</td><td class="orden" width="12%" title="Order by SLOCs" align="center" valign="top">SLOCs</td></tr>';

	for (i=0;i<json.length;i++){
			var j = i+1;		
			var cont = '<tr><td width="10%" align="center" valign="top"> ' + j +'</td>';
			var name = '<td width="15%" align="center" valign="top"> ' + json[i].filename +'</td>';
			var leng = '<td width="15%" align="center" valign="top"> ' + json[i].language +'</td>';
			var sloc = '<td width="15%" align="center" valign="top">'+ json[i].slocs +' </td></tr>';
			var sumasloc = sumasloc + json[i].slocs
			var html = html + cont + name + leng + sloc;
	}
	var cont = '<tr><td width="10%" align="center" valign="top"> </td>';
	var name = '<td width="15%" align="center" valign="top"> Total </td>';
	var leng = '<td width="15%" align="center" valign="top"> </td>';
	var sloc = '<td width="15%" align="center" valign="top">'+ sumasloc +' </td></tr>';
	var html = html + cont + name + leng + sloc;
	var html = html + '</tbody></table></div></div>'
	$("#dialog").html(html);
	$("#dialog").dialog({
			title: "Package: "+namepack,
			autoOpen: false,
			show: {
				effect:"slide",
				duration: 1000
			},
			hide: {
				effect: "slide",
				duration: 1000
			},
			modal: true,
			width: 900,
			heigth: 600,
			maxWidth: 900,
		  maxHeight: 900,
	}).dialog("open");
}
function ajaxpackfiles(namepack){
		var name = namepack.split("_");
			
		request= $.ajax({
			type:'GET',
			data:{"namepack":namepack},
			beforeSend: function(){
				$("#cargando").addClass("loading");
			},
			success: function(json) {
				packfiles(json,name[0],name[1],"numsloc");			
			},
			complete: function() {
				$("#cargando").removeClass("loading");
			},
			url: "/tablapackfiles"
		});
		return request;
}
		$(document).on('click', '.packfiles', function(){ 
			var namepack = this.id;
			requestpackfiles=ajaxpackfiles(namepack)
		});


});


