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
class Stop extends Model {
    public function __construct() {
        parent::__construct();
    }
    
    public function get(){				
        $sth = $this->dbh->prepare("SELECT * FROM _stop");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }
    public function ID($id){				
        $sth = $this->dbh->prepare("SELECT ID,Name, (HOUR(ServiceTime)*60 + MINUTE(ServiceTime)) as ServiceTime FROM stop WHERE ID = ?");
        $sth->execute(array($id));
        $array = $sth->fetchAll();
        return $array[0];
    }
}
