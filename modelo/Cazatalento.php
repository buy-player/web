<?php

class Cazatalento {
    
    private $conexion;

    function __construct() {
        $this->conexion = Conexion::getConexion();
    }
 
    function registroCazatalento() {
        $sql = "INSERT INTO `usuario`( `nombre`,`email`,`password`,`tipo`,`estado`)VALUES('".$_REQUEST["nombreCazatalentos"]."','".$_REQUEST["emailCazatalentos"]."','".md5($_REQUEST["passCazatalentos"])."',2,0)";
        try {
            $rs = $this->conexion->Execute($sql);
            echo json_encode("1");
        } catch (Exception $exc) {
            echo json_encode("0");
        }
    }
    
}
