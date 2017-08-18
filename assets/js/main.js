function initMap(){
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 13,
		center: {lat: -33.4569400, lng: -70.6482700}
	});

//Arreglo con nombre, latitud y longitud dependiendo del tipo de comida y ciudad
var arr_direcciones = [];
var ajaxMapa = function(cuisine, ciudad){
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/search?entity_id='+ciudad+'&entity_type=city&cuisines='+cuisine+'',
		type: 'GET',
		dataType: 'json',
		headers: { 'user-key': 'cc92ab23a53a5b062925e25e30238a19' },
	})
	.done(function(data) {
		//console.log(data);
		data.restaurants.forEach(function(ele){
			arr_direcciones.push([ele.restaurant.name, ele.restaurant.location.latitude, ele.restaurant.location.longitude]);
		})
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}

var ajaxCuisines = function(){
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id=83',
		type: 'GET',
		dataType: 'json',
		headers: { 'user-key': 'cc92ab23a53a5b062925e25e30238a19' },
	})
	.done(function(data) {
		data.cuisines.forEach(function(elem){
			//tipos_cocina.push(elem.cuisine.cuisine_name);
			var id = elem.cuisine.cuisine_id;
			var cuisine = elem.cuisine.cuisine_name;
			var myselect =`<option value="${id}">${cuisine}</option>`;
			$('#select-mapa').append(myselect);
		})
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
}
ajaxCuisines();
//fin de select dinamico

//De materialize para inicializar 
$('select').material_select();


//cre
var infowindow = new google.maps.InfoWindow();
var marker, i;
var markers = [];

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;

//Select mapa
$("#select-mapa").change(function(){
	
	//Este FOR vacia el arreglo de marcadores
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];

	var valor_id = $("#select-mapa").val();
	ajaxMapa(valor_id,83);
	forMarker();
})

function forMarker(){
	for (i = 0; i < arr_direcciones.length; i++) { 
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(arr_direcciones[i][1], arr_direcciones[i][2]),
			label: labels[labelIndex++ % labels.length],
			map: map
		});
		markers.push(marker);

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(arr_direcciones[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
}

}