<script>
/* eslint-disable */
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import generalTable from "@/components/generalTable.vue";
import planCuenta from "@/components/plan-cuenta/edicion.vue";
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
    },
    data() {
        return {
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
            },
        };
    },
    mounted() {
        this.listarData();
    },
    methods: {
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
        validarCsv() {
            let msgError = [];
            return msgError;
        },
        csvJSON(csv) {
            var lines = csv.split("\n");
            var result = [];
            var headers = lines[0].split(",");
            this.parse_header = lines[0].split(",");
            lines[0].split(",").forEach((key) => {
                this.sortOrders[key] = 1;
            });
            lines.map(function (line, indexLine) {
                if (indexLine < 1) return; // Jump header line
                var obj = {};
                var currentline = line.split(",");
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
            console.log("result", result);
            return result;
        },
        loadCSV(e) {
            if (window.FileReader) {
                var reader = new FileReader();
                reader.readAsText(e.target.files[0]);
                document.querySelector("input[name=csv_file]").value =
                    e.target.files;
                reader.onload = (event) => {
                    var csv = event.target.result;
                    this.parse_csv = this.csvJSON(csv);
                    //validar si es error limpiar
                    let error = this.validarCsv();
                    if (error != []) {
                        e.target.value = "";
                        this.prepareForImport = false;
                        this.alertMsg = error;
                    } else {
                        this.prepareForImport = true;
                        this.alertMsg = ["Datos listos para la importación"];
                    }
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
    <div>
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
            <b-card-text class="">
                <b-form-group
                    label="CSV file to import: *"
                    label-for="account-nombres"
                    class="text-center"
                >
                    <input
                        type="file"
                        id="csv_file"
                        name="csv_file"
                        class="form-control"
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
                <b-button variant="primary" @click="importarCsv"
                    >Importar Datos
                </b-button>
            </div>
        </b-modal>
        <b-card>
            <b-row>
                <b-col md="6" class="">
                    <b-button variant="light" @click="importar"> Importar Csv </b-button>
                    <b-button variant="success" class="ml-25" @click="exportar"> Exportar Excel </b-button>
                    <b-button variant="danger" class="ml-25" @click="exportarPDF"> Exportar Pdf </b-button>
                </b-col>
                <b-col md="6" class="text-right">
                    <b-button variant="primary" @click="agregarCuenta">
                        Agregar Elemento
                    </b-button>
                </b-col>
            </b-row>
            <generalTable :paramsGrid="paramsGrid"> </generalTable>
        </b-card>
    </div>
</template>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
