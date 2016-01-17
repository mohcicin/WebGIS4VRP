<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of distance
 *
 * @author Tieu  Minh
 */
class Distance  extends Model {
    public function __construct() {
        parent::__construct();
    }
    
    public function get(){				
        $sth = $this->dbh->prepare("SELECT * FROM distance");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }
    public function getInfo() {				
        $sth = $this->dbh->prepare("SELECT distance.ID as ID, A.Lon as LonA, "
                . "A.Lat as LatA, B.Lon as LonB, B.Lat as LatB "
                . "FROM distance,location A, location B "
                . "where distance.A = A.ID and distance.B = B.ID "
                . "and distance.Length = ?");
        $sth->execute(array(-1));
        return json_encode($sth->fetchAll());
    }
    public function dist($a , $b){				
        $sth = $this->dbh->prepare("SELECT Length FROM distance "
                . "where A = ? AND B = ?");
        $sth->execute(array($a, $b));
        $array = $sth->fetchAll();
        return $array[0][0];
    }
    public function add($distance){        
        $sth = $this->dbh->prepare("INSERT INTO distance(A, B, Length) VALUES (?, ?, ?)");
        $sth->execute(array($distance->A, $distance->B, $distance->Length));
        return json_encode($distance->Length);
    }
    public function remove($id){
        $sth = $this->dbh->prepare("DELETE FROM distance WHERE A=? OR B=?");
        $sth->execute(array($id, $id));
        return json_encode(1);
    }
    public function update($distance){        
        $sth = $this->dbh->prepare("Update distance set Length = ? WHERE ID = ?");
        $sth->execute(array($distance->Length, $distance->ID));
        return json_encode($distance->ID);
    }
    
}
