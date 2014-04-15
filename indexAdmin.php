<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Buy Player Soccer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <meta name="author" content="">

        <!--link rel="stylesheet/less" href="librerias/bootstrap/less/bootstrap.less" type="text/css" /-->
        <!--link rel="stylesheet/less" href="librerias/bootstrap/less/responsive.less" type="text/css" /-->
        <!--script src="librerias/bootstrap/js/less-1.3.3.min.js"></script-->
        <!--append ‘#!watch’ to the browser URL, then refresh the page. -->

        <link href="librerias/bootstrap/css/bootstrap.min.css" rel="stylesheet">
        <link href="librerias/bootstrap/css/bootstrap-responsive.min.css" rel="stylesheet">
        <link href="librerias/bootstrap/css/style.css" rel="stylesheet">

        <!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
        <!--[if lt IE 9]>
          <script src="librerias/bootstrap/js/html5shiv.js"></script>
        <![endif]-->
        <link rel="shortcut icon" href="librerias/bootstrap/img/favicon.png">

    </head>

    <body>
        <div class="container">
            <div class="row-fluid">
                <div class="span12">
                    <div class="navbar navbar-inverse">
                        <div class="navbar-inner">

                            <!-- .btn-navbar is used as the toggle for collapsed navbar content -->
                            <a class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </a>
                            <img class="logo" src="librerias/bootstrap/img/logo.png" alt="">
                            <!--<a class="brand" href="#">Buy Player Soccer</a>-->
                            <div class="nav-collapse collapse">
                                <ul class="nav">
                                    <li class="active">
                                        <a href="">Inicio</a>
                                    </li>
                                    <li>
                                        <a href="jugador">Jugadores</a>
                                    </li>
                                    <li>
                                        <a href="cazatalento">Cazatalentos</a>
                                    </li>
                                    <li>
                                        <a href="noticia">Noticias</a>
                                    </li>
                                    <li>
                                        <a href="">Patrocinadores</a>
                                    </li>
                                    <li>
                                        <ul class="nav">
                                            <li>
                                                <a href="#">Solicitudes</a>
                                            </li>
                                            <li>
                                                <span id="badgeSolicitudes" class="badge" style="margin-top: 11.4px;">1</span>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <ul class="nav">
                                            <li>
                                                <a href="#">Contactos</a>
                                            </li>
                                            <li>
                                                <span id="badgeContactos" class="badge" style="margin-top: 11.4px;">1</span>
                                            </li>
                                        </ul>

                                    </li>
                                </ul>
                                <ul class="nav pull-right">
                                    <li>
                                        <a href="#">Log-Out</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          <div class="row-fluid">
                <div id="loader" class="span12" style="display: none;"><img src="recursos/imagenes/cargando1.gif"/></div>
                <div class="container" id="contenido">
                    <table class='table table-bordered'>
                        <thead>
                        <th>Imagen</th>
                        <th>Nombre Completo</th>
                        <th>Fecha Nacimiento</th>
                        <th>Celular</th>
                        <th>Email</th>
                        <th>Acciones</th>
                        </thead>
                        <tbody id="tabla_contenido_jugador">

                        </tbody>
                    </table>
<!--                    <div id="perfil_jugador">
                        <h1 id="nombre_jugador">Jamez rodriguez</h1>
                        <div class="span4" style="margin-left: 2.5%" id="imagen_jugador">
                            <img src="recursos/imagenes/james.jpg"/>
                        </div>
                        <div class="span8" id="fichatecnica">
                            <center>
                                <h3>Ficha técnica</h3>
                            </center>
                            <table class='table'>
                                <tr>
                                    <td style="text-align: right;"><strong>Fecha Nacimiento</strong></td>
                                    <td style="text-align: left;" id="fecha_nacimiento">21/07/1989</td>
                                </tr>
                                <tr>
                                    <td style="text-align: right; width: 50%"><strong>Edad</strong></td>
                                    <td style="text-align: left; width: 50%" id="edad">21 años</td>
                                </tr>
                                <tr>
                                    <td style="text-align: right;"><strong>Estatura</strong></td>
                                    <td style="text-align: left;" id="estatura">1.81 mts</td>
                                </tr>
                                <tr>
                                    <td style="text-align: right;"><strong>Peso</strong></td>
                                    <td style="text-align: left;" id="peso">65 kg</td>
                                </tr>
                            </table>
                            <center>
                                <h3>Contacto</h3>
                            </center>
                            <table class='table'>
                                <tr>
                                    <td style="text-align: right;"><strong>Email</strong></td>
                                    <td style="text-align: left;" id="email">cperez354@gmail.com</td>
                                </tr>
                                <tr>
                                    <td style="text-align: right; width: 50%"><strong>Telefono fijo</strong></td>
                                    <td style="text-align: left; width: 50%" id="telefono">+578753971</td>
                                </tr>
                                <tr>
                                    <td style="text-align: right;"><strong>Celular</strong></td>
                                    <td style="text-align: left;" id="celular">3016956032</td>
                                </tr>
                            </table>
                        </div>
                        <div class="span12">
                            <object width="100%" height="auto">
                                <param name="movie" value="http://www.youtube.com/v/aAt0l5nxoxo"></param>
                                <param name="wmode" value="transparent"></param>
                                <embed src="http://www.youtube.com/v/aAt0l5nxoxo" type="application/x-shockwave-flash" wmode="transparent" width="100%" height="600px">
                                </embed>
                            </object>
                        </div>
                    </div>-->
                </div>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="librerias/bootstrap/js/jquery.min.js"></script>
    <script type="text/javascript" src="librerias/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/admin.js"></script>
    <script>
        // THIS IS WHERE THE MAGIC HAPPENS
        $(function() {
            $('.nav a').click(function(e) {
                //$("#loading").show();
                href = $(this).attr("href");
                alert(href);
                loadContent(href);
                // HISTORY.PUSHSTATE
                history.pushState('', 'New URL: '+href, href);
                e.preventDefault();	
            });
            // THIS EVENT MAKES SURE THAT THE BACK/FORWARD BUTTONS WORK AS WELL
            window.onpopstate = function(event) {
                //$("#loading").show();
                console.log("pathname: "+location.pathname);
                loadContent(location.pathname);
            };

        });
	
        function loadContent(url){
            // USES JQUERY TO LOAD THE CONTENT
            //			$.getJSON("content.php", {cid: url, format: 'json'}, function(json) {
            //					// THIS LOOP PUTS ALL THE CONTENT INTO THE RIGHT PLACES
            //					$.each(json, function(key, value){
            //						$(key).html(value);
            //					});
            //					$("#loading").hide();
            //				});
            
            switch(url){
                case "jugador":
                    $( "#contenido" ).load( "vistas/Administrador/plantillas/jugador.html" , function() {
                        consultar_jugadores();
                    });
                    break;
                case "cazatalento":
                    $( "#contenido" ).load( "vistas/Administrador/plantillas/cazatalento.html" , function() {
                        consultar_cazatalentos();
                    });
                    break;
                case "noticia":
                    $( "#contenido" ).load( "vistas/Administrador/plantillas/noticia.html" , function() {
                        consultar_noticias();
                    });
                    break;
                default:
                    break;
            }            
                        
            // THESE TWO LINES JUST MAKE SURE THAT THE NAV BAR REFLECTS THE CURRENT URL
            $('li').removeClass('active');
            $('a[href="'+url+'"]').parent().addClass('active');
			
        }
		
    </script>
</html>