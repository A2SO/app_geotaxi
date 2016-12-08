var map;
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
  var geocoder = new google.maps.Geocoder;
  var marker;

var map_center;
var map_zoom;

//initialize Google Map API onload
jQuery(function(){ 
    initialize();  
});


//calls to make after finishing complete page load
jQuery(document).ready(function(){
    
    //call on form submit
    jQuery("#myForm").submit(function(){
        jQuery("#loader").html('&nbsp;<span class="label label-info">Loading...</span>');
        calcRoute();
        if (true) {
marker.setMap(null);
        }
        return false;
    });
    

});


// Initialize google map object
function initialize() {

            var pos = new google.maps.LatLng(40.7127837,-74.00594130000002);//generamos una nueva pocision en 


  //var infoWindow = new google.maps.InfoWindow({map: map});
var pos = function(){};

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
       pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
       marker = new google.maps.Marker({
    position: pos,
    title:"Tu ubicación!"
});
//var get =JSON.stringify(pos);
//jQuery("#fromAddress").val("Oriente 31, Centro, Orizaba, México");
//jQuery("#fromAddress").val("Oriente 31, Centro, Orizaba, México");

var datos = position.coords.latitude + ',' + position.coords.longitude;
console.log(datos);
geocodeLatLng(geocoder, map,datos);

// To add the marker to the map, call setMap();
marker.setMap(map);

    }, function() {
    //  handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
   // handleLocationError(false, infoWindow, map.getCenter());
  }


  	var mapOptions = {
      	center: new google.maps.LatLng(40.7127837,-74.00594130000002),
      	zoom: 16,
      	mapTypeId: google.maps.MapTypeId.ROADMAP
  	};
  	map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

  	apply_autocomplete(jQuery("#fromAddress").val(pos)[0]);
  	apply_autocomplete(jQuery("#toAddress")[0]);

// Apply Autocomplete API
function apply_autocomplete(input){
	var options = {
	  	types: ['geocode']
	};
	var autocomplete = new google.maps.places.Autocomplete(input, options);
    autocomplete.bindTo('bounds', map);
}
}






function geocodeLatLng(geocoder, map,datos) {
    //var datos2 = "18.8560938,-97.1025356";
  var latlngStr = datos.split(',', 2);
  var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        jQuery("#fromAddress").val(results[0].formatted_address);        
      } else {
        window.alert('No results found');
      }
    } else {
      window.alert('Geocoder failed due to: ' + status);
    }
  });
}

// Calculate route and directions
function calcRoute() {
	//create waypoints array & fill it with all locations entered by user
	var waypts = new Array();

	var start_address = jQuery("#fromAddress").val();
	var end_address = jQuery("#toAddress").val();
  
	jQuery('input[name="toWaypoints[]"]').each(function()
	{
		waypts.push({
            location:jQuery(this).val(),
            stopover:true
        });
	});
	
    // Create a Request variable for Map
    var request = {
        origin: start_address,
        destination: end_address,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    // Execute the Route Method to generate Direction Route on Map
    directionsService.route(request, function(response, status) {
        var directionsDiv = document.getElementById('directions');

        if (status == google.maps.DirectionsStatus.OK) {
            directionsDiv.innerHTML = "";
            directionsDisplay.setMap(map);
            directionsDisplay.setDirections(response);
            directionsDisplay.setPanel(directionsDiv);

            var route = response.routes[0];

            // calculate total distance and duration
            // generate list of locations to print
            var distance = 0;
            var time = 0;
            var locations_list = '<ol>';
            for (var i=0; i<route.legs.length; i++) {
                var theLeg = route.legs[i];
                locations_list += '<li>' + theLeg.start_address + '</li>' ;
                distance += theLeg.distance.value;
                time += theLeg.duration.value;
            }
            locations_list += '<li>' + theLeg.end_address + '</li>' ;
            locations_list += '</ol>';
            
            jQuery("#locations").html('<h4>Ruta entre :</h4>' + locations_list);
            jQuery(directionsDiv).append(
                '<div class="btn-container">' +
                    '<a href="#" class="btn btn-primary" onclick="window.print();"><i class="icon-print icon-white"></i> Imprimir</a>' +
                '</div>' +
                '<h4>Ruta :</h4>'
            );

            
            //display summary into summary block
            total_summary = '<div class="alert alert-success">';
            total_summary += '  <strong>Distancia : </strong>' + showDistance(distance) + " ( unos " + Math.round(time/60) + " minutos)";
            total_summary += '</div>';

			jQuery("#summary").html(total_summary);

            map_zoom = map.getZoom();
            map.getZoom()
            jQuery("#loader").html('');
        }
        else {
            var statusText = getDirectionStatusText(status);
            directionsDiv.innerHTML = "An error occurred - " + statusText;
        }
    });
}

// Show distance in different measurements
function showDistance(distance) {
    return Math.round(distance/100) / 10 + " km (" + Math.round((distance*0.621371192)/100) / 10 + " miles)";
}

// Get the Map direction status message
function getDirectionStatusText(status){
    switch(status){
        case google.maps.DirectionsStatus.INVALID_REQUEST :
            return "Invalid request";
        case google.maps.DirectionsStatus.MAX_WAYPOINTS_EXCEEDED :
            return "Maximum waypoints exceeded";
        case google.maps.DirectionsStatus.NOT_FOUND :
            return "Not found";
        case google.maps.DirectionsStatus.OVER_QUERY_LIMIT :
            return "Over query limit";
        case google.maps.DirectionsStatus.REQUEST_DENIED :
            return "Request denied";
        case google.maps.DirectionsStatus.UNKNOWN_ERROR :
            return "Unknown error";
        case google.maps.DirectionsStatus.ZERO_RESULTS :
            return "Zero results";
        default:
            return status;
    }
}


// Add More waypoints
function add_waypoint()
{
    waypoint_container = '<div class="control-group ">';
    waypoint_container+= '  <label class="control-label" for="inputEmail">Lugar intermedio:</label>';
    waypoint_container+= '  <div class="controls">';
    waypoint_container+= '      <input type="text" id="toWaypoints" name="toWaypoints[]" class="input-xlarge" value="">';
    waypoint_container+= '      &nbsp;<a class="btn btn-info" href="#" onclick="return add_waypoint();">Añadir puntos en la ruta</a>';
    waypoint_container+= '      &nbsp;<a class="btn btn-danger" href="#" onclick="return remove_waypoint(this);">Borrar</a>';
    waypoint_container+= '  </div>';
    waypoint_container+= '</div>';
	
	jQuery('.destination-container').before(waypoint_container);

	jQuery('[name=toWaypoints\\[\\]]').each(function() {
	    apply_autocomplete(jQuery(this)[0]);
	});
	
	return false;
}

// Remove waypoint
function remove_waypoint(obj)
{
	jQuery(obj).parent().parent().remove();
	return false;
}

