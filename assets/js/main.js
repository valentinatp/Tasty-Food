$(document).ready(function(){
	$(".button-collapse").sideNav();



	function saveToLocalStorage() {
        localStorage.setItem('photo', photo_url);      
        localStorage.setItem('name', $('#name').val());
        localStorage.setItem('email', $('#email').val());
    }


	function getFromLocalStorage() {
    console.log('getting info for: ' + localStorage.getItem('#photo'));
    $('#photo').attr('src', localStorage.getItem('photo'));
    $('#name').val(localStorage.getItem('name'));
    $('#email').val(localStorage.getItem('username'));
}



$(function(){
	$("#profile_image").change(function(e){
		var img = URL.createObjectURL(e.target.files[0]);
		$(".image").attr("src",img);
	})
})

});
