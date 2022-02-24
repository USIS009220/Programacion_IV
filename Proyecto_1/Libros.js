Vue.component('libros', {
    data:()=>{
        return {
            libros: [],
            buscar: '',
            libros: {
                accion: 'nuevo',
                msg : '',
                idLibro:'',
                idautor: '',
                codigo: '',
                titulo: '',
                editorial: '',
                edicion: ''
            }
        }
    },
    methods: {
        buscarLibros(){
            this.obtenerDatos(this.buscar);
        },
        guardarLibros(){
            this.obtenerDatos();
            let libros = this.libros || [];
            if( this.libros.accion == 'nuevo' ){
                this.libros.idLibro = idUnicoFecha();
                this.libros.idautor = idUnicoFecha();
                libros.push(this.libros);
            }else if( this.libros.accion == 'modificar' ){
                let index = libros.findIndex(libros=>libros.idLibros==this.libros.idLibros);
                libros[index] = this.libros;
            }else if( this.libros.accion == 'eliminar' ){
                let index = libros.findIndex(libros=>libros.idLibros==this.libros.idLibros);
                libros.splice(index,1);
            }
            localStorage.setItem('libros', JSON.stringify(libros));
            this.libros.msg = 'Libros procesado con exito';
            this.nuevoLibros();
            this.obtenerDatos();
        },
        modificarLibros(data){
            this.libros = JSON.parse(JSON.stringify(data));
            this.libros.accion = 'modificar';
        },
        eliminarLibros(data){
            if( confirm(`¿Esta seguro de eliminar el libros ${data.titulo}?`) ){
                this.libros.idLibros = data.idLibros;
                this.libros.accion = 'eliminar';
                this.guardarLibros();
            }
        },
        obtenerDatos(busqueda=''){
            this.libros = [];
            if( localStorage.getItem('libros')!=null ){
                for(let i=0; i<JSON.parse(localStorage.getItem('libros')).length; i++){
                    let data = JSON.parse(localStorage.getItem('libros'))[i];
                    if( this.buscar.length>0 ){
                        if( data.titulo.toLowerCase().indexOf(this.buscar.toLowerCase())>-1 ){
                            this.libros.push(data);
                        }
                    }else{
                        this.libros.push(data);
                    }
                }
            }
        },
        nuevoLibros(){
            this.libros.accion = 'nuevo';
            this.libros.idLibros = '';
            this.libros.idautor='';
            this.libros.codigo = '';
            this.libros.titulo = '';
            this.libros.editorial = '';
            this.libros.edicion = '';
            this.libros.msg = '';
        }
    }, 
    created(){
        this.obtenerDatos();
    },
    template: `
        <div id='appLibros'>
            <form @submit.prevent="guardarLibros" @reset.prevent="nuevoLibros" method="post" id="frmLibros">
                <div class="card mb-3">
                    <div class="card-header text-white bg-dark">
                        Administracion de Libros
                        <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#frmLibros" aria-label="Close"></button>
                    </div>
                    <div class="card-body">
                        <div class="row p-1">
                            <div class="col col-md-1">Codigo</div>
                            <div class="col col-md-2">
                                <input v-model="libros.codigo" placeholder="codigo" pattern="[A-Z0-9]{3,10}" required title="Codigo de libros" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Titulo</div>
                            <div class="col col-md-2">
                                <input v-model="libros.titulo" placeholder="escribe tu titulo" pattern="[A-Za-zÑñáéíóú ]{3,75}" required title="Titulo de libros" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Editorial</div>
                            <div class="col col-md-2">
                                <input v-model="libros.editorial" placeholder="escribe editorial" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Editorial de libros" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row p-1">
                            <div class="col col-md-1">Edicion</div>
                            <div class="col col-md-2">
                                <input v-model="libros.edicion" placeholder="escribe edicion" pattern="[A-Za-z0-9Ññáéíóú ]{3,100}" required title="Edicion de libros" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col col-md-3 text-center">
                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    {{ libros.msg }}
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
            <div class="card mb-3" id="cardBuscarLibros">
                <div class="card-header text-white bg-dark">
                    Busqueda de Libros
                    <button type="button" class="btn-close bg-white" data-bs-dismiss="alert" data-bs-target="#cardBuscarLibros" aria-label="Close"></button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <td colspan="6">
                                    Buscar: <input title="Introduzca el texto a buscar" @keyup="buscarLibros" v-model="buscar" class="form-control" type="text">
                                </td>
                            </tr>
                            <tr>
                                <th>Codigo</th>
                                <th>Titulo</th>
                                <th>Editorial</th>
                                <th>Edicion</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in libros" :key="item.idLibros" @click="modificarLibros(item)">
                                <td>{{item.codigo}}</td>
                                <td>{{item.titulo}}</td>
                                <td>{{item.editorial}}</td>
                                <td>{{item.edicion}}</td>
                                <td>
                                    <button type="button" class="btn btn-danger" @click="eliminarLibros(item)">Eliminar</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div> 
    `
});