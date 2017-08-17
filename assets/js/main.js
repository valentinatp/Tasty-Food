$(document).ready(function(){
   $(".button-collapse").sideNav();

   var ajaxZomato = function(categorias){
        $.ajax({
        url: 'https://developers.zomato.com/api/v2.1/categories',
       type: 'GET',
       dataType: 'json',
       headers: { 'user-key': '022db00cbdf26d706981d4fa3235767a' },
        })
        .done(function(response){
            console.log(response);
        })
        .fail(function(){
            console.log("error");
        })
    }

    ajaxZomato(73);

});

function initMap(){
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 5, //muestra lvl de profundidad
    center: {lat: -33.4569400, lng: -70.6482700},//contiene longitud y latitud que queremos que se muestre nuestro mapa
    mapTypeControl: false,
    zoomControl: false, 
    streetViewControl: false
  });

  //solo se ejecuta funcionExito cuando el usuario comparte ubicacion y error cuando no.
  function buscar(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }
  addEventListener("load", buscar);

  var latitud,longitud;

  //se obtiene latitud o longitud
  var funcionExito = function(posicion){
    latitud = posicion.coords.latitude;
    longitud = posicion.coords.longitude;

    var miUbicacion = new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      animation: google.maps.Animation.DROP,
      map: map,
      //icon: "https://www.broomfield.org/images/CivicAlerts/1/ThumbNails/blue%20heading%20icons_bike_50x50_AspectPreserved_thumb.png"
    });

    map.setZoom(17);
    map.setCenter({lat:latitud, lng:longitud});
  }

  //muestra mensaje si falla en busca de la geolocalizacion.
  var funcionError = function(error){
    alert("Tenemos un problema con encontrar tu ubicación");
  }
}