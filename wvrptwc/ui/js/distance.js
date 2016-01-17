function getDistanceMatrix(element) {
    $('#indicator').show();
    $.post('Controller.php',
        {
            action: 'get_distances'				
        },
        function(data, textStatus) {
            renderDistanceMatrix(data);
            $('#indicator').hide();
        }, 
        "json"		
    );

}
function renderDistanceMatrix(jsonData) {
    var orig = jsonData, dest = jsonData;    
    
    var distanceMatrix = [];
    var html = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">Đơn vị mét</th>';
    $.each( cache, function( index, location) {  
        html += '<th scope="col">' + location.Name + '</th>';  
        distanceMatrix[location.ID] = [];
    });
    html += '<tbody>';
    
    $.each( jsonData, function( index, distance){     
        distanceMatrix[distance.A][distance.B] = new Object();
        distanceMatrix[distance.A][distance.B].Length = distance.Length;
        distanceMatrix[distance.A][distance.B].ID = distance.ID;
    });
    
    $.each( cache, function( index, A) {  
        html += '<tr>';
        html += '<td><b>' + A.Name + '</b></td>';
        $.each( cache, function( jndex, B) {  
            var id = distanceMatrix[A.ID][B.ID].ID;
            var length = distanceMatrix[A.ID][B.ID].Length;
            html += '<td class="edit" field="Distance" distance_id="' + id +'">' 
                    + length + '</td>';            
        });
        html += '</tr>';
    });
   
    html += '</tbody></table>';

    $('div#content').html(html);
 
}

function calcDistanceMatrix(jsonData){
    $.each( jsonData, function( index, info ){          
        calcDistance(info);
    });   
}
function calcDistance(info){
    var orgin = [new google.maps.LatLng(info.LatA, info.LonA)];
    var dest = [new google.maps.LatLng(info.LatB, info.LonB)];
    disMatSrv.getDistanceMatrix
    (
        {
            origins: orgin,
            destinations: dest,
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidFerries: true
        },
        function(response, status) {
            if (status === "OK") {
                var rows = response.rows;
                var distance = new Object();
                distance.ID = info.ID;
                distance.Length = rows[0].elements[0].distance.value;
                var distJson = JSON.stringify(distance);
                $.post('Controller.php',
                    {
                        action: 'update_distance',                        
                        distance: distJson     
                    },
                    function(data, textStatus) {}, 
                    "json"		
                );
                
            }
            else {
                var element = document.createElement('div');   
                $(element).attr('id','add_matrix'); 
                errorInfo(element);
            }
        }
    );
}

function checkDistanceMatrixForm() {    
    return "Đã đạt mức giới hạn quota của Google Map !";
}