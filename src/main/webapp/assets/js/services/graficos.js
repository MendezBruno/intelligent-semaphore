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
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

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
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart_tvel'));

    chart.draw(data, options);
}


google.charts.setOnLoadCallback(drawChartLineasCongestionXCuadra);
function drawChartLineasCongestionXCuadra(datosTiempoCongestionXcuadra){

    //*todo* armar dataTable
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'cuardra-1');
    data.addColumn('number', 'cuardra-2');
    data.addColumn('number', 'cuardra-3');
    data.addColumn('number', 'cuardra-n');

    data.addRows([
        [1,  37.8, 80.8, 41.8],
        [2,  30.9, 69.5, 32.4],
        [3,  25.4,   57, 25.7],
        [4,  11.7, 18.8, 10.5],
        [5,  11.9, 17.6, 10.4],
        [6,   8.8, 13.6,  7.7],
        [7,   7.6, 12.3,  9.6],
        [8,  12.3, 29.2, 10.6],
        [9,  16.9, 42.9, 14.8],
        [10, 12.8, 30.9, 11.6],
        [11,  5.3,  7.9,  4.7],
        [12,  6.6,  8.4,  5.2],
        [13,  4.8,  6.3,  3.6],
        [14,  4.2,  6.2,  3.4]
    ]);

    var options = {
        chart: {
            title: 'Congestion de cada cuadra',
            subtitle: 'intervalo de tiempo: '
        },
        width: 900,
        height: 500,
        axes: {
            x: {
                0: {side: 'top'}
            }
        }
    };

    var chart = new google.charts.Line(document.getElementById('line_top_cuadra'));

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
            ticks: [0, 10, 20, 30, 40,50,60,70,80,90,100]
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

    console.log(arrayResult);

    var data = google.visualization.arrayToDataTable(dataSet);

    var options = {
        width: 900,
        height: 500,
        legend: { position: 'top', maxLines: 3 },
        bar: { groupWidth: '75%' },
        isStacked: true
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('columnasVelocidad'));
    chart.draw(data, options);

}


