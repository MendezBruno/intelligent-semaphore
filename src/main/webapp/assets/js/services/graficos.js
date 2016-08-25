/**
 * Created by bruno on 25/08/16.
 */
google.charts.load('current', {'packages':['corechart', 'gauge']});
google.charts.setOnLoadCallback(drawChart);
function drawChart(dicDatos) {

    if(dicDatos == undefined) {dicDatos=2}

    var data = google.visualization.arrayToDataTable([
        ['Rango congestion', 'Cantidad de cuadras'],
        ['Sin Cogestion',     dicDatos["sin"]],
        ['Congestion pesada',      dicDatos["alta"]],
        ['Congestion media',  dicDatos["media"]],
        ['Congestion leve', dicDatos["leve"]],
        ['Intransitable',    dicDatos["muy"]]
    ]);

    var options = {
        title: 'Congestion'
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
        width: 400, height: 120,
        redFrom: 90, redTo: 100,
        yellowFrom: 75, yellowTo: 90,
        minorTicks: 5
    };

    var chartVel = new google.visualization.Gauge(document.getElementById('velocidad'));

    chartVel.draw(data, options);
}

