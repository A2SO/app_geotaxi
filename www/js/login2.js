$(document).ready(function(){

    $("#errorMsg").hide();



  $("#btnRegistro").click(function(){

        var nombre = $("#nombre").val();
        var ap = $("#ap").val();
        var am = $("#am").val();
        var email = $("#email").val();
        var contrasena = $("#contrasena").val();

        $.post("http://localhost/geoserver/registro.php",{ nombre : nombre, contrasena : contrasena , ap : ap , am : am , email : email  },function(respuesta){
            if (respuesta == true) {
                $.mobile.changePage("../index.html");
            }
            else{
                $.mobile.changePage('#pageError', 'pop', true, true);
                /*$("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");*/
            }
        });
    });


});