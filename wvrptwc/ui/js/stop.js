function getStopList(element) {

    $('#indicator').show();

    $.post('Controller.php',
        {
            action: 'get_stops'				
        },
        function(data, textStatus) {
            cache = data;
            renderStopList(data);
            $('#indicator').hide();
        }, 
        "json"		
    );
}

function renderStopList(jsonData) {
	       
    var html = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr>\n\
            <th scope="col">Loại trạm</th>\n\
            <th scope="col">Thời gian xử lý</th>\n\
            <th scope="col">Hình ảnh</th></tr></thead><tbody>';

    $.each( jsonData, function( index, stop){     
        html += '<tr>';
        html += '<td class="edit" field="Name" stop_id="'+stop.ID+'">'+stop.Name+'</td>';
        html += '<td class="edit" field="Engine" stop_id="'+stop.ID+'">'+stop.ServiceTime+'</td>';
        html += '<td class="edit" field="Image" stop_id="'+stop.ID+'">'+stop.Image+'</td>';          
        html += '</tr>';
    });
    
    html += '</tbody></table>';

    $('div#content').html(html);
}
