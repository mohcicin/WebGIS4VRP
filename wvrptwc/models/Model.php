<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of model
 *
 * @author Tieu Minh
 */
class Model {
    protected $dbh;

    public function __construct() {
        $host = 'localhost';
        $user = 'root';
        $pass = '';
        $db = 'wcvrptwc';
        $opt = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8");
        $this->dbh = new PDO("mysql:host=".$host.";dbname=".$db,$user,$pass,$opt);		
    }
}
