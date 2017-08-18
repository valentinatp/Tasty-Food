$(document).ready(function(){




// funcion local storage

	function getFromLocalStorage() {
    $('#name').val(localStorage.getItem('name'));

    $('#email').val(localStorage.getItem('email'));
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

});
