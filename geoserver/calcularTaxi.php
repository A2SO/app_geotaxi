<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");

include("calcularPerimetro.php");

$lat =  4.6665578;
$lng = -74.0524521;
$distance = 1; // Sitios que se encuentren en un radio de 1KM

$direccion = new cordenadas();
$parentReflection = $direccion->getBoundaries($lat, $lng, $distance);


print_r($parentReflection)


#$mysqli = new mysqli('127.0.0.1', 'root', '', 'llantas');
$mysqli = new mysqli('localhost','root','','respaldo' );

$sql = "SELECT nombre_conductor,ap_conductor,am_conductor,push_c,latitud,longitud , ( 6371 * ACOS( 
                                             COS( RADIANS(18.8562396 ) ) 
                                             * COS(RADIANS( latitud ) ) 
                                             * COS(RADIANS( longitud ) 
                                             - RADIANS( -97.1025821) ) 
                                             + SIN( RADIANS(18.8562396 ) ) 
                                             * SIN(RADIANS( latitud ) ) 
                                            )
                               ) AS distancia 
                     FROM conductor 
                     WHERE (latitud BETWEEN  18.847246383941  AND  18.865232816059 )  
                     AND (longitud BETWEEN  -97.112085330894  AND  -97.093078869106 )
                     HAVING distancia <  1 
                     ORDER BY distancia ASC";

$pdo = new PDO(........)
$stmt = $p->query('');
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
print_r($rows);
?>