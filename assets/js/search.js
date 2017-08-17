$(document).ready(function(){
    $(".button-collapse").sideNav();
    $('.cajita_restaurant').hide();
	var arr_restaurantes = [];

    var ajaxZomato = function(element){
				$.ajax({
				url: 'https://developers.zomato.com/api/v2.1/search?entity_id=' + element + '&entity_type=city',
		        type: 'GET',
		        responseType: 'json',
		        headers: { 'user-key': '022db00cbdf26d706981d4fa3235767a' },
				})
				.done(function(response){
		            console.log(response.restaurants.slice(0, 18));
		            var array = response.restaurants.slice(0, 18);
		            array.forEach(function(el, f){
		            	var contador = f + 1;
		            	var restName = el.restaurant.name;
		            	var direccion = el.restaurant.location.address;
		            	var comuna = el.restaurant.location.locality;
		            	var costo = el.restaurant.average_cost_for_two;
		            	var moneda = el.restaurant.currency;
		            	var rating = el.restaurant.user_rating.aggregate_rating;
		            	var cuisine = el.restaurant.cuisines;
		            	var img = el.restaurant.thumb;
		            	var id = el.restaurant.id;

		            	var imag = `<img id=${id} src=${img} class="img-restaurant${contador} imgs imagenes-w-h">`;
		            	var imag2 = `<img id=${id} src='assets/img/default.png' class="img-restaurant${contador} imgs imagenes-w-h">`;


		            	if(img == ""){
		            		$(".datos-restaurants").append(`<div class="col s4 prueba">`+
		            										`<div class='row'><div class='col s12'>${imag2}</div></div>`+
		            										`<div class="row back-text back-text${contador}">`+
		            											`<div class="col s9 color-text">`+
		            												`<h6>${restName}</h6>`+
		            												`<p>${comuna}</p>`+
		            											`</div>`+
		            											`<div class="col s3 color-texto">`+
		            												`<p><i class="large material-icons">restaurant</i></p>`+
		            											`</div>`+
															`</div>`+ 
		            									`</div>`);

						}else{
							$(".datos-restaurants").append(`<div class="col s4 prueba">`+
		            										`<div class='row'><div class='col s12'>${imag}</div></div>`+
		            										`<div class="row back-text back-text${contador}">`+
		            											`<div class="col s9 color-text">`+
		            												`<h6>${restName}</h6>`+
		            												`<p>${comuna}</p>`+
		            											`</div>`+
		            											`<div class="col s3 color-texto">`+
		            												`<p><i class="large material-icons">restaurant</i></p>`+
		            											`</div>`+
															`</div>`+ 
		            									`</div>`);
						}

		            	$('#'+id).click(function(event) {
		            		$('.cajita_restaurant').show();
		            		$('.cajita_restaurant').empty();
		            		$('.cajita_restaurant').append('<div class="col s12 nombre_restaurant">'+
			            			'<div class="col s8 offset-s2 center">'+
			            				'<h4 class="nombre_restaurant_h white-text">'+restName+'</h4>'+
			        				'</div>'+
			        				'<div class="col s2">'+
			        					'<i class="material-icons heart_favorito right" id="heart'+id+'">favorite</i>'+
			    					'</div>'+
			    				'</div>'+
			    				'<div class="col s12 center">'+
			    					'<h5 class="orange-text paraf_h">Address</h5>'+
			    					'<p class="paraf_restaurant">'+direccion+'</p>'+
			    					'<h5 class="orange-text paraf_h">Price for 2</h5>'+
			    					'<p class="paraf_restaurant">'+moneda+' '+costo+'</p>'+
			    					'<h5 class="orange-text paraf_h">Rating</h5>'+
			    					'<p class="paraf_restaurant">'+rating+' <i class="material-icons">star</i></p>'+
								'</div>')

							//var arr_restaurantes = [];
			            	$('#heart'+id).click(function() {
			            		$('#heart'+id).css('color', 'red');
			            		arr_restaurantes.push(restName);
			            		localStorage.setItem("restaurantes", JSON.stringify(arr_restaurantes));
			            	});
		            	});
		            })
		            												
		        })
				.fail(function(){
					console.log("error");
				})
			}

	//Select
    $("#search").change(function(){
    	console.log("borrar");
    	$(".datos-restaurants").html("");
    	if(($("#search").val()) == "santiago"){
			ajaxZomato(83);
		}else if(($("#search").val()) == "río-de-janeiro"){
			ajaxZomato(73);
    	}else if(($("#search").val()) == "sao-paulo"){
    		ajaxZomato(67);
    	}else if(($("#search").val()) == "roma"){
    		ajaxZomato(257);
    	}else if(($("#search").val()) == "new-york"){
    		ajaxZomato(280);
    	}else if(($("#search").val()) == "dublin"){
    		ajaxZomato(91);
    	}
    })
    

});



