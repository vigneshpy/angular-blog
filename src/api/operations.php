<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
if(!isset( $_REQUEST['op'])){
  die();
}
$operation = $_REQUEST['op'];

switch($operation){
  case 'insert':
    insert_record();
    break;
  case 'retrive':
    retrive_record();
    break;  
  case 'delete':
    $id = $_REQUEST['user_id'];
    delete_record($id);
    break;
    case 'rupdate':
    $id = $_REQUEST['user_id'];
    rupdate($id);
    break;
  case 'update':
      $id = $_REQUEST['user_id'];
      update($id);
       break;


}

function insert_record()
{
    require_once ('db.php');

    $folderPath = 'upload/';
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $dob = $_POST['dob'];
        $pass = md5($_POST['pass']);
        $gender = $_POST['gender'];
        $status = $_POST['status'];
        if (isset($_FILES['profile_pic']))
        {
            $profile_pic_temp = $_FILES['profile_pic']['tmp_name'];
            $tmp = explode('.', $_FILES['profile_pic']['name']);
            $file_ext = end($tmp);
            $file = uniqid() . '.' . $file_ext;
            $file_path = $folderPath . $file;
            if (move_uploaded_file($profile_pic_temp, $file_path))
            {
                $profile_pic = $file;
            }
            else
            {
                $profile_pic = '';

            }

        }

        $sql = "INSERT INTO users (name, email,password,gender,status,profile_pic,dob)
  VALUES ('$name', '$email', '$pass','$gender','$status','$profile_pic','$dob')";
        if (mysqli_query($conn, $sql))
        {
            echo json_encode("{'sucess':'true'}");
            exit;
        }
    }
}

function rupdate($id)
{
    require_once ('db.php');
    $sql = "select * from users where id=" . $id;
    $row = mysqli_fetch_assoc(mysqli_query($conn, $sql));
    echo json_encode($row);
    exit;
}
function update($id)
{
    require_once ('db.php');
    $folderPath = 'upload/';
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $dob = $_POST['dob'];
        $pass = md5($_POST['pass']);
        $gender = $_POST['gender'];
        $status = $_POST['status'];
        $profile_pic='';
        if(isset($_POST['profile_pic'])){
            $profile_pic=$_POST['profile_pic'];
        }
        if (isset($_FILES['profile_pic']))
        {
            $profile_pic_temp = $_FILES['profile_pic']['tmp_name'];
            $tmp = explode('.', $_FILES['profile_pic']['name']);
            $file_ext = end($tmp);
            $file = uniqid() . '.' . $file_ext;
            $file_path = $folderPath . $file;
            if (move_uploaded_file($profile_pic_temp, $file_path))
            {
                $profile_pic = $file;
            }
        }

        $sql = "update  users set name='$name',email='$email',password='$pass',dob='$dob',gender='$gender',profile_pic='$profile_pic',status='$status' where id='$id'";
        if (mysqli_query($conn, $sql))
        {
            echo json_encode("{'sucess':'true'}");
            exit;
        }
    }
}

function retrive_record()
{
    require_once ('db.php');
    $sql = "select * from users";
    $row = mysqli_fetch_all(mysqli_query($conn, $sql) , MYSQLI_ASSOC);
    echo json_encode($row);
    exit;
}

function delete_record($id)
{
    require_once ('db.php');

    $sql = "delete  from users where id=" . $id;
    if (mysqli_query($conn, $sql))
    {
        echo json_encode("{'sucess':'true'}");
        exit;
    }

}

