<?php
   
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
$json = file_get_contents('php://input');
$operation=$_REQUEST['op'];
$data=json_decode($json);


if($operation=='insert'){
insert_record($data);
}
elseif($operation=='retrive'){
  retrive_record();
}
elseif($operation=='delete'){
  $id=$data->user_id;
  delete_record($id);
}
elseif($operation=='rupdate'){

  rupdate($data);
}
elseif($operation=='update'){
  $id=$_REQUEST['user_id'];
  update($id,$data);
}
function insert_record($data){
  require_once('db.php');
    if(isset($data)){
    $name=ucfirst($data->name);
    $email=$data->email;
    $dob=$data->dob;
    $pass=md5($data->pass);
    $gender=$data->male;
    $status=$data->status;
    $profile_pic=$data->profile_pic;  

$sql = "INSERT INTO users (name, email,password,gender,status,profile_pic,dob)
VALUES ('$name', '$email', '$pass','$gender','$status','$profile_pic','$dob')";
if (mysqli_query($conn,$sql)) {
    echo json_encode("{'sucess':'true'}");
    exit;
  }
}
}

function rupdate($id){
  require_once('db.php');
  $sql="select * from users where id=".$id;
  $row = mysqli_fetch_assoc(mysqli_query($conn,$sql));
  echo json_encode($row);
  exit;
}
function update($id,$data){
  require_once('db.php');
    if(isset($data)){
    $name=ucfirst($data->name);
    $email=$data->email;
    $dob=$data->dob;
    $pass=md5($data->pass);
    $gender=$data->male;
    $status=$data->status;
    $profile_pic=$data->profile_pic;  

$sql = "update  users set name='$name',email='$email',password='$pass',dob='$dob',gender='$gender',status='$status',profile_pic='$profile_pic' where id='$id'";
if (mysqli_query($conn,$sql)) {
    echo json_encode("{'sucess':'true'}");
    exit;
  }
}
}

function retrive_record(){
  require_once('db.php');
  $sql="select * from users";
  $row = mysqli_fetch_all(mysqli_query($conn,$sql), MYSQLI_ASSOC);
  echo json_encode($row);
  exit;
}

function delete_record($id){
require_once('db.php');

$sql="delete  from users where id=".$id;
if (mysqli_query($conn,$sql)) {
  echo json_encode("{'sucess':'true'}");
  exit;
}




}