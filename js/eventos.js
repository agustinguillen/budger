//Click en botón de cargar dato
botonCargar.onclick= function(){
    nuevo(descripcion1.value, monto1.value);
    cargar();
    calcularPorcentaje();
    calcularPresupuesto(); 
    descripcion1.value="";
    monto1.value=0;
}

//Enter para cargar dato
document.body.onkeydown = function(e) {
    if (e.keyCode == 13){
        nuevo(descripcion1.value, monto1.value);
        cargar();
        calcularPorcentaje();
        calcularPresupuesto(); 
        descripcion1.value="";
        monto1.value=0;
    }       
};

//Cargar datos almacenados al cargar la pantalla
window.onload = function (){
    obtenerArraysInit();
    init();
    calcularPorcentaje();
    calcularPresupuesto();
}

