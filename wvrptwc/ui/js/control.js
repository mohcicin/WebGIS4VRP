var cache = null;
$(function() {    
    $(document).on("click", "a", function(){ $("#googleMap").hide(); });
    $(document).on("click", "a#vehicle_list", function(){ getVehicleList(this); });
    $(document).on("click", "a#stop_list", function(){ getStopList(this); });
    $(document).on("click", "a#waste_list", function(){ getWasteList(this); });
    $(document).on("click", "a#location_list", function(){ getLocationList(this); });
    $(document).on("click", "a#service_list", function(){ getServiceList(this); });
    $(document).on("click", "a#window_list", function(){ getWindowList(this); });    
    $(document).on("click", "a#optimize_form", function(){ getOptimizeForm(this); });       
    $(document).on("click", "button#route", function(){ getRoute(this); });
    
    $(document).on("click", "button#conflict_matrix", function(){ getConflictMatrix(this); });
    $(document).on("click", "button#distance_matrix", function(){ getDistanceMatrix(this); });
    
    $(document).on("click", "button#create_vehicle_form", function(){ getCreateVehicleForm(this); });
    $(document).on("click", "button#create_waste_form", function(){ getCreateWasteForm(this); });
    $(document).on("click", "button#create_location_form", function(){ getCreateLocationForm(this); });
    $(document).on("click", "button#create_window_form", function(){ getCreateWindowForm(this); });
    $(document).on("click", "button#create_service_form", function(){ getCreateServiceForm(this); });
    
    $(document).on("click", "a.delete_confirm", function(){ deleteConfirmation(this); });
    $(document).on("click", "#delete_vehicle", function(){ deleteVehicle(this); });
    $(document).on("click", "#delete_waste", function(){ deleteWaste(this); });
    $(document).on("click", "#delete_location", function(){ deleteLocation(this); });
    $(document).on("click", "#delete_service", function(){ deleteService(this); });
    $(document).on("click", "#delete_conflict", function(){ deleteConflict(this); });
    $(document).on("click", "#delete_window", function(){ deleteWindow(this); });
    
    $(document).on("click", "button#add_vehicle", function(){ addVehicle(this); });
    $(document).on("click", "button#add_waste", function(){ addWaste(this); });
    $(document).on("click", "button#add_window", function(){ addWindow(this); });
    $(document).on("click", "button#add_service", function(){ addService(this); });
    $(document).on("click", "button#execute", function(){ execute(this); });
    $(document).on("change", "#Heuristic", function(event){addParameter(event);});
    $(document).on("change", "#Selection", function(event){addThreshold(event);});
    
    //$(document).on("dblclick", "td.edit", function(){ makeEditable(this); });
    //$(document).on("blur", "input#editbox", function(){ removeEditable(this); });
  
    google.maps.event.addDomListener(window, 'load', map_initialize);
    
});

//function removeEditable(element) { 
//	
//    $('#indicator').show();
//
//    var User = new Object();
//    User.ID = $('.current').attr('user_id');		
//    User.field = $('.current').attr('field');
//    User.newvalue = $(element).val();
//
//    var userJson = JSON.stringify(User);
//
//    $.post('Controller.php',
//        {
//            action: 'update_field_data',			
//            user: userJson
//        },
//        function(data, textStatus) {
//            $('td.current').html($(element).val());
//            $('.current').removeClass('current');
//            $('#indicator').hide();			
//        }, 
//        "json"		
//    );	
//}

//function makeEditable(element) { 
//    $(element).html('<input id="editbox" size="'+  $(element).text().length +'" type="text" value="'+ $(element).text() +'">');  
//    $('#editbox').focus();
//    $(element).addClass('current'); 
//}

function errorInfo(element) {	
    var error = "";
    if ($(element).attr("id")==="add_vehicle") {         
        error += checkVehicleForm();
    }
    else if($(element).attr('id')==="add_waste") {
        error += checkWasteForm();
    }    
    else if($(element).attr('id')==="add_location") {
        error += checkLocationForm();
    }
    else if($(element).attr('id')==="add_window") {
        error += checkWindowForm();
    }
    else if($(element).attr('id')==="add_service") {
        error += checkServiceForm();
    }    
    else if($(element).attr('id')==="add_matrix") {
        error += checkDistanceMatrixForm();
    }    
    else if($(element).attr('id')==="execute") {
        error += checkExecuteForm();
    }
    
    if(error!=="") {
        $("#error_info .modal-body p").html(error);
        $("#error_info").modal("show");    
    }
    return error;
}

function deleteConfirmation(element) {	
    if ($(element).attr('vehicle_id')) { 
        $("#delete_info #modal-label").text('Xóa phương tiện "' + $(element).attr('vehicle_name')+'"');
        $("#delete_info").modal("show");    
        $("button.delete").attr("id","delete_vehicle");
        $("#delete_vehicle").val($(element).attr('vehicle_id'));
    }
    else if($(element).attr('waste_id')) {
        $("#delete_info #modal-label").text('Xóa loại chất thải "' + $(element).attr('waste_name')+'"');        
        $("button.delete").attr("id","delete_waste");
        $("#delete_waste").val($(element).attr('waste_id'));
        $("#delete_info").modal("show");
        
    }
    else if($(element).attr('location_id')) {
        $("#delete_info #modal-label").text('Xóa vị trí "' + $(element).attr('location_name')+'"');
        $("#delete_info").modal("show");
        $("button.delete").attr("id","delete_location");
        $("#delete_location").val($(element).attr('location_id'));
    }
    else if($(element).attr('window_id')) {
        $("#delete_info #modal-label").text('Xóa khung thời gian "' + $(element).attr('window_name')+'"');
        $("#delete_info").modal("show");
        $("button.delete").attr("id","delete_window");
        $("#delete_window").val($(element).attr('window_id'));
    }
    else if($(element).attr('service_id')) {
        $("#delete_info #modal-label").text('Xóa đơn hàng "' + $(element).attr('service_name')+'"');
        $("#delete_info").modal("show");
        $("button.delete").attr("id","delete_service");
        $("#delete_service").val($(element).attr('service_id'));
    }   
    
}




