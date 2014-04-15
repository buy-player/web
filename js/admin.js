// JavaScript Document

function consultar_jugadores(){
    $("#perfil_jugador").hide('slow');
    $("#loader").show();
    $.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
            metodo:"consultarJugadores",
            clase:"Admin"
        },
        success: function(data) {
            if(data != null){
                var html = "";
                for(var i=0; i<data.length; i++){
                    html =  "<tr>"+
                    "<td>"+
                    "<img src='recursos/imagenes/"+data[i].imagen+"' width='50' height='50'/>"+
                    "</td>"+
                    "<td><a href='javascript:ver_perfil_jugador("+data[i].id+")'>"+
                    data[i].nombre+" "+data[i].apellidos+
                    "</a></td>"+
                    "<td>"+
                    data[i].fecha_nacimiento+
                    "</td>"+
                    "<td>"+
                    data[i].celular+
                    "</td>"+
                    "<td>"+
                    data[i].email+
                    "</td>"+
                    "<td>"+
                    "<button style='margin-left:10px' class='btn btn-inverse' type='button' title='eliminar'>Eliminar</button>"+
                    "</td>"+
                    "</tr>";
                    $('#tabla_contenido_jugador').append(html);
                }
                $("#loader").hide();
            }else{
                alert("es nulo");  
            }
        },
        error: function(obj1, suceso, obj2){
            window.alert('fuck');
        }
    });
}

function ver_perfil_jugador(id){
    $("#loader").show();
    $.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
            metodo:"consultarJugador",
            clase:"Admin",
            identificador:id
        },
        success: function(data) {
            if(data != null){
                $("#nombre_jugador").text(data[0].nombre +" "+ data[0].apellidos);
                $("#fecha_nacimiento").text(data[0].fecha_nacimiento);
                $("#email").text(data[0].email);
                $("#telefono").text(data[0].telefono);
                $("#celular").text(data[0].celular);
                $("#imagen").attr("src", "recursos/imagenes/"+data[0].imagen);
                $("#nacionalidad").text(data[0].nacionalidad);
                $("#estatura").text(data[0].estatura);
                $("#peso").text(data[0].peso);
                $("#video_youtube").html("<object width='100%' height='285' background='#fff'><param name='movie' value='https://youtube.googleapis.com/v/"+data[0].video+"'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='https://youtube.googleapis.com/v/"+data[0].video+"' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='100%' height='285'></embed></object>")
                $("#perfil_jugador_seleccionado").text(data[0].perfil);
                $("#loader ,#tabla_jugador ").hide("slow");
                $("#perfil_jugador").show();
            }else{
                alert("es nulo");  
            }
        },
        error: function(obj1, suceso, obj2){
            window.alert('error');
        }
    });   
}

function mostrarLista (){
    
    $("#perfil_jugador").hide("slow");
    $("#tabla_jugador").show();
    
}
    
function consultar_cazatalentos(){
    $("#loader").show();
    $.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
            metodo:"consultarCazatalentos",
            clase:"Admin"
        },
        success: function(data) {
            if(data != null){
                var html = "";
                for(var i=0; i<data.length; i++){
                    html =  "<tr>"+
                    "<td>"+
                    "<img src='recursos/imagenes/noticia.jpg' width='50' height='50'/>"+
                    "</td>"+
                    "<td>"+
                    data[i].nombre+" "+data[i].apellidos+
                    "</td>"+
                    "<td>"+
                    data[i].fecha_nacimiento+
                    "</td>"+
                    "<td>"+
                    data[i].celular+
                    "</td>"+
                    "<td>"+
                    data[i].email+
                    "</td>"+
                    "<td>"+
                    "<button style='margin-left:10px' class='btn btn-danger' type='button' title='eliminar'>Eliminar</button>"+
                    "</td>"+
                    "</tr>";
                    $('#tabla_contenido_cazatalento').append(html);
                }
                $("#loader").hide();
            }else{
                alert("es nulo");  
            }
        },
        error: function(obj1, suceso, obj2){
            window.alert('error');
        }
    });
}
    
function consultar_noticias(){
    $("#loader").show();
    $.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
            metodo:"consultarNoticias",
            clase:"Admin"
        },
        success: function(data) {
            if(data != null){
                var html = "";
                for(var i=0; i<data.length; i++){
                    html =  "<tr>"+
                    "<td>"+
                    "<img src='../recursos/imagenes/noticia.jpg' width='50' height='50'/>"+
                    "</td>"+
                    "<td>"+
                    data[i].titulo+
                    "</td>"+
                    "<td>"+
                    "<button style='margin-left:10px' class='btn btn-danger' type='button' title='eliminar'>Eliminar</button>"+
                    "</td>"+
                    "</tr>";
                    $('#tabla_contenido_noticia').append(html);
                }
                $("#loader").hide();
            }else{
                alert("es nulo");  
            }
        },
        error: function(obj1, suceso, obj2){
            window.alert('error');
        }
    });
}   
function consultar_patrocinadores(){
    $.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
            metodo:"consultarPatrocinadores",
            clase:"Admin"
        },
        success: function(data) {
            if(data != null){
                $('#contenido').html("");
                for(var i=0; i<data.length; i++){
                    var res = "<span><strong>"+data[i].nombre+" - "+data[i].imagen+"</strong></span>";
                    $('#contenido').append(res);
                }
            }else{
                $("#contenido").html("");
                $("#contenido").append(data);   
            }
        },
        error: function(obj1, suceso, obj2){
            window.alert('error');
        }
    });
}

