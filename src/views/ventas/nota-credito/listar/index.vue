<script>
/* eslint-disable */
</script>
<script>
    import Vue from "vue";
    import { BootstrapVue } from "bootstrap-vue";
    import generalTable from "@/components/generalTable.vue";
    import planCuenta from "@/components/plan-cuenta/edicion.vue";
    import store from "@/store/index";
    import ListarPDF from "@/components/ListarPDF.vue";
    import VueHtml2pdf from 'vue-html2pdf';
    import * as XLSX from 'xlsx/xlsx.mjs';

    Vue.use(BootstrapVue);

    export default {
        components: {
            generalTable,
            planCuenta,
            VueHtml2pdf,
            ListarPDF,
        },
        data() {
            return {
                filename: this.getNameWithShortDate(),
                ListData:{
                    titulo:this.getNameWithLongDate(),
                    data: [],
                    fields:[
                        { key: "id", label: "ID", sortable: false },
                        { key: "documento", label: "DOCUMENTO", sortable: false },
                        { key: "serie", label: "SERIE", sortable: false },
                        { key: "correlativo", label: "CORRELATIVO", sortable: false },
                        { key: "doi", label: "CLIENTE", sortable: false },
                        { key: "total", label: "TOTAL", sortable: false },
                        { key: "estado", label: "ESTADO", sortable: false },
                        { key: "fecha", label: "FECHA CREACIÓN", sortable: false },
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
                        { key: "venta.serie", label: "Serie", sortable: false ,imput:true},
                        { key: "venta.correlativo", label: "Correlativo", sortable: true,imput:true },
                        { key: "created_at", label: "Fecha de creacion", sortable: true,imput:false,fecha:false },
                        { key: "venta.cliente.doi", label: "Doi", sortable: true,imput:true },
                        { key: "venta.cliente.nombre", label: "Nombre", sortable: true,imput:true },
                        { key: "motivo", label: "motivo", sortable: true,imput:false},                  
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
                        serie: "",
                        correlativo: "",
                        created_at: "",
                        doi: "", 
                        nombre: "",                    
                    },
                    urlBack: "/api/notaCredito/venta",
                    edit: {
                        available: false,
                    },
                    pdf: {
                        available: false,
                        redirect: true,
                    },
                    delete: {
                        available: true,
                        ruta: "/api/notaCredito/venta",
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
                    url: "/api/notaCredito/venta/all",
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
                        id:resp[i].id,
                        documento:resp[i].venta.desctipo,
                        serie:resp[i].venta.serie,
                        correlativo:resp[i].venta.correlativo,
                        doi:resp[i].venta.cliente.doi,
                        total:resp[i].venta.total,
                        motivo:resp[i].motivo,
                        estado:estado,
                        fecha:resp[i].created_at,                        
                    })
                }
            },
            getNameWithShortDate(){ 
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
                return "NotaCreditosVenta"+output;
            },
            getNameWithLongDate(){
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') +"-"+ String(date.getMonth() + 1).padStart(2, '0') +"-"+ date.getFullYear() +" "+  String(date.getHours()).padStart(2, '0') +":"+ String(date.getMinutes()).padStart(2, '0')+":"+ String(date.getSeconds()).padStart(2, '0');
                return "LISTA DE NOTAS DE CREDITOS DE VENTAS ("+output+")";
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
                        "ID": element.id,
                        "DOCUMENTO": element.venta.desctipo,
                        "SERIE": element.venta.serie,
                        "CORRELATIVO": element.venta.correlativo,
                        "PROVEEDOR": element.venta.cliente.doi,
                        "TOTAL": element.venta.total,
                        "MOTIVO": element.motivo,
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
                this.$router.push({ name: "nota-credito-venta-agregar-index" });
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
                        Nueva Nota de Crédito
                    </b-button>
                </b-col>
            </b-row>
            <generalTable :paramsGrid="paramsGrid">
                <component :is="child_component"></component>
            </generalTable>
        </b-card>
    </div>
</template>
<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
</style>