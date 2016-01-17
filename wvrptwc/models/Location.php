<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of location
 *
 * @author Tieu  Minh
 */
class Location  extends Model {
    protected $distances, $services;
    
    public function __construct() {
        parent::__construct();
        $this->services = new Service();
        $this->distances = new Distance();
    }
    
    public function get(){				
        $sth = $this->dbh->prepare("SELECT * FROM _location");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }
    
    public function ID($id){				
        $sth = $this->dbh->prepare("SELECT * FROM location  Where id = ?");
        $sth->execute(array($id));
        $array = $sth->fetchAll();          
        return $array[0];
    }
    
    public function delete($location) {	
        $this->services->removeLocation($location);
        $this->distances->remove($location->ID);
        $sth = $this->dbh->prepare("DELETE FROM location WHERE id=?");
        $sth->execute(array($location->ID));
        return json_encode(1);
    }    
    
    public function add($location) {	
        $locs = json_decode($this->get());        
        $sth = $this->dbh->prepare("INSERT INTO location(Name, Lon, Lat, Image, Type) VALUES (?, ?, ?, ?, ?)");
        $sth->execute(array($location->Name, $location->Lon, $location->Lat, $location->Image, $location->Type));		
        $id = $this->dbh->lastInsertId();   
        
        $distance = new stdClass();   
        $distance->A = $id;
        $distance->B = $id;  
        $distance->Length = 0; 
        $this->distances->add($distance);
        
        $distance->Length = -1;  
        foreach ($locs as $loc) {        
            $distance->A = $loc->ID;
            $distance->B = $id;         
            $this->distances->add($distance);
            $distance->A = $id;
            $distance->B = $loc->ID;
            $this->distances->add($distance);
        }
        return $this->distances->getInfo();        
    }
}
