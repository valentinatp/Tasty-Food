
$(document).ready(function(){
 $(".button-collapse").sideNav();
    $('#sign-session').click(onLogin);//listener to button click
    $("#sign-session").click(saveToLocalStorage); //guarda a local storage
    getFromLocalStorage(); //obtener local storage

// funcion local storage
function getFromLocalStorage() {
  $('#name').val(localStorage.getItem('name'));
  var nombre_perfil = localStorage.getItem('name');
  $('#name2').append('<h3>'+nombre_perfil+'</h3>');

  $('#email').val(localStorage.getItem('email'));
  $('#email2').val(localStorage.getItem('email'));
}

if(localStorage.img) { 
    //debugger;
    $('.image').attr('src', localStorage.img);
  }

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        localStorage.setItem('img', e.target.result);
        $('.image').attr('src', reader.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#profile_image").change(function() {
    readURL(this);
  });

  $("#profile_image").on('click', function() {
    $("#profile_image").click();
  });


  $(function(){
   $("#profile_image").change(function(e){
    var img = URL.createObjectURL(e.target.files[0]);
    $(".image").attr("src",img);
  })
 })
    // END funcion local storage

    //funcion que envia a favoritos items guardados en local storage
    var parseJson = JSON.parse(localStorage.getItem("restaurantes"));
    parseJson.forEach(function(el){

      $('#favoritos').append('<div class="col s4">'+
        '<div class="col s12 orange nombres_favoritos white-text center"><h4 class="perfil_h3">'+el+'</h4></div>'+
        '</div>');

        $('#favoritos').append('<div class="col s4">'+
            '<div class="col s12 orange nombres_favoritos white-text center"><h6 class="perfil_h3">'+el+'</h6></div>'+
            '</div>');

    })

    $(".button-collapse").sideNav();
    $('#sign-session').click(onLogin);//listener to button click
    $("#sign-session").click(saveToLocalStorage); //guarda a local storage
    getFromLocalStorage(); //obtener local storage

    //This function save to local storage
    function saveToLocalStorage() {
        if (typeof (Storage) !== "undefined") {//soporte del navegador
            if ($('#name').val() != '') {//si el nombre es diferente de vacío
              localStorage.setItem('name', $('#name').val());
            }
            if ($('#email').val() != '') {//si el valor es diferente de vacìo
              localStorage.setItem('email', $('#email').val());
            }
            if ($('#password').val() != '') {//si el valor es diferente de vacìo
              localStorage.setItem('password', $('#password').val());
            }

          } else {
            //No hay soporte de navegador
            console.log('Sorry there is not support for local storage.')
          }
        }

        function getFromLocalStorage() {
          console.log('getting info for: ' + localStorage.getItem('name'));
          $('#name').val(localStorage.getItem('name'));
          $('#email').val(localStorage.getItem('email'));
          $('#password').val(localStorage.getItem('password'));
        }

    //This function validate the name and email and put a red border in case of error
    function validateForm() {
      var valid = true;
      if (!(/^([a-zA-Zñáéíóú]{2,13})+$/.test($("#name").val()))) {
        $("#name").css("border", "1px solid red");
        valid = false;
      }
      if (!(/^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test($('#email').val()))) {
        $("#email").css("border", "1px solid red");
        valid = false;
      }
      if ($('#password').val() == '') {
        $("#password").css("border", "1px solid red");
        valid = false;
      }
      return valid;
    }
    // If validations are true, then go to movies.html and save it into 
    function onLogin() {
        if (validateForm()) { //If validate form is True
          $("#sign-session").attr("href", "search.html");
            saveToLocalStorage(); //guarda a local storage
          }
        }
//Fin de seccion signup y perfil

});

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

