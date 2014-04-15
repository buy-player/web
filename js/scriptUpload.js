$(document).ready(function() {
window.alert("antes del click");    
    window.alert("antes del click");

        var f = $('#formjugador');
	var l = $('#cargandoregistrojugador'); // loder.gif image
	var b = $('#buttonjugador'); // upload button


	b.click(function(){
            
            window.alert("entro despues del click");
		// implement with ajaxForm Plugin
		f.ajaxForm({
			beforeSend: function(){
				l.show();
				//b.attr('disabled', 'disabled');
				//p.fadeOut();
			},
			success: function(e){
                            //window.alert(e.toString());
                               switch (e)
                               {
                                 case '1':
                                     window.alert(e + "---1");
//                                      $('#image').val('');
//                                      $('#resultado').text('tamaño de imagen incorrecto'); 
                                      break;
                                 case '2':
                                     window.alert(e + "---2");
//                                      $('#resultado').text('Selecciona un archivo');
                                       break;
                                 case '3':
                                     window.alert(e + "---3");
//                                       window.location.reload();
                                       break;
                                 default :
                                     window.alert(e + "---4");
//                                    agregarProducto(e);
//                                    b.removeAttr('disabled');
//                                    break;
                               }
				//p.html(e).fadeIn();
			},
			error: function(e){
				b.removeAttr('disabled');
				//p.html(e).fadeIn();
			}
		});
	});
});
$(document).ready(function() {
	var f = $('#formUpdProduct');
	var l = $('#cargandoModificarProducto'); // loder.gif image
	var b = $('#Modificar'); // upload button

	b.click(function(){
		// implement with ajaxForm Plugin
		f.ajaxForm({
			beforeSend: function(){
				l.show();
				//b.attr('disabled', 'disabled');
				//p.fadeOut();
			},
			success: function(e){
                            //window.alert(e.toString());
                               switch (e)
                               {
                                 case '1':
                                      $('#image').val('');
                                      $('#resultado').text('tamaño de imagen incorrecto'); 
                                      break;
                                 case '2':
                                      $('#resultado').text('Selecciona un archivo');
                                       break;
                                 case '3':
                                       window.location.reload();
                                       break;
                                 default :
                                    agregarProducto(e);
                                    b.removeAttr('disabled');
                                    break;
                                 
                               }
				//p.html(e).fadeIn();
			},
			error: function(e){
				b.removeAttr('disabled');
				//p.html(e).fadeIn();
			}
		});
	});
});

function agregarProducto(e) {
    
    //window.alert(imagen);
    
    $.ajax({
        dataType: "json",
        data: {"name": $('#nombreProducto').val(), "description": $('#descripcionProducto').val(), "extencion":e},
        type: 'GET',
        url: "http://localhost/ServerManizalesMas/Controlador/Fachada.php?clase=Productos&metodo=Registro_productos",
        success: function(data) {
            if (data !== null)
            {
                //$('#cargandoAgregarProducto').hide();
		//$('form').resetForm();
                //window.alert("producto guardado");
                window.location.reload();
            }
            else {

                window.alert("no se pudo agregar");
            }

        },
        error: function(error) {

            window.alert("ocurrio un problema");
        }

    });

}

