
var asdkjhasdkjahsdk = new Image(); 
asdkjhasdkjahsdk.src = "recursos/load2.gif";//Esto solo es util para precargar una imagen. esta variable no se usa.
var div_loading="<div class='loading'><img src='recursos/load2.gif'/></div>";
var cs="asdkalfr";
window.onload=function(){
  calcularAncho();
  window.onresize=function(){
    calcularAncho();
  };
  document.onclick=function(e){
    var target = e.target || e.srcElement;    
    if(select_option!="" && select_text!="" && select_elm!=""){
      var elemento = document.getElementById(select_option);
      do {
        if (elemento == target || select_elm == target)return;
        target = target.parentNode;
      }while (target){
        elemento.style.display = 'none';
        document.getElementById(select_text).className="t";
        select_elm="";
        select_option="";
        select_text="";
      }
    }
  }

  actualurl = window.location.href;
  var x1=actualurl.split('#');
  if(x1.length!=2)
    x1=actualurl.split('?');    
  if(x1.length!=2){
    window.location.href="?m=i";
  }
    
  exeUrl();    
  setInterval(function(){
    if(actualurl!=window.location.href){
      actualurl=window.location.href;
      exeUrl();
    }
  }, 1);
}

var num_com_show=3;
var categoriasmostradas=new Array();


function cerrar_sesion(){
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'cerrarSesion',
      search: 'false'
    },
    success: function(data) {
      var u1=window.location.href.split('?');    
      if(u1.length==2){
        var m=urlGet("m");
        if(m=="camb" || m=="mype"){
          window.location.href="index.php?m=i";
        }else{
          window.location.href="index.php?"+u1[1];
        }
      }else{
        window.location.href="index.php";
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}

function setBacano(idev, elem){
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Eventos',
      metodo:'setBacano',
      search: 'false',
      idev: idev
    },
    success: function(data) {
      if(!data.error){
        if(document.getElementById("num_bacano")!=undefined){
          document.getElementById("num_bacano").innerHTML=data.msj;
          if(elem!=undefined){
            elem.className='boton_estilo0';
            elem.innerHTML="¡Te parece bacano!";
          }
        }
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}


/**
 * Esta funcion es utilizada mostrar/ocultar los eventos de una categoria.
 * 
 **/
function shMas(idcat, lin, elem){
  $("#linevcat_"+idcat).val(""+lin);
  calcularLineaEventos();
    
  elem.innerHTML="... menos";
  elem.onclick=function(){
    shMas(idcat, 1, elem);
        
    elem.innerHTML="... más";
    elem.onclick=function(){
      shMas(idcat, lin, elem);
    }
  };
}

/**
 *  Esta funcion cambia la contraseña a la nueva ingresada.
 **/
function cambiarContrasena(){
  var contra_vieja=document.getElementById('camb_contra_actual');
  var contra_nueva=document.getElementById('camb_contra_nueva');
  var contra_nueva_rep=document.getElementById('camb_repit_nueva');
  if(contra_vieja.value==""){
    contra_vieja.focus();
  }else if(contra_nueva.value==""){
    contra_nueva.focus();
  }else if(contra_nueva_rep.value==""){
    contra_nueva_rep.focus();
  }else if(contra_nueva_rep.value!=contra_nueva.value){
    contra_nueva_rep.focus();
    alert("Las contraseñas nuevas, no coinciden.");
  }else{
    document.getElementById("izq_content").innerHTML+="<div id='cargando_camb'>"+div_loading+"</div>";
    $.ajax({
      url: '../resources/controlador/fachada.php',
      dataType: "json",
      type: "POST",
      data:{
        clase: 'Usuarios',
        metodo:'cambiarContrasena',
        search: 'false',
        contra_n:hex_sha1(contra_nueva.value),
        contra_v: hex_sha1(contra_vieja.value)
      },
      success: function(data) {
        if(data.error!=undefined && !data.type_error!=undefined && data.type_error==0){
          $("#izq_content").html("<div id='mensaje_completo'>"+
            "<h1>¡Tu contraseña ha sido actualizada!</h1>"+
            "</div>")
        }else{
          $("#izq_content").html("<div id='mensaje_completo_rojo'>"+
            "<h1>¡Contraseña erronea!</h1>"+
            "</div>");
        }
      },
      error: function(obj1, suceso, obj2){
      }
    });
  }
}

/**
 * Utilizada para mostrar la informacion de un evento especifico.
 **/
function shEvent(param){
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Eventos',
      metodo:'getEvent',
      idev: param
    },
    success: function(data) {
      document.getElementById("izq_content").innerHTML="";
      window.scroll(0, 0);
      if(data.event!=undefined && data.error==false){
        categoriasmostradas=new Array();
        var finicio=StringADate(data.event.date_in);
        var ffin=StringADate(data.event.date_fin);
        
        var res="<section id='event_"+data.event.id+"' class='content_events_vert'>";
        /*Titulo del evento*/
        res+="<div class='title_categ_detail'><div class='cont_title'>"+data.event.name+"</div></div>";
        
        /*Parte izquierda*/
        res+="<div class='event_detail'><div class='detailizq'>";
        
        /*Imagen del evento*/
        res+="<div class='img'><img onerror='this.src=\"images/evento_predeterminado_2.jpg\"' src='"+data.event.img+"'/></div>";
        
        /*Estadistica: Bacano, Visitas*/
        res+="<div><div class='resalt3'><span id='num_bacano' class=''>"+data.event.bacano+"</span> bacanos · <span class=''>"+data.event.visto+"</span> visitas</div></div>";
        
        /*Informacion del autor*/
        res+="<div id='info_autor_event'><div class='adverts'><div class='advert_container'><div class='advert'>"+
        "<div class='advert_head' onclick='goTo(\"p="+data.user.us_id+"\", \""+data.user.us_name+"\")'>Autor - "+data.user.us_name+"</div>"+
        "<div class='advert_body'>"+
        "<img alt='"+data.user.us_name+"' src='"+data.user.us_img+"' />"+
        "<div class='descript_ad'><div>"+data.user.us_fras+"</div><div>"+data.user.us_ub+"</div></div>"+
        "<div class='cleaner'></div></div></div></div></div></div>";
      
        /*Thumbnail del mapa*/
        res+="<div id='map_static'></div>"; 
        res+="</div>";
        
        /*Parte derecha*/
        res+="<div class='detailder'>";
        
        /*Fecha del evento*/
        res+="<div class='resalt2'><span class='resalt5'>Inicia: </span> <span class='normal'> "+formatDateEvent(finicio, false, true)+", "+formatTimeEvent(finicio)+"</span></div>";
        res+="<div class='resalt2'><span class='resalt5'>Finaliza: </span> <span class='normal'> "+formatDateEvent(ffin, false, true)+", "+formatTimeEvent(ffin)+"</span></div>";
        res+="<div class='separador'></div>";
        
        /*Lugar del evento*/
        res+="<div class='resalt2'><span class='resalt5'>Lugar: </span> <span class='normal'>"+data.event.place+"</span></div><div class='separador'></div>";
        
        /*Tarifa del evento*/
        /*if(data.event.tarifa_monto==undefined || data.event.tarifa_monto==0){
          res+="<div class='resalt2'><span class='resalt5'>Entrada: </span> <span class='resalt4'>Gratis!</span></div>";
        }else{
          res+="<div class='resalt2'><span class='resalt5'>Entrada: </span> <span class='resalt4'>$"+data.event.tarifa_monto+"</span></div>";
        }*/
        if(data.event.tarifa.length==1 && data.event.tarifa[0].monto=="0"){
          res+="<div class='resalt4'><span class='resalt5'>Tarifa: </span> Entrada ¡GRATIS!</div>";
        }else if(data.event.tarifa.length>0 && data.event.tarifa[0].monto=="-1"){
          res+="<div class='resalt4'><span class='resalt5'>Tarifa: </span> Variable</div>";
        }else{
          var tar=data.event.tarifa;
          res+="<div class='resalt5'>Tarifa: </div><div class='descript'>";
          for(var t=0; t<tar.length; t++){
            res+="<div class='resalt4'><span class='normal'>"+tar[t].name+": </span> $"+tar[t].monto+"  <span class='normal'>("+tar[t].moneda+")</span></div>";
          }
          res+="</div>";
        }        
        res+="<div class='separador'></div>";
        
        /*Descripcion del evento*/
        res+="<div class='resalt5'>Descripción:</div><div class='descript'>"+data.event.descript+"</div>";
        
        /*Botonera de opciones: Redes sociales, otros.*/
        res+="<div class='opc_event_detail content_der'>";
        
        /*Redes sociales*/
        res+="<div class='resalt_float'>"+
        "<div title='Publicar en facebook' onclick='abrirUrlVentana(\"https://www.facebook.com/dialog/feed?app_id=341648845880024&link="+escape(window.location.href)+"&picture="+(data.event.img)+"&name="+(data.event.name)+"&caption="+(data.event.name)+"&description="+(data.event.descript_corta)+"&message="+escape("Quiero enseñarte éste evento muy interesante. Lo he visto en e-ventti.com")+"&redirect_uri="+escape("http://www.e-ventti.com")+"\", \"Publicar en mi muro\")' class='icon_social' id='icon_social_fb'></div>"+
        "<div title='Enviar mensaje desde facebook' onclick='abrirUrlVentana(\"https://www.facebook.com/dialog/send?app_id=341648845880024&link="+escape(window.location.href)+"&picture="+(data.event.img)+"&name="+(data.event.name)+"&caption="+(data.event.name)+"&description="+(data.event.descript_corta)+"&message="+escape("Quiero enseñarte éste evento muy interesante. Lo he visto en e-ventti.com")+"&redirect_uri="+escape("http://www.e-ventti.com")+"\", \"Invitar a un amigo\")' class='icon_social' id='icon_social_fbm'></div>"+
        "<div title='Publicar en twitter' onclick='abrirUrlVentana(\"https://twitter.com/share?url="+escape(window.location.href)+"&via=e_ventti&text="+escape(window.location.href)+" :"+data.event.name+"&counturl="+escape(window.location.href)+"\")' class='icon_social' id='icon_social_tw'></div>"+
        "<!--<div title='Publicar en google+' class='icon_social' id='icon_social_gp'></div>--></div>";
        
        /*Bacano y mapa*/
        if(data.event.yadi){
          res+="<span class='resalt3'>¡Te parece bacano!</span>";
        }else{                                                                            
          res+="<button onclick='setBacano("+data.event.id+", this)' class='boton_estilo2'>Bacano</button>";
        }
        res+="<button class='boton_estilo1' onclick='$(\"#map_event_patern\").show();shEventsMapId({ev:"+data.event.id+", content: \"map_event\"});'>Mapa</button></div>";
        res+="<div id='map_event_patern'><div id='map_event'></div><div class='content_der'><button onclick='$(\"#map_event_patern\").hide()' class='boton_estilo0'>Ocultar mapa</button></div></div>";
        
        /*Comentarios*/
        res+="<div class='cont_coments'><div class='form_coment'>"+
        "<form action='javascript: newComment()'><div>"+
        "<textarea id='coment_input' class='form_textarea_coment'></textarea>"+
        "</div><div class='content_der'><button class='boton_estilo1'>Enviar</button></div></form></div><div id='comment_realized'>";
        if(data.coments!=undefined && data.coments.length>0){
          for(var j=0; j<data.coments.length; j++){
            res+=formatComment({
              typeFormat: 1,
              id:data.coments[j].id,
              comm: data.coments[j].comm,
              date: data.coments[j].date,
              us_id: data.coments[j].us_id,
              us_name: data.coments[j].us_name,
              us_img: data.coments[j].us_img
            });
          }
        }  
        res+="</div></div></div></section>";
          
        /*Otros eventos*/
        res+="<section id='categ_0' class='content_events_vert'>"+
        "<div class='title_categ'>Eventos interesantes</div><input type='hidden' value='2' id='linevcat_0'/>"+
        "<div class='content_event_categ'>";
        if(data.other!=undefined && data.other.length>0){
          for(j=0; j<data.other.length; j++){
            res+=formatEvent({
              typeFormat: 4,
              id:data.other[j].id,
              name: data.other[j].name,
              date: data.other[j].date,
              other: data.other[j].desc,
              place: data.other[j].place,
              img: data.other[j].img
            });
                        
          }
          res+="<div style='clear: both;'></div></div></section>";
        }else{
          res+="</div></section>";
        }
        
        document.getElementById("izq_content").innerHTML=res;
                
        shEventsThumbnailId({
          ev:data.event.id, 
          content: "map_static"
        });
        
        num_com_show=3;
        calcularNumeroComentarios();
      }else{
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}

/**
 * Utilizada para mostrar los eventos del index.
 **/
function shEventsIndex(){
  document.getElementById("izq_content").innerHTML=div_loading;
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Eventos',
      metodo:'getEventsIndex'
    },
    success: function(data) {
      document.getElementById("izq_content").innerHTML="";
      if(data.categs!=undefined){
        document.getElementById("izq_content").innerHTML="";
        categoriasmostradas=data.categs;
                
        var res="<section id='categ_"+data.categs[0].id+"' class='content_events_vert'>"+
        "<div class='title_categ'>"+data.categs[0].name+"</div><input type='hidden' value='1' id='linevcat_"+data.categs[0].id+"'/>"+
        "<div class='content_event_categ'>";
        if(data.categs[0].events!=undefined && data.categs[0].events.length>0){
          for(var j=0; j<data.categs[0].events.length; j++){
            res+=formatEvent({
              typeFormat: 4,
              id:data.categs[0].events[j].id,
              name: data.categs[0].events[j].name,
              date: data.categs[0].events[j].date,
              other: data.categs[0].events[j].desc,
              place: data.categs[0].events[j].place,
              img: data.categs[0].events[j].img
            });
          }
          res+=
          "</div><div style='clear: both;'></div></div>"+
          "<div class='content_der'>"+
          "<button class='boton_estilo1' type='button' onclick='shMas("+data.categs[0].id+", 3, this)'>... más</button>"+
          "</div>";
        }else{
          res+="</div>";
        }
        res+="</section>";
        document.getElementById("izq_content").innerHTML+=res;
                
        res="<section id='categ_"+data.categs[1].id+"' class='content_events_vert'>"+
        "<div class='title_categ'>"+data.categs[1].name+"</div><input type='hidden' value='1' id='linevcat_"+data.categs[1].id+"'/>"+
        "<div class='content_event_categ'>";
        if(data.categs[1].events!=undefined && data.categs[1].events.length>0){
          for(j=0; j<data.categs[1].events.length; j++){
            res+=formatEvent({
              typeFormat: 4,
              id:data.categs[1].events[j].id,
              name: data.categs[1].events[j].name,
              date: data.categs[1].events[j].date,
              other: "A <span class='resalt4'>"+data.categs[1].events[j].bacano+"</span> personas les parece bacano"+"<br/>"+data.categs[1].events[j].desc,
              place: data.categs[1].events[j].place,
              img: data.categs[1].events[j].img
            });
          }
          res+="<div style='clear: both;'></div></div>"+
          "<div class='content_der'>"+
          "<button class='boton_estilo1' type='button' onclick='shMas("+data.categs[1].id+", 3, this)'>... más</button>"+
          "</div></section>";
        }else{
          res+="</div>";
        }
        document.getElementById("izq_content").innerHTML+=res;
                
        res="<section id='categ_"+data.categs[2].id+"' class='content_events_vert'>"+
        "<div class='title_categ'>"+data.categs[2].name+"</div><input type='hidden' value='1' id='linevcat_"+data.categs[2].id+"'/>"+
        "<div class='content_event_categ'>";
        if(data.categs[2].events!=undefined && data.categs[2].events.length>0){
          for(j=0; j<data.categs[2].events.length; j++){
                        
            var tem=formatEvent({
              typeFormat: 4,
              id:data.categs[2].events[j].id,
              name: data.categs[2].events[j].name,
              date: data.categs[2].events[j].date,
              other: "Visto <span class='resalt4'>"+data.categs[2].events[j].visto+"</span> veces"+"<br/>"+data.categs[1].events[j].desc,
              place: data.categs[2].events[j].place,
              img: data.categs[2].events[j].img
            });
            res+=tem;
          }
          res+="<div style='clear: both;'></div></div>"+
          "<div class='content_der'>"+
          "<button class='boton_estilo1' type='button' onclick='shMas("+data.categs[2].id+", 3, this)'>... más</button>"+
          "</div></section>";
        }else{
          res+="</div>";
        }
        document.getElementById("izq_content").innerHTML+=res;
                
        calcularLineaEventos();
                
      }else{
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}

/**
 * Consultar todos los eventos de una categoria
 **/
function shEventsIdCateg(param){
  document.getElementById("izq_content").innerHTML=div_loading;
  if(param.idc!=undefined && param.fil!=undefined){
    $.ajax({
      url: '../resources/controlador/fachada.php',
      dataType: "json",
      type: "POST",
      data:{
        clase: 'Eventos',
        metodo:'getEventsIdCateg',
        idc: param.idc,
        fil: param.fil
      },
      success: function(data) {
        document.getElementById("izq_content").innerHTML="";
        window.scrollTo(0, 0);
        if(data.events!=undefined){
          categoriasmostradas=new Array();
          var res="<section id='categ_"+data.idcateg+"' class='content_events_vert'>"+
          "<div class='title_categ'>"+data.nomcateg+"</div><input type='hidden' value='-1' id='linevcat_"+data.idcateg+"'/>";
                
          if(data.events.length>0){
            for(var j=0; j<data.events.length; j++){
              res+=formatEvent({
                typeFormat: 4,
                id:   data.events[j].id,
                name: data.events[j].name,
                date: data.events[j].date,
                other: data.events[j].desc,
                place:data.events[j].place,
                img:  data.events[j].img
              });
            }
            res+="<div style='clear: both;'></div>"+
            "<div class='content_der'>"+
            "<button class='boton_estilo1' type='button' onclick='goTo(\"m=cat\", \""+data.nomcateg+"\")'>Atras</button>"+
            "</div></section>";
          }else{
            
            res+="<div style='clear: both;'></div>"+
            "<div class='content_der'>"+
            "<button class='boton_estilo1' type='button' onclick='goTo(\"m=cat\", \""+data.nomcateg+"\")'>Atras</button>"+
            "</div></section>";
          }
          document.getElementById("izq_content").innerHTML+=res;
          calcularLineaEventos();
        }
      },
      error: function(obj1, suceso, obj2){
      }
    });
  }
}

/**
 * Consultar todos los eventos de una SUBCATEGORIA
 **/
function shEventsIdSubCateg(param){
  document.getElementById("izq_content").innerHTML=div_loading;
  if(param.idc!=undefined && param.fil!=undefined){
    $.ajax({
      url: '../resources/controlador/fachada.php',
      dataType: "json",
      type: "POST",
      data:{
        clase: 'Eventos',
        metodo:'getEventsIdSubCateg',
        idc: param.idc,
        fil: param.fil
      },
      success: function(data) {
        document.getElementById("izq_content").innerHTML="";
        window.scrollTo(0, 0);
        if(data.events!=undefined){
          categoriasmostradas=new Array();
          var res="<section id='categ_"+data.idcateg+"' class='content_events_vert'>"+
          "<div class='title_categ'>"+data.nomcateg+"</div><input type='hidden' value='-1' id='linevcat_"+data.idcateg+"'/>";
                
          if(data.events.length>0){
            for(var j=0; j<data.events.length; j++){
              res+=formatEvent({
                typeFormat: 4,
                id:   data.events[j].id,
                name: data.events[j].name,
                date: data.events[j].date,
                other: data.events[j].desc,
                place:data.events[j].place,
                img:  data.events[j].img
              });
            }
            res+="<div style='clear: both;'></div>"+
            "<div class='content_der'>"+
            "<button class='boton_estilo1' type='button' onclick='goTo(\"m=cat\", \""+data.nomcateg+"\")'>Atras</button>"+
            "</div></section>";
          }else{
            
            res+="<div style='clear: both;'></div>"+
            "<div class='content_der'>"+
            "<button class='boton_estilo1' type='button' onclick='goTo(\"m=cat\", \""+data.nomcateg+"\")'>Atras</button>"+
            "</div></section>";
          }
          document.getElementById("izq_content").innerHTML+=res;
          calcularLineaEventos();
        }
      },
      error: function(obj1, suceso, obj2){
      }
    });
  }
}
/**
 * Consultar losEste es un comentario este es un comentario eventos de todas las categorias
 */
function shEventsCatego(){
  document.getElementById("izq_content").innerHTML=div_loading;
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Eventos',
      metodo:'getEventsCateg'
    },
    success: function(data) {
      document.getElementById("izq_content").innerHTML="";
         
      if(data.categs!=undefined){
        document.getElementById("izq_content").innerHTML="";
        categoriasmostradas=data.categs;
        for(var i=0; i<data.categs.length; i++){
          var res=
          "<section id='categ_"+data.categs[i].id+"' class='content_events_vert'>"+
          "<div onclick='goTo(\"m=cat&idc="+data.categs[i].id+"&fil=all\", \""+data.categs[i].name+"\")' class='title_categ'>"+data.categs[i].name+" ("+data.categs[i].count+")</div><input type='hidden' value='1' id='linevcat_"+data.categs[i].id+"'/>";
          if(data.categs[i].events!=undefined && data.categs[i].events.length>0){
            for(var j=0; j<data.categs[i].events.length; j++){
              res+=formatEvent({
                typeFormat: 4,
                id:data.categs[i].events[j].id,
                name: data.categs[i].events[j].name,
                date: data.categs[i].events[j].date,
                other: data.categs[i].events[j].desc,
                place: data.categs[i].events[j].place,
                img: data.categs[i].events[j].img
              });
            }
                        
            res+=
            "<div style='clear: both;'></div>"+
            "<div class='content_der'>"+
            "<button class='boton_estilo1' type='button' onclick='goTo(\"m=cat&idc="+data.categs[i].id+"&fil=all\", \""+data.categs[i].name+"\")'>Todos</button>"+
            "</div></section>";
          }else{
            res+="<div style='clear: both;'></div></section>";
          }
                    
          document.getElementById("izq_content").innerHTML+=res;
          numlinev=1;
          calcularLineaEventos();
        }
                
      }else{
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}

/**
 * Consultar los eventos que he creado, de mi autoria.
 */
function shMyEvents(){
  document.getElementById("izq_content").innerHTML=div_loading;
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Eventos',
      metodo:'getMyEvents'
    },
    success: function(data) {
      document.getElementById("izq_content").innerHTML="";
      if(data.events!=undefined){
        categoriasmostradas=new Array();
        var res="<div class='content_izq'>"+
        "</div>"+
        "<section id='events_my' class='content_events_vert'>"+
        "<div class='title_categ_detail'><div class='cont_title'>Mis Eventos</div></div>";
        for(var j=0; j<data.events.length; j++){
          res+=formatEvent({
            typeFormat: 1,
            id:data.events[j].id,
            name: data.events[j].name,
            date: data.events[j].date,
            place: data.events[j].place,
            img: data.events[j].img
          });
        }
       
        res+="<div style='clear: both;'></div></section>";
        document.getElementById("izq_content").innerHTML+=res;
      }else{
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}

/**
 * Consultar la informacion de perfil del usuario loguedo.
 */
function shMyPerfil(){
  document.getElementById("izq_content").innerHTML=div_loading;
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'perfilUsuario'
    },
    success: function(data) {
      document.getElementById("izq_content").innerHTML="";
      if(data.user!=undefined){            
        var res="<section id='perfil_"+data.user.id+"' class='content_events_vert'>"+
        "<div class='title_categ_detail'><div class='cont_title'>"+data.user.name+"</div></div></section>"+
        "<div class='view_perfil'>"+
        "<table><tr>"+
        "<td id='view_perfil_izq'>"+
        "<div id='img'>"+
        "<img src='"+data.user.img+"'/>"+
        "</div>"+
        "</td>"+
        "<td id='view_perfil_der'>";
        if(data.user.fra!="" && data.user.fra!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Frase</div>"+
          "</div>"+
          "<div class='desc_perfil'>\""+data.user.fra+"\"</div>"+
          "</div>";
        }
            
        if(data.user.name!="" && data.user.name!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Nombre completo</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.name+"</div>"+
          "</div>";
        }
        if(data.user.apodo!="" && data.user.apodo!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Apodo o sobrenombre</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.apodo+"</div>"+
          "</div>";
        }
        if(data.user.city!="" && data.user.city!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Ubicacion actual</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.city+"</div>"+
          "</div>";
        }
            
        if(data.user.pts!="" && data.user.pts!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Puntos</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.pts+"</div>"+
          "</div>";
        }
        if(data.user.date_nac!="" && data.user.date_nac!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Fecha de nacimiento</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.date_nac+"</div>"+
          "</div>";
        }
        if(data.user.sex!="" && data.user.sex!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Sexo</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.sex+"</div>"+
          "</div>";
        }
            
        if(data.user.email!="" && data.user.email!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Correo electronico</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.email+"</div>"+
          "</div>";
        }
        if(data.user.date_reg!="" && data.user.date_reg!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Cuanto tiempo llevas en e-ventti?</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.date_reg+"</div>"+
          "</div>";
        }
        res+="</td></tr></table></div>";
            
        document.getElementById("izq_content").innerHTML=res;
      }else{
        alert("No consulto")
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}

/**
 * Consultar la informacion de perfil de un usuario
 */
function shPerfil(param){
  document.getElementById("izq_content").innerHTML=div_loading;
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'perfilUsuario',
      idpe: param
    },
    success: function(data) {
      document.getElementById("izq_content").innerHTML="";
         
      if(data.user!=undefined){            
        var res="<section id='perfil_"+data.user.id+"' class='content_events_vert'>"+
        "<div class='title_categ_detail'><div class='cont_title'>"+data.user.name+"</div></div></section>"+
        "<div class='view_perfil'>"+
        "<table><tr>"+
        "<td id='view_perfil_izq'>"+
        "<div id='img'>"+
        "<img src='"+data.user.img+"'/>"+
        "</div>"+
        "</td>"+
        "<td id='view_perfil_der'>";
        if(data.user.fra!="" && data.user.fra!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Frase</div>"+
          "</div>"+
          "<div class='desc_perfil'>\""+data.user.fra+"\"</div>"+
          "</div>";
        }
            
        if(data.user.name!="" && data.user.name!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Nombre completo</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.name+"</div>"+
          "</div>";
        }
        if(data.user.apodo!="" && data.user.apodo!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Apodo o sobrenombre</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.apodo+"</div>"+
          "</div>";
        }
        if(data.user.city!="" && data.user.city!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Ubicacion actual</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.city+"</div>"+
          "</div>";
        }
            
        if(data.user.pts!="" && data.user.pts!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Puntos</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.pts+"</div>"+
          "</div>";
        }
        if(data.user.date_nac!="" && data.user.date_nac!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Fecha de nacimiento</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.date_nac+"</div>"+
          "</div>";
        }
        if(data.user.sex!="" && data.user.sex!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Sexo</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.sex+"</div>"+
          "</div>";
        }
            
        if(data.user.email!="" && data.user.email!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Correo electronico</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.email+"</div>"+
          "</div>";
        }
        if(data.user.date_reg!="" && data.user.date_reg!=null){
          res+="<div class='datagroup_perfil'>"+
          "<div class='title_perfil'>"+
          "<div class='cont_title'>Cuanto tiempo llevas en eventtiu?</div>"+
          "</div>"+
          "<div class='desc_perfil'>"+data.user.date_reg+"</div>"+
          "</div>";
        }
        res+="</td></tr></table></div>";
            
        document.getElementById("izq_content").innerHTML=res;
      }else{
        alert("No consulto")
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}


/**
 * Consultar las categorias que existen
 */
function loadCateg(cat){
   
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Eventos',
      metodo:'getCategorys'
    },
    success: function(data) {
      if(data.categ!=undefined && data.categ.length>0){
            
        document.getElementById("categ_prin_new_event").innerHTML="<option value=''>elejir...</option>";
        document.getElementById("categ_opc1_new_event").innerHTML="<option value=''>elejir...</option>";
        document.getElementById("categ_opc2_new_event").innerHTML="<option value=''>elejir...</option>";
        for(var i=0; i<data.categ.length; i++){
          if(cat!=undefined && cat!="" && cat==data.categ[i].id){
            document.getElementById("categ_prin_new_event").innerHTML+="<option selected value='"+data.categ[i].id+"'>"+data.categ[i].name+"</option>";
          }else{
            document.getElementById("categ_prin_new_event").innerHTML+="<option value='"+data.categ[i].id+"'>"+data.categ[i].name+"</option>";
          }
          document.getElementById("categ_opc1_new_event").innerHTML+="<option value='"+data.categ[i].id+"'>"+data.categ[i].name+"</option>";
          document.getElementById("categ_opc2_new_event").innerHTML+="<option value='"+data.categ[i].id+"'>"+data.categ[i].name+"</option>";
        }
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}

/**
 * Da formato HTML a un comentario que llegue por parametro, y lo retorna
 * como string.
 **/
function formatComment(param){
  var format="";
  if(param.typeFormat==1){
    var f=StringADate(param.date);
    format="<div class='coment' id='coment_"+param.id+"'><table><tr><td class='tdizq'>"+
    "<img src='"+param.us_img+"'/></td>"+
    "<td class='tdder'>"+
    "<div class='name_com'>"+param.us_name+"<span class='date_com'>"+formatTimeEvent(f)+", "+formatDateEvent(f)+"</span></div>"+
    "<div class='descript_com'>"+param.comm+"</div>"+
    "</td>"+
    "</tr>"+
    "</table>"+
    "</div>";
    return format;
  }
  return "";
}

/**
 * Da formato a los eventos, y los retorna como string
 * Type: 1 Vista general. Imagen, Nombre, Inicia, Lugar
 */
function formatEvent(param){
  var format="";
  if(param.typeFormat==1){
    format=
    "<div class='event' onclick='goTo(\"ev="+param.id+"\",\""+param.name+"\")'>"+
    "<div class='img'><img onerror='this.src=\"images/evento_predeterminado_2.jpg\"' src='"+param.img+"'/></div>"+
    "<h1>"+param.name+"</h1>"+
    "<div class='fecha'>"+param.date+"</div>"+
    "<div class='lugar'>"+param.place+"</div>"+
    "</div>";
  }else if(param.typeFormat==2){
    format=
    "<div class='event' onclick='goTo(\"ev="+param.id+"\",\""+param.name+"\")'>"+
    "<div class='img'><img onerror='this.src=\"images/evento_predeterminado_2.jpg\"' src='"+param.img+"'/></div>"+
    "<h1>"+param.name+"</h1>"+
    "<div class='fecha'>"+param.date+"</div>"+
    "<div class='lugar'>"+param.place+"</div>"+
    "<div class='infodes'>"+param.other+"</div>"+
    "</div>";
  }else if(param.typeFormat==3){
    if(param.cat==""){
      format=
      "<div class='event' onclick='goTo(\"ev=new\",\"Nuevo evento\")'>"+
    "<div class='img'><img src=\"images/evento_predeterminado.png\"/></div>"+
    "<h1>Crear un evento</h1>"+
    "</div>";
    }
    format=
    "<div class='event' onclick='goTo(\"ev=new&cat="+param.cat+"\" , \"Nuevo evento\")'>"+
    "<div class='img'><img src=\"images/evento_predeterminado.png\"/></div>"+
    "<h1>Crear un evento</h1>"+
    "</div>";
  }else if(param.typeFormat==4){
    var f=StringADate(param.date);
    format="<div class='event_format'>"+
    "<div class='date_event_format transicion'>"+
    "<div class='date_event'>"+formatDateEvent(f, true, true)+"</div>"+
    "<div class='time_event'>"+formatTimeEvent(f)+"</div>"+
    "</div>"+
    "<div class='img_event'>"+
    "<img src='"+param.img+"'/>"+
    "<div class='img_event_oscura transicion'> <br/>"+
    "<button class='vermas_event' onclick='goTo(\"ev="+param.id+"\",\""+param.name+"\")'>VER MAS</button><br/>"+
    "<button class='comentar_event' onclick='goTo(\"ev="+param.id+"\",\""+param.name+"\")'>COMENTAR</button><br/>"+
    "<button class='bacano_event' onclick='goTo(\"ev="+param.id+"\",\""+param.name+"\")'>¡BACANO!</button>"+
    "</div>"+
    "</div>"+
    "<h1 onclick='goTo(\"ev="+param.id+"\",\""+param.name+"\")'>"+param.name.toUpperCase()+"</h1>"+
    "  <div class='p'>"+(param.other)+"</div>"+
    " </div>";
  }
    
  return format;
}

/**
 * Agrega un comentario a un evento. Y recarga los comentarios que hay.
 */
function newComment(){
  var ev=urlGet("ev");
  var com=document.getElementById("coment_input").value;
  if(ev!=""){
    if(com!=""){
      $.ajax({
        url: '../resources/controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
          clase: 'Eventos',
          metodo:'newCommentEvent',
          ev: ev,
          comm: com
        },
        success: function(data) {
          if(!data.error){
            document.getElementById("coment_input").value="";
            document.getElementById("comment_realized").innerHTML="";
            if(data.coments!=undefined && data.coments.length>0){
              for(var j=0; j<data.coments.length; j++){
                document.getElementById("comment_realized").innerHTML+=formatComment({
                  typeFormat: 1,
                  id:data.coments[j].id,
                  comm: data.coments[j].comm,
                  date: data.coments[j].date,
                  us_id: data.coments[j].us_id,
                  us_name: data.coments[j].us_name,
                  us_img: data.coments[j].us_img
                });
              }
            }
            calcularNumeroComentarios();
          }
        },
        error: function(obj1, suceso, obj2){
        }
      });
    }else{
      document.getElementById("coment_input").focus();
    }
  }
}
/**
 * Consultar las categorias que existen y colocarlas en el menu derecho
 * * m= a la opcion de menu al cual pertenece las categorias.(menu Categorias, Mapa, otros)
 */
function shCategorys(){
  
  var m=urlGet("m");
  if(m!="map" && m!="cat"){
    m="cat";
  }
  var tem=$("#der_content_category .opcd_item");
  if(tem.length==0 || tem.attr("name")!=m){
    document.getElementById("der_content_category").innerHTML=div_loading;
    $.ajax({
      url: '../resources/controlador/fachada.php',
      dataType: "json",
      type: "POST",
      data:{
        clase: 'Eventos',
        metodo:'getCategorys'
      },
      success: function(data) {
        if(data.categ!=undefined && data.categ.length>0){
          var categs="";
          var idc=urlGet("idc");
          var sc=urlGet("sc");
          for(var i=0; i<data.categ.length; i++){
            var clasemenu="opcd_item";
            if(idc!="" && idc==data.categ[i].id)
              clasemenu="opcd_item_sel";
            categs+="<div name='"+m+"' onclick='goTo(\"m="+m+"&idc="+data.categ[i].id+"&fil=all\", \""+data.categ[i].name+"\");setMenuDer(\""+data.categ[i].id+"\");' class='"+clasemenu+"' id='opcd2_"+data.categ[i].id+"'>"+data.categ[i].name+"</div>";
            var subcateg=data.categ[i].sub_categ;
            
            if(subcateg!=undefined && subcateg.length>1){
              categs+="<div id='subcateg_"+data.categ[i].id+"' class='opsubcd_content'>";
              
              
              for(var j=0; j<subcateg.length; j++){
                clasemenu="opsubcd_item";
                if(sc!="" && sc==subcateg[j].id)
                  clasemenu="opsubcd_item_sel";
                categs+="<div id='opsubcd_"+subcateg[j].id+"' class='"+clasemenu+"' onclick='goTo(\"m="+m+"&idc="+data.categ[i].id+"&sc="+subcateg[j].id+"&fil=all\", \""+subcateg[j].name+"\");setMenuDer(\""+data.categ[i].id+"\", \""+subcateg[j].id+"\");'>"+subcateg[j].name+"</div>";
              }
              categs+="</div>";
            }
          }
          document.getElementById("der_content_category").innerHTML=categs;
          setMenuDer(idc, sc);
        }
      },
      error: function(obj1, suceso, obj2){
      }
    });
  }
}







///////////////////////////////////////////////////////////////////////////////////////
function seleccionarTodo(todo){
  $('.crio_contactos .crioc_contacto input').attr("checked", todo);    
}
function cancelarEnvioInvitacion(server){
  $('#invitar_'+server+' #crioc_form').show(200);
  $('#invitar_'+server+' #crioc_form #correo_'+server).val("");
  $('#invitar_'+server+' #crioc_form #pass_'+server).val("");
  $('#invitar_'+server+' .cargando').hide(100);
    
  $('#invitar_'+server+' .crio_contactos').hide(100);
  $('#invitar_'+server+' .crio_contactos').html("");
  $('#invitar_'+server+' .btn_botonera').hide(100);
}
function formatFecha(fecha){
  var meses = new Array ("Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic");
  var date= new Date(fecha);
  date.setDate(date.getDate()+1);
  return(date.getDate()+" "+meses[date.getMonth()]+" "+date.getFullYear());
}
function cargarNotificaciones(){
  $('#notif_area .notif_content').html("");
  $(".cargando").show();
  $.ajax({
    url: 'controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'mis_notificaciones',
      search: 'false'
    },
    success: function(data) {            
      if(data!="error"){                
        for(var i=0; i<data.length; i++){
          var res="<div class='notif_descrip'>";
          if(data[i].tipo_notif==1){
            res+="<div class='notif_icon notif_icon_noticia'></div>";
          }else if(data[i].tipo_notif==2){
            res+="<div class='notif_icon notif_icon_alerta'></div>";
          }else if(data[i].tipo_notif==3){
            res+="<div class='notif_icon notif_icon_gusto'></div>";
          }else if(data[i].tipo_notif==4){
            res+="<div class='notif_icon notif_icon_sigo'></div>";
          }else{
            res+="<div class='notif_icon notif_icon_alerta'></div>";
          }
          res+="<div class='notif_descrip_content' id='notificacion_"+data[i].id+"'>"+
          "<div class='ndc_icon'>"+
          "<img src='"+data[i].foto+"'/>"+
          "</div>"+
          "<div class='ndc_content'>"+
          "<div class='ndcc_titulo'>"+formatFecha(data[i].fecha)+" / "+(data[i].hora)+"</div>"+
          "<div class='ndcc_descrip'>"+data[i].notificacion+"</div>"+
          "</div>"+
          "</div>"+
          "</div>";
          $('#notif_area .notif_content').append(res);
        }
        $(".cargando").hide();
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}
function enviarInvitacion(server){
  if($('#invitar_'+server+' .crio_contactos').html()!=""){
    var invitados=$('#invitar_'+server+' .crio_contactos .crioc_contacto input');
    var invitados_nombre=$('#invitar_'+server+' .crio_contactos .crioc_contacto .label_dato');
    var invitados_correo=$('#invitar_'+server+' .crio_contactos .crioc_contacto .span_dato');
    var correos_elejidos="";
    for(var i=0; i<invitados.length; i++){
      if(invitados[i].checked){
        var nombre=invitados_nombre[i].innerHTML;
        var correo=invitados_correo[i].innerHTML;
        nombre=nombre.replace(/&/g, '.');
        nombre=nombre.replace(/\//g, '.');
        correo=correo.replace(/&/g, '.');
        correo=correo.replace(/\//g, '.');
        correos_elejidos+="/"+nombre+"&"+correo;
      }
    }
    if(correos_elejidos!=""){
      $('#invitar_'+server+' .cargando').show(100);
      $('#invitar_'+server+' .crio_contactos').hide(200);
      $('#invitar_'+server+' .btn_botonera').hide(200);
      $.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
          clase: 'Utilidades',
          metodo:'enviarInvitacion',
          search: 'false',
          correos: correos_elejidos
        },
        success: function(data) {
          if(data=="ok"){
            $('#invitar_'+server+' .crio_contactos').html(":D Invitacion enviada!");
            $('#invitar_'+server+' .crio_contactos').show(200);
            $('#invitar_'+server+' .cargando').hide(100);
          }else{
            $('#invitar_'+server+' .crio_contactos').html("Invitaciones enviadas!");
            $('#invitar_'+server+' .crio_contactos').show(200);
            $('#invitar_'+server+' .cargando').hide(100);
          }
          $('#invitar_'+server+' .btn_botonera').hide(100);
        },
        error: function(obj1, suceso, obj2){
          $('#invitar_'+server+' .cargando').hide(100);
          $('#invitar_'+server+' .crio_contactos').html(":( Lo sentimos, no se pudieron enviar las invitaciones.\nPor favor, intentalo mas tarde.");
        }
      });
    }
  }
}
function verContactos(server){    
  if($('#invitar_'+server+' #correo_'+server).val()!="" && $('#invitar_'+server+' #pass_'+server).val()!=""){
    var servidor=server;
    if(server=='otro' && $('#invitar_'+server+' #prov_'+server).val()!=""){
      servidor=$('#invitar_'+server+' #prov_'+server).val();
    }
    if(servidor!='otro'){
      $('#invitar_'+server+' #crioc_form').hide(100);
      $('#invitar_'+server+' .cargando').show(100);
      $('#invitar_'+server+' .crio_contactos').hide(100);
      $.ajax({
        url: 'controlador/fachada.php',
        dataType: "json",
        type: "POST",
        data:{
          clase: 'Utilidades',
          metodo:'importarContactos',
          search: 'false',
          correo: $('#invitar_'+server+' #correo_'+server).val(),
          pass: $('#invitar_'+server+' #pass_'+server).val(), 
          servidor: servidor
        },
        success: function(data) {                
          if(data!=1 && data!=null){
            var res="<div class='crioc_filtro'><input name='filtro' type='radio' onclick='seleccionarTodo(true);' /><span>Todo    </span><input name='filtro' type='radio' onclick='seleccionarTodo(false);'/><span>Ninguno</span></div>";
            for(var i=0; i<data.length; i++){
              res+="<div class='crioc_contacto'><input type='checkbox' /><label class='label_dato'>"+data[i].nombre+"</label><span> / </span><span class='span_dato'>"+data[i].correo+"</span></div>";
            }                    
            $('#invitar_'+server+' .crio_contactos').html(res);
            $('#invitar_'+server+' .crio_contactos').show(200);
            $('#invitar_'+server+' .cargando').hide(100);
            $('#invitar_'+server+' .btn_botonera').show(100);
          }else{
            $('#invitar_'+server+' .crio_contactos').html("Ups! datos invalidos");
            $('#invitar_'+server+' #crioc_form').show(200);
            $('#invitar_'+server+' .crio_contactos').show(200);
          }
          $('#invitar_'+server+' .cargando').hide(100);
        },
        error: function(obj1, suceso, obj2){
          $('#invitar_'+server+' .cargando').hide(100);
          $('#invitar_'+server+' .crio_contactos').html(":( Lo sentimos, no se pudieron cargar tus contactos.\nPor favor, intentalo mas tarde.");
        }
      });
    }
  }
}
function verOpcionMisEventos(id_element, id_opcion){
  $('#'+id_element).show(100);
  if(document.getElementById(id_opcion))
    document.getElementById(id_opcion).className="op_rel_item_selec";    
  switch (id_element) {
    case 'content_mis_eventos':
      $('#content_crear_eventos').hide(100);
      if(document.getElementById('op_evt_item_crear'))
        document.getElementById('op_evt_item_crear').className="op_rel_item";
      break;
    case 'content_crear_eventos':
      $('#content_mis_eventos').hide(100);
      if(document.getElementById('op_evt_item_mis'))
        document.getElementById('op_evt_item_mis').className="op_rel_item";
      break;               
    default:
      break;
  }
}
function verOpcionRelaciones(id_element, id_opcion){
  $('#'+id_element).show(100);
  document.getElementById(id_opcion).className="op_rel_item_selec";    
  switch (id_element) {
    case 'content_relaciones_invitar':
      $('#vista_relaciones').hide(100);
      $('#content_relaciones_busqueda').hide(100);
      document.getElementById('op_rel_item_ver').className="op_rel_item";
      document.getElementById('op_rel_item_rel').className="op_rel_item";
      break;
    case 'content_relaciones_busqueda':
      $('#vista_relaciones').hide(100);
      $('#content_relaciones_invitar').hide(100);
      document.getElementById('op_rel_item_inv').className="op_rel_item";
      document.getElementById('op_rel_item_rel').className="op_rel_item";
      $('#'+id_element).load('vista/html/usuario/buscar_relaciones.php',function(){
        cargarCiudades();
        verRelacionesBusqueda();
      });
      break;
    case 'vista_relaciones':
      $('#content_relaciones_invitar').hide(100);
      $('#content_relaciones_busqueda').hide(100);
      document.getElementById('op_rel_item_ver').className="op_rel_item";
      document.getElementById('op_rel_item_inv').className="op_rel_item";
      verRelaciones();
      break;        
    default:
      break;
  }
}
function verFormInvitacion(element){
  $('#invitar_'+element+' .crio_content').show(400);
  switch (element) {
    case 'facebook':
      $('#invitar_gmail .crio_content').hide(400);
      $('#invitar_hotmail .crio_content').hide(400);
      $('#invitar_yahoo .crio_content').hide(400);
      $('#invitar_otro .crio_content').hide(400);
      break;
    case 'gmail':
      $('#invitar_facebook .crio_content').hide(400);
      $('#invitar_hotmail .crio_content').hide(400);
      $('#invitar_yahoo .crio_content').hide(400);
      $('#invitar_otro .crio_content').hide(400);
      break;
    case 'hotmail':
      $('#invitar_facebook .crio_content').hide(400);
      $('#invitar_gmail .crio_content').hide(400);
      $('#invitar_yahoo .crio_content').hide(400);
      $('#invitar_otro .crio_content').hide(400);
      break;
    case 'yahoo':
      $('#invitar_facebook .crio_content').hide(400);
      $('#invitar_gmail .crio_content').hide(400);
      $('#invitar_hotmail .crio_content').hide(400);
      $('#invitar_otro .crio_content').hide(400);
      break;
    case 'otro':
      $('#invitar_facebook .crio_content').hide(400);
      $('#invitar_gmail .crio_content').hide(400);
      $('#invitar_hotmail .crio_content').hide(400);
      $('#invitar_yahoo .crio_content').hide(400);
      break;
    default:
      break;
  }
}
function verRelacionesBusqueda(){
  $.ajax({
    url: 'controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'relacionesUsuarioBusqueda',
      search: 'false'
    },
    success: function(data) {
      if(data!="error"){
        $('.vista_relaciones_content').html("");
        for(var i=0; i<data.length; i++){
          var res="<a href='javascript:verPerfilRelacion("+data[i].id+",\""+data[i].ciudad+"\");'>"
          +"<div class='vr_content'>"
          +"<div class='vrc_foto'><img src='"+data[i].foto+"' /></div>"
          +"<div class='vrc_info'>"
          +"<div class='vrc_info_1'>"+data[i].nombre+"</div>"
          +"<div class='vrc_info_2'>"+data[i].ciudad+"</div>"
          +"</div>"                   
          +"</div>"
          +"</a>";
          $('#buscar_relaciones #resultados_busqueda').append(res);
        }
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}
function verRelaciones(){
  $.ajax({
    url: 'controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'relacionesUsuario',
      search: 'false'
    },
    success: function(data) {
      if(data!="error"){
        $('.vista_relaciones_content').html("");
        for(var i=0; i<data.length; i++){
          var res="<a href='javascript:verPerfilRelacion("+data[i].id+",\""+data[i].ciudad+"\");'>"
          +"<div class='vr_content'>"
          +"<div class='vrc_foto'><img src='"+data[i].foto+"' /></div>"
          +"<div class='vrc_info'>"
          +"<div class='vrc_info_1'>"+data[i].nombre+"</div>"
          +"<div class='vrc_info_2'>"+data[i].ciudad+"</div>"
          +"</div>"                   
          +"</div>"
          +"</a>";
          $('.vista_relaciones_content').append(res);
        }
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}
function verPerfil(){
  $.ajax({
    url: 'controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'perfilUsuario',
      search: 'false'
    },
    success: function(data) {
      if(data!="error"){
        $('#vp_cabecera #vpcd_foto').html("<img src='"+data.foto+"' />");
        $('.puntos span').html(data.puntos);
        $('.vpc_content #frase').html(data.frase);
        $('.vpc_content #nom_com').html(data.nombre);
        $('.vpc_content #apodo').html(data.apodo);
        $('.vpc_content #fnac').html(data.fnac);
        $('.vpc_content #sexo').html(data.sexo);
        $('.vpc_content #ciud').html(data.ciudad);
        $('.vpc_content #correo').html(data.correo);
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}
function verPerfilRelacion(id_rel, nom_ciudad){
  $.ajax({
    url: 'controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'perfilRelacion',
      search: 'false',
      id_rel:id_rel
    },
    success: function(data) {
      if(data!="error"){
        var info="<div class='vista_perfil'>"
        +"<div id='vp_perfil_main'>"
        +"<div id='vp_cabecera'>"
        +"  <div id='vpc_foto'>"
        +"      <img src='"+data.foto+"' />"
        +"  </div>"
        +"                            <div class='vpc_content'>"
        +"                              <div id='vp_title'>"
        +"                                  <h1>"+data.nombre+"</h1>"
        +"                              </div>"
        +"                              <div class='puntos'>"
        +"                                  <img src='vista/recursos/icon.jpg'/>"
        +"                                  <span>"+data.puntos+"</span>"
        +"                              </div>"
        +"                              <div id='vp_info'>"
        +"                                  <div id='vp_texto'>"+data.frase
        +"                                  </div>"
        +"                                  <div id='vp_detail'>"
        +"                                        <p>"
        +"                                          <label>Correo: </label><br/>"
        +"                                          <span>"+data.correo+"</span>"
        +"                                      </p>"
        +"                                      <p>"
        +"                                          <label>Fecha Nacimiento:</label><br/>"
        +"                                          <span>"+data.fecha+"</span>"
        +"                                      </p>"
        +"                                      <p>"
        +"                                          <label>Ciudad Actual: </label><br/>"
        +"                                          <span>"+nom_ciudad+"</span>"
        +"                                      </p>"
        +"                                  </div></div></div></div></div></div>";
        $('.vista_relaciones_content').html(info);
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}
function editarPerfil(){
  $.ajax({
    url: 'controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Utilidades',
      metodo:'cargarCiudades',
      search: 'false'
    },
    success: function(data) {
      if(data!="error"){
        $('#edp_ciudad').html(data);
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
    
  $.ajax({
    url: 'controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'perfilUsuario',
      search: 'false'
    },
    success: function(data) {
      if(data!="error"){
        $('#vp_cabecera #vpcd_foto').html("<img src='"+data.foto+"' />");
        $('.puntos span').html(data.puntos);
        $('.vp_entrada textarea').html(data.frase);
        $('.vpc_content #edp_nombre').val(data.nombre);
        $('.vpc_content #edp_sexo').val(data.sexo);
        $('.vpc_content #edp_ciudad').val(data.ciudad);
        $('.vpc_content #edp_apodo').val(data.apodo);
        if(data.fnac!=null){
          var f=data.fnac.split('-');
          $('.vpc_content #edp_dia').val(f[2]);
          $('.vpc_content #edp_mes').val(f[1]);
          $('.vpc_content #edp_anio').val(f[0]);                
        }
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
    
}
function actualizarPerfil(){ 
  var nombre=document.getElementById('edp_nombre').value;
  var dia=document.getElementById('edp_dia').value;
  var mes=document.getElementById('edp_mes').value;
  var anio=document.getElementById('edp_anio').value;
  var ciudad=document.getElementById('edp_ciudad').value;
  var apodo=document.getElementById('edp_apodo').value;
  var frase=document.getElementById('edp_frase').value;
  var sexo=document.getElementById('edp_sexo').value;
    
  var fecha="";
  var valido=true;
  if(nombre==""){
    $('#edp_nombre').focus();
    valido=false;
  }else
  if(ciudad==""){
    $('#edp_ciudad').focus();
    valido=false;
  }
  if(mes!="" && dia!="" && anio!=""){
    fecha=anio+"-"+mes+"-"+dia;
  }
  if(valido){
    $.ajax({
      url: 'controlador/fachada.php',
      dataType: "json",
      type: "POST",
      data:{
        clase: 'Usuarios',
        metodo:'actualizarUsuario',
        search: 'false',
        nombre:nombre,
        c_actual:ciudad,
        apodo:apodo,
        fecha:fecha,
        frase:frase,
        sexo:sexo,
        nom_c_actual:document.getElementById('edp_ciudad').options[document.getElementById('edp_ciudad').selectedIndex].text
      },
      success: function(data) {
        if(data==0){
          window.location.href="#op=perfil";
        }else{
          $('#error2').css('display', 'block');
        }
      },
      error: function(obj1, suceso, obj2){
      }
    });
  }
}

var visible_invitar_amigos=false;
function verInvitarAmigos(id_content){
  if(!visible_invitar_amigos){
    $('#'+id_content).show(500);
    visible_invitar_amigos=true;
  }else{
    $('#'+id_content).hide(500);
    visible_invitar_amigos=false;
  }
/*var l=document.getElementById(id_content);
    //l.style.display=(l.style.display=='none')?'block':'none';
    if(l.style.display=='none'){
        $('#'+id_content).show(1000);
    }else{
        $('#'+id_content).hide(1000);
    }*/
    
}

