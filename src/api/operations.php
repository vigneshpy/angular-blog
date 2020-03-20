<?php
require_once('db.php');
$operation=$_REQUEST['operation'];
$data=$_REQUEST['data']
if($operation=='insert'){
    insert_record();
}

function insert_record($data){
echo $data;
}