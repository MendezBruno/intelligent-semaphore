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
            color: 'black',
            fontName: 'Segoe UI Black'
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
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

        chart.draw(data, options);
      }


