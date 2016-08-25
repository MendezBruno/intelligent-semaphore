/**
 * Created by bruno on 25/08/16.
 */
google.charts.load('current', {'packages':['corechart']});
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
