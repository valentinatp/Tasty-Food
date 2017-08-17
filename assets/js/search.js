$(document).ready(function(){
    $(".button-collapse").sideNav();

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
		            	var costo = el.restaurant.average_cost_for_two;
		            	var rating = el.restaurant.user_rating.aggregate_rating;
		            	var cuisine = el.restaurant.cuisines;
		            	var img = el.restaurant.thumb;
		            	var id = el.restaurant.id;

		            	$(".datos-restaurants").append(`<div class="col s4">`+
		            										`<img src=${img} class="img-restaurant${contador} imgs">`+
		            										`<div class="row back-text back-text${contador}">`+
		            											`<div class="col s9 color-text">`+
		            												`<h6>${restName}</h6>`+
		            												`<p>${direccion}</p>`+
		            											`</div>`+
		            											`<div class="col s3 color-texto">`+
		            												`<p><i class="large material-icons">restaurant</i></p>`+
		            											`</div>`+
															`</div>`+ 
		            									`</div>`);

		            	if(img == ""){
		            		$(".datos-restaurants").append(`<div class="col s4">`+
		            										`<img src='assets/img/default.png' class="img-restaurant${contador} imgs">`+
		            										`<div class="row back-text back-text${contador}">`+
		            											`<div class="col s9 color-text">`+
		            												`<h6>${restName}</h6>`+
		            												`<p>${direccion}</p>`+
		            											`</div>`+
		            											`<div class="col s3 color-texto">`+
		            												`<p><i class="large material-icons">restaurant</i></p>`+
		            											`</div>`+
															`</div>`+ 
		            									`</div>`);
		            		console.log("chao");

		            	}
		            })
		            												
		        })
				.fail(function(){
					console.log("error");
				})
			}

	//Select
    $("#search").change(function(){
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



