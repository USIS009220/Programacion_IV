var db_sistema = openDatabase('db_sistema','1.0', 'Sistema de Facturacion', 5 * 1024 * 1024);
var app = new Vue({
    el: '#appCliente',
    data: {
        cliente: {
            accion: '',
            msg : '',
            idCliente: '',
            codigo: '',
            nombre: '',
            direccion: '',
            telefono: '',
            dui: ''
        },
    },
    methods: {
        guardarCliente(){
            db_sistema.transaction(tx=>{
                tx.executeSql('INSERT INTO clientes(codigo,nombre,direccion,telefono,dui) VALUES (?,?,?,?,?)')
                [this.cliente.codigo, this.cliente.nombre, this.cliente.direccion, this.cliente.telefono,
                    this.cliente.dui],
                (tx, results)=>{
                    this.cliente.msg = 'Cliente guardado con exito';
                    this.nuevoCliente();
                };
                (tx, error)=>{
                    this.cliente.msg = 'Error al guaradar el cliente ${error.message}';
                });
            });
         },
         nuevoCliente(){
             this.cliente.accion = 'nuevo';
             this.cliente.idCliente = '';
             this.cliente.codigo = '';
             this.cliente.nombre = '';
             this.cliente.direccion = ';'
             this.cliente.telefono = '';
             this.cliente.dui = '';
        }
    };
    created(){
        db_sistema.transaction(tx=>{
            tx.executeSql('CREATE TABLE IF NOT EXISTS cliente(idCliente INTEGER PRIMARY KEY AUTOINCREMENT, '+ 
            'CODIGO char(10), nombre char(75), direccion TEXT, telefono char(10), dui char(10))');

        }, err=>{
            console.log('Error al crearla tabla de clientes', err);
        });
    }