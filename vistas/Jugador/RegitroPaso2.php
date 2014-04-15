<?php
session_start();
?>
<html>
  <head>
    <title>Registro Jugador Paso 2</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="../../librerias/bootstrap3/css/bootstrap.min.css" rel="stylesheet">
    <link href="../../librerias/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
    <link href="../../librerias/bootstrap3/css/bootstrap.css" rel="stylesheet">
    <link href="../../librerias/bootstrap3/css/signin.css" rel="stylesheet">
  </head>
  <body>
      <div class="container">
          <form id="formjugador" action="ajaxupload.php"  method="POST" enctype="multipart/form-data"> 
                            <h1>Completando el Registro</h1>
                            <label>Imagen Del Jugador:</label><input  id="image" value="image"  name="image" type="file" class="form-control" required=""/>
                        <!--<input id="nombre" type="text" class="form-control" placeholder="Nombre completo"  required name="nombre_completo">-->
                            <!--<input id="email" type="text" class="form-control" placeholder="Email"  required name="email" pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$">-->
                            <!--<input id="pass1" type="password" class="form-control" placeholder="Password" required name="pass1">-->
                            <!--<input id="pass2" type="password" class="form-control" placeholder="Repita el password" required name="pass2">-->
                        <input id="buttonjugador" type="submit" class="btn btn-info" style="margin-top:20px" value="Registrarme"/>
                        <input style="display: none" type="text" id="operacion" name="operacion" value="ADD"/>  
            </form>
          <div id="cargandoregistrojugador" class="btn btn-link" style="display: none">
                <img src="recursos/imagenes/cargando.gif"/>
          </div>
      </div>
      
      <script src="../../librerias/bootstrap3/js/less-1.3.3.min.js"></script>
      <script type="text/javascript" src="../../js/scriptUpload.js"></script>
      <script type="text/javascript" src="../../librerias/bootstrap3/js/bootstrap.min.js"></script>
      <script type="text/javascript" src="../../librerias/bootstrap3/js/jquery.min.js"></script>
      <script type="text/javascript" src="../../librerias/jquery-ui-1.8.16.custom/js/jquery.7.1.min.js"></script>
      <script type="text/javascript" src="../../librerias/jquery-ui-1.8.16.custom/js/jquery.form.js"></script>
      <script src="../../js/RegistroLogin.js"></script>
      
      
  </body>
</html>


