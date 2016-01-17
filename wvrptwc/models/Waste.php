<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of waste
 *
 * @author Tieu Minh
 */
class Waste extends Model {
    protected $conflicts, $services;
    public function __construct() {
        parent::__construct();
        $this->conflicts = new Conflict();
        $this->services = new Service();        
    }
    
    public function get(){				
        $sth = $this->dbh->prepare("SELECT * FROM _waste");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }
    
    public function data() {				
        $sth = $this->dbh->prepare("SELECT * FROM waste where ID > 0");
        $sth->execute();        
        return $sth->fetchAll();
    }
    
    public function ID($id){				
        $sth = $this->dbh->prepare("SELECT * FROM waste where ID = ?");
        $sth->execute(array($id));
        $array = $sth->fetchAll();
        return $array[0];
    }
    
    public function add($waste){	        
        $sth = $this->dbh->prepare("INSERT INTO waste(Name,Image) VALUES (?, ?)");
        $sth->execute(array($waste->Name, $waste->Image));
        $b = $this->dbh->lastInsertId();
        $array = explode(",",$waste->Conflict);
        foreach ($array as $a) {
            $this->conflicts->insert($a, $b);
        }
        return json_encode($b);
    }
    
    public function delete($waste){			
        $this->conflicts->remove($waste->ID);
        $this->services->removeWaste($waste);
        $sth = $this->dbh->prepare("DELETE FROM waste WHERE id=?");
        $sth->execute(array($waste->ID));
        return json_encode(1);
    }
    
    public function count() {
        $sth = $this->dbh->prepare("SELECT COUNT(ID) AS Count FROM _waste");
        $sth->execute();
        $array = $sth->fetchAll();
        return (int)$array[0][0] - 1;
    }
}
