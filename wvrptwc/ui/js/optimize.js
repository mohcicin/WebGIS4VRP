function getOptimizeForm(element) { 
    var form = '<form class="control-group">';
     
    form += '<div class="input-prepend" style="font-size:14px">';	
    form += '<input type="hidden" id="Heuristic" name="Heuristic" value="" style="width:530px"/>';	
    form += '</div><br/>';  
    
    form += '<div class="input-prepend" style="font-size:14px">';
    form += '<input type="hidden" id="Vehicle" name="Vehicle" value="" style="width:530px"/>';	
    form += '</div><br/>';  
    
    form += '<div id="insertForm"> Trọng số alpha (%) ';    
    form += '<input type="text" id="Objective" name="Objective" data-slider-handle="custom" style="width:394px"/>';
    form += '</div>';
    
    form += '<div class="input-prepend" style="font-size:14px">';
    form += '<button type="button" id="execute" class="btn btn-primary"><i class="icon-ok icon-white"></i> Thực thi </button>';
    form += '</div></form>';    
    
    $('div#content').html(form);
    
    var heuristics = [];
    heuristics[0] = {id: "HC", text: "Leo đồi"};
    heuristics[1] = {id: "SA", text: "Luyện kim"};
    heuristics[2] = {id: "TS", text: "Tìm kiếm Tabu"};
    heuristics[3] = {id: "GA", text: "Di truyền"};
    
    $("#Objective").slider({step: 0.01, min: 0, max: 1.0, value: 0.7});
   
    $("#Heuristic").select2({
        placeholder: "Giải thuật tối ưu",
        data: heuristics
    });    
    
    var vehicles = [];
    $.post('Controller.php',
        {
            action: 'get_vehicles'				
        },
        function(data, textStatus) {
            $.each( data, function(index, vehicle){     
                vehicles[index] = {id: vehicle.ID, text: vehicle.Name};
            });
        }, 
        "json"		
    );
    
    $("#Vehicle").select2({
        placeholder: "Phương tiện sử dụng",
        data: vehicles
    });       
}

function addParameter(event){
    $('div#parameter').remove();
    if(event.val == "HC") {  
        var form = '<div id="parameter">';     
        form += '<div class="control-group">';
        form += '<input type="hidden" id="Selection" name="Selection" value="" style="width:530px"/>';	
        form += '</div>';  
  
        form += '<div class="control-group">';
        form += '<span class="add-on"> Số lần lặp </span>';
        form += '<input type="text" id="Generation" name="Generation" data-slider-handle="custom" style="width:450px" />';
        form += '</div>';
        
        form += '</div>';
        $('div#insertForm').prepend(form);
        
        var selections = [];
        selections[0] = {id: "Best", text: "Global Best (chọn lân cận tốt nhất)"};
        selections[1] = {id: "First", text: "First Best (chọn lân cận tốt hơn gần nhất)"};
        
        $("#Selection").select2({
            placeholder: "Chiến lược chọn lân cận",
            data: selections
        });  
        
        $("#Generation").slider({step: 1, min: 0, max: 200, value: 50});
    }
    else if (event.val == "SA"){
        var form = '<div id="parameter">';     
        form += '<div class="control-group">';
        form += '<input type="hidden" id="Selection" name="Selection" value="" style="width:530px"/>';	
        form += '</div>';  
  
        form += '<div class="control-group">';
        form += '<span class="add-on"> Số lần lặp </span>';
        form += '<input type="text" id="Generation" name="Generation" data-slider-handle="custom" style="width:450px"/>';
        form += '</div>';
        
        form += '<div class="control-group">';
        form += '<span class="add-on"> Nhiệt độ ban đầu </span>';
        form += '<input type="text" id="InitTemp" name="InitTemp" data-slider-handle="custom" style="width:448px" />';
        form += '</div>';        
        
        form += '</div>';
        $('div#insertForm').prepend(form);
        
        var selections = [];
        selections[0] = {id: 'Linear', text: "Hàm tuyến tính (Linear)"};
        selections[1] = {id: 'Exponent', text: "Hàm mũ (Exponent)"};
        
        $("#Selection").select2({
            placeholder: "Chiến lược giảm nhiệt độ",
            data: selections
        });          
                
        $("#Generation").slider({step: 1, min: 0, max: 2000, value: 1500});
        $("#InitTemp").slider({step: 0.1, min: 0.1, max: 2000, value: 100});
        
    }
    else if (event.val == "TS"){
        var form = '<div id="parameter">';     
        form += '<div class="control-group">';
        form += '<input type="hidden" id="Selection" name="Selection" value="" style="width:530px"/>';	
        form += '</div>';  
  
        form += '<div class="control-group">';
        form += '<span class="add-on"> Số lần lặp </span>';
        form += '<input type="text" id="Generation" name="Generation" data-slider-handle="custom" style="width:450px" />';
        form += '</div>';
        
        form += '<div class="control-group">';
        form += '<span class="add-on"> Kích thước Tabu </span>';
        form += '<input type="text" id="NumberList" name="NumberList" data-slider-handle="custom" style="width:407px" />';
        form += '</div>';
        
        
        form += '</div>';
        $('div#insertForm').prepend(form);
        
        var selections = [];
        selections[0] = {id: "Best", text: "Best Aspiration (chọn lân cận tốt nhất)"};
        selections[1] = {id: "No", text: "No Aspiration (chọn lân cận tự do)"};
        
        $("#Selection").select2({
            placeholder: "Chiến lược tuyển chọn vào danh sách Tabu",
            data: selections
        });  
        
        $("#Generation").slider({step: 1, min: 0, max: 2000, value: 1500});
        $("#NumberList").slider({step: 1, min: 0, max: 200, value: 50});
    }
    else if (event.val == "GA"){
        var form = '<div id="parameter">';     
        form += '<div class="control-group">';
        form += '<input type="hidden" id="Selection" name="Selection" value="" style="width:530px"/>';	
        form += '</div>';  
  
        form += '<div class="control-group">';
        form += '<span class="add-on"> Số thế hệ </span>';
        form += '<input type="text" id="Generation" name="Generation" data-slider-handle="custom" style="width:453px" />';
        form += '</div>';
        
        form += '<div class="control-group">';
        form += '<span class="add-on"> Số dân cư </span>';
        form += '<input type="text" id="NumberPop" name="NumberPop" data-slider-handle="custom" style="width:448px" />';
        form += '</div>';
        
        form += '<div class="control-group">';
        form += '<span class="add-on"> Tỷ lệ chọn lọc (%) </span>';
        form += '<input type="text" id="NaturalSelect" name="NaturalSelect" data-slider-handle="custom" style="width:400px" />';
        form += '</div>';
        
        form += '<div class="control-group">';
        form += '<span class="add-on"> Tỷ lệ ghép cặp (%) </span>';
        form += '<input type="text" id="Crossover" name="Crossover" data-slider-handle="custom" style="width:396px" />';
        form += '</div>';
        
        form += '<div class="control-group">';
        form += '<span class="add-on"> Tỷ lệ đột biến (%) </span>';
        form += '<input type="text" id="Mutation" name="Mutation" data-slider-handle="custom" style="width:403px" />';
        form += '</div>';
        
        form += '</div>';
        $('div#insertForm').prepend(form);
        
        var selections = [];
        selections[0] = {id: "Rank", text: "Chọn lọc theo thứ hạng"};
        selections[1] = {id: "Weigth", text: "Chọn lọc theo trọng số"};
        
        $("#Selection").select2({
            placeholder: "Chiến lược chọn lọc tự nhiên",
            data: selections
        });  
        
        $("#Generation").slider({step: 1, min: 0, max: 100, value: 50});
        $("#NumberPop").slider({step: 1, min: 0, max: 200, value: 50});
        $("#NaturalSelect").slider({step: 1, min: 0, max: 100, value: 50});
        $("#Crossover").slider({step: 1, min: 0, max: 100, value: 80});
        $("#Mutation").slider({step: 1, min: 0, max: 100, value: 5});
    }
}

function addThreshold(event){
    if($("input#Heuristic").val() == "SA" ) 
    {
        $("#ThresholdControl").remove(); $("#RatioControl").remove();       
        if(event.val == 'Linear'){
            var form = '<div class="control-group" id="ThresholdControl">';
            form += '<span class="add-on"> Ngưỡng nhiệt độ </span>';
            form += '<input type="text" id="Threshold" name="Threshold" data-slider-handle="custom" style="width:407px"/>';
            form += '</div>';

            form += '<div class="control-group" id = "RatioControl">';
            form += '<span class="add-on"> Lượng giảm </span>';
            form += '<input type="text" id="Ratio" name="Ratio" data-slider-handle="custom" style="width:437px"/>';
            form += '</div>';
            $("#parameter").append(form);
            $("#Threshold").slider({step: 0.01, min: 0, max: 20, value: 0.1});
            $("#Ratio").slider({step: 0.01, min: 0.01, max: 20});        
        }
        else if (event.val == 'Exponent') {
            var form = '<div class="control-group" id="ThresholdControl">';
            form += '<span class="add-on"> Ngưỡng nhiệt độ </span>';
            form += '<input type="text" id="Threshold" name="Threshold" data-slider-handle="custom" style="width:407px"/>';
            form += '</div>';

            form += '<div class="control-group" id = "RatioControl">';
            form += '<span class="add-on"> Tỷ lệ giảm </span>';
            form += '<input type="text" id="Ratio" name="Ratio" data-slider-handle="custom" style="width:449px"/>';
            form += '</div>';
            $("#parameter").append(form);
            $("#Threshold").slider({step: 0.01, min: 0, max: 20, value: 0});
            $("#Ratio").slider({step: 0.01, min: 0.01, max: 1, value: 0.98});
        }
    }
}

function checkExecuteForm() {
    var error = "";
    if($('input#Heuristic').val() === ''){
        error += "Giải thuật tối ưu chưa được chọn <br/>";
    }
    if($('input#Vehicle').val() === ''){
        error += "Phương tiện chưa được chọn <br/>";
    }
    if($('input#Selection').val() === ''){
        error += "Chiến lược chưa được thiết lập <br/>";
    }
    return error;
}

function execute(element) {
    if(errorInfo(element) === "") {
        getMarkers(element);
        $('#indicator').show();  
        var problem = new Object();
        problem.Heuristic = $('input#Heuristic').val();
        problem.Vehicle = parseInt($('input#Vehicle').val());
        problem.Objective = $('input#Objective').data('slider').getValue();
        problem.Selection = $('input#Selection').val();
        problem.Generation = $('input#Generation').data('slider').getValue();

        if( problem.Heuristic === 'SA' ) {
            problem.InitTemp = $('input#InitTemp').data('slider').getValue();
            problem.Threshold = $('input#Threshold').data('slider').getValue();
            problem.Ratio = $('input#Ratio').data('slider').getValue();
        }
        else if (problem.Heuristic === 'TS') {
            problem.NumberList = $('input#NumberList').data('slider').getValue();
        }
        else if (problem.Heuristic === 'GA') {
            problem.NumberPop = $('input#NumberPop').data('slider').getValue();
            problem.NaturalSelect = $('input#NaturalSelect').data('slider').getValue();
            problem.Crossover = $('input#Crossover').data('slider').getValue();
            problem.Mutation = $('input#Mutation').data('slider').getValue();
        }

        var problemJson = JSON.stringify(problem);

        $.post('Controller.php',
            {
                action: 'execute',
                data: problemJson
            },
            function(data, textStatus) {
                renderResult(data);
                $.get('log', function(data) 
                {
                    $('#googleMap').show();        
                    google.maps.event.trigger(map, 'resize');                    
                    map.setCenter( bound.getCenter() );  
                    
                    var result = $.csv.toArrays(data);
                    cache = [];
                    var route = [];
                    for(var i = 1; i < result.length; i++) {
                        route.push(new google.maps.LatLng(result[i][2],result[i][1]));
                        //route.push(result[i][16]);
                        if(result[i][13] == 0 && route.length > 1) {
                            cache.push(route);
                            route = [];
                        }
                    }
                    $('#indicator').hide();
                });
            }, 
            "json"		
        );
    }    
}
function renderResult(info) { 
    var html = '<table width="600" cellpadding="4" class="table table-hover table-bordered"><thead><tr>\n\
            <th scope="col">Thuộc tính</th><th scope="col">Tên biến</th>\n\
            <th scope="col">Giá trị</th><th scope="col">Đơn vị</th>\n\
            </tr></thead><tbody>';
    html += '<tr>';
    html += '<td>Hàm mục tiêu toàn cục</td>';
    html += '<td>Fitness</td>';
    html += '<td>'+info["Fitness"]+'</td>';
    html += '<td>phút</td>';
    html += '</tr>';
    
    html += '<tr>';
    html += '<td>Tổng quảng đường di chuyển</td>';
    html += '<td>Length</td>';
    html += '<td>'+info["Dist"]+'</td>';
    html += '<td>km</td>';
    html += '</tr>';
    
    html += '<tr>';
    html += '<td>Tổng thời gian di chuyển</td>';
    html += '<td>MovingTime</td>';
    html += '<td>'+info["Move"]+'</td>';
    html += '<td>phút</td>';
    html += '</tr>';

    html += '<tr>';
    html += '<td>Tổng thời gian đợi</td>';
    html += '<td>WaitingTime</td>';
    html += '<td>'+info["Wait"]+'</td>';
    html += '<td>phút</td>';
    html += '</tr>';	
    
    
    html += '<tr>';
    html += '<td>Số phương tiện sử dụng</td>';
    html += '<td>Vehicle</td>';
    html += '<td>'+info["Vehicle"]+'</td>';
    html += '<td>chiếc</td>';
    html += '</tr>';
    
    html += '</tbody></table>';
    html += '<div class="control-group">';
    html += '<div class="btn-group">';	 
    var num = parseInt(info["Vehicle"]);
    for(var i = 0; i < num; i++ ) {
        html += '<button type="button" class="btn btn-default" id="route" value="'+i+'">Tuyến '+ (i+1) +'</button>';
        if( (i+1) % 10 === 0 && num > i ) {
            html += '</div></div>';
            html += '<div class="control-group">';
            html += '<div class="btn-group">';	
        }
    }
    html += '</div></div>';
    $('div#content').html(html);
}

function getRoute(element) { 
    var index = $(element).val();    
    showRoute(cache[index],"red");
}