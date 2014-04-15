
var asdkjhasdkjahsdk = new Image(); 
asdkjhasdkjahsdk.src = "recursos/load2.gif";//Esto solo es util para precargar una imagen. esta variable no se usa.
var div_loading="<div class='loading'><img src='recursos/load2.gif'/></div>";
var cs="-1";
window.onload=function(){
  calcularAncho();
  
  window.onresize=function(){
    calcularAncho();
  };
  document.onclick=function(e){
    var target = e.target || e.srcElement;    
    if(select_option!="" && select_text!="" && select_elm!="" && target!=document.getElementById("btn_bacano")&& target!=document.getElementById("btn_programarme_ev") && target!=document.getElementById("btn_seguir")&& target!=document.getElementById("btn_reg_iniciar")&& target!=document.getElementById("link_entrar")){
      var elemento = document.getElementById(select_option);
      do {
        if (elemento == target || select_elm == target)return;
        target = target.parentNode;
      }
      while (target){
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


/**
 * Esta función es para iniciar sesion
 **/
function iniciar_sesion(){
  var correo=document.getElementById('email').value;
  var password=document.getElementById('pass').value;
  if(correo==""){
    document.getElementById('email').focus();
  }else if(password==""){
    document.getElementById('pass').focus();
  }else {
    password=hex_sha1(password);
    $.ajax({
      url: '../resources/controlador/fachada.php',
      dataType: "json",
      type: "POST",
      data:{
        clase: 'Usuarios',
        metodo:'iniciarSesion',
        search: 'false',
        correo:correo,
        pass:password
      },
      success: function(data) {
        switch(data){
          case 0:
            
            var u1=actualurl.split('?');    
            if(u1.length==2){
              var m=urlGet("m");
              
              if(m=="reg" || m=="ema" || m=="olv")
                window.location.href="user.php";
              else
                window.location.href="user.php?"+u1[1];
            }else{
              window.location.href="user.php";
            }
            
            break;
          case 1:
            window.alert('Correo Electronico Invalido!');
            break;
          case 2:
            window.alert('Contraseña Invalida!');
            break;
          case 3:
            window.alert('No haz activado tu cuenta. \nDebes dar click sobre el boton que está en el mensaje de bienvenida que te enviamos.');
            break;
        }
      },
      error: function(obj1, suceso, obj2){
      }
    });
  }
}

/**
 *  Esta funcion resetea la contraseña del usuario que pertenece a este correo,
 *  y la nueva contraseña se la envia al correo.
 **/
function recupContrasena(){
  var correo=document.getElementById('olv_correo');
  var codigo=document.getElementById('olv_codigo');
  if(correo.value==""){
    correo.focus();
  }else if(codigo.value==""){
    codigo.focus();
  }else{
    document.getElementById("izq_content").innerHTML+="<div id='cargando_olv'>"+div_loading+"</div>";
    $.ajax({
      url: '../resources/controlador/fachada.php',
      dataType: "json",
      type: "POST",
      data:{
        clase: 'Usuarios',
        metodo:'recupContrasena',
        search: 'false',
        correo:correo.value,
        codigo: codigo.value
      },
      success: function(data) {
        if(data.error!=undefined && data.error==false){
          $("#izq_content").html("<div id='mensaje_completo'>"+
            "<h1>¡Contraseña restaurada!</h1>"+
            "<p>Hemos enviado una nueva contraseña a tu correo electrónico</p>"+
            "</div>")
        }else{
          document.getElementById("olv_correo").value=correo.value;
          document.getElementById("olv_codigo").focus();
          if(document.getElementById("cargando_olv")!=undefined)
            document.getElementById("cargando_olv").innerHTML="";
          if(data.type_error!=undefined && data.type_error==3){
            alert("Codigo de verificación incorrecto.");
          }else{
            alert("Ups!. Intentalo mas tarde. Si el problema persiste, envianos un e-mail a eventos@e-ventti.com");
          }
        }
      },
      error: function(obj1, suceso, obj2){
      }
    });
  }
}

/**
 * Esta funcion genera el codigo de verificacion para poder restaurar la contraseña
 **/
function recupContrasenaCodigo(){
  var correo=document.getElementById('olv_correo');
  if(correo.value==""){
    correo.focus();
  }else {
    var ant=document.getElementById("izq_content").innerHTML;
    document.getElementById("izq_content").innerHTML+=div_loading;
    $.ajax({
      url: '../resources/controlador/fachada.php',
      dataType: "json",
      type: "POST",
      data:{
        clase: 'Usuarios',
        metodo:'recupContrasenaCodigo',
        search: 'false',
        correo:correo.value
      },
      success: function(data) {
        if(data.error!=undefined && data.error==false){
          $("#izq_content").load("register/olvidaste_contrasena_codigo.html", function(){
            document.getElementById("olv_correo").value=correo.value;
            document.getElementById("olv_codigo").focus();
          });
        }else{
          if(data.type_error!=undefined && data.type_error==2){
            alert("Éste correo electrónico no es válido. No está registrado.")
            document.getElementById("izq_content").innerHTML=ant;
          }
        }
      },
      error: function(obj1, suceso, obj2){
      }
    });
  }
}
/**
 *  Esta funcion lo que hace es abrir el formulario de logueo. Solo funciona si no se está logueado.
 **/
function abrirLogin(){
  if(document.getElementById("selectih_text1")!=undefined){
    clickSelect('selectih_text1', 'selectih_options1',document.getElementById("selectih_text1"));
    document.getElementById('email').focus();
  }
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
 * Utilizada para mostrar la informacion de un evento especifico.
 **/
function shEvent(param){
  document.getElementById("izq_content").innerHTML=div_loading;
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
        res+="<div class='resalt5'>Descripción:</div><div class='descript'>"+(data.event.descript)+"</div>";
        
        /*Botonera de opciones: Redes sociales, otros.*/
        res+="<div class='opc_event_detail content_der'>";
        
        /*Redes sociales*/
        res+="<div class='resalt_float'>"+
        "<div title='Publicar en facebook' onclick='abrirUrlVentana(\"https://www.facebook.com/dialog/feed?app_id=341648845880024&link="+escape(window.location.href)+"&picture="+(data.event.img)+"&name="+(data.event.name)+"&caption="+(data.event.name)+"&description="+(data.event.descript_corta)+"&message="+escape("Quiero enseñarte éste evento muy interesante. Lo he visto en e-ventti.com")+"&redirect_uri="+escape("http://www.e-ventti.com")+"\", \"Publicar en mi muro\")' class='icon_social' id='icon_social_fb'></div>"+
        "<div title='Enviar mensaje desde facebook' onclick='abrirUrlVentana(\"https://www.facebook.com/dialog/send?app_id=341648845880024&link="+escape(window.location.href)+"&picture="+(data.event.img)+"&name="+(data.event.name)+"&caption="+(data.event.name)+"&description="+(data.event.descript_corta)+"&message="+escape("Quiero enseñarte éste evento muy interesante. Lo he visto en e-ventti.com")+"&redirect_uri="+escape("http://www.e-ventti.com")+"\", \"Invitar a un amigo\")' class='icon_social' id='icon_social_fbm'></div>"+
        "<div title='Publicar en twitter' onclick='abrirUrlVentana(\"https://twitter.com/share?url="+escape(window.location.href)+"&via=e_ventti&text="+escape(window.location.href)+" :"+data.event.name+"&counturl="+escape(window.location.href)+"\")' class='icon_social' id='icon_social_tw'></div>"+
        "<!--<div title='Publicar en google+' class='icon_social' id='icon_social_gp'></div>--></div>";
        
        /*Bacano y mapa*/
        res+="<button onclick='abrirLogin()' id='btn_bacano' class='boton_estilo2'>Bacano</button>";
        res+="<button class='boton_estilo1' onclick='$(\"#map_event_patern\").show();shEventsMapId({ev:"+data.event.id+", content: \"map_event\"});'>Mapa</button></div>";
        res+="<div id='map_event_patern'><div id='map_event'></div><div class='content_der'><button onclick='$(\"#map_event_patern\").hide()' class='boton_estilo0'>Ocultar mapa</button></div></div>";
        
        /*Comentarios*/
        res+="<div class='cont_coments'><div class='form_coment'>"+
        "<form action='javascript: abrirLogin()'><div>"+
        "</div><div class='content_der'><button class='boton_estilo0'>Comentar</button></div></form></div><div id='comment_realized'>";
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
        alert("No consulto")
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}

/**
 * Consultar todos los eventos de una CATEGORIA
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
 * Consultar los eventos de todas las categorias
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
            "<!--<button class='boton_estilo1' type='button'>Los de hoy</button>"+
            "<button class='boton_estilo1' type='button'>Mas Bacanos</button>"+
            "<button class='boton_estilo1' type='button'>Mas Cercanos</button>-->"+
            "</div></section>";
          }else{
            res+="<div style='clear: both;'></div></section>";
          }
                    
          document.getElementById("izq_content").innerHTML+=res;
          numlinev=1;
          calcularLineaEventos();
        }
                
      }else{
        alert("No consulto")
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
    "<div class='name_com'>"+param.us_name+"<span class='date_com'>"+formatTimeEvent(f)+", "+formatDateEvent(f, true, true)+"</span></div>"+
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
 * Consultar la informacion de perfil de un usuario
 */
function shPerfil(param){
  $.ajax({
    url: '../resources/controlador/fachada.php',
    dataType: "json",
    type: "POST",
    data:{
      clase: 'Usuarios',
      metodo:'perfilUsuario',
      idp: param
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
        "<img src='../"+data.user.img+"'/>"+
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
        alert("Upps!, tenemos inconvenientes, pero ya estámos trabajando en ello. Disculpanos!")
      }
    },
    error: function(obj1, suceso, obj2){
    }
  });
}
/**
 * Da formato a los eventos, y los retorna como string
 * 
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
    format=
    "<div class='event'>"+
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
 * Consultar las categorias que existen y colocarlas en el menu derecho
 * m= a la opcion de menu al cual pertenece las categorias.(menu Categorias, Mapa, otros)
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