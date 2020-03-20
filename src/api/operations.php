<?php
   
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// require_once('db.php');
$json = file_get_contents('php://input');
$operation=$_REQUEST['op'];
$data=json_decode($json);
 print_r($data);

if($operation=='insert'){
insert_record($data);
}
function insert_record($data){
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname='blog_site';
    $conn = mysqli_connect($servername, $username, $password,$dbname);
    
    if(isset($data)){
    $name=$data->name;
    $email=$data->email;
    $pass=md5($data->pass);
    $gender=$data->male;
    $status=$data->status;
    $profile_pic=$data->profile_pic;

$sql = "INSERT INTO users (name, email,password,gender,status,profile_pic)
VALUES ('$name', '$email', '$pass','$gender','$status','$profile_pic')";
if (mysqli_query($conn,$sql)) {
    printf("%d Row inserted.\n", $conn->affected_rows);
  }
  else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}
}
}
