<?php
class Jugador {
    
    
    private $conexion;

    function __construct() {
        $this->conexion = Conexion::getConexion();
    }
 
    function registroJugador() {
        $sql = "INSERT INTO `usuario`( `nombre`,`email`,`password`,`tipo`,`estado`)VALUES('".$_REQUEST["nombreJugador"]."','".$_REQUEST["emailJugador"]."','".md5($_REQUEST["passJugador"])."',3,0)";
        try {
            $rs = $this->conexion->Execute($sql);
            echo json_encode("1");
        } catch (Exception $exc) {
            echo json_encode("0");
        }
    }
    
    function enviarCorreo($destino, $asunto, $mensaje) {
    $mailer = new PHPMailer();
    $mailer->IsSMTP();
    $mailer->Host = 'ssl://gedeon.colombiahosting.com.co:465';
    $mailer->SMTPAuth = TRUE;
    $mailer->Username = 'no-reply@e-ventti.com';  // Change this to your gmail adress
    $mailer->Password = '3fai830fGS37hdSD6';  // Change this to your gmail password
    $mailer->From = 'no-reply@e-ventti.com';  // This HAVE TO be your gmail adress
    $mailer->FromName = 'e-ventti'; // This is the from name in the email, you can put anything you like here
    $mailer->ContentType = 'text/html';
    $mailer->CharSet = "UTF-8";

    $mailer->IsHTML(true);

    $mailer->Subject = $asunto;
    $mailer->Body = $mensaje;
    $mailer->AddAddress($destino);
    if ($mailer->Send()) {
      return true;
    } else {
      return false;
    }
  }

  function plantillaBienvenidoUno($email, $nombre, $pass, $clave) {
    if (!file_exists($GLOBALS["dir_resources"]."plantillas_email/bienvenido_nuevo.html")) {
      return false;
    } else {
      $file = fopen($GLOBALS["dir_resources"]."plantillas_email/bienvenido_nuevo.html", "r");
      $bufer = '';
      while (!feof($file)) {
        $bufer .= fgets($file, 4096);
      }
      fclose($file);
      $bufer = str_replace("----email----", $email, $bufer);
      $bufer = str_replace("----email_url----", urlencode($email), $bufer);
      $bufer = str_replace("----nombre----", $nombre, $bufer);
      $bufer = str_replace("----pass----", $pass, $bufer);
      $bufer = str_replace("----verif----", $clave, $bufer);
      return $bufer;
    }
    return false;
  }
    
}

