function renderServiceList(jsonData) {
    
    var html = '<div class="control-group">';
    html += '<div class="btn-group">';	    
    html += '<button type="button" id="create_service_form" class="btn btn-primary"> <i class="icon-plus icon-white"></i> Thêm đơn hàng mới</button>';
    html += '</div></div>';
	       
    html += '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr>\n\
            <th scope="col">Vị trí</th><th scope="col">Loại trạm</th><th scope="col">Khung thời gian</th>\n\
            <th scope="col">Loại rác</th><th scope="col">Số lượng</th><th scope="col"></th></tr></thead><tbody>';


    $.each( jsonData, function( index, service){     
        html += '<tr>';
        html += '<td class="edit" field="Location" service_id="'+service.ID+'">'+service.Location+'</td>';   
        html += '<td class="edit" field="Type" service_id="'+service.ID+'">'+service.Type+'</td>';      
        html += '<td class="edit" field="Window" service_id="'+service.ID+'">'+service.Window+'</td>';      
        html += '<td class="edit" field="Waste" service_id="'+service.ID+'">'+service.Waste+'</td>';      
        html += '<td class="edit" field="Load" service_id="'+service.ID+'">'+service.Load+'</td>';      
        html += '<td><a href="javascript:void(0);" service_name="'+service.Location+'" service_id="'+service.ID+'" class="delete_confirm btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
        html += '</tr>';
    });
    
    html += '</tbody></table>';

    $('div#content').html(html);
}

function getCreateServiceForm(element) 
{  
    var form = '<div class="input-prepend" style="font-size:14px">';
    form += '<input type="hidden" id="Location" name="Location" value="" class="input-xlarge" style="width:280px"/>';		  
    form += '</div><br/><br/>';    
    
    form += '<div class="input-prepend" style="font-size:14px">';
    form += '<input type="hidden" id="Window" name="Window" value="" class="input-xlarge" style="width:280px"/>';		  
    form += '</div><br/><br/>';
    
    form += '<div class="input-prepend" style="font-size:14px">';
    form += '<input type="hidden" id="Waste" name="Waste" value="" class="input-xlarge" style="width:280px"/>';		  
    form += '</div><br/><br/>';
    
    form += '<div class="input-prepend">';
    form += '<span class="add-on"> Khối lượng </span>';
    form += '<input type="text" id="Load" name="Load" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';
    
    form += '<div class="control-group">';		
    form += '<button type="button" id="add_service" class="btn btn-primary"><i class="icon-ok icon-white"></i> Thêm đơn hàng mới </button>';
    form += '</div>';


    $('div#content').html(form);     
      
    
    $.post('Controller.php',
        {
            action: 'get_locations'				
        },
        function(data, textStatus) {
            var locations = [];
            $.each( data, function(index, location){     
                locations[index] = {id: location.ID, text: location.Name};
            });
            $("#Location").select2({
                placeholder: "Vị trí cần thu gom",
                data: locations
            });
        }, 
        "json"		
    );
    
    $.post('Controller.php',
        {
            action: 'get_windows'				
        },
        function(data, textStatus) {
            var windows = [];
            $.each( data, function(index, window){     
                windows[index] = {id: window.ID, text: window.Name};
            });
            $("#Window").select2({
                placeholder: "Thời gian thu gom",
                data: windows
            });
        }, 
        "json"		
    );

    
    $.post('Controller.php',
        {
            action: 'get_wastes'				
        },
        function(data, textStatus) {
            var wastes = [];
            $.each( data, function(index, waste){     
                wastes[index] = {id: waste.ID, text: waste.Name};
            });
            $("#Waste").select2({
                placeholder: "Loại chất thải cần thu gom",
                data: wastes
            });
        }, 
        "json"		
    );

    
    $('#Load').typeahead({
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, service) {
                data.push(service.Load);
            });             
            process($.unique(data));
        }        
    });
    
}


function addService(element) {	
    if(errorInfo(element) === "")
    {
        var service = new Object();
        service.Location = $('input#Location').val();
        service.Window = $('input#Window').val();
        service.Waste = $('input#Waste').val();
        service.Load = $('input#Load').val();
        var serviceJson = JSON.stringify(service);

        $('#indicator').show();
        $.post('Controller.php',
            {
                action: 'add_service',
                service: serviceJson
            },
            function(data, textStatus) {
                getServiceList(element);
                $('#indicator').hide();
            }, 
            "json"		
        );
    }
}
function getServiceList(element) {

    $('#indicator').show();

    $.post('Controller.php',
        {
            action: 'get_services'				
        },
        function(data, textStatus) {
            cache = data;
            renderServiceList(data);
            $('#indicator').hide();
        }, 
        "json"		
    );
}

function checkServiceForm() {
    var error = "";
    if($.trim($('input#Location').val()) === ''){
        error += "Giá trị vị trí cần được chọn <br/>";
    }
    if($.trim($('input#Window').val()) === ''){
        error += "Giá trị thời gian cần được chọn <br/>";
    }
    if($.trim($('input#Window').val()) === ''){
        error += "Giá trị loại chất thải cần được chọn <br/>";
    }    
    var number = parseFloat($('input#Load').val());
    if( number != $('input#Load').val() || number < 0){
        error += "Giá trị thể tích phải là số dương <br/>";
    }    
    return error;
}

function deleteService(element) {	
    var service = new Object();
    service.ID = $("#delete_service").val();

    var serviceJson = JSON.stringify(service);

    $.post('Controller.php',
        {
            action: 'delete_service',
            service: serviceJson
        },
        function(data, textStatus) {
            getServiceList(element);
            $("#delete_info").modal("hide");
        }, 
        "json"		
    );	
}
