<?php

$file = file_get_contents("php://input");
$m_json = json_decode($file, true);

$path = '../'.$m_json['url'];
if(file_exists($path)){
    unlink($path);
    echo true;
}else{
    echo false;
}
?>