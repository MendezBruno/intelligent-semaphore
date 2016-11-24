/**
 * Created by bruno on 25/08/16.
 */
google.charts.load('current', {'packages':['corechart', 'gauge','line']});
google.charts.setOnLoadCallback(drawChart);
function drawChart(dicDatos) {

    if(dicDatos == undefined) {dicDatos=2}

    var data = google.visualization.arrayToDataTable([
        ["Tipo de congestion", "Cantidad de cuadras"],
        ['', dicDatos["SIN_CONGESTION"]],
        ['', dicDatos["LEVE"]],
        ['', dicDatos["MEDIANA"]],
        ['', dicDatos["PESADA"]],
        ['', dicDatos["INTRANSITABLE"]]
    ]);

    var options = {
        chartArea: {
            left: 5,
            top: 5,
            width: '100%',
            height: '100%'
        },
        colors: ['#b3b3b3', '#ffff80', '#ffb366', '#ff4d4d', '#cc0000'],
        legend: 'none',
        pieSliceTextStyle: {
            color: 'black'

        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}



google.charts.setOnLoadCallback(drawChartVelocimetro);
function drawChartVelocimetro(dicVel) {


    if (dicVel == undefined){var dicVel = {}; dicVel["1"] = 60;  dicVel["2"] = 40 }

    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Vel Prom', dicVel["1"]],
        ['Caudal Prom', dicVel["2"]],

    ]);

    var options = {
        width: 400,
        height: 120,
        redFrom: 90,         redTo: 100,
        yellowFrom: 75,        yellowTo: 90,
        minorTicks: 5
    };

    var chartVel = new google.visualization.Gauge(document.getElementById('velocidad'));

    chartVel.draw(data, options);
}

google.charts.setOnLoadCallback(drawChartLinearTiempoCongestion);
function drawChartLinearTiempoCongestion(datosTiempoCongestion) {

        if(!google.visualization) google.charts.load('current', {'packages':['corechart', 'gauge']})

        var dataSet = new Array();
        dataSet.push(['Tiempo', 'Congestion']);
        var arrayResult = datosTiempoCongestion.tiempoCongestion.map(function (tyc) {
            return [tyc['t'],tyc['c']]
        });
        dataSet = dataSet.concat(arrayResult);
        var data = google.visualization.arrayToDataTable(dataSet);

        var options = {

          title: 'Evolución de la congestión a través del tiempo',
          curveType: 'function',
          legend: { position: 'bottom' },
            hAxis: {
                title: 'Tiempo(Segundos)'
            },
            vAxis: {
                title: 'Congestion'
            }

        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }


google.charts.setOnLoadCallback(drawChartLinearTiempoAptitud);
function drawChartLinearTiempoAptitud(datosTiempoAptitud) {

    if(!google.visualization) google.charts.load('current', {'packages':['corechart', 'gauge']})

    var dataSet = new Array();
    dataSet.push(['Tiempo', 'Aptitud']);
    var arrayResult = datosTiempoAptitud.tiempoAptitud.map(function (tyc) {
        return [tyc['time'],tyc['aptitud']]
    });
    dataSet = dataSet.concat(arrayResult);
    var data = google.visualization.arrayToDataTable(dataSet);

    var options = {
        title: 'Evolución de la Aptitud a través del tiempo',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Tiempo(Segundos)'
        },
        vAxis: {
            title: 'Aptitud'
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_aptitud'));

    chart.draw(data, options);
}


google.charts.setOnLoadCallback(drawChartLinearTiempoVelocidad);
function drawChartLinearTiempoVelocidad(datosTiempoVelocidad) {

    if(!google.visualization) google.charts.load('current', {'packages':['corechart', 'gauge']})

    var dataSet = new Array();
    dataSet.push(['Tiempo', 'Velocidad']);
    var arrayResult = datosTiempoVelocidad.tiempoVelocidad.map(function (tyv) {
        return [tyv['t'],tyv['vel']]
    });
    dataSet = dataSet.concat(arrayResult);
    var data = google.visualization.arrayToDataTable(dataSet);

    var options = {
        title: 'Velocidad a lo largo de la simulación',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'Tiempo(Segundos)'
        },
        vAxis: {
            title: 'Velocidad(m/s)'
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_tvel'));

    chart.draw(data, options);
}




google.charts.setOnLoadCallback(drawHistogramaCuadras);
function drawHistogramaCuadras(datosCongestionXCuadra) {

    var dataSet = new Array();
    dataSet.push(['Congestion']);
    var arrayResult = datosCongestionXCuadra.map(function (tycXc) {
        return [tycXc.tiempoCongestionCuadra['c']]
    });
    dataSet = dataSet.concat(arrayResult);


    var data = google.visualization.arrayToDataTable(dataSet);


    var options = {
        title: 'Approximating Normal Distribution',
        legend: { position: 'none' },
        colors: ['#4285F4'],

        chartArea: { width: 600 },
        hAxis: {
            ticks: [0, 10, 20, 30, 40,50,60,70,80,90,100],
            title: 'Cuadra'
        },
        vAxis: {
            title: 'TiempoEnRecorrerUnaCalle'
        },
        bar: { gap: 1 },

        histogram: {
            bucketSize: 5,
            maxNumBuckets: 4000,
            minValue: 0,
            maxValue: 100
        }
    };

    var chart = new google.visualization.Histogram(document.getElementById('histogramaxcuadra'));
    chart.draw(data, options);
}

google.charts.setOnLoadCallback(drawChartVelocidadXCuadra);

function drawChartVelocidadXCuadra(datos) {

    var dataSet = new Array();

    dataSet.push(['Cuadra', 'Velocidad Total','Velocidad Resto',{ role: 'annotation' }]);

    var datosDeMayoraMenor = datos.tiempoVelocidadXCuadra.reverse();

    var nuevoArray = datosDeMayoraMenor.slice(0,datos.cant_Cuadras);

    var arrayResult = nuevoArray.map(function (tycXc) {
        return [tycXc['cuadraId'],tycXc.tiempoVelocidadCuadra['vel'],16.666666-tycXc.tiempoVelocidadCuadra['vel'],'']
    });
    dataSet = dataSet.concat(arrayResult);

    var data = google.visualization.arrayToDataTable(dataSet);

    var options = {
        width: 900,
        height: 500,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true,
        hAxis: {
            title: 'Tiempo(Segundos)'
        },
        vAxis: {
            title: 'Tiempo que tardan los autos en recorrer una cuadra'
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('columnasVelocidad'));
    chart.draw(data, options);

}


