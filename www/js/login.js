$(document).ready(function(){

    $("#errorMsg").hide();

    $("#btnLogin").click(function(){
        var usu = $("#txtuser").val();
        var pass = $("#txtpassword").val();
        $.post("http://localhost/geoserver/login.php",{ usu : usu, pass : pass},function(respuesta){
            if (respuesta == true) {
                $.mobile.changePage($(document.location.href="mapa.html"), 'slidefade');
            }
            else{


                $.mobile.changePage('#pageError', 'pop', true, true);
                /*$("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");*/
            }
        });
    });



  $("#btnRegistro").click(function(){

    

        var nombre = $("#nombre").val();        
        var ap = $("#ap").val();
        var am = $("#am").val();
        var email = $("#email").val();
        var contrasena = $("#contrasena").val();

        $.post("http://localhost/geoserver/registro.php",{ nombre : nombre, contrasena : contrasena , ap : ap , am : am , email : email  },function(respuesta){
            if (respuesta == true) {
                $.mobile.changePage("../pages/iniciar.html");
            }
            else{
                $.mobile.changePage('#pageError', 'pop', true, true);
                /*$("#errorMsg").fadeIn(300);
                $("#errorMsg").css("display", "block");*/
            }
        });
    });


});