$( document ).ready(function() {
    $('#presentacion').fadeIn('slow')
    setTimeout(function(){
        $('#presentacion').fadeOut('slow');
    }, 1500);

    setTimeout(function(){
        $('header').slideDown();
        
        $('#cuerpo1').slideDown(1500);
        

        setTimeout(function(){
            
            $('#ingresos').animate({opacity:1})
        }, 500);
        
        setTimeout(function(){
            $('#egresos').animate({opacity:1})
        }, 850)
        $('#cuerpo2').slideDown(2000);
        $('footer').fadeIn(3000);
    }, 2000);
})


//Crear objetos de clases Ingresos & Egresos
function nuevo(descripcion, monto, fecha){
    nuevoDescripcion = descripcion;
    nuevoMonto = parseFloat(monto);
    let fechaDato= `${String(fecha.getDate()).padStart(2, '0')}/${String(fecha.getMonth() + 1).padStart(2, '0')}/${fecha.getFullYear()}`

    if(seleccion.val()==="ingreso" && descripcion1.val() != "" && nuevoMonto !== 0 && isNaN(nuevoMonto)===false){
        id = parseInt(ingresos.length + 1);
        ingresos.push(new Ingreso(id, nuevoDescripcion, nuevoMonto, fechaDato));}
    if(seleccion.val()==="egreso" && descripcion1.val() != "" && nuevoMonto !== 0 && isNaN(nuevoMonto)===false){
        id = parseInt(egresos.length + 1);
        egresos.push(new Egreso(id, nuevoDescripcion, nuevoMonto, fechaDato));}
    guardar();
}

//Cargar dato ingresado, sumar a subtotal y generar div con monto y descripción
function cargar(){
    valoresIngresos = ingresos.map(ingreso => ingreso.monto);
    valoresEgresos = egresos.map(egreso => egreso.monto);
    let validacionIngresos = ((seleccion.val() === "ingreso") && (descripcion1.val() != "") && (monto1.val() != 0) && (isNaN(monto1.val())===false));
    let validacionEgresos = ((seleccion.val() === "egreso") && (descripcion1.val() != "") && (monto1.val() != 0) && (isNaN(monto1.val())===false));
    

    if( validacionIngresos ){
        //Cálculo subtotal de ingresos
        sumaIngresos = parseInt(0);
        let tarjetaIngreso = $('<li></li>');
        tarjetaIngreso.attr("class", "col-6 datoIngreso");
        for(let i = 0; i<ingresos.length; i++){
            sumaIngresos += valoresIngresos[i];
            if(ingresos[i].monto !== 0 && isNaN(ingresos[i].monto)===false){
                tarjetaIngreso.hide().html(`<div class="divDato" id="divIngreso${ingresos[i].id}"><strong>Descripción: </strong><br class="salto-datos">${ingresos[i].descripcion}<br><strong>Monto: </strong><br class="salto-datos"> $${parseFloat(ingresos[i].monto).toFixed(2)}<br><strong>Fecha: </strong><br class="salto-datos">${dd}/${mm}/${yyyy}<a class="borrar" onclick='eliminar(${ingresos[i] instanceof Ingreso}, ${ingresos[i].id})'><img src="assets/img/cerrar.png" style="float: right;" class="iconoCerrar"></a></div>`).fadeIn();
                listaIngresos.append(tarjetaIngreso);
            }
        }
        $('#subtotalIngresos').html(`$ ${parseFloat(sumaIngresos).toFixed(2)}`);
        return sumaIngresos

    }else if ( validacionEgresos ){
        //Cálculo subtotal de egresos
        sumaEgresos = parseInt(0);
        let tarjetaEgreso = $('<li></li>');
        tarjetaEgreso.attr("class", "col-6 datoEgreso");
        for(let i = 0; i<egresos.length; i++){
            sumaEgresos += valoresEgresos[i];
            if(egresos[i].monto !== 0 && isNaN(egresos[i].monto)===false){
                tarjetaEgreso.hide().html(`<div class="divDato" id="divEgreso${egresos[i].id}"><strong>Descripción: </strong><br class="salto-datos">${egresos[i].descripcion}<br><strong>Monto: </strong><br class="salto-datos"> $${parseFloat(egresos[i].monto).toFixed(2)} <br><strong>Fecha: </strong><br class="salto-datos">${dd}/${mm}/${yyyy}<a class="borrar" onclick='eliminar(${egresos[i] instanceof Ingreso}, ${egresos[i].id})'><img src="assets/img/cerrar.png" style="float: right;" class="iconoCerrar"></a></div>`).fadeIn();
                listaEgresos.append(tarjetaEgreso);
                }
        }
        $('#subtotalEgresos').html(`$ ${parseFloat(sumaEgresos).toFixed(2)}`);
        return sumaEgresos;
    }
}

//Calcular porcentaje 
function calcularPorcentaje(){
    porcentajeEgresos = (sumaEgresos * 100)/sumaIngresos;
    porcentajeIngresos = 100-porcentajeEgresos;
    $('#porcentajeEgresos').html(`${parseFloat(porcentajeEgresos).toFixed(2)}%`);
    $('#porcentajeIngresos').html(`${parseFloat(porcentajeIngresos).toFixed(2)}%`);
    if(isNaN(porcentajeEgresos) || isFinite(porcentajeEgresos) === false){
        $('#porcentajeEgresos').html( "0%" );
    }
    if(isNaN(porcentajeIngresos) || isFinite(porcentajeIngresos) === false){
        $('#porcentajeIngresos').html( "0%" );
    }
}

//Calcular presupuesto total actual
function calcularPresupuesto(){
    presupuesto = 0;
    presupuesto = parseFloat(sumaIngresos).toFixed(2)-parseFloat(sumaEgresos).toFixed(2);
    $('#presupuestoActual').html(`$ ${parseFloat(presupuesto).toFixed(2)}`);
    
}

//Eliminar objeto ingreso o egreso y recalcular presupuesto
function eliminar(dato, id){
    if(dato === true){
        let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
        console.log(indiceEliminar)
        sumaIngresos -= ingresos[indiceEliminar].monto;
        $('#subtotalIngresos').html(`$ ${parseFloat(sumaIngresos).toFixed(2)}`);
        ingresos.splice(indiceEliminar, 1);
    }else if(dato === false){
        let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
        sumaEgresos -= egresos[indiceEliminar].monto;
        $('#subtotalEgresos').html(`$ ${parseFloat(sumaEgresos).toFixed(2)}`);
        egresos.splice(indiceEliminar, 1);
    }
    eliminarHTML(dato, id);
    calcularPorcentaje();
    calcularPresupuesto();
    guardar();
}

//Encontrar y eliminar div borrada
function eliminarHTML(dato, id){
    if(dato === true){
        let divEliminar = $(`#divIngreso${id}`).closest('.divDato');
        divEliminar.fadeOut();
        divEliminar.fadeOut(300, function(){divEliminar.remove()});
    }
    else if(dato === false){
        let divEliminar = $(`#divEgreso${id}`).closest('.divDato');
        divEliminar.fadeOut(300, function(){divEliminar.remove()});   
    }
}

//Guardar arreglo de ingresos en storage con JSON
function guardar(){
    localStorage.clear();
    const guardarEnStorage = (clave, valor) => {localStorage.setItem(clave, valor)}
    guardarEnStorage("ingresosGuardados", JSON.stringify(ingresos));
    guardarEnStorage("egresosGuardados", JSON.stringify(egresos));
}


function obtenerArraysInit (){
    //ingresos
    let ingresosGuardados = JSON.parse(localStorage.getItem("ingresosGuardados")); 
    if(ingresosGuardados !== null){
        for(const ingresoGuardado of ingresosGuardados){
            ingresos.push(new Ingreso(ingresoGuardado.id, ingresoGuardado.descripcion, ingresoGuardado.monto, ingresoGuardado.fecha))
        } 
    }
    //egresos
    let egresosGuardados = JSON.parse(localStorage.getItem("egresosGuardados"));
    if(egresosGuardados !== null){
        for(const egresoGuardado of egresosGuardados){
            egresos.push(new Egreso(egresoGuardado.id, egresoGuardado.descripcion, egresoGuardado.monto, egresoGuardado.fecha))
        }
    }

    console.log(ingresos);
    console.log(egresos);  
}

//Generar HTML al cargar la página con los datos del localStorage
function init(){
    valoresIngresos = ingresos.map(ingreso => ingreso.monto);
    valoresEgresos = egresos.map(egreso => egreso.monto);
    //ingresos
    sumaIngresos = parseInt(0);
    for(const ingreso of ingresos){
        let tarjetaIngreso = $('<li></li>');
        tarjetaIngreso.attr("class", "col-6 datoIngreso");
        sumaIngresos += valoresIngresos[ingresos.indexOf(ingreso)];
        if(ingreso.monto !== 0 && isNaN(ingreso.monto)===false){
            setTimeout(function(){
                tarjetaIngreso.hide().html(`<div class="divDato" id="divIngreso${ingreso.id}"><strong>Descripción: </strong><br class="salto-datos">${ingreso.descripcion}<br><strong>Monto: </strong><br class="salto-datos"> $${parseFloat(ingreso.monto).toFixed(2)}<br><strong>Fecha: </strong><br class="salto-datos">${ingreso.fecha}<a class="borrar" onclick='eliminar(true, ${ingreso.id})'><img src="assets/img/cerrar.png" style="float: right;" class="iconoCerrar"></a></div>`).fadeIn();
                listaIngresos.append(tarjetaIngreso);
            }, 750)
        }
    }
    $('#subtotalIngresos').html(`$ ${parseFloat(sumaIngresos).toFixed(2)}`);
    
    //egresos
    sumaEgresos = parseInt(0);
    for(const egreso of egresos){
        let tarjetaEgreso = $('<li></li>');
        tarjetaEgreso.attr("class", "col-6 datoEgreso");
        sumaEgresos += valoresEgresos[egresos.indexOf(egreso)];
        if(egreso.monto !== 0 && isNaN(egreso.monto)===false){
            setTimeout(function(){
                tarjetaEgreso.hide().html(`<div class="divDato" id="divEgreso${egreso.id}"><strong>Descripción: </strong><br class="salto-datos">${egreso.descripcion}<br><strong>Monto: </strong><br class="salto-datos"> $${parseFloat(egreso.monto).toFixed(2)}<br><strong>Fecha: </strong><br class="salto-datos">${egreso.fecha}<a class="borrar" onclick='eliminar(false, ${egreso.id})'><img src="assets/img/cerrar.png" style="float: right;" class="iconoCerrar"></a></div>`).fadeIn();
                listaEgresos.append(tarjetaEgreso);  
            }, 750)
        }
    }
    $('#subtotalEgresos').html(`$ ${parseFloat(sumaEgresos).toFixed(2)}`);
}





