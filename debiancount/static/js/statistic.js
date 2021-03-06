$(document).ready(function() {


//Llamadas AJAX.

function ajaxtablastat(namepack){
				
				var name = namepack.split("_");
				var request = $.ajax({
								type:'GET',
								data:{"namepack":namepack},
								beforeSend: function(){
									$("#tabla"+name[1]).addClass("loading");
								},
								success: function(json) {
									tablastatic(json,name[1]);
								},
								complete: function() {
									$("#tabla"+name[1]).removeClass("loading");
								},
								url: "/staticshamm"
						});
				return request;
}

function ajaxmacrostat(namepack){
				var name = namepack.split("_");
				var request = $.ajax({
								type:'GET',
								data:{"namepack":namepack},
								beforeSend: function(){
									$("#tablamacro"+name[1]).addClass("loading");
								},
								success: function(json) {
									macrostatics(json,name[1]);
								},
								complete: function() {
									$("#tablamacro"+name[1]).removeClass("loading");
								},
								url: "/macrostaticshamm"
				});
				return request;
}

function ajaxcocomostat(namepack){
						var name = namepack.split("_");
						var request = $.ajax({
								type:'GET',
								data:{"namepack":namepack},
								beforeSend: function(){
									$("#tablacocomo"+name[1]).addClass("loading");
								},
								success: function(json) {
									tablacocomo(json,name[1]);
								},
								complete: function() {
									$("#tablacocomo"+name[1]).removeClass("loading");
								},
								url: "/cocomohamm"
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
			//Cargamos paginas statics.

			$("#statics_hamm").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.0 (Hamm)");
				//cargaefecto( "#Principal" , "/estatico/html/statics/staticshamm.html" );
				$( "#Principal").load("/estatico/html/statics/staticshamm.html")
				var namepack = this.id;
				requestmacro = ajaxmacrostat(namepack);
				requestlang = ajaxtablastat(namepack);
				requestcocomo = ajaxcocomostat(namepack);
 		  });
			$("#statics_slink").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.1 (Slink)");
				//cargaefecto( "#Principal","/estatico/html/statics/staticsslink.html" );
				$( "#Principal").load("/estatico/html/statics/staticsslink.html" )
				var namepack = this.id;
				requestmacro = ajaxmacrostat(namepack);
				requestlang = ajaxtablastat(namepack);
				requestcocomo = ajaxcocomostat(namepack);
 		  });
			$("#statics_potato").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 2.2 (Potato)");
				//cargaefecto( "#Principal", "/estatico/html/statics/staticspotato.html" );
				$( "#Principal").load("/estatico/html/statics/staticspotato.html" )
				var namepack = this.id;
				requestmacro = ajaxmacrostat(namepack);
				requestlang = ajaxtablastat(namepack);
				requestcocomo = ajaxcocomostat(namepack);
 		  });
			$("#statics_woody").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.0 (Woody)");
				//cargaefecto( "#Principal" , "/estatico/html/statics/staticswoody.html" );
				$( "#Principal").load("/estatico/html/statics/staticswoody.html" )
				var namepack = this.id;
				requestmacro = ajaxmacrostat(namepack);
				requestlang = ajaxtablastat(namepack);
				requestcocomo = ajaxcocomostat(namepack);
 		  });
			$("#statics_sarge").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 3.1 (Sarge)");
				//cargaefecto( "#Principal" , "/estatico/html/statics/staticssarge.html" );
				$( "#Principal").load("/estatico/html/statics/staticssarge.html" )
				var namepack = this.id;
				requestmacro = ajaxmacrostat(namepack);
				requestlang = ajaxtablastat(namepack);
				requestcocomo = ajaxcocomostat(namepack);
 		  });
			$("#statics_etch").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 4.0 (Etch)");
				//cargaefecto( "#Principal" , "/estatico/html/statics/staticsetch.html" );
				$( "#Principal").load("/estatico/html/statics/staticsetch.html" )
				var namepack = this.id;
				requestmacro = ajaxmacrostat(namepack);
				requestlang = ajaxtablastat(namepack);
				requestcocomo = ajaxcocomostat(namepack);
 		  });
			$("#statics_lenny").click(function() {
				$(".cabecera").html("SLOCCount Web for Debian 5.0 (Lenny)");
				//cargaefecto( "#Principal" ,"/estatico/html/statics/staticslenny.html" );
				$( "#Principal").load("/estatico/html/statics/staticslenny.html" )
				var namepack = this.id;
				requestmacro = ajaxmacrostat(namepack);
				requestlang = ajaxtablastat(namepack);
				requestcocomo = ajaxcocomostat(namepack);
 		  });

//Tabla static de la version hamm.
function tablastatic(json, nombre){
		var html = '<table align="center"><tbody><tr class = "tablas"><td width="10%" align="center" valign="top">#</td><td width="12%" align="center" valign="top">Language</td><td width="12%" align="center" valign="top">SLOC</td><td width="12%" align="center" valign="top">%SLOC</td><td width="12%" align="center" valign="top">Packages</td><td width="12%" align="center" valign="top">%Packages</td><td width="12%" align="center" valign="top">Files</td><td width="12%" align="center" valign="top">%Files</td><td width="12%" align="center" valign="top">SLOC/Files</td></tr>';
		var sumasloc= 0;var sumaporsloc= 0;var sumapack= 0;var sumaporpack= 0;var sumafiles= 0;var sumaporfiles= 0;var sumaslocdivfil = 0;
		json.sort(function (a, b){
		    return (b.numsloc - a.numsloc)
		})
		for (i=0;i<json.length;i++){
			var j = i+1;		
			var cont = '<tr><td width="10%" align="center" valign="top"> ' + j +'</td>';
			var leng = '<td width="12%" align="center" valign="top"> ' + json[i].lenguaje +'</td>';
			var sloc = '<td width="12%" align="center" valign="top">'+ json[i].numsloc +' </td>';
			var sumasloc = sumasloc + json[i].numsloc;
			var porsloc = '<td width="12%" align="center" valign="top">'+ json[i].numporsloc +'%</td>';	
			var sumaporsloc = sumaporsloc + json[i].numporsloc;
			var pack = '<td width="12%" align="center" valign="top">'+ json[i].npack +'</td>';
			var sumapack = sumapack + json[i].npack;	
			var porpack = '<td width="12%" align="center" valign="top">'+ json[i].nporpack +'%</td>';	
			var sumaporpack = sumaporpack + json[i].nporpack;
			var files = '<td width="12%" align="center" valign="top">'+ json[i].numfiles +'</td>';	
			var sumafiles = sumafiles + json[i].numfiles;
			var porfiles = '<td width="12%" align="center" valign="top">'+ json[i].numporfiles +'%</td>';	
			var sumaporfiles = sumaporfiles + json[i].numporfiles;
			var sdivf = '<td width="12%" align="center" valign="top">'+ json[i].slocdivfil +'</td></tr>';
			var aux = cont + leng + sloc + porsloc + pack + porpack + files + porfiles + sdivf;
			var html = html + aux;
		}
		var sumaslocdivfil = sumasloc / sumafiles;
			var cont = '<tr><td width="10%" align="center" valign="top"> </td>';
			var leng = '<td width="12%" align="center" valign="top"> Total </td>';
			var sloc = '<td width="12%" align="center" valign="top">'+ sumasloc +' </td>';
			var porsloc = '<td width="12%" align="center" valign="top">'+  Math.round(sumaporsloc * 100) / 100  +'%</td>';	
			var pack = '<td width="12%" align="center" valign="top">'+ sumapack +'</td>';	
			var porpack = '<td width="12%" align="center" valign="top">'+ Math.round(sumaporpack * 1000) / 1000  +'%</td>';	
			var files = '<td width="12%" align="center" valign="top">'+ sumafiles +'</td>';	
			var porfiles = '<td width="12%" align="center" valign="top">'+ Math.round(sumaporfiles * 100) / 100 +'%</td>';	
			var sdivf = '<td width="12%" align="center" valign="top">'+ Math.round(sumaslocdivfil * 100) / 100 +'</td></tr>';
			var aux = cont + leng + sloc + porsloc + pack + porpack + files + porfiles + sdivf;
			var html = html + aux;
		html = html + '</tbody></table>';
    $("#tabla"+nombre).html(html);
}

		$(document).on('click', '.tablastat', function(){ 
				var namepack = this.id;
				var name = namepack.split("_");
				$("#tabla"+name[1]).slideToggle("slow",function(){
				if (requestlang.status != 200){$("#tabla"+name[1]).addClass("loading");}});
		});



//Tabla macrostatics
function macrostatics(json,nombre){
		var html = '<table align="center" width="98%"><tbody>';
		var aux = 'Numbers of ';
		for (i=0;i<json.length;i++){
			if (i>2){aux = 'Mean numbers of '}
			var name = '<tr><td width="66%" valign="top">' + aux + json[i].name + '</td>';	
			var num = '<td width="34%" valign="top">' + json[i].num + '</td></tr>';
			var html = html + name + num;															
		}
		var html = html + '</tbody></table>';
		$("#tablamacro"+nombre).html(html);
}

		$(document).on('click', '.macro', function(){ 
				var namepack = this.id;
				var name = namepack.split("_");
				$("#tablamacro"+name[1]).slideToggle("slow", function(){
					if (requestmacro.status != 200){$("#tablamacro"+name[1]).addClass("loading");}
				});
		});



//Tabla cocomo
function tablacocomo(json,nombre){

	var com = '<tr><td class ="tablas" width="66%" valign="top">';
	var medio = '</td><td class ="tablas" width="34%" valign="top">';
	var final = '</td></tr>';	
	var html = '<table align="center" width="98%"><tbody>'+ com + 'Total Physical Source Lines of Code (SLOC)'+ medio +json.numsloc + final + com + 'Development Effort Estimate, Person-Years (Person-Months)' + medio + json.personyear + '('+json.personmonth+')'+final+ '<tr><td class ="tablas" colspan = "2" align="center" valign="top">(Basic COCOMO model, Person-Months = 2.4 * (KSLOC**1.05))</td></tr>' + com + 'Schedule Estimate, Years (Months)'+ medio + json.yearstimate + '(' + json.monthstimate +')'+ '<tr><td class ="tablas" colspan = "2" align="center" valign="top">(Basic COCOMO model, Months = 2.5 * (person-months**0.38))</td></tr>' + com + 'Estimated Average Number of Developers (Effort/Schedule)'+ medio + json.developers+ final + com + 'Total Estimated Cost to Develop' + medio + json.coste + '$'+ final + '<tr><td class ="tablas" colspan = "2" align="center" valign="top">(average salary = $56,286/year, overhead = 2.40))</td></tr><tr><td class ="tablas" colspan = "2" align="center" valign="top">(This numbers are computed as if it were a unique software project, not the union of independent projects) (It can be treated as the upper bound estimation. See FAQ for more details)</td></tr></tbody></table>';	

		$("#tablacocomo"+nombre).html(html);	
}

		$(document).on('click', '.cocomo', function(){ 
				var namepack = this.id;
				var name = namepack.split("_");
				$("#tablacocomo"+name[1]).slideToggle("slow", function(){
					if (requestcocomo.status != 200){$("#tablacocomo"+name[1]).addClass("loading");}
				});
		});
});
