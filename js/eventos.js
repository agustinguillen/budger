//Click en botón de cargar dato
botonCargar.click(function(){
    nuevo(descripcion1.val(), monto1.val());
    cargar();
    calcularPorcentaje();
    calcularPresupuesto(); 
    descripcion1.val("");
    monto1.val(0);
});

//Enter para cargar dato
$('body').on('keydown', function(e) {
    if (e.keyCode == 13){
        nuevo(descripcion1.val(), monto1.val());
        cargar();
        calcularPorcentaje();
        calcularPresupuesto(); 
        descripcion1.val("");
        monto1.val(0);
    }       
});

//Cargar datos almacenados al cargar la pantalla
$(document).ready(function (){
    obtenerArraysInit();
    init();
    calcularPorcentaje();
    calcularPresupuesto();
    descripcion1.val("");
    monto1.val(0);
})

