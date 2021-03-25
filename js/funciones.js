//Crear objetos de clases Ingresos & Egresos
function nuevo(descripcion, monto){
    nuevoDescripcion = descripcion;
    nuevoMonto = parseInt(monto);
    if(seleccion.value==="ingreso" && nuevoMonto !== 0 && isNaN(nuevoMonto)===false){
        id = parseInt(ingresos.length + 1);
        ingresos.push(new Ingreso(id, nuevoDescripcion, nuevoMonto));}
    if(seleccion.value==="egreso" && nuevoMonto !== 0 && isNaN(nuevoMonto)===false){
        id = parseInt(egresos.length + 1);
        egresos.push(new Egreso(id, nuevoDescripcion, nuevoMonto));}
}

//Cargar dato ingresado, sumar a subtotal y generar div con monto y descripción
function cargar(){
    const valoresIngresos = ingresos.map(ingreso => ingreso.monto);
    const valoresEgresos = egresos.map(egreso => egreso.monto);

    if(((seleccion.value === "ingreso") && (descripcion1.value !== "") && (monto1.value !== 0) && (isNaN(monto1.value)===false))){
        //Cálculo subtotal de ingresos
        sumaIngresos = parseInt(0);
        let tarjetaIngreso = document.createElement("li");
        tarjetaIngreso.setAttribute("class", "col-6 datoIngreso");
        for(let i = 0; i<ingresos.length; i++){
            sumaIngresos += valoresIngresos[i];
            if(ingresos[i].monto !== 0 && isNaN(ingresos[i].monto)===false){
                tarjetaIngreso.innerHTML = `<div class="divDato" id="divIngreso${ingresos[i].id}"><strong>Descripción: </strong>${ingresos[i].descripcion}<br><strong>Monto: </strong> $${ingresos[i].monto}<a class="borrar" onclick='eliminar(${ingresos[i] instanceof Ingreso}, ${ingresos[i].id})'><img src="assets/img/cerrar.png" style="width:15px; height:15px; float: right;" class="iconoCerrar"></a></div>`;
                listaIngresos.appendChild(tarjetaIngreso);
            }
        }
        document.getElementById("subtotalIngresos").innerHTML = `$ ${sumaIngresos}`;
        return sumaIngresos

    }else if (((seleccion.value === "egreso") && (descripcion1.value !== "") && (monto1.value !== 0) && (isNaN(monto1.value)===false))){
        //Cálculo subtotal de egresos
        sumaEgresos = parseInt(0);
        let tarjetaEgreso = document.createElement("li");
        tarjetaEgreso.setAttribute("class", "col-6 datoEgreso");
        for(let i = 0; i<egresos.length; i++){
            sumaEgresos += valoresEgresos[i];
            if(egresos[i].monto !== 0 && isNaN(egresos[i].monto)===false){
                tarjetaEgreso.innerHTML = `<div class="divDato" id="divEgreso${egresos[i].id}"><strong>Descripción: </strong>${egresos[i].descripcion}<br><strong>Monto: </strong> $${egresos[i].monto} <a class="borrar" onclick='eliminar(${egresos[i] instanceof Ingreso}, ${egresos[i].id})'><img src="assets/img/cerrar.png" style="width:15px; height:15px; float: right;" class="iconoCerrar"></a></div>`;
                listaEgresos.appendChild(tarjetaEgreso);
                }
        }
        document.getElementById("subtotalEgresos").innerHTML = `$ ${sumaEgresos}`;
        return sumaEgresos;
    }
    
}

//Calcular porcentaje 
function calcularPorcentaje(){
    porcentajeEgresos = (sumaEgresos * 100)/sumaIngresos;
    porcentajeIngresos = 100-porcentajeEgresos;
    document.getElementById("porcentajeEgresos").innerHTML = `${parseFloat(porcentajeEgresos).toFixed(2)}%`;
    document.getElementById("porcentajeIngresos").innerHTML = `${parseFloat(porcentajeIngresos).toFixed(2)}%`;
    if(isNaN(porcentajeEgresos) || isFinite(porcentajeEgresos) === false){
        document.getElementById("porcentajeEgresos").innerHTML = "0%";
    }
    if(isNaN(porcentajeIngresos) || isFinite(porcentajeIngresos) === false){
        document.getElementById("porcentajeIngresos").innerHTML = "0%";
    }

}

//Calcular presupuesto total actual
function calcularPresupuesto(){
    presupuesto = 0;
    presupuesto = parseFloat(sumaIngresos).toFixed(2)-parseFloat(sumaEgresos).toFixed(2);
    document.getElementById("presupuestoActual").innerHTML = `$ ${presupuesto}`;
}

//Eliminar objeto ingreso o egreso y recalcular presupuesto
function eliminar(dato, id){
    if(dato === true){
        let indiceEliminar = ingresos.findIndex( ingreso => ingreso.id === id);
        console.log(indiceEliminar)
        sumaIngresos -= ingresos[indiceEliminar].monto;
        document.getElementById("subtotalIngresos").innerHTML = `$ ${sumaIngresos}`;
        ingresos.splice(indiceEliminar, 1);
    }else if(dato === false){
        let indiceEliminar = egresos.findIndex( egreso => egreso.id === id);
        sumaEgresos -= egresos[indiceEliminar].monto;
        document.getElementById("subtotalEgresos").innerHTML = `$ ${sumaEgresos}`;
        egresos.splice(indiceEliminar, 1);
    }
    eliminarHTML(dato, id);
    calcularPorcentaje();
    calcularPresupuesto();
}

//Encontrar y eliminar div borrada
function eliminarHTML(dato, id){
    console.log(divDato);
    if(dato === true){
        let divEliminar = document.getElementById(`divIngreso${id}`).parentNode;
        divEliminar.parentNode.removeChild(divEliminar);
    }
    else if(dato === false){
        let divEliminar = document.getElementById(`divEgreso${id}`).parentNode;
        divEliminar.parentNode.removeChild(divEliminar);
    }
}

