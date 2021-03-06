let producto = parseInt(prompt("Ingrese el precio de su producto"));
let iva = producto * 0.21;
let descuento = parseInt(prompt("Ingrese el porcentaje (sin %) de su descuento"));


function costoTotal (){
    return producto + iva - cupon(producto, descuento);
    function cupon(a, b){
        let descuentoPesos= (a*b)/100;
        return descuentoPesos;
    }
}

costoTotal();
let totalPagar=costoTotal();
alert("El precio de su producto es $" + producto + ", más un iva (21%) de $" + iva + ", menos su descuento (" + descuento + "%) da un total a pagar de $" + totalPagar);


formaDePago();
function formaDePago(){
    let cuotas = prompt ("Desea pagar en 1, 3, 6 o 12 cuotas?");
    if (cuotas==1){
        alert("Seleccionó la forma de pago de 1 cuota, Ud. pagará " + totalPagar + " en un pago de $" + totalPagar );
    }else if(cuotas==3){
        alert("Seleccionó la forma de pago de 3 cuotas, Ud. pagará " + totalPagar + " en 3 pagos de $" + (totalPagar/3));
    }else if(cuotas==6){
        alert("Seleccionó la forma de pago de 6 cuotas, Ud. pagará " + totalPagar + " en 6 pagos de $" + (totalPagar/6));
    }else if(cuotas==12){
        alert("Seleccionó la forma de pago de 12 cuotas, Ud. pagará " + totalPagar + " en 12 pagos de $" + (totalPagar/12));
    }else{
        alert("Debe ingresar un número de cuotas válido");
        formaDePago();
    }
}

