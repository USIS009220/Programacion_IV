var idUnicoFecha = ()=>{
    let fecha = new Date();
    return Math.floor(fecha.getTime()/1000).toString(16);
};
var app = new Vue({
    el: '#appSistema',
    data: {
       forms:{
           'cliente':{ mostrar: false },
           'categoria':{ mostrar: false },
           'producto':{ mostrar: false },
           'proveedor':{ mostrar: false },
       }
    },
    methods: {
<<<<<<< HEAD
        
    },
    created(){
       
=======
        buscarCliente(){
            /*if( this.buscar.trim().length>0 ){
                this.clientes = this.clientes.filter(item=>item.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>=0);
            } else {
                this.obtenerClientes();
            }*/
            this.obtenerClientes(this.buscar);
        },
        guardarCliente(){
            let sql = '',
                parametros = [];
            if(this.cliente.accion == 'nuevo'){
                sql = 'INSERT INTO clientes (codigo, nombre, direccion, telefono, dui) VALUES (?,?,?,?,?)';
                parametros = [this.cliente.codigo,this.cliente.nombre,this.cliente.direccion,this.cliente.telefono,this.cliente.dui];
            }else if(this.cliente.accion == 'modificar'){
                sql = 'UPDATE clientes SET codigo=?, nombre=?, direccion=?, telefono=?, dui=? WHERE idCliente=?';
                parametros = [this.cliente.codigo,this.cliente.nombre,this.cliente.direccion,this.cliente.telefono,this.cliente.dui,this.cliente.idCliente];
            }else if(this.cliente.accion == 'eliminar'){
                sql = 'DELETE FROM clientes WHERE idCliente=?';
                parametros = [this.cliente.idCliente];
            }
            db_sistema.transaction(tx=>{
                tx.executeSql(sql,
                    parametros,
                (tx, results)=>{
                    this.cliente.msg = 'Cliente procesado con exito';
                    this.nuevoCliente();
                    this.obtenerClientes();
                },
                (tx, error)=>{
                    switch(error.code){
                        case 6:
                            this.cliente.msg = 'El codigo o el DUI ya existe, por favor digite otro';
                            break;
                            
                        default:
                            this.cliente.msg = `Error al procesar el cliente: ${error.message}`;
                    }
                });
            });
        },
        modificarCliente(data){
            this.cliente = data;
            this.cliente.accion = 'modificar';
        },
        eliminarCliente(data){
            if( confirm(`¿Esta seguro de eliminar el cliente ${data.nombre}?`) ){
                this.cliente.idCliente = data.idCliente;
                this.cliente.accion = 'eliminar';
                this.guardarCliente();
            }
        },
        obtenerClientes(busqueda=''){
            db_sistema.transaction(tx=>{
                tx.executeSql(`SELECT * FROM clientes WHERE nombre like "%${busqueda}%" OR codigo like "%${busqueda}%"`, [], (tx, results)=>{
                    this.clientes = results.rows;
                    /*this.clientes = [];
                    for(let i=0; i<results.rows.length; i++){
                        this.clientes.push(results.rows.item(i));
                    }*/
                });
            });
        },
        nuevoCliente(){
            this.cliente.accion = 'nuevo';
            this.cliente.idCliente = '';
            this.cliente.codigo = '';
            this.cliente.nombre = '';
            this.cliente.direccion = '';
            this.cliente.telefono = '';
            this.cliente.dui = '';
            this.cliente.msg = '';
            console.log(this.cliente);
        }
    },
    created(){
        db_sistema.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS clientes(idCliente INTEGER PRIMARY KEY AUTOINCREMENT, '+
                'codigo char(10) unique, nombre char(75), direccion TEXT, telefono char(10), dui char(10) unique)');
        }, err=>{
            console.log('Error al crear la tabla de clientes', err);
        });
        this.obtenerClientes();
>>>>>>> 07f6fe485b828cdb3a52adb61ae62da67667462a
    }
});
document.addEventListener('DOMContentLoaded', event=>{
    let $element = document.querySelectorAll('.mostrar').forEach( (element,index)=>{
        element.addEventListener('click', e=>{
            app.forms[e.target.dataset.form].mostrar = true;
            //app.forms[e.target.dataset.form].obtenerDatos();
        });
    });
});