<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of vehicle
 *
 * @author Tieu Minh
 */
class Vehicle extends Model {
    public function __construct() {
        parent::__construct();
    }
    
    public function get(){	
        $sth = $this->dbh->prepare("SELECT * FROM _vehicle");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }
    
    public function ID($id){				
        $sth = $this->dbh->prepare("SELECT * FROM vehicle Where id = ?");
        $sth->execute(array($id));
        $array = $sth->fetchAll();          
        return $array[0];
    }
    
    public function delete($vehicle){				
        $sth = $this->dbh->prepare("DELETE FROM vehicle WHERE id=?");
        $sth->execute(array($vehicle->ID));
        return json_encode(1);
    }
    
    public function add($vehicle){	
        $sth = $this->dbh->prepare("INSERT INTO vehicle(Name, Truck, Capacity, Volume, Engine, Speed, Length, Count, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $sth->execute(array($vehicle->Name, $vehicle->Truck, $vehicle->Capacity, $vehicle->Volume, $vehicle->Engine, $vehicle->Speed, $vehicle->Length, $vehicle->Count, $vehicle->Image));		
        return json_encode($this->dbh->lastInsertId());
    }

}
