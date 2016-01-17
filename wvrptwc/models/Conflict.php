<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of conflict
 *
 * @author Tieu  Minh
 */
class Conflict  extends Model {
    public function __construct() {
        parent::__construct();
    }
    
    public function get(){				
        $sth = $this->dbh->prepare("SELECT * FROM _conflict");
        $sth->execute();
        return json_encode($sth->fetchAll());
    }    
        
    public function delete($conflict){				
        $sth = $this->dbh->prepare("DELETE FROM conflict WHERE id=?");
        $sth->execute(array($conflict->ID));
        return json_encode(1);
    }
    
    public function remove($id){
        $sth = $this->dbh->prepare("DELETE FROM conflict WHERE A=? OR B=?");
        $sth->execute(array($id, $id));
        return json_encode(1);
    }
    
    public function add($conflict){        
        $sth = $this->dbh->prepare("INSERT INTO conflict(A,B) VALUES (?, ?)");
        $sth->execute(array($conflict->A, $conflict->B));
        return json_encode($this->dbh->lastInsertId());
    }
    
    public function insert($a, $b) {        
        $sth = $this->dbh->prepare("INSERT INTO conflict(A,B) VALUES (?, ?)");
        $sth->execute(array($a, $b));
        return json_encode($this->dbh->lastInsertId());
    }
    
    public function count() {
        $sth = $this->dbh->prepare("SELECT COUNT(ID) AS Count FROM _conflict");
        $sth->execute();
        $array = $sth->fetchAll();
        return (int)$array[0][0];
    }
    
    public function data() {				
        $sth = $this->dbh->prepare("SELECT * FROM conflict");
        $sth->execute();        
        return $sth->fetchAll();
    }
    
}
