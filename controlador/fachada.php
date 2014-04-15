<?php
/**
 * Controlador de fachada que recibe mensajes de la capa de presentación,
 * Instancia la base de datos,
 * Delega a otras clases las peticiones recibidas y en algunas ocasiones
 * Envía las respuestas recibidas a la capa de presentación.
 * Basado en el patron "Facade", ver Larman
 * @author Carlos Cuesta Iglesias
 */


header('Content-Type: text/html; charset=UTF-8');
try {
//  Ver info de ADODB en: http://www.dev-postnuke.com/modules/dpDocs/manuales/ADOdb_manual_es/docs-adodb-es.htm
//  OJO: include_once no lanza excepciones en caso de que proporcione un nombre de archivo erróneo
    include_once("../librerias/adodb5/adodb-exceptions.inc.php");
    include_once('../librerias/adodb5/adodb.inc.php');


    error_reporting(1);
    //$conexion = Conexion::getConexion();
    //$conexion = Conexion::conectar();
    // A esta fachada le llegan dos argumentos por GET: el nombre de una clase y
    // el nombre de un método de dicha clase. Aquí los transferimos a variables:
    $clase = $_REQUEST["clase"];
    $metodo = $_REQUEST["metodo"];
	
	/*$clase = "miclase";
    $metodo = "prueba";
	*/

    //$conexion = Conexion::getInstance('mysql', 'localhost', 'root', '', 'tecnologiabd');
//
 //   $clase = 'Libreria';
  //  $metodo = 'prueba';
//    // Ahora se crea una instancia de la clase recibida por GET
    $obj = new $clase();
    //
    //
    // Y se le envía un mensaje al método que también se recibió por GET
    // Por convención lo que se reciba por POST se envía como argumento del mensaje
    //

    $obj->$metodo($_POST);


} catch (Exception $e) {
    echo json_encode(array("mensaje" => $e->getMessage()));
	
//echo 'error';
}

/**
 * Intenta cargar aquellas clases que no se incluyen explícitamente.
 * @param <type> $nombreClase el nombre de la clase que se intentará cargar
 * desde la ruta ../modelo/
 * IMPORTANTE: include_once no lanza excepciones
 */
function __autoload($nombreClase) {
 if ($nombreClase == "Conexion") {
        $nombreClase = "../conexion/$nombreClase.php";
    }
       else {
        $nombreClase = "../modelo/$nombreClase.php";
    }

    if (file_exists($nombreClase)) {
        include_once($nombreClase);
    } else {
        throw new Exception("No existe la clase $nombreClase");
    }
}



?>
