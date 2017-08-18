function initMap() {
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 50,
		center: {lat: -33.4569400, lng: -70.6482700}
	});

	setMarkers(map);


/*var beaches = [
['Hola playa', -33.890542, 151.274856, 4],
['chao playa', -33.923036, 151.259052, 5],
['Cronulla Beach', -34.028249, 151.157507, 3],
['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
['Maroubra Beach', -33.950198, 151.259302, 1]
];
*/

ajaxMapa(1,280);

var tipos_cocina = [];
var ajaxCuisines = function(){
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/cuisines?city_id=83',
		type: 'GET',
		dataType: 'json',
		headers: { 'user-key': '022db00cbdf26d706981d4fa3235767a' },
	})
	.done(function(data) {
		console.log(data);
		console.log(data.cuisines);
		data.cuisines.forEach(function(elem){
			tipos_cocina.push(elem.cuisine.cuisine_name);

			var cont = '<option>' + elem.cuisine.cuisine_name + '</option>';

			$("#selector").append(cont);
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

var arr_direcciones = [];
var ajaxMapa = function(cuisine, ciudad){
	$.ajax({
		url: 'https://developers.zomato.com/api/v2.1/search?entity_id='+ciudad+'&entity_type=city&cuisines='+cuisine+'',
		type: 'GET',
		dataType: 'json',
		headers: { 'user-key': '022db00cbdf26d706981d4fa3235767a' },
	})
	.done(function(data) {
		console.log(data);
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
function setMarkers(map) {
        // Adds markers to the map.

        // Marker sizes are expressed as a Size of X,Y where the origin of the image
        // (0,0) is located in the top left of the image.

        // Origins, anchor positions and coordinates of the marker increase in the X
        // direction to the right and in the Y direction down.
        var image = {
        	url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
      };
        // Shapes define the clickable region of the icon. The type defines an HTML
        // <area> element 'poly' which traces out a polygon as a series of X,Y points.
        // The final coordinate closes the poly by connecting to the first coordinate.
        var shape = {
        	coords: [1, 1, 1, 20, 18, 20, 18, 1],
        	type: 'poly'
        };
        for (var i = 0; i < tipos_cocina.length; i++) {
        	var adress = arr_direcciones[i];
        	var marker = new google.maps.Marker({
        		position: {lat: adress[1], lng: adress[2]},
        		map: map,
        		icon: image,
        		shape: shape,
        		title: adress[0],
        		zIndex: adress[3]
        	});
        }


    }

}