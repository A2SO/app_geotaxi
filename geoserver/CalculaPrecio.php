<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");




$distancia = $_POST['Distancia'];

$tiempo = $_POST['tiempo'];
$inicio = $_POST['inicio'];
$final = $_POST['final'];

if ($distancia = $_POST['Distancia'] and $tiempo = $_POST['tiempo'] and $_POST['inicio']and $_POST['final'])

{


$arr = array('Distancia'=>$_POST['Distancia'],'Tiempo'=>$_POST['tiempo'],'inicio'=>$_POST['inicio'],'fin'=>$_POST['final']);

echo json_encode($arr);

}
else
{
echo fase;

}



?>