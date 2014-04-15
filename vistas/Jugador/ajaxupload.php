<?php
$valid_exts = array('jpeg', 'jpg', 'png', 'gif'); // valid extensions
$max_size = 200 * 1024; // max file size
$path = '../../recursos/'; // upload directory

 if ($_SERVER['REQUEST_METHOD'] === 'POST') {
     if($_POST['operacion']=== 'ADD'){
//     if (isset($_POST['imgno']) && $_POST['imgno'] == '1'){
         
         if(!empty($_FILES['image'])) {
		// get uploaded file extension
		$ext = strtolower(pathinfo($_FILES['image']['name'], PATHINFO_EXTENSION));
		// looking for format and size validity
		if (in_array($ext, $valid_exts) AND $_FILES['image']['size'] < $max_size) {
                        $idunico = uniqid();
			$path = $path .'Registro/Jugadores'.'/'.$idunico.'.'.$ext;
			// move uploaded file from temp to uploads directory
			if (move_uploaded_file($_FILES['image']['tmp_name'], $path)) {
				echo ($idunico.'.'.$ext);
                            //echo ($_FILES['image']);
			}
		} else {
			echo '1';
		}
	} else {
		echo '2';
	} 
// }
// else{
//     echo 'default.jpg'; 
// }
 }
 else if($_POST['operacion']=== 'UPD') {
     
 }
} else {
	echo '3';
}
?>