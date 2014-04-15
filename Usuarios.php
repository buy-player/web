<?php

date_default_timezone_set('America/Bogota');
session_start();
//include_once('Utilidades.php');
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Esta clase albergara todos aquellos metodos que interfieran en la base de datos respecto
 * a los usuarios. Incluye la gestion de usuarios, validacion de datos, e inicio de sesion.
 *
 * @author Samiro
 */
class Usuarios {

  //put your code here
  private $conexion; //Objeto que guarda la conexion a la base de datos
  private $adodb;

  function __construct($conexion) {
    $this->conexion = $conexion;
    $this->adodb = $this->conexion->getADO();
  }

  function nuevaSugerencia($pDatos) {
    $email = mysql_real_escape_string(trim($pDatos['email']));
    $idea = mysql_real_escape_string(trim($pDatos['idea']));
    $desc = mysql_real_escape_string(trim($pDatos['desc']));
    $user = "NULL";
    $date_reg = date("Y-m-d H:i:s");
    if (isset($_SESSION["c5aec72e193c921165e3186f66baf9ed"]) && $_SESSION["c5aec72e193c921165e3186f66baf9ed"] == "si" && $_SESSION['id'] > 0) {
      $user = $_SESSION["id"];
    }
    if ($email == "") {
      $email = "NULL";
    }
    $rs = $this->adodb->Execute("insert into sugerencias(idea, descripcion, id_usuario, correo_usuario, fecha_reg)
                                values ('" . $idea . "','" . $desc . "'," . $user . ",'" . $email . "','" . $date_reg . "')");
    if ($rs) {
      $res->error = false;
      $res->msj = "ingresado";
      echo json_encode($res);
    } else {
      $res->error = true;
      $res->msj = "error";
      echo json_encode($res);
    }
  }

  /**
   * Elimina la session activa. 
   */
  function cerrarSesion() {
    //eventti en md5. Esto es para saber si esta o no autenticado. Y para distinguir de los
    //autenticado de los demás.
    $_SESSION["c5aec72e193c921165e3186f66baf9ed"] = "no";
    $_SESSION["nombre"] = "";
    $_SESSION["correo"] = "";
    $_SESSION["ciudad_actual"] = "";
    session_destroy();
    echo json_encode(1);
  }

  function getCorreosPreRegistrados() {
    $rs = $this->adodb->Execute("select correo from pre_usuarios where correo NOT IN (select correo_electronico from usuarios)");
    $i = 0;
    $res = array();
    while (!$rs->EOF) {
      $res[$i] = $rs->fields["correo"];
      $i++;
      $rs->MoveNext();
    }
    return $res;
  }

  /**
   * Esta funcion cambia la contraseña del usuario que está logueado.
   * 
   * @param type $pDatos
   * contra_v: contraseña vieja
   * contra_n: contraseña nueva
   *  
   */
  function cambiarContrasena($pDatos) {
    if (isset($_SESSION["c5aec72e193c921165e3186f66baf9ed"]) && $_SESSION["c5aec72e193c921165e3186f66baf9ed"] == "si" && $_SESSION['id'] > 0) {

      $contra_v = mysql_real_escape_string(trim($pDatos['contra_v']));
      $contra_n = mysql_real_escape_string(trim($pDatos['contra_n']));

      if ($contra_n != "" && $contra_v != "") {

        $sql = "select id, contrasena from usuarios where id=" . $_SESSION["id"] . " and contrasena='" . $contra_v . "'";
        $result_set = $this->adodb->Execute($sql);
        if (!$result_set->EOF && $result_set->fields["contrasena"] == $contra_v) {
          $rs = $this->adodb->Execute("update usuarios set contrasena='" . $contra_n . "' where id=" . $result_set->fields["id"]);
          if (!$rs) {
            $res->error = true;
            $res->type_error = 1;
            $res->msj = "no actualizo";
            echo json_encode($res);
          } else {
            $res->error = false;
            $res->type_error = 0;
            $res->msj = "se cambio la contraseña";
            echo json_encode($res);
          }
        } else {
          $res->error = true;
          $res->type_error = 2;
          $res->msj = "no coincide la clave sql: " . $sql;
          echo json_encode($res);
        }
      } else {
        $res->error = true;
        $res->type_error = 4;
        $res->msj = "error en parametros";
        echo json_encode($res);
      }
    }
  }

  /**
   * Esta funcion recibe por parametro el correo electronico del usuario que quiere restaurar.
   * Se genera una nueva contraseña, y se envía la nueva contraseña al correo.
   * 
   * @param type $pDatos
   *  
   */
  function recupContrasena($pDatos) {
    $correo = mysql_real_escape_string(trim($pDatos['correo']));
    $codigo = mysql_real_escape_string(trim($pDatos['codigo']));

    $ut = new Utilidades($this->conexion);

    $contrasena = $ut->generarClave(6);
    $contra_encrip = sha1($contrasena);

    if ($correo != "") {
      $result_set = $this->adodb->Execute("select nombre, verif_clave from usuarios where correo_electronico='" . $correo . "'");
      if (!$result_set->EOF && $result_set->fields["verif_clave"] == $codigo) {
        $rs = $this->adodb->Execute("update usuarios set contrasena='" . $contra_encrip . "' where correo_electronico='" . $correo . "' and verif_clave='" . $result_set->fields["verif_clave"] . "'");
        if (!$rs) {
          $res->error = true;
          $res->type_error = 1;
          $res->msj = "no actualizo";
          echo json_encode($res);
        } else {
          $mensaje = $ut->plantillaOlvidoContrasena($correo, $result_set->fields["nombre"], $contrasena);
          $env = $ut->enviarCorreo($correo, "Recuperación de tu contraseña en e-ventti", $mensaje);
          if ($env) {
            $res->error = false;
            $res->type_error = 0;
            $res->msj = "se genero la contraseña, y se envio el correo";
            echo json_encode($res);
          } else {
            $res->error = true;
            $res->type_error = 2;
            $res->msj = "hubo un error en el envio al correo";
            echo json_encode($res);
          }
        }
      } else {
        $res->error = true;
        $res->type_error = 3;
        $res->msj = "no coincide la clave";
        echo json_encode($res);
      }
    } else {
      $res->error = true;
      $res->type_error = 4;
      $res->msj = "error en parametros";
      echo json_encode($res);
    }
  }

  /**
   * Esta funcion recibe por parametro el correo electronico del usuario que quiere restaurar.
   * Con la clave de verif, de éste sujeto, se envia un mensaje para que verifique la accion de restaurar la contraseña.
   * 
   * @param type $pDatos 
   */
  function recupContrasenaCodigo($pDatos) {
    $correo = mysql_real_escape_string(trim($pDatos['correo']));
    $ut = new Utilidades($this->conexion);

    if ($correo != "") {
      $rs = $this->adodb->Execute("select nombre, verif_clave from usuarios where correo_electronico='" . $correo . "'");
      if (!$rs->EOF) {
        $codigo = $rs->fields["verif_clave"];
        $mensaje = $ut->plantillaCodigoOlv($correo, $rs->fields["nombre"], $codigo);
        $env = $ut->enviarCorreo($correo, "Código de verificación", $mensaje);
        if ($env) {
          $res->error = false;
          $res->type_error = 0;
          $res->msj = "se genero el codigo, y se envio el correo";
          echo json_encode($res);
        } else {
          $res->error = true;
          $res->type_error = 1;
          $res->msj = "hubo un error en el envio al correo";
          echo json_encode($res);
        }
      } else {
        $res->error = true;
        $res->type_error = 2;
        $res->msj = "no existe el correo";
        echo json_encode($res);
      }
    } else {
      $res->error = true;
      $res->type_error = 3;
      $res->msj = "error en parametros";
      echo json_encode($res);
    }
  }

  /**
   * Inicia sesión al usuario.
   * @param type $pDatos 
   * @param $pDatos correo: correo electronico principal
   * @param $pDatos pass: contraseña
   * 
   *  @return numero entero:
   *          0: No hubo errores e inicio sesion
   *          1: Ese correo electronico no esta en nuestra base de datos
   *          2: La contraseña no corresponde con el correo ingresado
   *          3: EL usuario no ha activado la cuenta
   */
  function iniciarSesion($pDatos) {
    extract($pDatos);
    $correo = mysql_real_escape_string(trim($pDatos['correo']));
    $pass = mysql_real_escape_string(($pDatos['pass']));
    if ($this->existeCorreo($correo)) {
      $sql = "select u.id as id, 
                           u.nombre as nombre,
                           u.apodo as apodo,
                           u.frase as frase,
                           u.fecha_nacimiento as fecha,
                           u.id_ciudad_actual as id_ciudad_actual,
                           u.correo_electronico as correo, 
                           u.url_foto as foto,
                           u.puntos as puntos,
                           u.id_tipo_usuario as tipo_usuario,
                           c.ciudad as ciudad, 
                           c.departamento as departamento,
                           u.verif_activada verif_activada
                    from usuarios u, ciudades c
                    where u.correo_electronico='" . mysql_real_escape_string($correo) . "' 
                    and u.contrasena='" . mysql_real_escape_string($pass) . "'
                    and u.id_ciudad_actual=c.id";
      $rs = $this->adodb->Execute($sql);
      if (!$rs->EOF) {
        if ($rs->fields["verif_activada"] == '0') {
          echo json_encode(3);
        } else {
          $_SESSION["c5aec72e193c921165e3186f66baf9ed"] = "si";
          $_SESSION["id"] = $rs->fields['id'];
          $_SESSION["nombre"] = $rs->fields['nombre'];
          $_SESSION["apodo"] = $rs->fields['apodo'];
          $_SESSION["nombre_corto"] = "";
          if ($rs->fields['apodo'] == "") {
            $tem1 = split(" ", rtrim($rs->fields['nombre']));
            $_SESSION["nombre_corto"] = $tem1[0];
          } else {
            $_SESSION["nombre_corto"] = $rs->fields['apodo'];
          }
          $_SESSION["frase"] = $rs->fields['frase'];
          $_SESSION["fecha"] = $rs->fields['fecha'];
          $_SESSION["tipo_usuario"] = $rs->fields['tipo_usuario'];
          $_SESSION["correo"] = $rs->fields['correo'];
          $_SESSION["id_ciudad_actual"] = $rs->fields['id_ciudad_actual'];
          $_SESSION["nom_ciudad_actual"] = $rs->fields['ciudad'] . ", " . $rs->fields['departamento'];
          $_SESSION["url_foto"] = $rs->fields['foto'];
          $_SESSION["puntos"] = $rs->fields['puntos'];

          echo json_encode(0);
        }
      } else {
        $_SESSION["c5aec72e193c921165e3186f66baf9ed"] = "no";
        session_destroy();
        echo json_encode(2);
      }
    } else {
      echo json_encode(1);
    }
  }

  /**
   * Esta función recibe por parametro el codigo de verificacion, y activa la cuenta en caso de ser valido el codigo.
   * @param type $pDatos 
   * 
   */
  function confirmarCuenta($pDatos) {
    $codigo = mysql_real_escape_string(trim($pDatos['verif']));
    if ($codigo != "") {
      $rs = $this->adodb->Execute("select id from usuarios where verif_clave='" . $codigo . "'");
      if (!$rs->EOF) {
        $this->adodb->Execute("update usuarios set verif_activada:=1 where id=" . $rs->fields["id"] . " and verif_clave='" . $codigo . "'");
        $rs2 = $this->adodb->Execute("select verif_activada from usuarios where id=" . $rs->fields["id"] . " and verif_activada=1");
        if (!$rs2->EOF) {
          $res->error = false;
          $res->succes = true;
          $res->msj = "Cuenta verificada!";
          echo json_encode($res);
        } else {
          $res->error = true;
          $res->succes = false;
          $res->msj = "La cuenta no pudo ser activada!";
          echo json_encode($res);
        }
      } else {
        $res->error = true;
        $res->succes = false;
        $res->msj = "Codigo erroneo!";
        echo json_encode($res);
      }
    } else {
      $res->error = true;
      $res->succes = false;
      $res->msj = "Error en codigo";
      echo json_encode($res);
    }
  }

  /**
   * 
   * @param type $pDatos 
   * @param $pDatos nombre: nombre completo del nuevo usuario, si el nombre es vacio, entonces el nombre será el nombre de usuario de correo electronico. Es decir la parte izquierda desde el @
   * @param $pDatos correo: correo electronico principal
   * @param $pDatos pass: contraseña
   * @param $pDatos c_actual: ciudad actual
   * 
   * @return numero entero:
   *          0: No hubo errores y se inserto satisfactoriamente
   *          1: Ya existe el correo que se pretende ingresar
   *          2: La fecha esta mal escrita
   *          3: NO se inserto
   *          
   */
  function nuevoUsuario($pDatos) {
    $nombre = mysql_real_escape_string(trim($pDatos['nombre']));
    $correo = mysql_real_escape_string(trim($pDatos['correo']));
    $contrasena = mysql_real_escape_string($pDatos['pass']);
    $fuente = mysql_real_escape_string(trim($pDatos['fuente']));
    $id_invitado = mysql_real_escape_string($pDatos["id_inv"]);
    $date_reg = date("Y-m-d H:i:s");
    $ut = new Utilidades($this->conexion);
    $res->error = true;
    $res->type_error;
    $res->msj;

    if ($correo == "" || $fuente == "" || ($contrasena == "" && $fuente != "e-ventti")) {
      $res->error = true;
      $res->type_error = 3;
      $res->msj = "Ocurrió une error en los parametros.";
      echo json_encode($res);
    } else {
      if ($this->existeCorreo($correo) == 1) {
        $res->error = true;
        $res->type_error = 1;
        $res->msj = "Ese correo electronico ya esta registrado.";
        echo json_encode($res);
      } else {
        $clave = $this->obtenerClaveVerifUnica();
        $pass_encrip = $contrasena;
        if ($contrasena == "") {
          $contrasena = $ut->generarClave(6);
          $pass_encrip = sha1($contrasena);
        }
        if ($nombre == "") {
          $n_tem = split("@", $correo);
          $nombre = $n_tem[0];
        }
        $sql = "insert into usuarios(nombre, correo_electronico, contrasena, id_tipo_usuario, fecha_registro, verif_activada, verif_clave)
              values('" . ($nombre) . "','" . ($correo) . "','" . ($pass_encrip) . "',2,'" . $date_reg . "', 0, '" . $clave . "')";
        $rs = $this->adodb->Execute($sql);
        if (!$rs) {
          $res->error = true;
          $res->type_error = 2;
          $res->msj = "Ocurrió un error mientras se registraba el usuario.";
          echo json_encode($res);
        } else {
          if ($id_invitado != "" && $id_invitado > 0) {
            $sqlpuntos = "update from usuarios set puntos:=puntos+50 where id=" + $id_invitado;
            $this->adodb->Execute($sqlpuntos);
          }
          $sqlt = "select id from usuarios where correo_electronico='" . $correo . "'";
          $rst = $this->adodb->Execute($sqlt);
          if (!$rst->EOF) {
            $mensaje = "";
            if ($fuente == "personal") {//la persona se registró.
              $mensaje = $ut->plantillaBienvenidoUno($correo, $nombre, $contrasena, $clave);
              if ($mensaje == false) {
                $ut->agregarTextArchivo($GLOBALS["dir_resources"] . "evidencias/correos_enviados.txt", "Estado:0 --- ocurrio un error leyendo la plantilla de mensaje de bienvenida.");
              } else {
                $rut = $ut->enviarCorreo($correo, "¡Bienvenido " . $nombre . " a e-ventti!", $mensaje);
              }
            } else if ($fuente == "e-ventti") {//nosotros los registramos
              $mensaje = $ut->plantillaBienvenidoDos($correo, $nombre, $contrasena, $clave);
              $rut = $ut->enviarCorreo($correo, "¡" . $nombre . ", e-ventti está al aire!", $mensaje);
            } else {
              $mensaje = $ut->plantillaBienvenidoUno($correo, $nombre, $contrasena, $clave);
              $rut = $ut->enviarCorreo($correo, "¡Bienvenido " . $nombre . " a e-ventti!", $mensaje);
            }
            $ut->agregarTextArchivo($GLOBALS["dir_resources"] . "evidencias/correos_enviados.txt", "Estado:" . $rut . " --- Se envió un mensaje de bienvenida al correo " . $correo . ", la fuente es:" . $fuente);
            if ($mensaje == "" || $mensaje == false) {
              $res->error = true;
              $res->type_error = 3;
              $res->msj = "Error leyendo el archivo";
              echo json_encode($res);
            }

            $res->error = false;
            $res->type_error = 0;
            $res->msj = "Registrado";
            echo json_encode($res);
          } else {

            $res->error = true;
            $res->type_error = 2;
            $res->msj = "Ocurrió un error mientras se registraba el usuario.";
            echo json_encode($res);
          }
        }
      }
    }
  }

  /**
   * Obtenemos una clave de verificacion de cuenta unica de 12 caracteres.
   * 
   * @return type (falso, o la clave)
   */
  function obtenerClaveVerifUnica() {
    $ut = new Utilidades($this->conexion);
    $clave = "";
    $sirve = false;
    while (!$sirve) {
      $clave = $ut->generarClave(12);
      $rs = $this->adodb->Execute("select id from usuarios where verif_clave='" . $clave . "'");
      if (!$rs->EOF) {
        $sirve = false;
      } else {
        $sirve = true;
      }
    }
    return $clave;
  }

  /**
   * @method Funcion para actualziar los datos basicos de un usuario
   * 
   * @param type $pDatos 
   * @param $pDatos nombre: nombre del nuevo usuario
   * @param $pDatos apell: apellido
   * @param $pDatos correo: correo electronico principal
   * @param $pDatos apodo: apodo o nickname
   * @param $pDatos c_actual: ciudad actual
   * @param $pDatos fecha: fecha de nacimiento
   * @param $pDatos sexo: sexo del sujeto
   * 
   * @return numero entero:
   *          0: Se actualizo satisfactoriamente sin errores
   *          1: El usuario no esta logueado
   *          2: No se actualizo
   *          
   */
  function actualizarUsuario($pDatos) {
    if (isset($_SESSION["c5aec72e193c921165e3186f66baf9ed"]) && $_SESSION["c5aec72e193c921165e3186f66baf9ed"] == "si" && $_SESSION['id'] > 0) {
      extract($pDatos);
      $nombre = $pDatos['nombre'];
      $apodo = $pDatos['apodo'];
      $fecha = $pDatos['fecha'];
      $frase = $pDatos['frase'];
      $sexo = $pDatos['sexo'];
      $ciud_actual = $pDatos['c_actual'];
      $nom_ciud_actual = $pDatos['nom_c_actual'];

      $sql = "update usuarios
                    set nombre='" . mysql_real_escape_string($nombre) . "',
                        apodo='" . mysql_real_escape_string($apodo) . "',
                        frase='" . mysql_real_escape_string($frase) . "',
                        fecha_nacimiento='" . mysql_real_escape_string($fecha) . "',
                        sexo='" . mysql_real_escape_string($sexo) . "',
                        id_ciudad_actual='" . mysql_real_escape_string($ciud_actual) . "'
                    where id=" . $_SESSION['id'] . "
                    ";
      $rs = $this->adodb->Execute($sql);
      if (!$rs) {
        echo json_encode(2);
      } else {
        $_SESSION["c5aec72e193c921165e3186f66baf9ed"] = "si";
        $_SESSION["nombre"] = $nombre;
        $_SESSION["apodo"] = $apodo;
        $_SESSION["frase"] = $frase;
        $_SESSION["fecha"] = $fecha;
        $_SESSION["id_ciudad_actual"] = $ciud_actual;
        $_SESSION["nom_ciudad_actual"] = $nom_ciud_actual;
        echo json_encode(0);
      }
    } else {
      echo json_encode(1);
    }
  }

  function validateEmail($pDatos) {
    $correo = mysql_real_escape_string(trim($pDatos['correo']));
    if ($correo != "" && $this->existeCorreo($correo) == 1) {
      echo json_encode(true);
    } else {
      echo json_encode(false);
    }
  }

  /**
   * Funcion que valida si ya esta en la base de datos registrado un usuario con ese correo
   * @param type $correo
   * @return type Booleano
   *      1: existe
   *      0: no existe en la BD
   */
  function existeCorreo($correo) {
    $sql = "select * from usuarios where correo_electronico='" . ($correo) . "'";
    $rs = $this->adodb->Execute($sql);
    if (!$rs->EOF) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * Funcion que valida el formato de la fecha puede estar separada por / o por - y debe estar en formato YYYY MM DD
   * @param type $fecha
   * @return type Booleano
   *      true: esta correcta
   *      false: esta en formato incorrecto
   */
  function validarFecha($fecha) {
    $val = split('-', $fecha);
    if (sizeof($val) == 3) {
      return checkdate($val[1], $val[2], $val[0]);
    } else {
      $val = split('/', $fecha);
      if (sizeof($val) == 3) {
        return checkdate($val[1], $val[2], $val[0]);
      } else {
        return false;
      }
    }
  }

  /**
   * Funcion que retorna toda la informacion del perfil del usuario que este logueado
   * haciendo uso de las variables de sesion
   * @return type Array
   *      Toda la informacion del perfil en un array asociativo.
   */
  function perfilUsuario($pDatos) {
    extract($pDatos);
    $idpe = mysql_real_escape_string(trim($pDatos["idpe"]));
    if (!isset($pDatos["idpe"]) || $idpe == "") {
      if (isset($_SESSION["c5aec72e193c921165e3186f66baf9ed"]) && $_SESSION["c5aec72e193c921165e3186f66baf9ed"] == "si" && $_SESSION['id'] > 0) {
        $sql = "select nombre,frase, correo_electronico, url_foto, puntos, fecha_nacimiento, sexo, empresa, apodo, id_ciudad_actual, id_tipo_usuario, fecha_registro
                from usuarios 
                where id=" . $_SESSION['id'];
        $rs = $this->adodb->Execute($sql);

        if (!$rs->EOF) {
          $respuesta->user->error = false;
          $respuesta->user->id = $rs->fields['id'];
          $respuesta->user->name = $rs->fields['nombre'];
          $respuesta->user->fra = $rs->fields['frase'];
          $respuesta->user->email = $rs->fields['correo_electronico'];
          $respuesta->user->img = $rs->fields['url_foto'];
          $respuesta->user->pts = $rs->fields['puntos'];
          $respuesta->user->date_nac = $rs->fields['fecha_nacimiento'];
          $respuesta->user->sex = $rs->fields['sexo'];
          $respuesta->user->apodo = $rs->fields['apodo'];
          $respuesta->user->city = $_SESSION["nom_ciudad_actual"];
          $respuesta->user->date_reg = $rs->fields['fecha_registro'];
        }

        echo json_encode($respuesta);
      } else {
        $respuesta->error = true;
        echo json_encode($respuesta);
      }
    } else {

      $sql = "select id, nombre,frase, correo_electronico, url_foto, puntos, fecha_nacimiento, sexo, empresa, apodo, id_ciudad_actual, id_tipo_usuario, fecha_registro
                from usuarios 
                where id=" . $idpe;
      $rs = $this->adodb->Execute($sql);

      if (!$rs->EOF) {
        $respuesta->user->error = false;
        $respuesta->user->id = $rs->fields['id'];
        $respuesta->user->name = $rs->fields['nombre'];
        $respuesta->user->fra = $rs->fields['frase'];
        $respuesta->user->email = $rs->fields['correo_electronico'];
        $respuesta->user->img = $rs->fields['url_foto'];
        $respuesta->user->pts = $rs->fields['puntos'];
        $respuesta->user->date_nac = $rs->fields['fecha_nacimiento'];
        $respuesta->user->sex = $rs->fields['sexo'];
        $respuesta->user->apodo = $rs->fields['apodo'];
        $respuesta->user->city = $_SESSION["nom_ciudad_actual"];
        $respuesta->user->date_reg = $rs->fields['fecha_registro'];
      }

      echo json_encode($respuesta);
    }
  }

  /**
   * Funcion que retorna toda la informacion del perfil del identificador que le llega por post
   * @param type $id_usuario: Identificador del usuario que quiero consultar
   * @return type Array
   *      Toda la informacion del perfil en un array asociativo.
   */
  function perfilRelacion($pDatos) {
    extract($pDatos);
    $id = $pDatos['id_rel'];
    $sql = "select nombre,frase, correo_electronico, url_foto, puntos, fecha_nacimiento, sexo, empresa, apodo, id_ciudad_actual, id_tipo_usuario 
                    from usuarios 
                    where id=" . $id;
    $rs = $this->adodb->Execute($sql);

    if (!$rs->EOF) {
      $respuesta["nombre"] = $rs->fields['nombre'];
      $respuesta["frase"] = $rs->fields['frase'];
      $respuesta["correo"] = $rs->fields['correo_electronico'];
      $respuesta["foto"] = $rs->fields['url_foto'];
      $respuesta["puntos"] = $rs->fields['puntos'];
      $respuesta["fnac"] = $rs->fields['fecha_nacimiento'];
      $respuesta["sexo"] = $rs->fields['sexo'];
      $respuesta["apodo"] = $rs->fields['apodo'];
    }
    echo json_encode($respuesta);
  }

  /**
   * Function que retorna la foto, la ciudad, y el nombre de todas las relaciones que tenga el usuario logueado
   * haciendo uso de las variables de sesion
   * @return type Array
   *      Una matriz en donde cada Array sera la informacion de cada relacion.
   */
  function relacionesUsuario() {
    if (isset($_SESSION["c5aec72e193c921165e3186f66baf9ed"]) && $_SESSION["c5aec72e193c921165e3186f66baf9ed"] == "si" && $_SESSION['id'] > 0) {
      $sql = "select u2.nombre as nombre,
                           u2.url_foto as foto, 
                           u2.id as id, 
                           c.ciudad as ciudad, 
                           c.departamento as departamento
                    from usuarios u, usuarios_relaciones ur, usuarios u2, ciudades c
                    where u.id=" . $_SESSION['id'] . "
                    and u.id=ur.id_usuario1
                    and ur.id_estado_relacion=1
                    and ur.id_usuario2=u2.id
                    and c.id=u2.id_ciudad_actual
                    UNION
                    select u2.nombre,u2.url_foto,u2.id,c.ciudad, c.departamento
                    from usuarios u, usuarios_relaciones ur, usuarios u2, ciudades c
                    where u.id=" . $_SESSION['id'] . "
                    and u.id=ur.id_usuario2
                    and ur.id_estado_relacion=1
                    and ur.id_usuario1=u2.id
                    and c.id=u2.id_ciudad_actual";
      $rs = $this->adodb->Execute($sql);
      $i = 0;
      while (!$rs->EOF) {
        $respuint["id"] = $rs->fields['id'];
        $respuint["nombre"] = $rs->fields['nombre'];
        $respuint["foto"] = $rs->fields['foto'];
        $respuint["ciudad"] = $rs->fields['ciudad'] . ", " . $rs->fields['departamento'];

        $respuesta[$i] = $respuint;
        $i++;
        $rs->MoveNext();
      }
      echo json_encode($respuesta);
    } else {
      echo json_encode("error");
    }
  }

  /**
   * Function que retorna la foto, la ciudad, y el nombre de todas las relaciones uqe hayan en el sistema
   * que cumplan con el criterio de busqueda
   * haciendo uso de las variables de sesion
   * @return type Array
   *      Una matriz en donde cada Array sera la informacion de cada relacion.
   */
  function relacionesUsuarioBusqueda() {
    if (isset($_SESSION["c5aec72e193c921165e3186f66baf9ed"]) && $_SESSION["c5aec72e193c921165e3186f66baf9ed"] == "si" && $_SESSION['id'] > 0) {
      $sql = "select distinct(u.id) as id, u.nombre as nombre,u.url_foto as foto, c.ciudad as ciudad, c.departamento as departamento
                    from usuarios u, ciudades c, usuarios_relaciones ur
                    where u.id_ciudad_actual=c.id
                    and u.id<>" . $_SESSION['id'] . "
                    and u.id not in (select id_usuario1 from usuarios_relaciones where id_usuario2=" . $_SESSION['id'] . ")
                    and u.id not in (select id_usuario2 from usuarios_relaciones where id_usuario1=" . $_SESSION['id'] . ")";
      $rs = $this->adodb->Execute($sql);
      $i = 0;
      while (!$rs->EOF) {
        $respuint["id"] = $rs->fields['id'];
        $respuint["nombre"] = $rs->fields['nombre'];
        $respuint["foto"] = $rs->fields['foto'];
        $respuint["ciudad"] = $rs->fields['ciudad'] . ", " . $rs->fields['departamento'];

        $respuesta[$i] = $respuint;
        $i++;
        $rs->MoveNext();
      }
      echo json_encode($respuesta);
    } else {
      echo json_encode("error");
    }
  }

  private function obtenerNotificaciones() {
    
  }

  /**
   * Esta funcion retorna en un array todos las notificaciones del usuario.
   * 
   * @return Array
   *  ->id: es el identificador de la notificacion
   *  ->notificacion: es el contenido de la notificacion.
   *  ->hora y fecha
   *  ->tipo_notif: el tipo de notificacion
   *          1: Noticia
   *          2: Alerta
   *          3: De mi agrado(BAcano, relaciones)
   *          4: Seguimiento
   * 
   *  -> foto: Es la foto del perfil, o foto implicada.
   */
  function mis_notificaciones() {
    if (isset($_SESSION["id"])) {
      $id_usuario = $_SESSION["id"];

      $sql = "select 
                    nu.id as id, 
                    nu.notificacion as notificacion, 
                    TIME(nu.fecha_registro) as hora, 
                    DATE(nu.fecha_registro) as fecha,
                    nu.id_tipo_notif as tipo_notif,
                    u.url_foto as foto 
                    from notif_usuarios nu, usuarios u
                    where nu.id_usuario=u.id
                    and u.id=$id_usuario
                    order by nu.fecha_registro DESC";
      $rs = $this->adodb->Execute($sql);
      $i = 0;
      while (!$rs->EOF) {
        $respuint["id"] = $rs->fields['id'];
        $respuint["notificacion"] = $rs->fields['notificacion'];
        $respuint["hora"] = $rs->fields['hora'];
        $respuint["fecha"] = $rs->fields['fecha'];
        $respuint["tipo_notif"] = $rs->fields['tipo_notif'];
        $respuint["foto"] = $rs->fields['foto'];

        $respuesta[$i] = $respuint;
        $i++;
        $rs->MoveNext();
      }
      echo json_encode($respuesta);
    } else {
      echo json_encode("error");
    }
  }

  function todas_notificaciones() {
    
  }

}

?>
