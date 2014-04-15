function validar(){
	if(document.getElementById("usuario").value == ""){
		alert('Debes ingresar un nombre de usuario');
		location.href = 'index.html';;
		return false;
	}else
	if(document.getElementById("contrasena").value == ""){
		alert('Debes ingresar una contraseña');
		location.href = 'index.html';
		return false;
	}else
		return true;
} 

function open_window(href,tamx,tamy,nombre){
var width,height,wnombre;
if(!tamx){
width = parseInt(screen.availWidth * .8);
}
else{
width=tamx;
}
if(!tamy){
height = parseInt(screen.availHeight * .8);
}
else{
height=tamy;
}
if(!nombre){
wnombre="Popup";
}
else{
wnombre=nombre;
}
var x = parseInt((screen.availWidth/2) - (width/2));
var y = parseInt((screen.availHeight/2) - (height/2));
var windowFeatures = "width=" + width + ",height=" + height + ",left=" + x +",screenX=" + x +",top=" + y + ",screenY=" + y;
windowFeatures +=",resizable=yes,scrollbars=yes";
var openWindow = this.open(href,wnombre, windowFeatures);
if(wnombre=='Popup')
openWindow.moveTo(0,0);
openWindow.focus();
return openWindow;
} 

function breakOut()
{
if (self.parent.frames.length != 0){
self.parent.location=document.location.href;
}
} // JavaScript Document