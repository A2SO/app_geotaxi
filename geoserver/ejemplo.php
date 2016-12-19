  <?php
  header("content-type: application/json");

$mysqli = new mysqli('localhost','root','','respaldo' );

$sql = "SELECT *  FROM conductor ";
            $result = $mysqli->query($sql);
   $json = array();

    if(mysqli_num_rows($result)){
        while($row=mysqli_fetch_array($result)){
        	 $json[] = array('nombre' => $row["nombre_conductor"] );
    
        }
    }
    
 #   echo "<pre>";
#   print_r($json);
echo  json_encode($json);

?>