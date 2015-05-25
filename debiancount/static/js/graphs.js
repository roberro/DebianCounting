$(document).ready(function() {

function grafica(json,muestras,nombrehist,titulox){

json.sort(function(a,b){return a - b})
var counts = {};
var count = [];
var datos = [];
json.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
var i = 0;
var cuenta = 0;

for (var key in counts){
		count.push(key);
		datos.push(counts[key]);

}
tickintervalo=datos[0]/20;
crearhist(count,datos,tickintervalo,nombrehist,titulox);
}

function graficas(json,muestras,nombrehist,titulox){
/*
	var counts = [];
	var count = json.filter(function(x){return x<100000}).length;
	counts.push(count);
	var count = json.filter(function(x){return (x<200000 && x>100000)}).length;
	counts.push(count);
	var count = json.filter(function(x){return (x<300000 && x>200000)}).length;
	counts.push(count);
	var count = json.filter(function(x){return (x<600000 && x>400000)}).length;
	counts.push(count);
	var count = json.filter(function(x){return (x<800000 && x>600000)}).length;
	counts.push(count);
	var count = json.filter(function(x){return (x<1200000 && x>800000)}).length;
	counts.push(count);
	console.log(counts);
*/
json.sort(function(a,b){return a - b})
var counts = {};
var count = [];
var datos = [];
json.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
var i = 0;
var cuenta = 0;
var ultimokey = 0;
for (var key in counts){
	var cuenta = cuenta + counts[key];
	if (i == muestras ){
		count.push(">"+ultimokey+"=<"+key);
		var ultimokey = key;
		datos.push(cuenta);
		cuenta= 0;
		i=0;
	}
	i++;
}
count.push(">"+ultimokey+"=<"+key);
datos.push(cuenta);
console.log(key);
tickintervalo=datos[0]/20;
crearhist(count,datos,tickintervalo,nombrehist,titulox);
}

function graficas2(json,muestras,nombrehist,titulox,log){

json.sort(function(a,b){return a - b})

var counts = {};
var count = [];
var datos = [];
json.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
var i = 1;
var cuenta = 0;
var ultimokey = 0;
muestras = json[json.length-1]/20;
console.log(muestras);
for (var key in counts){
	var cuenta = cuenta + counts[key];
	if (key >= i*muestras ){
		count.push(">"+ultimokey+"=<"+key);
		var ultimokey = key;
		datos.push(cuenta);
		cuenta= 0;
		i++;
	}
	
}
count.push(">"+ultimokey+"=<"+key);
datos.push(cuenta);
console.log(key);
tickintervalo=datos[0]/20;
if (log==1){crearhist(count,datos,undefined,nombrehist,titulox,"logarithmic");}
else{crearhist(count,datos,tickintervalo,nombrehist,titulox);}
}

function crearhist(datosejex,datosejey,tickintervalo,nombrehist,titulox,logar){
var chart = new Highcharts.Chart({
chart: {
        renderTo:'showgraphs',
        defaultSeriesType:'column',
        borderWidth:0,
        backgroundColor:'rgb(162,255,150)',
        borderWidth:1,
        borderColor:'rgb(29,253,0)',
        plotBackgroundColor:'#fff',
        plotBorderWidth:1,
        plotBorderColor:'#cce'
    },
    credits:{enabled:false},
    exporting:{enabled:false},
    title:{text:nombrehist},
    legend:{
        //enabled:false
    },
    tooltip:{
        borderWidth:1,
        formatter:function() {
            return '<b>Range:</b><br/> '+ this.x +'<br/>'+
            '<b>Count:</b> '+ this.y;
        }
    },
    plotOptions:{
        column:{
            shadow:false,
            borderWidth:.5,
            borderColor:'rgb(0,103,187)',
            pointPadding:0,
            groupPadding:0,
            color: 'rgba(44,160,255,.85)'
        }
    },
    xAxis:{
        categories: datosejex,
        labels:{
            rotation:-90,
            y:40,
            style: {
                fontSize:'12px',
                fontWeight:'normal',
                color:'rgb(0,0,0)'
            },
        },
        lineWidth:0,
        lineColor:'rgb(0,0,0)',
        tickLength:70,
        tickColor:'#ccc',
    },
    yAxis:{
        title:{text:'Ocurrences'},
        labels:{
            style: {
                fontSize:'12px',
                fontWeight:'normal',
                color:'rgb(0,0,0)'
            },
        },
				type: logar,
        //maxPadding:0,
        gridLineColor:'#e9e9e9',
        tickWidth:1,
        tickLength:3,
        tickColor:'#ccc',
        lineColor:'rgb(0,0,0)',
        tickInterval:tickintervalo,
        //endOnTick:false,
    },
    series: [{
        name: titulox,
        data: datosejey,
    }]
});

}
function crearpie(datos){
		var suma=0;
		var datosgraph=[];
		for (i=2;i<datos.length;i++){
			var suma =suma + datos[i][1];
		}
		for (i=0;i<=3;i++){
			datosgraph.push(datos[i]);
			if(i==3){datosgraph.push(["other",suma]);}			
		}

		// Build the chart
        $('#showgraphs').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Programming Languages'
            },
            tooltip: {
        	    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        color: '#000000',
                        connectorColor: '#000000',
                        format: '<b>{point.name}</b>: {point.percentage:.2f} %',
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Percentage sloc',
                data: datosgraph
            }]
        });

}

function graphcocomo(datos,titulo,subtitulo,titulox,tituloy){

    $('#showgraphs').highcharts({
            chart: {
                type: 'spline'
            },
            title: {
                text: titulo,
                x: -20 //center
            },
            subtitle: {
                text: subtitulo,
                x: -20
            },
            xAxis: {
                title: {
                    text: titulox
                },
                categories: [0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000]
            },
            yAxis: {
                title: {
                    text: tituloy
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{name:tituloy,
                    data:datos}]
        });
}

function datoscocomo(tipo){
    var datos=[];
    var ejex = [0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000];
    for (i = 0; i < ejex.length; i++) { 
        if (tipo == "1"){effort = 2.4 * (Math.pow((ejex[i]/1000),1.05));datos.push(effort)}
        else if (tipo == "2"){schedule = 3.5 * (Math.pow((ejex[i]/1000),0.399));datos.push(schedule)}
        else if (tipo == "3"){schedule = 3.5 * (Math.pow((ejex[i]),0.38));datos.push(schedule)}
        else if (tipo == "4"){effort = 2.4 * (Math.pow((ejex[i]/1000),1.05));
                            schedule = 3.5 * (Math.pow((ejex[i]/1000),0.399));
                            if(effort == 0){datos.push(0)}
                            else {datos.push(effort/schedule)}
                            }
        else if (tipo == "5"){effort = 2.4 * (Math.pow((ejex[i]/1000),1.05));
                            schedule = 3.5 * (Math.pow((ejex[i]/1000),0.399));datos.push(effort*schedule*4690.5)}
        else if (tipo == "1k"){effort = 2.4 * (Math.pow((ejex[i]),1.05));datos.push(effort)}
        else if (tipo == "2k"){schedule = 3.5 * (Math.pow((ejex[i]),0.399));datos.push(schedule)}
        else if (tipo == "3k"){schedule = 3.5 * (Math.pow((ejex[i]),0.38));datos.push(schedule)}
        else if (tipo == "4k"){effort = 2.4 * (Math.pow((ejex[i]),1.05));
                            schedule = 3.5 * (Math.pow((ejex[i]),0.399));
                            if(effort == 0){datos.push(0)}
                            else {datos.push(effort/schedule)}
                            }
        else if (tipo == "5k"){effort = 2.4 * (Math.pow((ejex[i]),1.05));
                            schedule = 3.5 * (Math.pow((ejex[i]),0.399));datos.push(effort*schedule*4690.5)}
        else if (tipo == "1M"){effort = 2.4 * (Math.pow((ejex[i]*1000),1.05));datos.push(effort)}
        else if (tipo == "2M"){schedule = 3.5 * (Math.pow((ejex[i]*1000),0.399));datos.push(schedule)}
        else if (tipo == "3M"){schedule = 3.5 * (Math.pow((ejex[i]),0.38));datos.push(schedule)}
        else if (tipo == "4M"){effort = 2.4 * (Math.pow((ejex[i]*1000),1.05));
                            schedule = 3.5 * (Math.pow((ejex[i]*1000),0.399));
                            if(effort == 0){datos.push(0)}
                            else {datos.push(effort/schedule)}
                            }
        else if (tipo == "5M"){effort = 2.4 * (Math.pow((ejex[i]*1000),1.05));
                            schedule = 3.5 * (Math.pow((ejex[i]*1000),0.399));datos.push(effort*schedule*4690.5)}
    }
    return datos;
}

$(document).on('click', '.graphs', function(){ 
	var namepack = this.id;
	var name = namepack.split("_");
	$("#showgraphs").fadeIn("slow", function(){
    datos = datoscocomo(name[1]);

    if (name[1] == "1"){graphcocomo(datos,"COCOMO effort curve","effort = 2.4 * (KSLOC**1.05)","Size <in SLOC>", "Effort <in man-months>");}
    else if (name[1] == "2"){graphcocomo(datos,"COCOMO effort curve <dependant on size>","COCOMO schedule estimation = 3.5 * (KSLOC**0.399)","Size <in SLOC>", "Schedule <in months>");}
    else if (name[1] == "3"){graphcocomo(datos,"COCOMO effort curve","COCOMO schedule estimation = 2.5 * (effort**0.38)","Size <in SLOC>", "Effort <in man-months>");}
    else if (name[1] == "4"){graphcocomo(datos,"COCOMO Average Developer Estimation curve","effort/schedule","Size <in SLOC>", "Average developers");}
    else if (name[1] == "5"){graphcocomo(datos,"COCOMO Cost Estimation curve","Cost = effort * schedule * Average developer salary","Size <in SLOC>", "Cost <in USD>");}
    else if (name[1] == "1k"){graphcocomo(datos,"COCOMO effort curve","effort = 2.4 * (KSLOC**1.05)","Size <in KSLOC>", "Effort <in man-months>");}
    else if (name[1] == "2k"){graphcocomo(datos,"COCOMO effort curve <dependant on size>","COCOMO schedule estimation = 3.5 * (KSLOC**0.399)","Size <in KSLOC>", "Schedule <in months>");}
    else if (name[1] == "3k"){graphcocomo(datos,"COCOMO effort curve","COCOMO schedule estimation = 2.5 * (effort**0.38)","Size <in KSLOC>", "Effort <in man-months>");}
    else if (name[1] == "4k"){graphcocomo(datos,"COCOMO Average Developer Estimation curve","effort/schedule","Size <in KSLOC>", "Average developers");}
    else if (name[1] == "5k"){graphcocomo(datos,"COCOMO Cost Estimation curve","Cost = effort * schedule * Average developer salary","Size <in KSLOC>", "Cost <in USD>");}
    else if (name[1] == "1M"){graphcocomo(datos,"COCOMO effort curve","effort = 2.4 * (KSLOC**1.05)","Size <in MSLOC>", "Effort <in man-months>");}
    else if (name[1] == "2M"){graphcocomo(datos,"COCOMO effort curve <dependant on size>","COCOMO schedule estimation = 3.5 * (KSLOC**0.399)","Size <in MSLOC>", "Schedule <in months>");}
    else if (name[1] == "3M"){graphcocomo(datos,"COCOMO effort curve","COCOMO schedule estimation = 2.5 * (effort**0.38)","Size <in MSLOC>", "Effort <in man-months>");}
    else if (name[1] == "4M"){graphcocomo(datos,"COCOMO Average Developer Estimation curve","effort/schedule","Size <in MSLOC>", "Average developers");}
    else if (name[1] == "5M"){graphcocomo(datos,"COCOMO Cost Estimation curve","Cost = effort * schedule * Average developer salary","Size <in MSLOC>", "Cost <in USD>");}
    else{
	$.ajax({
		type:'GET',
		data:{"namepack":namepack},
        beforeSend: function(){
            $("#cargando").addClass("loading");
        },
    	success: function(json) {
    		if (name[1]=="packsloc"){nombrehist="Histogram with the number of SLOC per packages";graficas(json,200,nombrehist,"SLOC");}
			else if (name[1]=="filespack"){nombrehist="Histogram with the number of files in packages";graficas(json,15,nombrehist,"Number of files");}
			else if (name[1]=="slocfile"){nombrehist="Histogram with the number of SLOC per packages";graficas(json,50,nombrehist,"SLOC/file");}
			else if (name[1]=="langsloc"){crearpie(json);}
			else if (name[1]=="packsize"){nombrehist="Histogram with the size of packages";graficas2(json,25000,nombrehist,"Package size");}
            else if (name[1]=="packsizelog"){nombrehist="Histogram with the size of packages (logaritmic)";graficas2(json,25000,nombrehist,"Package size",1);}
        	else if (name[1]=="numlangpack"){nombrehist="Histogram with the number of language per packages";grafica(json,1,nombrehist,"Number of programming languages");}
            else if (name[1]=="numfilepack"){nombrehist="Histogram with the number of files of the same language per packages";graficas2(json,100,nombrehist,"Number of files of the same language");}
            else if (name[1]=="ada"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,200,nombrehist,"SLOC");}
            else if (name[1]=="ansic"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,1000,nombrehist,"SLOC");}
            else if (name[1]=="awk"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,100,nombrehist,"SLOC");}
            else if (name[1]=="cpp"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,100,nombrehist,"SLOC");}
            else if (name[1]=="cs"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="csh"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="exp"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="fortran"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="java"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="lex"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="lisp"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="makefile"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="ml"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="modula3"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="objc"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="pascal"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="perl"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="php"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="python"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="sed"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="sh"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="sql"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="tcl"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
            else if (name[1]=="yacc"){nombrehist="Histogram for SLOC in files for "+name[1];graficas2(json,50,nombrehist,"SLOC");}
		},
        complete: function() {
            $("#cargando").removeClass("loading");
        },
		url: "/graficas"
	});
    }
	});
});

});
