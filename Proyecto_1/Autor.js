Vue.component('autor', {
    data:()=>{
        return {
            autor: [],
            buscar: '',
            autor: {
                accion: 'nuevo',
                msg : '',
                idAutor: '',
                codigo: '',
                nombre: '',
                pais: '',
                telefono: ''
            }
        }
    },
    methods: {
        buscarAutor(){
            this.obtenerDatos(this.buscar);
        },
        guardarAutor(){
            this.obtenerDatos();
            let autor = this.autor || [];
            if( this.autor.accion == 'nuevo' ){
                this.autor.idAutor = idUnicoFecha();
                autor.push(this.autor);
            }else if( this.autor.accion == 'modificar' ){
                let index = autor.findIndex(autor=>autor.idAutor==this.autor.idAutor);
                autor[index] = this.autor;
            }else if( this.autor.accion == 'eliminar' ){
                let index = autor.findIndex(autor=>autor.idAutor==this.autor.idAutor);
                autor.splice(index,1);
            }
            localStorage.setItem('autor', JSON.stringify(autor));
            this.autor.msg = 'Autor procesado con exito';
            this.nuevoAutor();
            this.obtenerDatos();
        },
        modificarAutor(data){
            this.autor = JSON.parse(JSON.stringify(data));
            this.autor.accion = 'modificar';
        },
        eliminarAutor(data){
            if( confirm(`¿Esta seguro de eliminar el autor ${data.nombre}?`) ){
                this.autor.idAutor = data.idAutor;
                this.autor.accion = 'eliminar';
                this.guardarAutor();
            }
        },
        obtenerDatos(busqueda=''){
            this.autor = [];
            if( localStorage.getItem('autor')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('autor')).length; i++){
                    let data = JSON.parse(localStorage.getItem('autor'))[i];
                    if( this.buscar.length>0 ){
                        if( data.nombre.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ){
                            this.autor.push(data);
                        }
                    }else{
                        this.autor.push(data);
                    }
                }
            }
        },
        nuevoAutor(){
            this.autor.accion = 'nuevo';
            this.autor.idAutor = '';
            this.autor.codigo = '';
            this.autor.nombre = '';
            this.autor.pais = '';
            this.autor.telefono = '';
            this.autor.msg = '';
        }
    }, 
    created(){
        this.obtenerDatos();
    },
    template: `
        <div id='appAutor'>
            <form @submit.prevent="guardarAutor" @reset.prevent="nuevoAutor" method="post" id="frmAutor">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark">
                        Administracion de Autor
                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmAutor" aria-label="Close"></button>
                    </div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-1">Codigo</div>
                            <div class="col col-md-2">
                                <input v-model="autor.codigo" placeholder="codigo" pattern="[A-Z0-9]{3,10}" required title="Codigo de autor" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Nombre</div>
                            <div class="col col-md-2">
                                <input v-model="autor.nombre" placeholder="escribe tu nombre" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Nombre de autor" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Pais</div>
                            <div class="col col-md-2">
                                <input v-model="autor.pais" placeholder="donde vives" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Pais de autor" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Telefono</div>
                            <div class="col col-md-2">
                                <input v-model="autor.telefono" placeholder="tu tel" pattern="[0-9]{4}-[0-9]{4}" required title="Telefono de autor" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    {{ autor.msg }}
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <button type="submit" class="btn btn-primary">Guardar</button>
                                <button type="reset" class="btn btn-warning">Nuevo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class="card mb-3" id="cardBuscarAutor">
                <div class="card-header text-white bg-dark">
                    Busqueda de Autor
                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarAutor" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td colspan="6">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarAutor" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr>
                                <th>Codigo</th>
                                <th>Nombre</th>
                                <th>Pais</th>
                                <th>Telefono</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in autor" :key="item.idAutor" @click="modificarAutor(item)">
                                <td>{{item.codigo}}</td>
                                <td>{{item.nombre}}</td>
                                <td>{{item.pais}}</td>
                                <td>{{item.telefono}}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarAutor(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});