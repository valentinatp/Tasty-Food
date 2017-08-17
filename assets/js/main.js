$(document).ready(function(){
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
});