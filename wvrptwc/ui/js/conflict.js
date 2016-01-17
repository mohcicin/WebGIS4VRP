function getConflictMatrix(element) {

    $('#indicator').show();

    $.post('Controller.php',
        {
            action: 'get_conflicts'				
        },
        function(data, textStatus) {
            renderConflictMatrix(data);
            $('#indicator').hide();
        }, 
        "json"		
    );
}

function renderConflictMatrix(jsonData) {

    var conflictMatrix = [];
    var html = '<table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col"></th>';
    $.each( cache, function( index, waste) {  
        html += '<th scope="col">' + waste.Name + '</th>';   
        conflictMatrix[waste.ID] = [];
    });
    html += '<tbody>';

    $.each( jsonData, function( index, conflict){     
        conflictMatrix[conflict.A][conflict.B] = conflict.ID;
        conflictMatrix[conflict.B][conflict.A] = conflict.ID;
    });
    
    $.each( cache, function( index, A) {  
        html += '<tr>';
        html += '<td><b>' + A.Name + '</b></td>';
        $.each( cache, function( jndex, B) {  
            var id = conflictMatrix[A.ID][B.ID];
            if(id == null) {
                html += '<td class="edit" field="Conflict" conflict_id="">0</td>';
            }
            else {
                html += '<td class="edit" field="Conflict" conflict_id="' + id +'">1</td>';
            }
        });
        html += '</tr>';
    });
   
    html += '</tbody></table>';

    $('div#content').html(html);
    
}