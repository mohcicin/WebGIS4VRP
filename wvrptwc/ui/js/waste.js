function getWasteList(element) {

    $('#indicator').show();

    $.post('Controller.php',
        {
            action: 'get_wastes'				
        },
        function(data, textStatus) {
            cache = data;
            renderWasteList(data);
            $('#indicator').hide();
        }, 
        "json"		
    );
}

function deleteWaste(element) {	
    
    var waste = new Object();
    waste.ID = $("#delete_waste").val();

    var wasteJson = JSON.stringify(waste);

    $.post('Controller.php',
        {
            action: 'delete_waste',
            waste: wasteJson
        },
        function(data, textStatus) {
            getWasteList(element);
            $("#delete_info").modal("hide");
        }, 
        "json"		
    );	
}

function getCreateWasteForm(element) 
{
    var form = '<div class="input-prepend">';
    form += '<span class="add-on"> Loại rác</span>';
    form += '<input type="text" id="Name" name="Name" value="" class="input-xlarge" />';		
    form += '</div><br/><br/>';  
  
    form += '<div class="input-prepend" style="font-size:14px">';
    form += '<input type="hidden" id="Conflict" name="Conflict" value="" class="input-xlarge" style="width:385px"/>';		  
    form += '</div><br/><br/>';
    
    form += '<div class="input-prepend">';
    form += '<span class="add-on"> Hình ảnh</span>';
    form += '<input type="text" id="Image" name="Image" value="" class="input-xlarge" />';
    form += '</div><br/><br/>';  

    form += '<div class="control-group">';		
    form += '<button type="button" id="add_waste" class="btn btn-primary"><i class="icon-ok icon-white"></i> Thêm loại chất thải mới </button>';
    form += '</div>';

    $('div#content').html(form);     
    
    $('#Name').typeahead({
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, waste) {
                data.push(waste.Name);
            }); 
            process(data);
        }
    });
    
    var wastes = [];
    $.each( cache, function(index, waste){     
        wastes[index] = {id: waste.ID, text: waste.Name};
    });
    $("#Conflict").select2({
        placeholder: "Chọn các loại chất thải xung đột",
        multiple: true,
        data: wastes
    });
    
}

function renderWasteList(jsonData) 
{   
    var html = '<div class="control-group">';
    html += '<div class="btn-group">';	    
    html += '<button type="button" id="create_waste_form" class="btn btn-primary"> <i class="icon-plus icon-white"></i> Thêm loại chất thải mới</button>';
    html += '<button type="button" id="conflict_matrix" class="btn btn-default"> <i class="icon-th-large icon-black"></i> Xem thông tin xung đột giữa các loại chất</button>';
    html += '</div></div>';
	       
    html += '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr>\n\
            <th scope="col">Loại rác</th><th scope="col">Hình ảnh</th><th scope="col"></th></tr></thead><tbody>';


    $.each( jsonData, function( index, waste){     
        html += '<tr>';
        html += '<td class="edit" field="Name" waste_id="'+waste.ID+'">'+waste.Name+'</td>';
        html += '<td class="edit" field="Image" waste_id="'+waste.ID+'">'+waste.Image+'</td>';           
        html += '<td><a href="javascript:void(0);" waste_name="'+waste.Name+'" waste_id="'+waste.ID+'" class="delete_confirm btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
        html += '</tr>';
    });
    
    html += '</tbody></table>';

    $('div#content').html(html);
}

function checkWasteForm() {
    var error = "";
    if($.trim($('input#Name').val()) === ''){
        error += "Tên loại rác không thể là rỗng <br/>";
    }       
    return error;
}	

function addWaste(element) {	
    if(errorInfo(element) ==="")
    {
        var waste = new Object();
        waste.Name = $('input#Name').val();
        waste.Conflict = $('input#Conflict').val();
        waste.Image = $('input#Image').val();
        var wasteJson = JSON.stringify(waste);

        $('#indicator').show();
        $.post('Controller.php',
            {
                action: 'add_waste',
                waste: wasteJson
            },
            function(data, textStatus) {
                getWasteList(element);
                $('#indicator').hide();
            }, 
            "json"		
        );
    }
}