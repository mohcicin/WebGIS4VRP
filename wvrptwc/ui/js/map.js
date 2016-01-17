var map = null, markers = [],bound = null, stops = null, disMatSrv = null, matrix = [];
var directionsDisplay = null;
$("#googleMap").hide();

function map_initialize() {

    var mapProp = 
    {
        center: new google.maps.LatLng(10.9333405,106.8545723),
        zoom: 12,
        maxZoom: 16,
        minZoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (
        document.getElementById("googleMap"),
        mapProp
    ); 	  
    //map.setOptions({disableDoubleClickZoom: true });
    
    $.post('Controller.php',
        {
            action: 'get_stops'				
        },
        function(data, textStatus) {
            stops = [];
            $.each( data, function(index, stop){     
                stops[index] = {id: stop.ID, text: stop.Name};
            });
        }, 
        "json"		
    );
    
    google.maps.event.addListener(map, 'rightclick', function(event) {
        createMarker(event.latLng);
    });     
    
    disMatSrv = new google.maps.DistanceMatrixService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
}

function addMarkers(jsonData) {
    clearAllMarker();
    bound = new google.maps.LatLngBounds();
    $.each( jsonData, function( index, location){   
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(location.Lat, location.Lon),
            title: location.Name,
            map: map
        });
        markers.push(marker);
        bound.extend( marker.getPosition() ); 
        var infowindow = new google.maps.InfoWindow();

        var html = '<div class="marker-info-win" ';
        html += 'location_id="' + location.ID + '" ';  
        html += 'location_name="' + location.Name + '">';        
        html += '<div class="marker-inner-win">';

        html += '<span class="info-content">';
        html += '<h4 class="marker-heading">' + location.Name + '</h4>';        
        html += 'Kinh độ: ' + location.Lon + '<br/>';
        html += 'Vĩ độ: ' + location.Lat + '<br/>';
        html += 'Loại: ' + location.Type + '<br/>';
        html += '</span>';

        html += '<button name="remove-marker" class="remove-marker">Xóa vị trí</button>';   
        html += '</div> </div>';

        var info = $(html);
        infowindow.setContent(info[0]);
        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
        });

        var remove = info.find('button.remove-marker')[0];
        google.maps.event.addDomListener(remove, 'click', function(event) {
            deleteConfirmation(info);
            marker.setMap(null);
            $("#googleMap").hide();
        });

    });
}

function createMarker(position) {
    var marker = new google.maps.Marker({
        position: position ,
        animation: google.maps.Animation.DROP,
        map: map
    });
    
    var html = '<div class="marker-info-win">';    
    html += '<h4> Thêm vị trí mới </h4>';
    
    html += '<div class="input-prepend" style="font-size:14px">';
    html += '<span class="add-on"> Kinh độ</span>';
    html += '<input type="text" id="Lon" name="Lon" value="';
    html += position.lng();
    html += '" class="input-small"/>';		  
    html += '</div><br/>';
    
    html += '<div class="input-prepend" style="font-size:14px">';
    html += '<span class="add-on"> Vĩ độ</span>';
    html += '<input type="text" id="Lat" name="Lat" value="';
    html += position.lat();
    html += '" class="input-small"/>';		  
    html += '</div><br/>';
    
    
    html += '<div class="input-prepend">';
    html += '<span class="add-on"> Địa điểm</span>';
    html += '<input type="text" id="Name" name="Name" value="" class="input-small" />';	
    html += '</div><br>';
    
    html += '<div class="input-prepend">';
    html += '<span class="add-on"> Hình ảnh</span>';
    html += '<input type="text" id="Image" name="Image" value="" class="input-small" />';
    html += '</div><br/>';  
    
    html += '<div class="input-prepend" style="font-size:14px">';
    html += '<input type="text" id="Type" name="Type" value="" class="input-small" style="width:205px"/>';		  
    html += '</div><br/>'; 
    
    html += '<button name="save-marker" class="save-marker" id="add_location">Lưu thông tin vị trí</button>';
    html += '<button name="erase-marker" class="erase-marker">Hủy</button>';   
    html += '</div>';
    
    var info = $(html);
    
    var infowindow = new google.maps.InfoWindow();
    infowindow.open(map, marker);
    infowindow.setContent(info[0]);
    
    $("#Type").select2({
        placeholder: "Loại trạm",
        data: stops
    });    
    
    var erase = info.find('button.erase-marker')[0];
    var save = info.find('button.save-marker')[0];        
 
    google.maps.event.addDomListener(erase, 'click', function(event) {
        marker.setMap(null);
    });
 
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });
    
    google.maps.event.addDomListener(save, 'click', function(event) {
        if(errorInfo(this) ==="") {
            var location = new Object();
            location.Name = $('input#Name').val();
            location.Type = $('input#Type').val();
            location.Lat = $('input#Lat').val();
            location.Lon = $('input#Lon').val();
            location.Image = $('input#Image').val();
            var locationJson = JSON.stringify(location);

            $('#indicator').show();
            $.post('Controller.php',
                {
                    action: 'add_location',
                    location: locationJson
                },
                function(data, textStatus) { 
                    getLocationList(this);
                    calcDistanceMatrix(data);
                    $("#googleMap").hide(); 
                }, 
                "json"		
            );    
            marker.setMap(null);
        }
    });
}

function clearAllMarker(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
}

function getMarkers(element) {
    $('#indicator').show();
    $.ajax({
        type: 'POST',
        url: 'Controller.php',
        data: { action: 'get_locations' },
        success: function(data, textStatus) {
            cache = data;
            addMarkers(data);
            $('#indicator').hide();
        },
        dataType: 'json',
        async: false
    });
};

function showRoute(route, color) {
//    var directionsDisplay = new google.maps.DirectionsRenderer(
//        {
//            polylineOptions: 
//            {
//                strokeColor: color
//            }
//        }
//    );
    var start = route[0];
    var end = route[route.length - 1];
    var waypts = [];
    for (var i = 1; i < route.length - 1; i++) {
        waypts.push({ location:  route[i], stopover: true});
    }
    var directionsService = new google.maps.DirectionsService();
//    directionsDisplay.setMap(map);
    var request =
    {
        origin: start,
        destination: end,
        waypoints: waypts,
        travelMode: google.maps.DirectionsTravelMode.DRIVING,
        avoidFerries: true
    };
    directionsService.route
    (
        request,
        function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
            else {
                alert(status);
            }
        }
    );
}