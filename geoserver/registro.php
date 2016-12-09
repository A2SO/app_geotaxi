<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");

#$mysqli = new mysqli('127.0.0.1', 'root', '', 'llantas');
$mysqli = new mysqli('localhost','root','','respaldo' );


 
$usu = $_POST["nombre"];
$ap = $_POST["ap"];
$am = $_POST["am"];
$email = $_POST["email"];
$contrasena = $_POST["contrasena"];
 
$sql = "INSERT INTO conductor (nombre_conductor,ap_conductor,am_conductor,correo_conductor,contrasena,clave)
VALUES ('$usu', '$ap', '$am' ,'$email','$contrasena','ES') ";
 


if ($resultado = $mysqli->query($sql)){
        echo false;
    
}
else{
    echo true;
}

?>