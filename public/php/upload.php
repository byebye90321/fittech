<?php

$file = explode(".",$_FILES["fileField"]["name"]);
$file_count = count($file)-1;
$new_name = uniqid(rand());
move_uploaded_file($_FILES["fileField"]["tmp_name"],"uploads/".$new_name.".".$file[$file_count]);
$image_url = "php/uploads/".$new_name.".".$file[$file_count];
echo $image_url;