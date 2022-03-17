var google = google;
google.charts.load('current', { 'packages': ['timeline'] });
var pintarGrafica = function (informacion) {
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();
        dataTable.addColumn({ type: 'string', id: 'Proceso' });
        dataTable.addColumn({ type: 'string', id: 'Estado' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        var arrayRows = [];
        for (var key in informacion) {
            var particularArray = [];
            if (informacion[key].length > 0) {
                informacion[key].forEach(function (item) {
                    particularArray.push([
                        'P'+key,
                        item.nombre,
                        new Date(0, 0, 0, 0, 0, item.inicio),
                        new Date(0, 0, 0, 0, 0, item.inicio + item.transcurrido)
                    ]);
                });
            }
            particularArray.sort((a, b) => parseInt(a[0].substring(1, a[0].length)) - parseInt(b[0].substring(1, b[0].length)));
            arrayRows = arrayRows.concat(particularArray);
        }

        
        dataTable.addRows(arrayRows);
        chart.draw(dataTable, {
            timeline: { showBarLabels: false },
        });
    }
};
