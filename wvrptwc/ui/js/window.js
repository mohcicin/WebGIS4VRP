function getWindowList(element) {
    
    $('#indicator').show();
    
    $.post('Controller.php',
        {
            action: 'get_windows'				
        },
        function(data, textStatus) {
            cache = data;
            renderWindowList(data);
            $('#indicator').hide();
        }, 
        "json"		
    );
}

function getCreateWindowForm(element) {
    var form = '<div class="input-prepend">';
    form += '<span class="add-on" style="width:120px"> Khung thời gian</span>';
    form += '<input type="text" id="Name" name="Name" value="" class="input-xlarge" style="width:295px" />';		
    form += '</div><br/><br/>';  
  
    form += '<div class="input-prepend">';
    form += '<span class="add-on"> <i class="icon-time"></i> Sớm nhất </span>';
    form += '<input type="text" id="EarlyTime" name="EarlyTime" value="" class="input-xlarge" style="width:80px"/>';	  
    form += '</div>';
    
    form += '<div class="input-prepend">';
    form += '<span class="add-on"><i class="icon-time"></i> Muộn nhất </span>';
    form += '<input type="text" id="LateTime" name="LateTime" value="" class="input-xlarge" style="width:80px"/>';		  
    form += '</div><br/><br/>';    
   
    form += '<div class="control-group">';		
    form += '<button type="button" id="add_window" class="btn btn-primary"><i class="icon-ok icon-white"></i> Thêm khung thời gian mới </button>';
    form += '</div>';

    $('div#content').html(form);  
    
        
    $('#Name').typeahead({
        source: function (query, process) {
            data = []; 
            $.each(cache, function (index, window) {
                data.push(window.Name);
            }); 
            process(data);
        }
    });
    $('#EarlyTime').timepicker({
        defaultTime: '06:00',
        showMeridian: false
    });
    $('#LateTime').timepicker({
        defaultTime: '18:00',
        showMeridian: false
    });
    
}

function renderWindowList(jsonData) {
    var html = '<div class="control-group">';
    html += '<div class="btn-group">';	    
    html += '<button type="button" id="create_window_form" class="btn btn-primary"> <i class="icon-plus icon-white"></i> Thêm khung thời gian mới</button>';
    html += '</div></div>';
    
    html += '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr>\n\
            <th scope="col">Khung thời gian</th>\n\
            <th scope="col">Bắt đầu</th>\n\
            <th scope="col">Kết thúc</th><th scope="col"</th></tr></thead><tbody>';

    $.each( jsonData, function( index, window){     
        html += '<tr>';
        html += '<td class="edit" field="Name" window_id="'+window.ID+'">'+window.Name+'</td>';
        html += '<td class="edit" field="EarlyTime" window_id="'+window.ID+'">'+window.EarlyTime+'</td>';
        html += '<td class="edit" field="LateTime" window_id="'+window.ID+'">'+window.LateTime+'</td>';      
        html += '<td><a href="javascript:void(0);" window_name="'+window.Name+'" window_id="'+window.ID+'" class="delete_confirm btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
        html += '</tr>';
    });
    
    html += '</tbody></table>';

    $('div#content').html(html);
}

function addWindow(element) {	
    if(errorInfo(element) ==="")
    {
        var window = new Object();
        window.Name = $('input#Name').val();
        window.EarlyTime = $('input#EarlyTime').val();
        window.LateTime = $('input#LateTime').val();
        var windowJson = JSON.stringify(window);

        $('#indicator').show();
        $.post('Controller.php',
            {
                action: 'add_window',
                window: windowJson
            },
            function(data, textStatus) {
                getWindowList(element);
                $('#indicator').hide();
            }, 
            "json"		
        );
    }
}

function deleteWindow(element) {	
    
    var window = new Object();
    window.ID = $("#delete_window").val();

    var windowJson = JSON.stringify(window);

    $.post('Controller.php',
        {
            action: 'delete_window',
            window: windowJson
        },
        function(data, textStatus) {
            getWindowList(element);
            $("#delete_info").modal("hide");
        }, 
        "json"		
    );	
}

function checkWindowForm() {
    var error = "";

    if($.trim($('input#Name').val()) === ''){
        error += "Tên loại rác không thể là rỗng <br/>";
    }  
    
    var earlyTime = $.timeParse($('input#EarlyTime').val());
    var lateTime = $.timeParse($('input#LateTime').val());
    if(lateTime.getTime() < earlyTime.getTime()) {
        error += "Khung thời gian đã bị thiết lập sai <br/>";
    }
    return error;
}