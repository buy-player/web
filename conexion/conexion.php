<?php

include_once("../librerias/adodb5/adodb-exceptions.inc.php");
include_once("../librerias/adodb5/adodb.inc.php");
session_cache_limiter('nocache,private');
session_start();

class Conexion {

    private static $motor;
    private static $servidor;
    private static $usuario;
    private static $clave;
    private static $baseDatos;
    private static $conexion;
    private static $_instance;

    /**
     * La función construct es privada para evitar que el objeto pueda ser creado mediante new
     */
    private function __construct() {
        $this->conectar();
    }

    /**
     * Evitamos el clonaje del objeto. Patrón Singleton
     */
    private function __clone() {
        
    }

    /** Función encargada de crear, si es necesario, el objeto. Esta es la función
     *  que debemos llamar desde fuera de la clase para instanciar el objeto, y así,
     *  poder utilizar sus métodos
     */
    public static function getInstance($motor, $servidor, $usuario, $clave, $db) {
        if (!(self::$_instance instanceof self)) {
            self::$motor = $motor;
            self::$servidor = $servidor;
            self::$usuario = $usuario;
            self::$clave = $clave;
            self::$baseDatos = $db;
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    /**
     * Realiza la conexión a la base de datos.
     */
    public static function conectar() {
        $this->conexion = ADONewConnection(self::$motor);
        $this->conexion->Connect(self::$servidor, self::$usuario, self::$clave, self::$baseDatos);
    }

    /**
     * Retorna la conexión de la base de datos
     * @return <type>
     */
    public static function getConexion() {
        $servidor = "localhost";
        $usuario = "root";
        $clave = "";
        $dbname = "buyplayersoccer";
        $conexion = NewADOConnection('mysql');
        $conexion->Connect($servidor, $usuario, $clave, $dbname);
        return $conexion;
    }

}

?>