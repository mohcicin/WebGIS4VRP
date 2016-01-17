function Problem() {};
Problem.prototype.Solve = function(data) {
    $.post(dataDir + 'Solver.php',
       {
           mod: data
       },
       function() {
            var info = load("info");
			if(info) {
				render.Log("Tổng quảng đường di chuyển (km): " + ((info["distance"] + problem.WalkDistance())/1000));
				render.Log("Quảng đường đi bộ (km): " + ((info["walk"] + problem.WalkDistance())/1000));
				render.Log("Thời gian di chuyển (phút): " + (info["time"] + problem.WalkDistance()/1000/walkSpeed*60));
				render.RoutingMap(info);
				render.Log("-------------------------------------------------------");
			} else {
				render.Log("Lời giải không được  tìm thấy trong điều kiện ràng buộc này !");
				render.Log("-------------------------------------------------------");
			}
       },
       "text"
    );
}
Problem.prototype.Init = function() {
    this.Stops = {};
    this.Routes = {};
    this.ID = {};
    var count = 0;
    for(var i in routes) {
        var id = i.replace("A","B");
        if(count < 2*numroute) {
            if(!this.Routes[i]) {
                this.Routes[i] = routes[i];
                count++;
            }
            if (!this.Routes[id]) {
                this.Routes[id] = routes[id];
                count++;
            }
        } else {
            break;
        }
    }
	
	count = 0;
	for(var i in this.Routes) {
		this.Routes[i].No = count;
        var _stops = this.Routes[i].stops;
        for(var j = 0; j < _stops.length; j++) {
            if(!this.Stops[_stops[j]]) {
                this.Stops[_stops[j]] =  stops[_stops[j]];
				this.Stops[_stops[j]]["Routes"] = [];
			} 
			this.Stops[_stops[j]]["Routes"].push(i);
        }
		count++;
    }
	
    count = 0;
    for(var i in this.Stops) {
		this.Stops[i].No = count;
        this.ID[i] = count;
        this.ID[count] = i;
        count++;
    }
}

Problem.prototype.MathProgModel = function() {
    var data = "set ID;\n";
    data += "param start symbolic, within ID;\n";
    data += "param finish symbolic, within ID, != start;\n";
    data += "param dist{ID, ID};\n";
    data += "param speed{ID, ID};\n";
    data += "param minute := 60/1000;\n";
    data += "param walkSpeed := " + walkSpeed + ";\n";
    data += "var x{ID, ID} binary;\n";
    data += "s.t. r{i in ID}: sum{j in ID} x[j,i] + (if i = start then 1) = \n";
    data += "\t\tsum{j in ID} x[i,j] + (if i = finish then 1);\n";


    if($('#r1-enabled')[0].checked) {
        var alpha =  $('#r1').data('slider').getValue();
        data += "param alpha := " + alpha + ";\n";
        data += "s.t. r1{i in ID}: sum{j in ID} x[j,i] * (if speed[i,j] = walkSpeed then 1 else 0) <= alpha;\n";
    }

    if($('#r2-enabled')[0].checked) {
        var stops =  $('#r2').val();
        var info = "";
        for(var index in stops) {
            info += this.Stop(stops[index]).No + " ";
        }
        if(info != "") {
            data += "set B := " + info + ";\n";
            data += "s.t. r2 {b in B}: sum{i in ID} x[i,b] = 0;\n";
        }
    }

    if($('#r3-enabled')[0].checked) {
        var routes =  $('#r3').val();
        for(var index in routes) {
            var info = "";
            var no = this.Route(routes[index]).No;
            var stops = this.Route(routes[index]).Stops;
            for(var jndex in stops) {
                info += this.Stop(stops[jndex]).No + " ";
            }
            data += "set C"+ no + " := " + info + ";\n";
            data +="s.t. r3"+ no +" {c in C"+ no +"}: sum{i in ID} x[i,c] = 0;\n";
        }
    }

    if($('#r4-enabled')[0].checked) {
        var stops =  $('#r4').val()
        var info = "";
        for(var index in stops) {
            info += this.Stop(stops[index]).No + " ";
        }
        if(info != "") {
            data += "set L := " + info + ";\n";
            data +="s.t. r4 {l in L}: sum{i in ID} x[i,l] >= 1;\n";
        }
    }

    if($('#r5-enabled')[0].checked) {
        var routes =  $('#r5').val();
        for(var index in routes) {
            var info = "";
            var no = this.Route(routes[index]).No;
            var stops = this.Route(routes[index]).Stops;
            for(var jndex in stops) {
                info += this.Stop(stops[jndex]).No + " ";
            }
            data += "set H"+ no + " := " + info + ";\n";
            data +="s.t. r5"+ no +" {h in H"+ no +"}: sum{i in ID} x[i,h] >= 1;\n";
        }
    }

    if(fitness=="dist") {
        data += "minimize fitness: sum{i in ID, j in ID} dist[i,j] * x[i,j];\n";
    }
    else if(fitness=="time") {
        data += "minimize fitness: sum{i in ID, j in ID} dist[i,j]/speed[i,j] * x[i,j] * minute;\n";
    }
    else if(fitness=="walk") {
        data += "minimize fitness: sum{i in ID, j in ID} dist[i,j] * x[i,j] * (if speed[i,j] = walkSpeed then 1 else 0);\n";
    }
    data += "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
    data += "solve;\n";
    data += "printf '{' >> 'info';\n";
    data += "printf{i in ID, j in ID: x[i,j]} '\"%d\":\"%d\",\\n',i, j >> 'info';\n";
    data += "printf '\"time\":%g,',sum{i in ID, j in ID} dist[i,j]/speed[i,j] * x[i,j] * minute >> 'info';\n";
    data += "printf '\"distance\":%g,',sum{i in ID, j in ID} dist[i,j]* x[i,j] >> 'info';\n";
    data += "printf '\"walk\":%g}',sum{i in ID, j in ID} dist[i,j]* x[i,j]* (if speed[i,j] = walkSpeed then 1 else 0) >> 'info';\n";   
    data += "\n";
    return data;
};

Problem.prototype.MathProgData = function() {

    var data = "data;\n";
    data += "param start := " + start + ";\n";
    data += "param finish := " + finish + ";\n";

    data += "set ID := ";
    for(var i in this.Stops) data += this.ID[i] + " ";
    data += ";\n";

    data += "param dist : ";
    for(var i in this.Stops) data += this.ID[i] + " ";
    data += ":=\n";

    for(var i in this.Stops) {
        data += this.ID[i] + " ";
        if(i != "ÐTC E") {
            for(var j in this.Stops) {
                data += distances[i][j] + " ";
            }
        } else {
            for(var j in this.Stops) {
                data += distances[j][i] + " ";
            }
        }
        data += "\n";
    }
    data +=";\n";
    
    data += "param speed : ";
    for(var i in this.Stops) data += this.ID[i] + " ";
    data += ":=\n";

    var speedMap = this.SpeedMap();
    for(var i in this.Stops) {
        data += this.ID[i] + " ";
        for(var j in this.Stops) {
            var speed = speedMap[i] && speedMap[i][j] ? busSpeed : walkSpeed;
            data += speed + " ";
        }
        data += "\n";
    }
    data +=";\n";
    
    return data;
};

Problem.prototype.SpeedMap = function() {
    var speedMap = {};
    for(var i in this.Routes) {
        var stops = this.Routes[i].stops;
        var preStop = stops[0];
        for(var j = 1; j < stops.length; j++) {
            if(!speedMap[preStop]) speedMap[preStop] = {};
            speedMap[preStop][stops[j]] = busSpeed;
            preStop = stops[j];
        }
    }
    return speedMap;
};

Problem.prototype.Stop = function(id) {
    var stop = {};
    stop["No"] = this.Stops[id].No;
    stop["ID"] = id;
    stop["Name"] =  this.Stops[id].name;
    stop["Adrs"] =  this.Stops[id].adrs;
	stop["Routes"] = this.Stops[id].Routes;
    stop["Lon"] =  parseFloat(this.Stops[id].lon);
    stop["Lat"] =  parseFloat(this.Stops[id].lat);
    return stop;
};

Problem.prototype.Route = function(id) {
    var route = {};
    route["No"] = this.Routes[id].No;
    route["ID"] = id;
    route["Name"] =  this.Routes[id].name;
	route["Stops"] = this.Routes[id].stops;
    return route;
};

Problem.prototype.NearestStartStop = function(from, to) {
    var min = Number.MAX_VALUE;
    var index = null;
	for(var i in this.Stops) {
		var dist = this.Distance(parseFloat(this.Stops[i].lat), from.lat,
                parseFloat(this.Stops[i].lon), from.lng);
		if(dist < min)
		{
			min = dist;
			index = i;
		}
	}
	return this.ID[index];
}
Problem.prototype.NearestFinishStop = function(to) {
    var min = Number.MAX_VALUE;
    var index = null;
	for(var i in this.Stops) {
		var dist = this.Distance(parseFloat(this.Stops[i].lat), to.lat,
                parseFloat(this.Stops[i].lon), to.lng);
		if(dist < min)
		{
			min = dist;
			index = i;
		}
	}
    return this.ID[index];
}

Problem.prototype.Distance = function(lat1, lat2, lon1, lon2) {
    var R = 6371000; // meter
    var Phi1 = lat1 * Math.PI / 180;
    var Phi2 = lat2 * Math.PI / 180;
    var DeltaPhi = (lat2 - lat1) * Math.PI / 180;
    var DeltaLambda = (lon2 - lon1) * Math.PI / 180;

    var a = Math.sin(DeltaPhi / 2) * Math.sin(DeltaPhi / 2)
        + Math.cos(Phi1) * Math.cos(Phi2) * Math.sin(DeltaLambda / 2)
        * Math.sin(DeltaLambda / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
};

Problem.prototype.WalkDistance = function() {
    var api = "http://router.project-osrm.org/table?";
    
    api += "&loc=";
    api += render.StartPoint._latlng.lat + ",";
    api += render.StartPoint._latlng.lng;
    
    api += "&loc=";
    api += problem.Stops[problem.ID[start]]["lat"] + ",";
    api += problem.Stops[problem.ID[start]]["lon"];  
    
    api += "&loc=";
    api += problem.Stops[problem.ID[finish]]["lat"] + ",";
    api += problem.Stops[problem.ID[finish]]["lon"]; 
    
    api += "&loc=";
    api += render.TargetPoint._latlng.lat + ",";
    api += render.TargetPoint._latlng.lng;

 
    
    api += "&z=16";
    
    $.ajax({
        url: api,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data.distance_table[0][1] + data.distance_table[2][3];
        }
    });
    return result;
}