<?php
function __autoload($className){
    include_once("models/$className.php");	
}

$vehicles = new Vehicle();
$stops = new Stop();
$trucks = new Truck();
$wastes = new Waste();
$windows = new Window();
$locations = new Location();
$distances = new Distance();
$conflicts = new Conflict();
$services = new Service();

//print exec("meta-heuristics-1.2.exe");

if(!filter_input(INPUT_POST, 'action')) {
    print json_encode(0);
    return;
}
$name = filter_input(INPUT_POST, 'action');
switch(filter_input(INPUT_POST, 'action')) {	
    case 'get_vehicles':
        print $vehicles->get();		
    break;

    case 'get_wastes':
        print $wastes->get();		
    break;

    case 'get_stops':
        print $stops->get();		
    break;

    case 'get_trucks':
        print $trucks->get();		
    break;

    case 'get_windows':
        print $windows->get();		
    break;

    case 'get_locations':
        print $locations->get();		
    break;

    case 'get_conflicts':
        print $conflicts->get();		
    break;

    case 'get_distances':
        print $distances->get();		
    break;


    case 'get_services':
        print $services->get();		
    break;


    case 'add_vehicle':
        $vehicle = json_decode(filter_input(INPUT_POST, 'vehicle'));
        print $vehicles->add($vehicle);		
    break;

    case 'add_waste':
        $waste = json_decode(filter_input(INPUT_POST, 'waste'));
        print $wastes->add($waste);		
    break;

    case 'add_location':
        $location = json_decode(filter_input(INPUT_POST, 'location'));
        print $locations->add($location);		
    break;

    case 'add_distance':
        $distance = json_decode(filter_input(INPUT_POST, 'distance'));
        print $distances->add($distance);		
    break;

    case 'add_window':
        $window = json_decode(filter_input(INPUT_POST, 'window'));
        print $windows->add($window);		
    break;

    case 'add_service':
        $service = json_decode(filter_input(INPUT_POST, 'service'));
        print $services->add($service);		
    break;

    case 'delete_location':
        $location = json_decode(filter_input(INPUT_POST, 'location'));
        print $locations->delete($location);		
    break;

    case 'delete_vehicle':
        $vehicle = json_decode(filter_input(INPUT_POST, 'vehicle'));
        print $vehicles->delete($vehicle);		
    break;

    case 'delete_service':
        $service = json_decode(filter_input(INPUT_POST, 'service'));
        print $services->delete($service);		
    break;

    case 'delete_waste':
        $waste = json_decode(filter_input(INPUT_POST, 'waste'));
        print $wastes->delete($waste);		
    break;

    case 'delete_window':
        $window = json_decode(filter_input(INPUT_POST, 'window'));
        print $windows->delete($window);		
    break;

    case 'update_field_data':
        $user = json_decode(filter_input(INPUT_POST, 'user'));
        print $users->updateValue($user);				
    break;
    
    case 'update_distance':
        $distance = json_decode(filter_input(INPUT_POST, 'distance'));
        print $distances->update($distance);		
    break;

    case 'execute':
        $data = json_decode(filter_input(INPUT_POST, 'data'));        
        $problem = new Problem($data);
        $config = $problem->config();        
        $file = $problem->create();        
        print $problem->execute($file);
    break;

}

exit();