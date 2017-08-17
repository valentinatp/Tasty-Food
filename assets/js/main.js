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