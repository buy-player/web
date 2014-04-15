<?php
session_start();
if ($_SESSION["estado"] != "1" && $_SESSION["tipo"] == "2"){
    header("Location:http://localhost/buy-player/indexpublic2.php");
}
?>
<html>
  <head>
    <title>Home Cazatalentos</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="#"></script>
  </head>
  <body style="background: #000;">
      
      <h1>Home Cazatalentos</h1>
      
  </body>
</html>


