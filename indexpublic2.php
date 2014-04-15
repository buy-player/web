<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Buy-Player</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <!--link rel="stylesheet/less" href="librerias/bootstrap3/less/bootstrap.less" type="text/css" /-->
        <!--link rel="stylesheet/less" href="librerias/bootstrap3/less/responsive.less" type="text/css" /-->
        <!--script src="librerias/bootstrap3/js/less-1.3.3.min.js"></script-->
        <!--append ‘#!watch’ to the browser URL, then refresh the page. -->

        <link href="librerias/bootstrap3/css/bootstrap.min.css" rel="stylesheet">
        <link href="librerias/bootstrap/css/bootstrap-responsive.css" rel="stylesheet">
        <link href="librerias/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="librerias/bootstrap3/css/bootstrap.css" rel="stylesheet">
        <link href="librerias/bootstrap3/css/bootstrap-theme.css" rel="stylesheet">
        <link href="librerias/bootstrap3/css/bootstrap-theme.min.css" rel="stylesheet">
        <link href="librerias/bootstrap3/css/style.css" rel="stylesheet">
        <link href="librerias/bootstrap3/css/signin.css" rel="stylesheet">
        <link href="css/index.css" rel="stylesheet">

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
          <script src="librerias/bootstrap3/js/html5shiv.js"></script>
        <![endif]-->

        <!-- Fav and touch icons -->
        <link rel="apple-touch-icon-precomposed" sizes="144x144" href="img/apple-touch-icon-144-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="114x114" href="img/apple-touch-icon-114-precomposed.png">
        <link rel="apple-touch-icon-precomposed" sizes="72x72" href="img/apple-touch-icon-72-precomposed.png">
        <link rel="apple-touch-icon-precomposed" href="img/apple-touch-icon-57-precomposed.png">
        <link rel="shortcut icon" href="img/favicon.png">

        <script type="text/javascript" src="librerias/bootstrap3/js/jquery.min.js"></script>
        <script type="text/javascript" src="librerias/bootstrap3/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/RegistroLogin.js"></script>
    </head>

    <body>
        <div class="total" style="width:100%">

            <div class="row clearfix">
                <div class="col-md-12 column">
                    <nav class="navbar navbar-default navbar-inverse" role="navigation">
                        <div class="container">
                            <div class="navbar-header">
                                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"> <span class="sr-only">Toggle navigation</span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button> <a class="navbar-brand" href="#">Buy Play Soccer</a>
                            </div>

                            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                <ul class="nav navbar-nav">
                                    <li class="active">
                                        <a href="#">Home</a>
                                    </li>
                                    <li>
                                        <a href="#">Como Funciona</a>
                                    </li>
                                    <li>
                                        <a href="#">Aliados</a>
                                    </li>
                                </ul>
                                <form class="form-inline navbar-right" action="javascript:login();">
                                    <span id="resultadoLogin" style="color: white;font-size: 14px;margin-right: 15px;display: none;">Datos invalidos</span>
                                    <div id="cargandoLogin" class="btn btn-link" style="display: none">
                                        <img src="recursos/imagenes/cargando1.gif"/>
                                    </div>
                                    <input type="email" id="emailLogin" class="login" placeholder="Email" required="">
                                    <input type="password" id="passLogin" class="login" placeholder="Contraseña" required="">
                                    <button type="submit" class="btn btn-primary">Ingresar</button>
                                </form>
                            </div>
                        </div>
                    </nav>
                    <div class="jumbotron" style="background-image: url('librerias/bootstrap/img/slide1.jpg');width: 100%;height:400px;">

                        <div class="container">
                            <div class="row clearfix">
                                <div class="col-md-12 column">
                                    <div class="row clearfix">
                                        <div class="col-md-4 column">
                                            <div id="registro"> 
                                            <center>
                                            <ul class="nav nav-tabs" id="myTab" style="width: 288px;height: auto;">
                                                <li><a href="#Jugador" data-toggle="tab">Jugadores</a></li>
                                                <li><a href="#Cazatalentos" data-toggle="tab">Cazatalentos</a></li>
                                            </ul>

                                            <div class="tab-content" style="width: 288px;height: auto;">
                                                <div class="tab-pane" id="Jugador">
                                                    <form id="formularioJugador" role="form" action="javascript:registroJugador();" style="margin-top: 20px;" method="POST">
                                                        <div class="form-group">
                                                            <input id="nombrejugador" type="text" class="form-control" placeholder="Nombre Jugador" required=""/>
                                                        </div>
                                                        <div class="form-group">
                                                            <input id="emailjugador" type="email" class="form-control" placeholder="Ejemplo@gmail.com" required=""/>
                                                        </div>
                                                        <div class="form-group">
                                                            <input id="passjugador" type="password" class="form-control" placeholder="Contraseña" required=""/>
                                                        </div>
                                                        <button type="submit" class="btn btn-primary" style="width: 100%">Registrar</button>
                                                        <div id="cargando" class="btn btn-link" style="display: none">
                                                            <img src="recursos/imagenes/cargando.gif"/>
                                                        </div>
                                                    </form>
                                                    <p id="resultado" style="color:white;display: none;">Result</p>
                                                </div>
                                                <div class="tab-pane active" id="Cazatalentos">

                                                    <form id="formularioCazatalento" role="form" action="javascript:registroCazatalento();" style="margin-top: 20px;" method="POST">
                                                        <div class="form-group">
                                                            <input type="text" id="nombrecazatalento" class="form-control"  placeholder="Nombre Cazatalentos" required=""/>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="email" id="emailcazatalento" class="form-control" placeholder="Ejemplo@gmail.com" required=""/>
                                                        </div>
                                                        <div class="form-group">
                                                            <input type="password" id="passcazatalento" class="form-control" placeholder="Contraseña" required=""/>
                                                        </div>
                                                        <button type="submit" class="btn btn-primary" style="width: 100%">Registrar</button>
                                                        <div id="cargandoCazatalentos" class="btn btn-link" style="display: none">
                                                            <img src="recursos/imagenes/cargando.gif"/>
                                                        </div>
                                                    </form>
                                                    <p id="resultadoCazatalentos" style="color:white;display: none;">Result</p>
                                                </div>
                                            </div> 
                                            </center>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <script>
            $(function() {
                $('#myTab a:first').tab('show');
            });
        </script>

    </body>
</html>

