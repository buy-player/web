function registroJugador(){
$("#resultado").hide("slow");
$('#cargando').show();
    $.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
            metodo:"registroJugador",
            clase:"Jugador",
            nombreJugador:$('#nombrejugador').val(),
            emailJugador:$('#emailjugador').val(),
            passJugador:$('#passjugador').val()
        },
        success: function(data) {
            if(data != null){
                if(data[0]==="1"){
                    $('#cargando').hide();
                    $("#resultado").text("Gracias por tu registro, Ingresa ahora mismo!!");
                    $("#resultado").show();
                    document.getElementById("formularioJugador").reset();
                }
                else{
                    $('#cargando').hide();
                    $("#resultado").text("Parece que tu email ya esta registrado Ingresa!!");
                    $("#resultado").show();
                    document.getElementById("formularioJugador").reset();
                }
                
            }else{
                
                 window.alert('Ocurrio un problema estamos mejorando para ti, vuelve a intentarlo');

                
            }
        },
        error: function(obj1, suceso, obj2){
            window.alert('error');
        }
    });
}
function registroCazatalento(){
    
    window.alert("entro");
    
$("#resultadoCazatalentos").hide("slow");
$('#cargandoCazatalentos').show();
    $.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
            metodo:"registroCazatalento",
            clase:"Cazatalento",
            nombreCazatalentos:$('#nombrecazatalento').val(),
            emailCazatalentos:$('#emailcazatalento').val(),
            passCazatalentos:$('#passcazatalento').val()
        },
        success: function(data) {
            if(data != null){
                if(data[0]==="1"){
                    $('#cargandoCazatalentos').hide();
                    $("#resultadoCazatalentos").text("Gracias por tu registro, Ingresa ahora mismo!!");
                    $("#resultadoCazatalentos").show();
                    document.getElementById("formularioCazatalento").reset();
                }
                else{
                    $('#cargandoCazatalentos').hide();
                    $("#resultadoCazatalentos").text("Parece que tu email ya esta registrado Ingresa!!");
                    $("#resultadoCazatalentos").show();
                    document.getElementById("formularioCazatalento").reset();
                }
                
            }else{
                
                 window.alert('Ocurrio un problema; estamos mejorando para ti, vuelve a intentarlo');

                
            }
        },
        error: function(obj1, suceso, obj2){
            window.alert('error');
        }
    });
}

function login()
{
$("#resultadoLogin").hide("slow");
$("#cargandoLogin").show();
$.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
            metodo:"login",
            clase:"Admin",
            emailLog:$('#emailLogin').val(),
            passLog:$('#passLogin').val()
        },
        success: function(data){
            if(data != null){
                
                if(data[0].estado === "0"){
                 
                    if(data[0].tipo === "2"){
                        
                          window.alert("Usuario tipo 2 desactivado");
                    
                    }
                    else if (data[0].tipo === "3"){
                        
                        
                    }
                    else if (data[0].tipo === "4"){
                        
                        
                    }
                    
                    
                  
                }
                else{
                    
                }
//                if(data[0]==="1"){
//                    $('#cargando').hide();
//                    $("#resultado").text("Gracias por tu registro, Ingresa ahora mismo!!");
//                    $("#resultado").show();
//                    document.getElementById("formularioJugador").reset();
//                }
//                else{
//                    $('#cargando').hide();
//                    $("#resultado").text("Parece que tu email ya esta registrado Ingresa!!");
//                    $("#resultado").show();
//                    document.getElementById("formularioJugador").reset();
                }
//            }else{
//                
//                 window.alert('Ocurrio un problema estamos mejorando para ti, vuelve a intentarlo');
//
//                
//            }
        },
        error: function(obj1, suceso, obj2){
            window.alert('error');
        }
    });
    
    
}
