$.getJSON('https://localhost:44342/venta').done( function (results) {

  // Variable que obtienes las fechas
  var labels = results.map(function (item) {
    return item.fecha
  });

  // Variable que obtiene los precios
  var data = results.map(function (item) {
    return item.precio;
  });

  // Array que muestra todas las fechas
  console.log(labels)
  // Array que muestra todos los precios
  console.log(data)

  // Variable que agrupa las fechas repetidas
  var uniqueArrayLabels = [];
  for (i = 0; i < labels.length; i++){
    if (uniqueArrayLabels.indexOf(labels[i]) === -1){
      uniqueArrayLabels.push(labels[i]);
    }
  }

  // Variable que suma los precios de las fechas repetidas
  var uniqueArrayData = [];
  for (x = 0; x < uniqueArrayLabels.length; x++){
    uniqueArrayData[x] = 0;
    for (z = 0; z < data.length; z++){
      if (uniqueArrayLabels[x] == labels[z]){
        uniqueArrayData[x] += data[z];
      }
    }
  }

  // Array que agrupa las fechas
  console.log(uniqueArrayLabels);
  // Array que suma los precios de los vehículos vendidos en las fechas agrupadas
  console.log(uniqueArrayData);

  feather.replace()

  var ctx = document.getElementById('myChart')

  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: uniqueArrayLabels,
      datasets: [{
        data: uniqueArrayData,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#E76F51',
        borderWidth: 4,
        pointBackgroundColor: '#E76F51'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            suggestedMin: 0,
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
});

$(document).ready(function(){
	//Según se cargue el HTML, consume un servicio GET para obtener
	//Todos los usuarios y los rellena en la tabla vacía results.
	$.ajax({
        url: 'https://localhost:44342/venta',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        success: function(data, status){
            //Por cada elemento dentro del array data, construye una fila (tr)
            //y añade celdas con los campos de cada elemento del array.
		    $.each(data, function(i, item) {
		        var $tr = $('<tr>').append(
		            $('<td>').text(item.numSerie),
		            $('<td>').text(item.modelo),
		            $('<td>').text(item.marca),
                $('<td>').text(item.tipo),
                $('<td>').text(item.precio),
                $('<td>').text(item.plazo),
		            $('<td>').text(item.fecha)
		        ); //.appendTo('#records_table');
		        console.log($tr.wrap('<p>').html());
		        $('#ventas').append($tr);
		    });
			
      	}
    });
});