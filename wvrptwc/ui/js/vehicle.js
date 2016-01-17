function getCreateVehicleForm(element) {
    var form = '<div class="input-prepend">';
    form += '<span class="add-on"> Tên</span>';
    form += '<input type="text" id="Name" name="Name" value="" class="input-xlarge" />';		
    form += '</div>';  
  
    form += '<div class="input-prepend" style="font-size:14px">';
    form += '<input type="hidden" id="Truck" name="Truck" value="" class="input-xlarge" style="width:385px"/>';		  
    form += '</div><br/><br/>';
    
    form += '<div class="input-prepend">';
    form += '<span class="add-on"> Loại xe</span>';
    form += '<input type="text" id="Engine" name="Engine" value="" class="input-xlarge" />';
    form += '</div>';

    form += '<div class="input-prepend">';
    form += '<span class="add-on"> Thể tích</span>';
    form += '<input type="text" id="Volume" name="Volume" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';

    form += '<div class="input-prepend">';
    form += '<span class="add-on"> Tải trọng</span>';
    form += '<input type="text" id="Capacity" name="Capacity" value="" class="input-xlarge" />';
    form += '</div>';
    
    form += '<div class="input-prepend">';
    form += '<span class="add-on"> Tốc độ</span>';
    form += '<input type="text" id="Speed" name="Speed" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';
    
    form += '<div class="input-prepend">';
    form += '<span class="add-on"> Quảng đường</span>';
    form += '<input type="text" id="Length" name="Length" value="" class="input-xlarge" />';
    form += '</div>';    
    
    form += '<div class="input-prepend">';
    form += '<span class="add-on"> Số lượng</span>';
    form += '<input type="text" id="Count" name="Count" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';  
    
    form += '<div class="input-prepend">';
    form += '<span class="add-on"> Hình ảnh</span>';
    form += '<input type="text" id="Image" name="Image" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';  

    form += '<div class="control-group">';		
    form += '<button type="button" id="add_vehicle" class="btn btn-primary"><i class="icon-ok icon-white"></i> Thêm phương tiện </button>';
    form += '</div>';

    $('div#content').html(form);     
    
    $('#Name').typeahead({
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, vehicle) {
                data.push(vehicle.Name);
            }); 
            process(data);
        }
    });
    
    
    $.post('Controller.php',
        {
            action: 'get_trucks'				
        },
        function(data, textStatus) {
            var trucks = [];
            $.each( data, function(index, truck){     
                trucks[index] = {id: truck.ID, text: truck.Name};
            });
            $("#Truck").select2({
                placeholder: "Dạng thùng",
                data: trucks
            });
        }, 
        "json"		
    );


    
    $('#Engine').typeahead({   
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, vehicle) {
                data.push(vehicle.Engine);
            });             
            process($.unique(data));
        }
    });
    
    $('#Volume').typeahead({
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, vehicle) {
                data.push(vehicle.Volume);
            });             
            process($.unique(data));
        }        
    });
    
    $('#Capacity').typeahead({
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, vehicle) {
                data.push(vehicle.Capacity);
            });             
            process($.unique(data));
        }        
    });
    
    $('#Speed').typeahead({
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, vehicle) {
                data.push(vehicle.Speed);
            });             
            process($.unique(data));
        }        
    });

    $('#Length').typeahead({
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, vehicle) {
                data.push(vehicle.Length);
            });             
            process($.unique(data));
        }        
    });
    
    $('#Count').typeahead({
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, vehicle) {
                data.push(vehicle.Count);
            });             
            process($.unique(data));
        }        
    });
}



function renderVehicleList(jsonData) {
	
    var html = '<div class="control-group">';		
    html += '<button type="button" id="create_vehicle_form" class="btn btn-primary"><i class="icon-plus icon-white"></i>  Thêm phương tiện thu gom mới</button>';
    html += '</div>';
        
    html += '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr>\n\
            <th scope="col">Tên</th><th scope="col">Loại xe</th><th scope="col">Dạng</th>\n\
            <th scope="col">Thể tích</th><th scope="col">Tải trọng</th>\n\
            <th scope="col">Tốc độ</th><th scope="col">Quảng đường</th>\n\
            <th scope="col">Số lượng</th><th scope="col">Hình ảnh</th><th scope="col"></th></tr></thead><tbody>';


    $.each( jsonData, function( index, vehicle){     
        html += '<tr>';
        html += '<td class="edit" field="Name" vehicle_id="'+vehicle.ID+'">'+vehicle.Name+'</td>';
        html += '<td class="edit" field="Engine" vehicle_id="'+vehicle.ID+'">'+vehicle.Engine+'</td>';
        html += '<td class="edit" field="Truck" vehicle_id="'+vehicle.ID+'">'+vehicle.Truck+'</td>';
        html += '<td class="edit" field="Volume" vehicle_id="'+vehicle.ID+'">'+vehicle.Volume+'</td>';
        html += '<td class="edit" field="Capacity" vehicle_id="'+vehicle.ID+'">'+vehicle.Capacity+'</td>';                
        html += '<td class="edit" field="Speed" vehicle_id="'+vehicle.ID+'">'+vehicle.Speed+'</td>';
        html += '<td class="edit" field="Length" vehicle_id="'+vehicle.ID+'">'+vehicle.Length+'</td>';
        html += '<td class="edit" field="Count" vehicle_id="'+vehicle.ID+'">'+vehicle.Count+'</td>';
        html += '<td class="edit" field="Image" vehicle_id="'+vehicle.ID+'">'+vehicle.Image+'</td>';           
        html += '<td><a href="javascript:void(0);" vehicle_name="'+vehicle.Name+'" vehicle_id="'+vehicle.ID+'" class="delete_confirm btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
        html += '</tr>';
    });
	
    html += '</tbody></table>';

    $('div#content').html(html);
}


function getVehicleList(element) {

    $('#indicator').show();

    $.post('Controller.php',
        {
            action: 'get_vehicles'				
        },
        function(data, textStatus) {
            cache = data;
            renderVehicleList(data);
            $('#indicator').hide();
        }, 
        "json"		
    );
}
function checkVehicleForm() {
    var error = "";
    if($.trim($('input#Name').val()) === ''){
        error += "Giá trị mã phương tiện không thể là rỗng <br/>";
    }
    if($('input#Truck').val() === ''){
        error += "Giá trị dạng thùng cần được chọn <br/>";
    }
    if($.trim($('input#Engine').val()) === ''){
        error += "Giá trị loại phương tiện không thể là rỗng <br/>";
    }
    var number = parseFloat($('input#Volume').val());
    if( number != $('input#Volume').val() || number < 0){
        error += "Giá trị thể tích phải là số dương <br/>";
    }
    number = parseFloat($('input#Speed').val());
    if( number != $('input#Speed').val() || number < 0){
        error += "Giá trị thể tích phải là số dương <br/>";
    }
    number = parseFloat($('input#Length').val());
    if( number != $('input#Length').val() || number < 0){
        error += "Giá trị chiều dài quảng đường di chuyển phải là số dương <br/>";
    }
    number = parseInt($('input#Count').val());
    if( number != $('input#Count').val() || number < 0){
        error += "Giá trị số lượng xe phải là số nguyên dương <br/>";
    }   
    return error;
}	

function deleteVehicle(element) {	
    var vehicle = new Object();
    vehicle.ID = $("#delete_vehicle").val();

    var vehicleJson = JSON.stringify(vehicle);

    $.post('Controller.php',
        {
            action: 'delete_vehicle',
            vehicle: vehicleJson
        },
        function(data, textStatus) {
            getVehicleList(element);
            $("#delete_info").modal("hide");
        }, 
        "json"		
    );	
}

function addVehicle(element) {	
    if(errorInfo(element) ==="")
    {
        var vehicle = new Object();
        vehicle.Name = $('input#Name').val();
        vehicle.Truck = $('input#Truck').val();
        vehicle.Capacity = $('input#Capacity').val();
        vehicle.Volume = $('input#Volume').val();
        vehicle.Engine = $('input#Engine').val();
        vehicle.Speed = $('input#Speed').val();
        vehicle.Length = $('input#Length').val();
        vehicle.Count = $('input#Count').val();
        vehicle.Image = $('input#Image').val();
        var vehicleJson = JSON.stringify(vehicle);

        $('#indicator').show();
        $.post('Controller.php',
            {
                action: 'add_vehicle',
                vehicle: vehicleJson
            },
            function(data, textStatus) {
                getVehicleList(element);
                $('#indicator').hide();
            }, 
            "json"		
        );
    }
}