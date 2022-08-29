<script>
/* eslint-disable */
import NotAuthorized from "@/views/NotAuthorized.vue";
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import generalTable from "@/components/generalTable.vue";
import planCuenta from "@/components/plan-cuenta/edicion.vue";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import store from "@/store/index";
import generalData from "@fakedata";
import ListarPDF from "@/components/ListarPDF.vue";
import VueHtml2pdf from 'vue-html2pdf';
import * as XLSX from 'xlsx/xlsx.mjs';
Vue.use(BootstrapVue);
export default {
    components: {
        generalTable,
        VueHtml2pdf,
        ListarPDF,
        NotAuthorized
    },
    data() {
        return {
            thisViewPermission: false,
            filename: this.getNameWithShortDate(),
            ListData:{
                titulo: this.getNameWithLongDate(),
                data: [],
                fields:[
                    { key: "codigo", label: "CODIGO", sortable: false },
                    { key: "nombre", label: "NOMBRE", sortable: false },
                    { key: "marca", label: "MARCA", sortable: false },
                    { key: "categoria", label: "CATEGORIA", sortable: false },
                    { key: "unidad", label: "UNIDAD", sortable: false },
                    { key: "precio", label: "PRECIO", sortable: false },
                    { key: "stock", label: "STOCK", sortable: false },
                    { key: "estado", label: "ESTADO", sortable: false },
                ],
            },
            parse_header: [],
            unidades: generalData.inventario.unidades,
            parse_csv: [],
            sortOrders: {},
            alertMsg: [],
            datosCombox:[],
            prepareForImport: false,
            child_component: planCuenta,
            paramsGrid: {
                selectOptions: {
                    allowSelect: true,
                    selectMode: "single",
                },
                fields: [
                    { key: "row", label: "", sortable: true,combox:false,imput:false  },
                    { key: "codigo", label: "Codigo", sortable: true,combox:false,imput:true  },
                    { key: "nombre", label: "Nombre", sortable: true,combox:false,imput:true  },
                    { key: "categoria.nombre", label: "Categoria", sortable: true,combox:true,
                        url:"/api/categoria/lista",value:"codigo",text:"nombre", datoCombox:[], 
                        arrayInicial:[{"nombre":"TODOS","codigo":" "}],imput:false },
                    {
                        key: "stock",
                        label: "Stock",
                        sortable: true,
                        combox:false,
                        imput:true 
                    },
                    {
                        key: "actions",
                        label: "Acciones",
                        tdClass: "text-center",
                        thClass: "text-center",
                        sortable: false,
                        combox:false,
                        imput:false 
                    },
                ],
                filters: {
                    codigo: "",
                    nombre: "",
                    stock: "",
                    categoria:"",
                },
                urlBack: "/api/producto",
                items: [
                    {
                        isActive: true,
                        age: 40,
                        first_name: "Dickerson",
                        last_name: "Macdonald",
                    },
                    {
                        isActive: false,
                        age: 21,
                        first_name: "Larsen",
                        last_name: "Shaw",
                    },
                    {
                        isActive: false,
                        age: 89,
                        first_name: "Geneva",
                        last_name: "Wilson",
                    },
                    {
                        isActive: true,
                        age: 38,
                        first_name: "Jami",
                        last_name: "Carney",
                    },
                ],
                edit: {
                    available: true,
                    redirect: true,
                    ruta: "/inventario/productos/editar",
                },
                pdf: {
                    available: false,
                    redirect: true,
                },
                delete: {
                    available: true,
                    ruta: "/api/producto",
                },
                options: {
                    responsive: true,
                    primaryKey: "id",
                },
                pagination: true,
                producto:[],
            },
        };
    },
    mounted() {
        this.isAuthorized();
        this.listarData();
    },
    methods: {
        isAuthorized(){
            var permissions=JSON.parse(localStorage.getItem('UserDataPermisos'));
            permissions.forEach(element => {
                if(element=='Productos'){
                    this.thisViewPermission=true;
                }
            });
        },
        async listarData() {
            let list = {
                url: "/api/producto/all",
                method: "GET",
                headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            var resp = await store.dispatch("back/EXECUTE", list);
            var estado="ACTIVO"
            for(let i=0;i<resp.length;i++){                    
                if(resp[i].estado){
                    estado="ACTIVO"
                }else{
                    estado="INACTIVO"
                }
                this.ListData.data.push({
                    codigo:resp[i].codigo,
                    nombre:resp[i].nombre,
                    marca:resp[i].marca,
                    precio:resp[i].precio,
                    categoria:resp[i].categoria.nombre,
                    unidad:this.unidades.find((unid) => unid.value == resp[i].unidad).text,
                    stock:resp[i].stock,
                    estado:estado,                      
                })
            }
        },
        async exportarPDF(){
            this.updateDateNames();
            this.$refs.html2Pdf.generatePdf();
            /*const doc = new jsPDF();
            doc.text("Hello world!", 10, 10);
            doc.save("a4.pdf");*/
        },
        async exportar(){
            this.updateDateNames();
            let request = {
                url: this.paramsGrid.urlBack+"/all",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            var respRoles = await store.dispatch("back/EXECUTE", request);
            var respuestas= [];
            respRoles.forEach(element => {
                let respuesta = {
                    "CODIGO": element.codigo,
                    "NOMBRE": element.nombre,
                    "MARCA": element.marca,
                    "PRECIO": element.precio,
                    "CATEGORIA": element.categoria.nombre,
                    "UNIDAD": this.unidades.find((unid) => unid.value == element.unidad).text,
                    "STOCK": element.stock,
                    "ESTADO": element.estado?"ACTIVO":"INACTIVO",
                };
                respuestas.push(respuesta);
            });
            let data = XLSX.utils.json_to_sheet(respuestas)
            const workbook = XLSX.utils.book_new()
            const filename = this.filename
            XLSX.utils.book_append_sheet(workbook, data, filename)
            XLSX.writeFile(workbook, `${filename}.xlsx`)
        },
        getNameWithShortDate(){
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
            return "Productos"+output;
        },
        getNameWithLongDate(){
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') +"-"+ String(date.getMonth() + 1).padStart(2, '0') +"-"+ date.getFullYear() +" "+  String(date.getHours()).padStart(2, '0') +":"+ String(date.getMinutes()).padStart(2, '0')+":"+ String(date.getSeconds()).padStart(2, '0');
            return "LISTA DE PRODUCTOS ("+output+")";
        },
        updateDateNames(){
            this.filename=this.getNameWithShortDate();
            this.ListData.titulo=this.getNameWithLongDate();
        },
        async listaCategoria(){
            let cat = {
                url: "/api/categoria/lista",
                method: "GET",
            };
            var respCat = await store.dispatch("back/EXECUTE", cat);
            this.datosCombox = respCat;
            console.log(this.datosCombox)        
        },       
        sendMessage(title, icon, variant) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: title,
                    icon: icon,
                    variant: variant,
                },
            });
        },
        async saveImport(producto) {
            var final_producto={},categoria={}
            let requestCategoria = {
                url: "/api/categoria/codigo/"+producto.ccategoria,
                method: "GET",
            };
            var respRoles1 = await store.dispatch("back/EXECUTE", requestCategoria);
            if(respRoles1===""){
                categoria.codigo=producto.ccategoria;
                categoria.nombre=producto.ncategoria;
                let request = {
                    url: "/api/categoria",
                    method: "POST",
                    data: categoria, 
                };
                var respRoles = await store.dispatch("back/EXECUTE", request);
            }
            let requestCategoria2 = {
                url: "/api/categoria/codigo/"+producto.ccategoria,
                method: "GET",
            };
            var respRoles2 = await store.dispatch("back/EXECUTE", requestCategoria2);
            categoria=respRoles2
            final_producto.codigo=producto.codigo
            final_producto.marca=producto.marca
            final_producto.nombre=producto.nombre
            final_producto.precio=parseFloat(producto.precio).toFixed(2)
            final_producto.stock=parseInt(producto.stock)
            final_producto.unidad=producto.unidad
            final_producto.categoria=categoria
            final_producto.descripcion=producto.descripcion
            let request = {
                url: "/api/producto",
                method: "POST",
                data: final_producto, 
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                if (respRoles == 201) {
                    this.sendMessage("Producto registrado satisfactoriamente","CheckSquareIcon","success");
                } else if (respRoles == 400) {
                    this.sendMessage("El producto que intenta registrar ya existe","AlertTriangleIcon","danger");
                } else {
                    this.sendMessage("Error de servidor","AlertTriangleIcon","danger");
                }
            } catch (e) {
                console.log(e.message);
            }
            this.$refs.generalTable.loadDataSource();
        },
        sendMessage(title, icon, variant) {
            this.$toast({
                component: ToastificationContent,
                props: {
                    title: title,
                    icon: icon,
                    variant: variant,
                },
            });
        },
        async importarCsv() {
            let request = {
                url: "/api/producto/insertArrayProduct/1",
                method: "POST",
                data: this.parse_csv,
            };
            console.log("reques:", this.parse_csv);
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                console.log(respRoles);
                if (respRoles.status === 200) {
                    this.$refs["modal-import"].hide();
                    //generalTable.methods.loadDataSource()
                }
            } catch (e) {
                console.log(e.message);
            }
        },
        importar() {
            this.alertMsg = [];
            this.prepareForImport = false;
            this.$refs["modal-import"].show();
        },
        addImport(){
            this.producto.forEach(element => {
                this.saveImport(element);
            });
            console.log("proydcots",this.producto);
            this.$refs["modal-import"].hide();
            this.producto = [];
        },
        validarCsv(parsedCsv) {
            this.alertMsg = [];
            var contador=0;
            console.log("parsed",parsedCsv);
            if(parsedCsv.length == 0){
                this.prepareForImport = false;
                return "El archivo no contiene datos";
            } else if(!(Object.keys(parsedCsv[0])[0]=="codigo"&&Object.keys(parsedCsv[0])[1]=="marca"&&Object.keys(parsedCsv[0])[2]=="nombre"&&Object.keys(parsedCsv[0])[3]=="precio"&&Object.keys(parsedCsv[0])[4]=="stock"&&Object.keys(parsedCsv[0])[5]=="unidad"&&Object.keys(parsedCsv[0])[6]=="descripcion"&&Object.keys(parsedCsv[0])[7]=="ccategoria"&&Object.keys(parsedCsv[0])[8]=="ncategoria")){
                this.prepareForImport = false;
                return "El archivo no contiene el formato necesario";
            } else {
                parsedCsv.forEach(element => {
                    if(!(element.codigo && element.marca && element.unidad&& element.nombre && element.precio&& element.stock&& element.ccategoria&& element.ncategoria)){
                        contador++;
                    }
                });
                if(contador>0){
                    this.prepareForImport = false;
                    return "El archivo contiene "+ contador +" filas con campos obligatorios vacíos";
                } else {
                    this.prepareForImport = true;
                    return "El archivo esta listo para importar";
                }
            }
        }, 
        csvJSON(csv) {
            var lines = csv.split("\n");
            var result = [];
            this.producto = [];
            var headers = lines[0].split(";");
            this.parse_header = lines[0].split(";");
            lines[0].split(";").forEach((key) => {
                this.sortOrders[key] = 1;
            });
            lines.map(function (line, indexLine) {
                if (indexLine < 1) return; // Jump header line
                var obj = {};
                var currentline = line.split(";");
                headers.map(function (header, indexHeader) {
                    header = header.trim();
                    if (currentline[indexHeader]) {
                        let str = currentline[indexHeader].trim();
                        str = str.split("\r");
                        obj[header] = str[0];
                    } else {
                        obj[header] = currentline[indexHeader];
                    }
                });
                result.push(obj);
            });
            result.pop();
            this.producto = result;
            return result;
        },
        loadCSV(e) {
            if (window.FileReader) {
                var reader = new FileReader();
                reader.readAsText(e.target.files[0]);
                reader.onload = (event) => {
                    var csv = event.target.result;
                    this.parse_csv = this.csvJSON(csv);
                    //validar si es error limpiar
                    let error = [this.validarCsv(this.parse_csv)];
                    this.alertMsg = error;
                };
                reader.onerror = function (evt) {
                    if (evt.target.error.name == "NotReadableError") {
                        alert("Canno't read file !");
                    }
                };                              
            } else {
                alert("FileReader are not supported in this browser.");
            }
        },
        agregarCuenta() {
            this.$router.push({ name: "inventario-agregar-index" });
        },
    },
};
</script>
<template>
    <div v-if="thisViewPermission">
        <div hidden>
            <vue-html2pdf
            :show-layout="false"
            :float-layout="true"
            :enable-download="true"
            :preview-modal="false"
            :paginate-elements-by-height="1400"
            :filename=filename
            :pdf-quality="2"
            :manual-pagination="true"
            pdf-format="a4"
            :pdf-margin="10"
            pdf-orientation="landscape"
            pdf-content-width="100%"
            ref="html2Pdf"
            >
                <section slot="pdf-content">
                    <ListarPDF :ListData="ListData"> </ListarPDF>
                </section>
            </vue-html2pdf>
        </div>
        <b-modal
            centered
            title="Importación de datos"
            ok-only
            hide-footer
            id="modal-import" 
            ref="modal-import"
            size="md"
        >
            <b-card-text class="text-center">
                <div class="mb-1">Archivo CSV para importar:</div>
                <b-form-group
                    label-for="account-nombres"
                    class="text-center"
                >
                    <input
                        type="file"
                        id="csv_file"
                        name="csv_file"
                        class="form-control"
                        accept="text/csv"
                        @change="loadCSV($event)"
                    />
                </b-form-group>
                <b-alert
                    v-if="alertMsg.length > 0"
                    :variant="prepareForImport ? 'success' : 'danger'"
                    show
                >
                    <div class="alert-body">
                        <span v-for="item in alertMsg" :key="item">
                            {{ item }}<br />
                        </span>
                    </div>
                </b-alert>
            </b-card-text>
            <div class="text-center">
                <b-button variant="primary" @click="addImport()" :disabled="!prepareForImport">
                    Importar Datos
                </b-button>
            </div>
            <br>
            <b-alert variant="secondary" show>
                <div class="alert-body" style="font-weight: 400; text-align: justify;">
                Estimado usuario, recuerde que el archivo CSV debe tener el formato establecido 
                para importar los datos de PRODUCTOS correctamente, si desconoce este formato puede descargarlo desde
                <a class="text-primary" href="https://drive.google.com/uc?id=13f-G0FvU4Y-Xa6ZzS7Te1Ri5dRlrAmU3&export=download" style="font-weight: 500;" download="">este enlace</a>
                </div>
            </b-alert>
        </b-modal>       
        <b-card>
            <b-row>
                <b-col md="6" class="">
                    <b-button variant="primary" @click="importar"> Importar Csv </b-button>
                    <b-button variant="success" class="ml-25" @click="exportar"> Exportar Excel </b-button>
                    <b-button variant="danger" class="ml-25" @click="exportarPDF"> Exportar Pdf </b-button>
                </b-col>
                <b-col md="6" class="text-right">
                    <b-button variant="primary" @click="agregarCuenta">
                        Nuevo Producto
                    </b-button>
                </b-col>
            </b-row>
            <generalTable ref="generalTable" :paramsGrid="paramsGrid"> </generalTable>
        </b-card>
    </div>
    <div v-else>
        <NotAuthorized></NotAuthorized>
    </div>
</template>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
