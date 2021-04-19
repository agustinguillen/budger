class Ingreso{
    constructor(id, descripcion, monto, fecha){
        this.id = id;
        this.descripcion = descripcion;
        this.monto = monto;
        this.fecha = fecha;
    }
    static subtotal(){
        return this.monto;
    }

}

class Egreso{
    constructor(id, descripcion, monto, fecha){
        this.id = id;
        this.descripcion = descripcion;
        this.monto = monto;
        this.fecha = fecha;
    }
    static subtotal(){
        return this.monto;
    }
}