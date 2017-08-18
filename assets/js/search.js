$(document).ready(function(){
    $("#tabla").hide();
    $(".button-collapse").sideNav();
    $('.cajita_restaurant').hide();
    var arr_restaurantes = [];
    var ajaxZomato = function(element){
                $.ajax({
                url: 'https://developers.zomato.com/api/v2.1/search?entity_id=' + element + '&entity_type=city',
                type: 'GET',
                responseType: 'json',
                headers: { 'user-key': 'cc92ab23a53a5b062925e25e30238a19' },
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
                                                                    '<p><i id="icono-'+id+'" class="large material-icons">restaurant</i></p>'+
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
                                                                    '<p><i id="icono-'+id+'" class="large material-icons">restaurant</i></p>'+
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
                $('#icono-'+id).click(function(){
                    $('.cajita_restaurant').hide();
                    $("#tabla").show();
                    var abierto = false;
                    if (!abierto) {
                        $("#title_one").empty();
                        $("#title_one").append(restName);
                        $('#type_one').empty();
                        $("#type_one").append(cuisine);
                        $("#cost_one").empty();
                        $("#cost_one").append('$'+costo);
                        $("#rate_one").empty();
                        $("#rate_one").append(rating);
                        abierto = true;
                      } else {
                        $("#title_two").empty();
                        $("#type_two").empty();
                        $("#cost_two").empty();
                        $("#rate_two").empty();
                        $("#title_two").append(restName);
                        $("#type_two").append(cuisine);
                        $("#cost_two").append(costo);
                        $("#rate_two").append(rating);
                        abierto = false;
                      }
                });
                    })
                })
                .fail(function(){
                    console.log("error");
                })
            }
    
});
