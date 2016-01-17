<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of services
 *
 * @author Tieu  Minh
 */
class Service extends Model {
    public function __construct() {
        parent::__construct();
    }
    
    public function get() {				
        $sth = $this->dbh->prepare("SELECT * FROM _service ORDER BY ID");
        $sth->execute();        
        return json_encode($sth->fetchAll());
    }
    
    public function data() {				
        $sth = $this->dbh->prepare("SELECT * FROM service");
        $sth->execute();        
        return $sth->fetchAll();
    }
    
    public function delete($service){				
        $sth = $this->dbh->prepare("DELETE FROM service WHERE id=?");
        $sth->execute(array($service->ID));
        return json_encode(1);
    }
    
    public function removeWaste($waste){				
        $sth = $this->dbh->prepare("DELETE FROM service WHERE waste=?");
        $sth->execute(array($waste->ID));
        return json_encode(1);
    }
    
    public function removeLocation($location){				
        $sth = $this->dbh->prepare("DELETE FROM service WHERE location=?");
        $sth->execute(array($location->ID));
        return json_encode(1);
    }
    
    public function removeWindow($window){				
        $sth = $this->dbh->prepare("DELETE FROM service WHERE window=?");
        $sth->execute(array($window->ID));
        return json_encode(1);
    }
    
    public function count() {
        $sth = $this->dbh->prepare("SELECT COUNT(ID) AS Count FROM _service");
        $sth->execute();
        $array = $sth->fetchAll();
        return (int)$array[0][0];
    }
    
    public function add($service){	
        $sth = $this->dbh->prepare("INSERT INTO service(`Location`, `Window`, `Waste`, `Load`) VALUES (?, ?, ?, ?)");
        $sth->execute(array($service->Location, $service->Window, $service->Waste, $service->Load));
        return json_encode($this->dbh->lastInsertId());
    }
    
}
