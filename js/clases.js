class Ingreso{
    constructor(id, descripcion, monto){
        this.id = id;
        this.descripcion = descripcion;
        this.monto = monto;
    }
    static subtotal(){
        return this.monto;
    }

}

class Egreso{
    constructor(id, descripcion, monto){
        this.id = id;
        this.descripcion = descripcion;
        this.monto = monto;
    }
    static subtotal(){
        return this.monto;
    }
}