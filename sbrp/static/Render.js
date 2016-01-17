function Render() {
    google.load('visualization', '1.1', { packages:['controls'] });
    this.Map = null;
    this.MapCenter = [10.758599, 106.663969];
    this.StartPoint = null;
    this.TargetPoint = null;
    this.Markers = [];
    this.Planing = null;
    this.Routing = null;
    this.ModelEditor = null;

};

Render.prototype.ClearMarker = function() {
    for (var i in this.Markers) {
        this.Map.removeLayer(this.Markers[i]);
    }
    this.Markers = [];
};

Render.prototype.InitMap = function() {
    this.Map = L.map('map').setView(this.MapCenter, 12);
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, ' +
        'Imagery © <a href="http://mapbox.com">Mapbox</a>,',
        id: 'tieuminh2510.knldj0oc'
    }).addTo(this.Map);
    L.control.scale({position: 'bottomleft'}).addTo(this.Map);
    this.CreateMarker();
    this.Map.on('click', this.InsertMarker);


};

Render.prototype.InitConstraint = function() {
    $('#contraintTab').hide();

    $("#r1").slider();
    $("#r1").slider("disable");
    $("#r1-enabled").click(function() {
        if(this.checked) {
            $("#r1").slider("enable");
        }
        else {
            $("#r1").slider("disable");
        }
    });

    $("#r2").selectpicker('hide');
    $("#r2-enabled").click(function() {
        if(this.checked) {
            $("#r2").empty();
            for(var id in problem.Stops) {
                var stop = problem.Stop(id);
                $("#r2").append("<option>"+stop.ID+"</option>");
            }
            $("#r2").selectpicker('refresh');
            $("#r2").selectpicker('show');

        }
        else {
            $("#r2").selectpicker('hide');
        }
    });

    $("#r3").selectpicker('hide');
    $("#r3-enabled").click(function() {
        if(this.checked) {
            $("#r3").empty();
            for(var id in problem.Routes) {
                var route = problem.Route(id);
                $("#r3").append("<option>"+route.ID+"</option>");
            }
            $("#r3").selectpicker('refresh');
            $("#r3").selectpicker('show');
        }
        else {
            $("#r3").selectpicker('hide');
        }
    });

    $("#r4").selectpicker('hide');
    $("#r4-enabled").click(function() {
        if(this.checked) {
            $("#r4").empty();
            for(var id in problem.Stops) {
                var stop = problem.Stop(id);
                $("#r4").append("<option>"+stop.ID+"</option>");
            }
            $("#r4").selectpicker('refresh');
            $("#r4").selectpicker('show');

        }
        else {
            $("#r4").selectpicker('hide');
        }
    });

    $("#r5").selectpicker('hide');
    $("#r5-enabled").click(function() {
        if(this.checked) {
            $("#r5").empty();
            for(var id in problem.Routes) {
                var route = problem.Route(id);
                $("#r5").append("<option>"+route.ID+"</option>");
            }
            $("#r5").selectpicker('refresh');
            $("#r5").selectpicker('show');
        }
        else {
            $("#r5").selectpicker('hide');
        }
    });


}

Render.prototype.InitMathProg = function() {
    this.ModelEditor = CodeMirror.fromTextArea(
        document.getElementById("editor"), {
        lineNumbers: true,
        lineWrapping: true,
        mode: 'mathprog'
    });

    this.ModelEditor.markClean();
};

Render.prototype.CreateMarker = function() {

    var num = problem.NumStop;

    var busIcon = L.icon({
        iconUrl: 'lib/images/busstop.png',
        iconSize: [8, 8]
    });

    for(var i in problem.Stops) {
        var stop = problem.Stops[i];
        var marker = L.marker([stop.lat, stop.lon], {icon: busIcon, zIndexOffset: 1000}).addTo(this.Map).bindLabel(i);
        this.Markers.push(marker);
    }
};

Render.prototype.Clear = function() {
    $('#filterDiv').html('');
    $('#tableDiv').html('');
    $('#contraintTab').hide();
    $("#mathProgTab").hide();
    $("#map").hide();
};

Render.prototype.LeafletMap = function() {
    this.Clear();
    $("#map").show();
};

Render.prototype.ContraintControl = function() {
    this.Clear();
    $("#r1-enabled").attr('checked', false);
    $("#r1").slider("disable");
    $("#r2-enabled").attr('checked', false);
    $("#r2").selectpicker('deselectAll');
    $("#r2").selectpicker('hide');
    $("#r3-enabled").attr('checked', false);
    $("#r3").selectpicker('deselectAll');
    $("#r3").selectpicker('hide');
    $("#r4-enabled").attr('checked', false);
    $("#r4").selectpicker('deselectAll');
    $("#r4").selectpicker('hide');
    $("#r5-enabled").attr('checked', false);
    $("#r5").selectpicker('deselectAll');
    $("#r5").selectpicker('hide');
    $('#contraintTab').show();
};

Render.prototype.RouteControl = function() {
    this.Clear();

    var data = new google.visualization.DataTable();
    data.addColumn({type:'number', label:'No'});
    data.addColumn({type:'string', label:'ID'});
    data.addColumn({type:'string', label:'Tên tuyến'});
    data.addColumn({type:'string', label:'Lộ trình'});


    for(var id in problem.Routes) {
        var route = problem.Route(id);
        data.addRow([route.No, route.ID, route.Name, route.Stops.toString().replace(/,/g," => ")]);
    }

    var filter = new google.visualization.ControlWrapper({
        'controlType': 'StringFilter',
        'containerId': 'filterDiv',
        'options': {'filterColumnLabel': 'Lộ trình'}
    });

    var table = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'tableDiv'
    });

    var dashboard = new google.visualization.Dashboard(document.getElementById('locationTab'));
    dashboard.bind(filter,table);
    dashboard.draw(data);
};

Render.prototype.StopControl = function() {
    this.Clear();

    var data = new google.visualization.DataTable();
    data.addColumn({type:'number', label:'No'});
    data.addColumn({type:'string', label:'ID'});
    data.addColumn({type:'string', label:'Tên trạm'});
    data.addColumn({type:'string', label:'Tuyến'});
    data.addColumn({type:'number', label:'Kinh độ'});
    data.addColumn({type:'number', label:'Vĩ độ'});
    data.addColumn({type:'string', label:'Địa chỉ'});


    for(var id in problem.Stops) {
        var stop = problem.Stop(id);
        data.addRow([stop.No, stop.ID, stop.Name, stop.Routes.toString(), stop.Lon, stop.Lat, stop.Adrs]);
    }

    var filter = new google.visualization.ControlWrapper({
        'controlType': 'StringFilter',
        'containerId': 'filterDiv',
        'options': {'filterColumnLabel': 'Tuyến'}
    });

    var table = new google.visualization.ChartWrapper({
        'chartType': 'Table',
        'containerId': 'tableDiv'
    });

    var dashboard = new google.visualization.Dashboard(document.getElementById('locationTab'));
    dashboard.bind(filter,table);
    dashboard.draw(data);
};

// Hy sinh tinh huong doi tuong de doi lay thoi gian thuc hien
Render.prototype.InsertMarker = function(position) {
    if(!render.StartPoint) {
        render.StartPoint = L.marker(position.latlng,{draggable: 'true'}).addTo(render.Map).bindPopup("Nơi xuất phát").openPopup();
    } else if (!render.TargetPoint) {
        render.TargetPoint = L.marker(position.latlng,{draggable: 'true'}).addTo(render.Map).bindPopup("Nơi đến").openPopup();
    }
};

Render.prototype.Reload = function() {
    problem.Init();
    render.ClearMarker();
    render.CreateMarker();
    render.InitConstraint();
    var id = $(".active a").attr("id");
    if(id == "location") {
        this.StopControl();
    }
    else if (id == "route") {
        this.RouteControl();
    }
    else if (id == "optimize") {
        this.MathProg();
        this.MathModel();
    }
    else if(id == "contraint") {
        this.ContraintControl();
    }
};

Render.prototype.MathProg = function() {
    this.Clear();
    $("#mathProgTab").show();
    var code = problem.MathProgModel();
    code += problem.MathProgData();
    this.ModelEditor.setValue(code);
};

Render.prototype.Log = function(message) {
    $('#logContent').append(message+"\n");
};

Render.prototype.Output = function(value, filename){
    $('#outputContent').append(value);
};

Render.prototype.MathModel = function () {
    var modelName = "";
    if(fitness=="time") {
        modelName = "model1";
    }
    else if(fitness == "dist") {
        modelName = "model2"
    }
    else if(fitness == "walk") {
        modelName = "model3"
    }
    $.get(dataDir + modelName + ".html", function(data) {
        $('#mathModel').html(data);
        MathJax.Hub.Queue(["Typeset",MathJax.Hub,document.getElementById('mathModel')]);
    });
};

Render.prototype.LogClear = function (  ) {
    $('#logContent').html("");
};

Render.prototype.Error = function ( message ) {
    message = "<p style='color:red'>" + message+"\n" +"</p>";
    $('#logContent').append(message);
};

Render.prototype.RoutingMap = function ( data ) {
    var route = [];
    route.push(render.StartPoint._latlng);
    var index = start; 
    var count = 1;
    var info = "";
	var num = 0;
	var name = [];
	var cache = [];
    while(index != finish) {
		var stop = problem.Stop(problem.ID[data[index]]);
		
		if(cache.length == 0) {
			for(var i in stop.Routes)
				cache.push(stop.Routes[i]);
			num++;
		} else {
			var tmp = [];
			for(var i in stop.Routes) {
				if(cache.indexOf(stop.Routes[i]) > -1) {
					tmp.push(stop.Routes[i]);
				} 
			}
			cache = tmp;
		}
		
		
//        if (problem.ID[index] == "ÐTC E") {
//            stop = problem.Stop("ÐTC D");
//        }
        route[count] = L.latLng(stop.Lat, stop.Lon);
        info += problem.ID[index] + " => ";
        index = parseInt(data[index]);
        count++;
    }
    info += problem.ID[finish];
	var stop = problem.Stop(problem.ID[finish]);
	route[count] = L.latLng(stop.Lat, stop.Lon);
    if (problem.ID[finish] == "ÐTC E") {
        stop = problem.Stop("ÐTC D");
        route[count] = L.latLng(stop.Lat, stop.Lon);
    }
    route.push(render.TargetPoint._latlng);  
	this.Log("Số trạm: " + count );	
    this.Log("Số tuyến: " + num );
    this.Log("Lộ trình: Start => " + info + " => End");
    if(this.Routing) {
        this.Map.removeLayer(this.Routing);
        this.Map.removeLayer(this.Planing);
        $(".leaflet-routing-container").remove();
    }
    this.Planing = L.Routing.plan(route, {
        createMarker: function() {},
        geocoder: L.Control.Geocoder.nominatim(),
        draggableWaypoints: false,
        addWaypoints: false
    });
    this.Routing = L.Routing.control({
        plan: this.Planing
    }).addTo(this.Map);

};
