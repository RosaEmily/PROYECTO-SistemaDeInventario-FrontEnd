<script>
/* eslint-disable */
</script>
<script>
    import NotAuthorized from "@/views/NotAuthorized.vue";
    import Vue from "vue";
    import { BootstrapVue } from "bootstrap-vue";
    import generalTable from "@/components/generalTable.vue";
    import planCuenta from "@/components/plan-cuenta/edicion.vue";
    import ListarPDF from "@/components/ListarPDF.vue";
    import VueHtml2pdf from 'vue-html2pdf';
    import * as XLSX from 'xlsx/xlsx.mjs';
    import store from '@/store';

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
                    titulo:this.getNameWithLongDate(),
                    data: [],
                    fields:[
                        { key: "codigo", label: "CODIGO", sortable: false },
                        { key: "nombre", label: "NOMBRE", sortable: false },
                        { key: "estado", label: "ESTADO", sortable: false },
                        { key: "fecha", label: "FECHA DE CREACIÓN", sortable: false },
                    ],
                },
                parse_header: [],
                parse_csv: [],
                sortOrders: {},
                alertMsg: [],
                prepareForImport: false,
                child_component: planCuenta,
                paramsGrid: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "row", label: "", sortable: false,imput:false  },
                        { key: "codigo", label: "Codigo", sortable: true,imput:true  },
                        { key: "nombre", label: "Nombre", sortable: true,imput:true  },
                        {
                            key: "actions",
                            label: "Acciones",
                            tdClass: "text-center",
                            thClass: "text-center",
                            sortable: false,
                            imput:false 
                        },
                    ],
                    filters: {
                        codigo: "",
                        nombre: "",
                    },
                    urlBack: "/api/categoria",
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
                        ruta: "/inventario/categorias/editar",
                    },
                    pdf: {
                        available: false,
                        redirect: true,
                    },
                    delete: {
                        available: true,
                        ruta: "/api/categoria",
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
            this.isAuthorized();
            this.listarData();
        },
        methods: {
            isAuthorized(){
                var permissions=JSON.parse(localStorage.getItem('UserDataPermisos'));
                permissions.forEach(element => {
                    if(element=='Categorias'){
                        this.thisViewPermission=true;
                    }
                });
            },
            async listarData() {
                let list = {
                    url: "/api/categoria/all",
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
                        estado:estado,
                        fecha:resp[i].created_at,                        
                    })
                }
            },
            getNameWithShortDate(){ 
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
                return "Categorias"+output;
            },
            getNameWithLongDate(){
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') +"-"+ String(date.getMonth() + 1).padStart(2, '0') +"-"+ date.getFullYear() +" "+  String(date.getHours()).padStart(2, '0') +":"+ String(date.getMinutes()).padStart(2, '0')+":"+ String(date.getSeconds()).padStart(2, '0');
                return "LISTA DE CATEGORIAS ("+output+")";
            },
            updateDateNames(){
                this.filename=this.getNameWithShortDate();
                this.ListData.titulo=this.getNameWithLongDate();
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
                        "ESTADO": element.estado?"ACTIVO":"INACTIVO",
                        "FECHA CREACIÓN": element.created_at,
                    };
                    respuestas.push(respuesta);
                });
                let data = XLSX.utils.json_to_sheet(respuestas)
                const workbook = XLSX.utils.book_new()
                const filename = this.filename
                XLSX.utils.book_append_sheet(workbook, data, filename)
                XLSX.writeFile(workbook, `${filename}.xlsx`)
            },
            getDateNow(){
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
                return output;
            },
            importarCsv(){
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
                this.$router.push({ name: "inventario-categoria-agregar-index" });
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
                :filename=this.filename
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
        <b-card>
            <b-row>
                <b-col md="6" class="">
                    <b-button variant="success" class="ml-25" @click="exportar"> Exportar Excel </b-button>
                    <b-button variant="danger" class="ml-25" @click="exportarPDF"> Exportar Pdf </b-button>
                </b-col>
                <b-col md="6" class="text-right">
                    <b-button variant="primary" @click="agregarCuenta">
                        Nueva Categoría
                    </b-button>
                </b-col>
            </b-row>
            <generalTable :paramsGrid="paramsGrid"> </generalTable>
        </b-card>
    </div>
    <div v-else>
        <NotAuthorized></NotAuthorized>
    </div>
</template>
<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
</style>
