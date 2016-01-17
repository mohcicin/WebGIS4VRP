<?php
class Problem {
    protected $ID, $NumStop, $Lon, $Lat, $Capacity, $Length, $Data, $Loc
            , $Speed, $EarlyTime, $LateTime, $ServiceTime, $Load, $Index
            , $Type, $Waste, $Matrix, $NumConflict, $NumWaste, $Conflict;
    public function __construct($data) {  
        $vehicles = new Vehicle();
        $stops = new Stop();
        $wastes = new Waste();
        $windows = new Window();
        $locations = new Location();
        $distances = new Distance();
        $conflicts = new Conflict();
        $services = new Service(); 
        
        $this->Data = $data;
        
        $veh = $vehicles->ID($data->Vehicle);        
        $this->Capacity = $veh["Capacity"];        
        $this->Length = $veh["Length"];    
        $this->Speed = $veh["Speed"]; 
          
        $this->NumWaste = $wastes->count();
        $waste = $wastes->data();
        for($i = 0; $i < $this->NumWaste; $i++) {
            $Index[$waste[$i]["ID"]] = $i;    
        }        
        
        $this->NumStop = $services->count();        
        $serv = $services->data();
        for($i = 0; $i < $this->NumStop; $i++) {
            $this->ID[$i] = $serv[$i]["ID"];     
            $this->Load[$i] = $serv[$i]["Load"];   
            
            $loc = $locations->ID($serv[$i]["Location"]);
            $this->Lon[$i] = $loc["Lon"];
            $this->Lat[$i] = $loc["Lat"];
            $this->Loc[$i] = $loc["ID"];
            
            $win = $windows->ID($serv[$i]["Window"]);
            $this->EarlyTime[$i] = $win["EarlyTime"];
            $this->LateTime[$i] = $win["LateTime"];
            
            $type = $stops->ID($loc["Type"]);
            $this->ServiceTime[$i] = $type["ServiceTime"];
            if($type["Name"] === "Depot"){
                $this->Type[$i] = 0;
            } elseif ($type["Name"] === "Landfill") {
                $this->Type[$i] = 2;
            } elseif ($type["Name"] === "Stop") {
                $this->Type[$i] = 1;
            }
            
            $waste = $wastes->ID($serv[$i]["Waste"]);
            if($waste["ID"] == 0) {
                $this->Waste[$i] = 999;  
            }
            else {            
                $this->Waste[$i] = $Index[$waste["ID"]];            
            } 
            
            for($j = 0; $j < $this->NumStop; $j++) {
                $this->Matrix[$i * $this->NumStop + $j ] =
                    $distances->dist($serv[$i]["Location"], $serv[$j]["Location"]);
            }
        }       
        
        $this->NumConflict = $conflicts->count();
        $confl = $conflicts->data();            
        for($i = 0; $i < $this->NumConflict; $i++) {
           $this->Conflict[$i] = new stdClass();
           $this->Conflict[$i]->A = $Index[$confl[$i]["A"]];
           $this->Conflict[$i]->B = $Index[$confl[$i]["B"]];
        }
        
        $this->Para = new stdClass();
        $this->Para->Heuristic = $data->Heuristic;
    }
    public function config($file = 'config.con') {
        $dist = floatval($this->Data->Objective);
        $wait = 1 - $dist;
        $content = "C1_ALPHA1 0.5\n";
        $content .= "C1_ALPHA2 0.5\n";
        $content .= "C2_ALPHA 0.01\n";
        $content .= "C3_ALPHA 1.0\n";
        $content .= "FIRST_STOP_BETA1 -0.7\n";
        $content .= "FIRST_STOP_BETA2 0.2\n";
        $content .= "FIRST_STOP_BETA3 0.1\n";
        $content .= "HAS_IMPROVE_ROUTE 1\n";
        $content .= "HAS_IMPROVE_SUB 1\n";
        $content .= "HAS_IMPROVE_LANDFILL 1\n";
        $content .= "COST_MOVE_TIME_RATIO " . $dist . "\n";        
        $content .= "COST_WAIT_TIME_RATIO " . $wait . "\n";
        $content .= "COST_DIST_RATIO 0\n";
        file_put_contents($file, $content);
        return $file;
    }
    public function create($file = 'services.con') {    
        $content = "$this->NumStop\n";
        $content .= "$this->Capacity\n";
        $content .= "$this->Speed\n";
        $content .= "$this->Length\n";
        $content .= "\n";
        
        for($i = 0; $i < $this->NumStop; $i++) {
            $content .= "$i\t";
            $content .= $this->Lon[$i] . "\t";
            $content .= $this->Lat[$i] . "\t";
            $content .= $this->EarlyTime[$i] . "\t";
            $content .= $this->LateTime[$i] . "\t";
            $content .= $this->ServiceTime[$i] . "\t";
            $content .= $this->Load[$i] . "\t";
            $content .= $this->Type[$i] . "\t";
            $content .= $this->Waste[$i] . "\n";
        }
        $content .= "\n";
        
        for($i = 0; $i < $this->NumStop; $i++) {
            for($j = 0; $j < $this->NumStop; $j++) {
                $content .= $this->Matrix[$i * $this->NumStop + $j] . "\t";
            }
            $content .= "\n";
        }
        $content .= "\n";
        
        $content .= "$this->NumWaste\n";
        for($i = 0; $i < $this->NumConflict; $i++) {
            $content .= $this->Conflict[$i]->A . "\t";
            $content .= $this->Conflict[$i]->B . "\t";
        }
        
        file_put_contents($file, $content);
        return $file;        
    }
    
    public function execute($file) {
        $exec = "wcvrptwc.exe ";    
        if($this->Data->Heuristic === 'HC') {
            $exec .= $file . " HC "; 
            $exec .= $this->Data->Selection . " ";
            $exec .= $this->Data->Generation; 
        }
        elseif($this->Data->Heuristic === 'SA') {
            $exec .= $file . " SA "; 
            $exec .= $this->Data->Selection . " ";
            $exec .= $this->Data->Generation . " "; 
            $exec .= $this->Data->InitTemp . " ";
            $exec .= $this->Data->Threshold . " "; 
            $exec .= $this->Data->Ratio;
        }
        elseif($this->Data->Heuristic === 'TS') {
            $exec .= $file . " TS ";             
            $exec .= $this->Data->Selection . " ";
            $exec .= $this->Data->Generation . " "; 
            $exec .= $this->Data->NumberList;
        }
        elseif($this->Data->Heuristic === 'GA') {
            $exec .= $file . " GA "; 
            $exec .= $this->Data->Selection . " ";
            $exec .= $this->Data->Generation . " "; 
            $exec .= $this->Data->NumberPop . " "; 
            $exec .= $this->Data->NaturalSelect . " ";
            $exec .= $this->Data->Crossover . " ";
            $exec .= $this->Data->Mutation;
        }
        $log =  shell_exec($exec);   
        $csvArray = array_map('str_getcsv', file('log'));
        $csvArray[0][16] = "Loc";
        for($i = 1; $i < count($csvArray); $i++) {
            $csvArray[$i][16] = $this->Loc[$csvArray[$i][0]];
            $csvArray[$i][0] = $this->ID[$csvArray[$i][0]];
        }
        
        $csvFile = fopen('log', 'w');
        foreach ($csvArray as $fields) {
            fputcsv($csvFile, $fields);
        }
        fclose($csvFile);
        return $log;
//        file_put_contents("output.log", $log);
    }
}
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

