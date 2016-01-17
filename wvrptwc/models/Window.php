<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of window
 *
 * @author Tieu  Minh
 */
class Window  extends Model {
    protected $services;
    public function __construct() {
        parent::__construct();
        $this->services = new Service();
    }
    
    public function get(){				
        $sth = $this->dbh->prepare("SELECT * FROM _window");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }
    
    public function ID($id){				
        $sth = $this->dbh->prepare("SELECT DATE_FORMAT(EarlyTime,'%H%i') as EarlyTime, "
                . "DATE_FORMAT(LateTime,'%H%i') as LateTime FROM window where ID = ?");
        $sth->execute(array($id));
        $array = $sth->fetchAll();          
        return $array[0];
    }
    
    public function add($window){	
        $sth = $this->dbh->prepare("INSERT INTO window(Name, EarlyTime, LateTime) VALUES (?, ?, ?)");
        $sth->execute(array($window->Name, $window->EarlyTime, $window->LateTime));		
        return json_encode($this->dbh->lastInsertId());
    }
    
    public function delete($window){		
        $this->services->removeWindow($window);
        $sth = $this->dbh->prepare("DELETE FROM window WHERE id=?");
        $sth->execute(array($window->ID));
        return json_encode(1);
    }
}
