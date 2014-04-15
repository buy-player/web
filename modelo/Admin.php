<?php
session_start();

class Admin {

    private $conexion;

    function __construct() {
        $this->conexion = Conexion::getConexion();
    }

    function consultarJugadores() {
        $SQL = "SELECT id, nombre, apellidos, fecha_nacimiento, celular, email, imagen FROM usuario WHERE tipo = 3";
        $rs = $this->conexion->Execute($SQL);
        $i = 0;
        while (!$rs->EOF) {
            $jugador['id'] = $rs->fields['id'];
            $jugador['nombre'] = $rs->fields['nombre'];
            $jugador['apellidos'] = $rs->fields['apellidos'];
            $jugador['fecha_nacimiento'] = $rs->fields['fecha_nacimiento'];
            $jugador['celular'] = $rs->fields['celular'];
            $jugador['email'] = utf8_encode($rs->fields['email']);
            $jugador['imagen'] = utf8_encode($rs->fields['imagen']);
            $tabla_jugador[$i] = $jugador;
            $i++;
            $rs->MoveNext();
        }
        echo json_encode($tabla_jugador);
    }

    function consultarJugador() {
        $SQL = "SELECT u.id, u.nombre, u.apellidos, u.fecha_nacimiento, u.email, 
                             u.telefono, u.celular, u.imagen, uj.peso, 
                             uj.estatura, uj.video, uj.puntuacion_promedio,uj.perfil
                        FROM usuario u, usuario_jugador uj
                        WHERE uj.Usuario_id = u.id
                        AND u.id=" . $_REQUEST["identificador"] . ";";
        $rs = $this->conexion->Execute($SQL);
        $jugador['id'] = $_REQUEST["identificador"];
        $jugador['nombre'] = $rs->fields['nombre'];
        $jugador['apellidos'] = $rs->fields['apellidos'];
        $jugador['fecha_nacimiento'] = $rs->fields['fecha_nacimiento'];
        $jugador['email'] = utf8_encode($rs->fields['email']);
        $jugador['telefono'] = $rs->fields['telefono'];
        $jugador['celular'] = $rs->fields['celular'];
        $jugador['imagen'] = $rs->fields['imagen'];
        $jugador['peso'] = $rs->fields['peso'];
        $jugador['estatura'] = $rs->fields['estatura'];
        $jugador['video'] = $rs->fields['video'];
        $jugador['puntuacion_promedio'] = $rs->fields['puntuacion_promedio'];
        $jugador['perfil'] = utf8_encode($rs->fields['perfil']);
        $tabla_jugador[0] = $jugador;
        
        echo json_encode($tabla_jugador);
    }

    function consultarCazatalentos() {
        $SQL = "SELECT nombre, apellidos, fecha_nacimiento, celular, email FROM usuario WHERE tipo = 2";
        //$SQL = "SELECT * FROM usuario WHERE tipo = 2";
        $rs = $this->conexion->Execute($SQL);
        $i = 0;
        while (!$rs->EOF) {
            $cazatalento['nombre'] = $rs->fields['nombre'];
            $cazatalento['apellidos'] = $rs->fields['apellidos'];
            $cazatalento['fecha_nacimiento'] = $rs->fields['fecha_nacimiento'];
            $cazatalento['celular'] = $rs->fields['celular'];
            $cazatalento['email'] = utf8_encode($rs->fields['email']);
            $tabla_cazatalento[$i] = $cazatalento;
            $i++;
            $rs->MoveNext();
        }
        echo json_encode($tabla_cazatalento);
    }

    function consultarNoticias() {
        $SQL = "SELECT titulo, descripcion FROM noticia";
        $rs = $this->conexion->Execute($SQL);
        $i = 0;
        while (!$rs->EOF) {
            $noticia['titulo'] = $rs->fields['titulo'];
            $noticia['descripcion'] = $rs->fields['descripcion'];
            $tabla_noticia[$i] = $noticia;
            $i++;
            $rs->MoveNext();
        }
        echo json_encode($tabla_noticia);
    }

    function consultarPatrocinadores() {
        $SQL = "SELECT nombre, imagen FROM patrocinador";
        $rs = $this->conexion->Execute($SQL);
        $i = 0;
        while (!$rs->EOF) {
            $patrocinador['nombre'] = $rs->fields['nombre'];
            $patrocinador['imagen'] = $rs->fields['imagen'];
            $tabla_patrocinador[$i] = $patrocinador;
            $i++;
            $rs->MoveNext();
        }
        echo json_encode($tabla_patrocinador);
    }
    function login() {
        $SQL = "SELECT * FROM usuario where email='".$_REQUEST["emailLog"]."' and password='".md5($_REQUEST["passLog"])."';";
        try {
            $rs = $this->conexion->Execute($SQL);
            if($rs != null){
             $_SESSION["ultimoAcceso"] = date("Y-n-j H:i:s");
             $usuario['id'] = $rs->fields['id'];
             $_SESSION["id"] = $rs->fields['id'];
             $usuario['nombre'] = $rs->fields['nombre'];
             $_SESSION["nombre"] = $rs->fields['nombre'];
             $usuario['apellidos'] = $rs->fields['apellidos'];
             $usuario['fecha_nacimiento'] = $rs->fields['fecha_nacimiento'];
             $_SESSION["fecha_nacimiento"] = $rs->fields['fecha_nacimiento'];
             $usuario['telefono'] = $rs->fields['telefono'];
             $_SESSION["telefono"] = $rs->fields['telefono'];
             $usuario['celular'] = $rs->fields['celular'];
             $_SESSION["celular"] = $rs->fields['celular'];
             $usuario['email'] = utf8_encode($rs->fields['email']);
             $_SESSION["email"] = utf8_encode($rs->fields['email']);
             $usuario['imagen'] = $rs->fields['imagen'];
             $_SESSION["imagen"] = $rs->fields['imagen'];
             $usuario['tipo'] = $rs->fields['tipo'];
             $_SESSION["tipo"] = $rs->fields['tipo'];
             $usuario['estado'] = $rs->fields['estado'];
             $_SESSION["estado"] = $rs->fields['estado'];
             $usuario['password_recuperacion'] = $rs->fields['password_recuperacion'];
             $_SESSION["password_recuperacion"] = $rs->fields['password_recuperacion'];
             $tabla_usuario[0] = $usuario;  
            }
        echo json_encode($tabla_usuario);
        } catch (Exception $exc) {
            echo json_encode("0");
        }
        
        
    }

}

?>
