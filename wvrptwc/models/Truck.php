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
class Truck extends Model {
    public function __construct() {
        parent::__construct();
    }
    
    public function get(){				
        $sth = $this->dbh->prepare("SELECT * FROM _truck");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }
}
