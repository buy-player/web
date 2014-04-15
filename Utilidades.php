<?php

date_default_timezone_set('America/Bogota');
session_start();
//include('../librerias/OpenInviter/openinviter.php');
//include("../../../resources/librerias/phpmailer/class.phpmailer.php");

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Utilidades
 *
 * @author SJ
 */

class Utilidades {

  private $conexion;
  private $adodb;

  function __construct($conexion) {

    //$this->conexion = $conexion;
    //$this->adodb = $this->conexion->getADO();
  }
  function glob(){
    echo $GLOBALS["dir_resources"];
  }

  /**
   * Esta funcion envia un corrreo electronico al destino.
   * Usa PHPMailer, y usa la cuenta no-reply de e-ventti.com
   * 
   * @param type $destino: Correo electronico destino.
   * @param type $asunto: Asunto del mensaje
   * @param type $mensaje: Mensaje a enviar.
   * @return boolean 
   * 
   * @author Samiro
   */
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

  /**
   * Agrega un texto a un archivo, al final de este.
   *  
   * @param type $ruta: ruta del archivo a escribir
   * @param type $texto: texto que queremos agregar
   * @return boolean
   * 
   * @author Samiro 
   */
  function agregarTextArchivo($ruta, $texto) {
    $date_reg = date("Y-m-d H:i:s");
    $file = fopen($ruta, a);
    fwrite($file, chr(13) . chr(10));
    fwrite($file, "[" . $date_reg . "]:  " . $texto);
    fwrite($file, chr(13) . chr(10));
    fclose($file);
    return true;
  }

  /**
   *  Este mensaje de bienvenida es para los que se registraron en la página.
   *  Esta función recibe los datos que son necesario en el mensaje de bienvenida, lee el template o plantilla del mensaje
   *  que esta contenido en el directorio plantillas_email (son .html estas plantillas), y reemplaza las variables.
   * 
   * @param type $email: email de la persona a la que se le va a enviar el mensaje.
   * @param type $nombre: nombre de esta persona.
   * @param type $pass: password.
   * @param type $clave: esta es la clave de verificacion de cuenta.
   * @return false ó  el string completo de la plantilla 
   * 
   * @author Samiro
   */
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

  function pruebaPlantillaBienvenidoUno($pDatos) {
    $email = "asd";
    $nombre = "asdf";
    $pass = "asdfg";
    $clave = "asdfgfg";
    echo "leyendo";
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
    echo $bufer;
  }

  /**
   *  Este mensaje de bienvenida es para avisarles a las personas que e-ventti ya esta al aire y es para los usuarios que le hemos creado una cuenta, y que se suscribieron en la primera etapa.
   *  Esta función recibe los datos que son necesario en el mensaje de bienvenida, lee el template o plantilla del mensaje
   *  que esta contenido en el directorio plantillas_email (son .html estas plantillas), y reemplaza las variables.
   * 
   * @param type $email: email de la persona a la que se le va a enviar el mensaje.
   * @param type $nombre: nombre de esta persona.
   * @param type $pass: password.   
   * @param type $clave: esta es la clave de verificacion de cuenta.
   * @return false ó  el string completo de la plantilla 
   * 
   * @author Samiro
   */
  function plantillaBienvenidoDos($email, $nombre, $pass, $clave) {
    if (!file_exists($GLOBALS["dir_resources"]."plantillas_email/bienvenido_alaire.html")) {
      return false;
    } else {
      $file = fopen($GLOBALS["dir_resources"]."plantillas_email/bienvenido_alaire.html", "r");
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

  /**
   *  Este mensaje es el que se le envia al sujeto que quizo resetear la contraseña. Porque se le olvido.
   * 
   * @param type $email: email de la persona a la que se le va a enviar el mensaje.
   * @param type $nombre: nombre de esta persona.
   * @param type $pass: password.   
   * @return false ó  el string completo de la plantilla 
   * 
   * @author Samiro
   */
  function plantillaOlvidoContrasena($email, $nombre, $pass) {
    if (!file_exists($GLOBALS["dir_resources"]."plantillas_email/olvido_contrasena.html")) {
      return false;
    } else {
      $file = fopen($GLOBALS["dir_resources"]."plantillas_email/olvido_contrasena.html", "r");
      $bufer = '';
      while (!feof($file)) {
        $bufer .= fgets($file, 4096);
      }
      fclose($file);
      $bufer = str_replace("----email----", $email, $bufer);
      $bufer = str_replace("----email_url----", urlencode($email), $bufer);
      $bufer = str_replace("----nombre----", $nombre, $bufer);
      $bufer = str_replace("----pass----", $pass, $bufer);
      return $bufer;
    }
    return false;
  }

  /**
   *  Este mensaje es el que se le envia al sujeto con un codigo de verificacion para poder resetear la contraseña.
   * @param type $email
   * @param type $nombre
   * @param type $codigo
   * @return boolean 
   */
  function plantillaCodigoOlv($email, $nombre, $codigo) {
    if (!file_exists($GLOBALS["dir_resources"]."plantillas_email/envio_codigo_olv.html")) {
      return false;
    } else {
      $file = fopen($GLOBALS["dir_resources"]."plantillas_email/envio_codigo_olv.html", "r");
      $bufer = '';
      while (!feof($file)) {
        $bufer .= fgets($file, 4096);
      }
      fclose($file);
      $bufer = str_replace("----email----", $email, $bufer);
      $bufer = str_replace("----nombre----", $nombre, $bufer);
      $bufer = str_replace("----codigo----", $codigo, $bufer);
      return $bufer;
    }
    return false;
  }

  /**
   * Esta función genera aletoriamente una clave del numero de digitos que le enviemos por parametro.
   * @param type $num_dig
   * @return boolean 
   */
  function generarClave($num_dig) {
    $str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    $cad = "";
    if (!is_numeric($num_dig) || $num_dig <= 0) {
      $num_dig = 5;
    }
    for ($i = 0; $i < $num_dig; $i++) {
      $cad .= substr($str, rand(0, 62), 1);
    }
    return $cad;
  }

  function regPreUsuario($pDatos) {
    extract($pDatos);
    $correo = $pDatos["correo"];
    $sql = "insert into pre_usuarios values('" . $correo . "')";
    $rs = $this->adodb->Execute($sql);

    $mailer = new PHPMailer();
    $mailer->IsSMTP();
    $mailer->Host = 'ssl://gedeon.colombiahosting.com.co:465';
    $mailer->SMTPAuth = TRUE;
    $mailer->Username = 'no-reply@e-ventti.com';  // Change this to your gmail adress
    $mailer->Password = '3fai830fGS37hdSD6';  // Change this to your gmail password
    $mailer->From = 'no-reply@e-ventti.com';  // This HAVE TO be your gmail adress
    $mailer->FromName = 'e-ventti'; // This is the from name in the email, you can put anything you like here
    $mailer->IsHTML(true);

    $mailer->Subject = "Una persona se suscribio a e-ventti";
    $mailer->Body = "$correo";
    $mailer->AddAddress("engenial_team@googlegroups.com");
    $mailer->Send();

    $mailer->IsHTML(true);
    $mailer->ClearAddresses();
    $mailer->Subject = "Bienvenido!";
    $mailer->Body = "<p>Gracias!</p><p>Hemos registrado tu correo. Espera noticias nuestras muy pronto!.</p><p>e-ventti</p>";
    $mailer->AddAddress("$correo");
    $mailer->Send();

    echo json_encode(1);
  }

  function leerArchivo($html) {
    $file = fopen("$html", "r");
    if (!$file) {
      return false;
    } else {
      $bufer = '';
      while (!feof($file)) {
        $bufer .= fgets($file, 4096);
      }
      fclose($file);
      return $bufer;
    }
  }

  function cargarCiudades() {
    $sql = "select id,ciudad, departamento, pais from ciudades order by ciudad";
    $rs = $this->adodb->Execute($sql);
    $respuesta = "";
    while (!$rs->EOF) {
      $respuesta.="<option value='" . $rs->fields['id'] . "'>" . $rs->fields['ciudad'] . ", " . $rs->fields['departamento'] . "</option>";
      $rs->MoveNext();
    }
    echo json_encode($respuesta);
  }

  /* Esta funcion actualiza el sitemap */

  function actualizarSiteMap() {
    $xml = "<?xml version='1.0' encoding='UTF-8'?>
              <urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>
                ";
    //creamos url enlazadas a las categorias
    $sql = "select id, nombre, descripcion 
              from tipo_evento";
    $rs = $this->adodb->Execute($sql);
    while (!$rs->EOF) {
      $xml.="<url> 
                        <loc>http://www.e-ventti.com/?f=ev.tipo&amp;o=eq&amp;s=" . $rs->fields['id'] . "&amp;t=" . $rs->fields['nombre'] . "&amp;r=true&amp;menu=" . $rs->fields['id'] . "&amp;modo=matriz</loc>
                        <lastmod>" . date("Y-m-d") . "</lastmod>
                        <changefreq>always</changefreq>
                        <priority>0.8</priority>
                    </url>
                    ";
      $rs->MoveNext();
    }
    //creamos url enlazadas a los sectores
    $sql = "select id, nombre, descripcion 
              from sector";
    $rs = $this->adodb->Execute($sql);
    while (!$rs->EOF) {
      $xml.="<url>
                        <loc>http://www.e-ventti.com/?f=ev.sector&amp;o=eq&amp;s=" . $rs->fields['id'] . "&amp;t=" . $rs->fields['nombre'] . "&amp;r=true&amp;modo=matriz</loc>
                        <lastmod>" . date("Y-m-d") . "</lastmod>
                        <changefreq>always</changefreq>
                        <priority>0.8</priority>
                    </url>
                    ";
      $rs->MoveNext();
    }
    //creamos url enlazadas a los sectores
    $sql = "select id, tipo 
              from evento";
    $rs = $this->adodb->Execute($sql);
    while (!$rs->EOF) {
      $xml.="<url>
                        <loc>http://www.e-ventti.com/?id=" . $rs->fields['id'] . "&amp;modo=espec&amp;f=ev.tipo&amp;o=eq&amp;s=" . $rs->fields['tipo'] . "</loc>
                        <lastmod>" . date("Y-m-d") . "</lastmod>
                        <changefreq>always</changefreq>
                        <priority>1</priority>
                    </url>
                    ";
      $rs->MoveNext();
    }

    $xml.="</urlset>";
    $file = fopen("../sitemap.xml", "w") or die("Problemas en la creacion");
    fwrite($file, $xml);
    fclose($file);
    $respuesta->error = 0;
    $respuesta->contenido = $xml;

    echo json_encode($respuesta);
  }

  /*
   * Esta funcion recibe por request el id de la categoria, y retorna un array con todas los eventos
   * que pertenecen a ella.
   */

  function CategoriasySectoresyMultimedia() {
    $sql = "select id, nombre
              from sector";
    $rs = $this->adodb->Execute($sql);
    $sectores = "";
    while (!$rs->EOF) {
      $sectores.="<option value='" . $rs->fields[0] . "'>" . $rs->fields[1] . "</option>";
      $rs->MoveNext();
    }

    //////
    $sql = "select id, nombre
              from tipo_evento";
    $rs = $this->adodb->Execute($sql);
    $categorias = "";
    while (!$rs->EOF) {
      $categorias.="<option value='" . $rs->fields[0] . "'>" . $rs->fields[1] . "</option>";
      $rs->MoveNext();
    }

    //////
    $sql = "select m.id, m.url, count(*)
                from multimedia as m, evento as e
                where m.id=e.foto
                group by m.id, m.url
                UNION
                SELECT m.id, m.url,0
                FROM multimedia m
                WHERE m.id NOT
                IN (
                SELECT foto
                FROM evento
                )";
    $rs = $this->adodb->Execute($sql);
    $multimedia = "";
    $imagenes = "";
    while (!$rs->EOF) {
      $multimedia.="<div class='opcion_img'>
                                                    <input name='radios_imagenes' type='radio' onclick=\"selectImagen(" . $rs->fields[0] . ")\" value='" . $rs->fields[0] . "'/>
                                                    <img src='" . $rs->fields[1] . "' />
                                                    <div class='texto'>" . $rs->fields[1] . "</div>
                                                </div>";
      $imagenes.="<div class='content_img'>
                                    <img src='" . $rs->fields[1] . "' />
                                    <span>" . $rs->fields[2] . " eventos enlazados</span>
                                    <a href='javascript:eliminarFoto(" . $rs->fields[0] . ")'>Eliminar</a>
                                </div> ";
      $rs->MoveNext();
    }

    echo json_encode(array($sectores, $categorias, $multimedia, $imagenes));
  }

  /**
   * Esta funcion recibe como parametros la informacion de un correo electronico para importar
   * todos los contactos e invitarlos a e-ventti!
   * 
   * @param $pDatos: $correo: username o correo electronico del sujeto
   *                 $pass: contraseña del correo electronico del sujeto
   *                 $server: tipo de servidor de correo del sujeto. ej: (gmail, hotmail, facebook) etc.
   */
  function importarContactos($pDatos) {
    extract($pDatos);
    $correo = $pDatos["correo"];
    $pass = $pDatos["pass"];
    $servidor = $pDatos["servidor"];
    $inviter = new OpenInviter();
    $inviter->startPlugin($servidor);
    $inviter->login($correo, $pass);
    if (!$inviter) {
      echo json_encode(1);
    } else {
      $contacts = $inviter->getMyContacts();
      $i = 0;

      foreach ($contacts as $email => $name) {
        $res["nombre"] = $name;
        $res["correo"] = $email;
        $respuesta[$i] = $res;
        $i++;
      }
      $inviter->stopPlugin(true);
      $inviter->logout();
      echo json_encode($respuesta);
    }
  }

  function enviarInvitacion($pDatos) {
    if ($_SESSION["autenticado"] == "si" && $_SESSION['id'] > 0) {
      extract($pDatos);
      $correos = $pDatos["correos"]; //Array de invitados (nombre y correo)           
      $invitador = $_SESSION["nombre"]; //Nombre del invitador


      $mailer = new PHPMailer();
      $mailer->IsSMTP();
      $mailer->Host = 'ssl://gedeon.colombiahosting.com.co:465';
      $mailer->SMTPAuth = TRUE;
      $mailer->Username = 'no-reply@e-ventti.com';  // Change this to your gmail adress
      $mailer->Password = '3fai830fGS37hdSD6';  // Change this to your gmail password
      $mailer->From = 'no-reply@e-ventti.com';  // This HAVE TO be your gmail adress
      $mailer->FromName = 'e-ventti'; // This is the from name in the email, you can put anything you like here
      $mailer->IsHTML(true);

      $mailer->Subject = $invitador . " te ha invitado a ser parte de e-ventti!";
      $lista_correos = split('/', $correos);
      foreach ($lista_correos as $cada_correo) {
        if ($cada_correo != "") {
          $info_correo = split('&', $cada_correo);
          $nom_c = split('@', $info_correo[0]);
          $nom_correo = $nom_c[0];
          $cor_correo = $info_correo[1];
          $mailer->AddAddress($cor_correo, $nom_correo);
          $mailer->Body = "<html>
                            <body style='text-align: center;
                font-family: Helvetica;
                font-size: 16px;
                background: #F9F7F7;'>
        
        <div style='margin: 0 auto;
                margin-top: 30px;
                width: 70%;
                background: #fff;
                border-radius: 6px;
                -webkit-box-shadow: 0 0 8px #77b224;
                -moz-box-shadow: 0 0 8px #77b224;
                padding: 30px;'>
            <h1 style='font-family: Times New Roman, Helvetica;
                font-size: 40px;
                color: #77b224;
                text-align: left;
                font-style: italic;
                font-weight: bold;
                padding: 0;
                margin: 0;'>Invitacion a e-ventti</h1>
            <p style='text-align: justify;
                color:  #636363;'>
                Hola, $nom_correo</p>
            <p style='text-align: justify;
                color:  #636363;'>
                $invitador te invita a ser parte de la comunidad <span style='font-family: Times New Roman, Helvetica;
                font-size: 20px;
                font-style: italic;'>e-ventti</span>.
                Regístrate y podras publicar eventos, ver los eventos de tu ciudad,
                programar tu dia libre, ganar puntos, premios y más... :)
            </p>

            <a style='font-family: Times New Roman, Helvetica;
                font-size: 20px;
                font-style: italic;
                font-weight: bold;
                
                text-decoration: none;
                background: #c4c4c4;
                color: #4e4e4d;
                padding: 5px;
                
                border-radius: 4px;
                box-shadow: 0 0 4px #000;
                
                -moz-transition: all 0.2s linear;
                -webkit-transition: all 0.2s linear;
                transition: all 0.2s linear;' href='www.e-ventti.com/?op=registrarse&id_inv=" . $_SESSION["id"] . "'>Únete a e-ventti</a>
        </div>
    </body>
    </html>
                            ";
          $mailer->Send();
        }
        $mailer->ClearAddresses();
      }
      echo json_encode("ok");
    } else {
      echo json_encode("no log");
    }
  }

  /*
   * Crea el thumbnail, recortandola desde un punto con un ancho y alto definido. Reduce su peso.
   * 
   * $src : es la ruta de la imagen original
    $x: posicion en x
    $y: posicion en y
    $w: ancho
    $h: alto
   */

  function reducirImagen($pDatos) {
    extract($pDatos);
    $src = "../" . $pDatos["src_imagen"];
    $x = $pDatos["x"];
    $y = $pDatos["y"];
    $w = $pDatos["w"];
    $h = $pDatos["h"];


    $info_src = $this->filedata($src);

    $targ_w = $targ_h = 197;
    $calidad = 149;
    $ext = strtoupper($info_src["ext"]);

    if ($ext == "JPG" || $ext == "JPEG") {
      //JPEG
      $img_r = ImageCreateFromJPEG($src);
    } elseif ($ext == "PNG") {
      //PNG
      $img_r = ImageCreateFromPNG($src);
    } elseif ($ext == "GIF") {
      //GIF
      $img_r = ImageCreateFromGIF($src);
    } elseif ($ext == "WBMP") {
      //WBMP
      $img_r = ImageCreateFromWBMP($src);
    } else {
      echo json_encode(1);
    }

    $dst_r = ImageCreateTrueColor($targ_w, $targ_h);

    imagecopyresampled($dst_r, $img_r, 0, 0, $x, $y, $targ_w, $targ_h, $w, $h);

    header('Content-type: image/jpeg');
    $ruta_nueva_img = "../vista/images/thumb_" . $info_src['name'] . ".jpeg";

    if (imagejpeg($dst_r, $ruta_nueva_img, $calidad))
      echo json_encode($ruta_nueva_img);
    else
      echo json_encode(2);
  }

  /**
   *
   * @param type $path: sera la ruta del archivo que queremos analizar
   * @return type array
   */
  function filedata($path) {
    clearstatcache();
    $data["exists"] = is_file($path);
    $data["writable"] = is_writable($path);
    $data["chmod"] = ($data["exists"] ? substr(sprintf("%o", fileperms($path)), -4) : FALSE);
    $data["ext"] = substr(strrchr($path, "."), 1);
    $data["path"] = array_shift(explode("." . $data["ext"], $path));
    $data["name"] = array_pop(explode("/", $data["path"]));
    $data["name"] = ($data["name"] ? $data["name"] : FALSE);
    $data["path"] = ($data["exists"] ? ($data["name"] ? realpath(array_shift(explode($data["name"], $data["path"]))) : realpath(array_shift(explode($data["ext"], $data["path"])))) : ($data["name"] ? array_shift(explode($data["name"], $data["path"])) : ($data["ext"] ? array_shift(explode($data["ext"], $data["path"])) : rtrim($data["path"], "/"))));
    $data["filename"] = (($data["name"] OR $data["ext"]) ? $data["name"] . ($data["ext"] ? "." : "") . $data["ext"] : FALSE);
    return $data;
  }

}

?>
