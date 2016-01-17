<?php
$data = filter_input(INPUT_POST,'mod');
$exec = "..\\lib\\glpsol.exe -m sbrp.mod";
file_put_contents("sbrp.mod", $data);
if (file_exists("info")) {
    shell_exec("del info");
}
shell_exec($exec);
sleep(1);
return "info";



/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
