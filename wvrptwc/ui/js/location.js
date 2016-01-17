function getLocationList(element) {
    $('#indicator').show();
    $.post('Controller.php',
        {
            action: 'get_locations'				
        },
        function(data, textStatus) {
            cache = data;
            renderLocationList(data);
            addMarkers(data);
            $('#indicator').hide();
        }, 
        "json"		
    );
};

function renderLocationList(jsonData) {
    var html = '<div class="control-group">';
    html += '<div class="btn-group">';	    
    html += '<button type="button" id="create_location_form" class="btn btn-primary"> <i class="icon-plus icon-white"></i> Thêm vị trí mới</button>';    
    html += '<button type="button" id="distance_matrix" class="btn btn-default"> <i class="icon-th-large icon-black"></i> Ma trận khoảng cách giữa các vị trí</button>';
    html += '</div></div>';

    html += '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr>\n\
            <th scope="col">Địa điểm</th><th scope="col">Loại</th><th scope="col">Kinh độ</th><th scope="col">Vĩ độ</th><th scope="col">Hình ảnh</th><th scope="col"></th></tr></thead><tbody>';

    $.each( jsonData, function( index, location ) {     
        html += '<tr>';
        html += '<td class="edit" field="Name" location_id="'+location.ID+'">'+location.Name+'</td>';
        html += '<td class="edit" field="Type" location_id="'+location.ID+'">'+location.Type+'</td>';  
        html += '<td class="edit" field="Lon" location_id="'+location.ID+'">'+location.Lon+'</td>';
        html += '<td class="edit" field="Lat" location_id="'+location.ID+'">'+location.Lat+'</td>';
        html += '<td class="edit" field="Image" location_id="'+location.ID+'">'+location.Image+'</td>';           
        html += '<td><a href="javascript:void(0);" location_name="'+location.Name+'" location_id="'+location.ID+'" class="delete_confirm btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
        html += '</tr>';
    });

    html += '</tbody></table>';

    $('div#content').html(html);
};

function getCreateLocationForm(element) {
    $('div#content').html('Click chuột phải để thêm vị trí mới !');
    $('#googleMap').show();        
    google.maps.event.trigger(map, 'resize');  
    map.setCenter( bound.getCenter() );
};

function deleteLocation(element) {	
    var location = new Object();
    location.ID = $("#delete_location").val();
    var locationJson = JSON.stringify(location);
    $.post('Controller.php',
        {
            action: 'delete_location',
            location: locationJson
        },
        function(data, textStatus) {
            getLocationList(element);
            $("#delete_info").modal("hide");
        }, 
        "json"		
    );	
}

function checkLocationForm() {
    var error = "";
    if($.trim($('input#Name').val()) === ''){
        error += "Tên vị trí không thể là rỗng <br/>";
    }     
    if($.trim($('input#Lat').val()) === ''){
        error += "Vĩ độ không thể là rỗng <br/>";
    } 
    var number = parseFloat($('input#Lat').val());
    if( number != $('input#Lat').val() || number < 8 + 27/60 || number > 23 + 23/60){
        error += "Vĩ độ phải số dương và nằm trong giới hạn địa lý của Việt Nam <br/>";
    }
    if($.trim($('input#Lon').val()) === ''){
        error += "Kinh độ không thể là rỗng <br/>";
    } 
    number = parseFloat($('input#Lon').val());
    if( number != $('input#Lon').val() || number < 102 + 8/60 || number > 109 + 27/60){
        error += "Kinh độ phải số dương và nằm trong giới hạn địa lý của Việt Nam <br/>";
    }
    if($.trim($('input#Type').val()) === ''){
        error += "Giá trị loại trạm cần được chọn <br/>";
    }
    return error;
}


