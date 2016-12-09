<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");

#$mysqli = new mysqli('127.0.0.1', 'root', '', 'llantas');
$mysqli = new mysqli('localhost','root','','respaldo' );


 
$usu = $_POST["usu"];
$pass = $_POST["pass"];
 
$sql = "SELECT nombre_conductor FROM conductor WHERE correo_conductor='$usu' AND contrasena= '$pass'";
 
if ($resultado = $mysqli->query($sql)){
    if ($resultado->num_rows> 0){
        echo true;
    }
}
else{
    echo false;
}

?>