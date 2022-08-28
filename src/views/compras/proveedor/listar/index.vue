<script>
/* eslint-disable */
</script>
<script>
    import Vue from "vue";
    import { BootstrapVue } from "bootstrap-vue";
    import ListarPDF from "@/components/ListarPDF.vue";
    import generalTable from "@/components/generalTable.vue";
    import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
    import * as XLSX from 'xlsx/xlsx.mjs';
    import { jsPDF } from "jspdf";
    import VueHtml2pdf from 'vue-html2pdf';
    import store from '@/store';

    Vue.use(BootstrapVue);

    export default {
        components: {
            generalTable,
            VueHtml2pdf,
            ListarPDF,
        },
        data() {
            return {
                ListData:{
                    titulo:this.getNameWithLongDate(),
                    data: [],
                    fields:[
                        { key: "doi", label: "DNI/RUC", sortable: false },
                        { key: "tipoDoi", label: "TIPO", sortable: false },
                        { key: "nombre", label: "NOMBRE", sortable: false },
                        { key: "direccion", label: "DIRECCION", sortable: false },
                        { key: "email", label: "EMAIL", sortable: false },
                        { key: "estado", label: "ESTADO", sortable: false },
                        { key: "created_at", label: "FECHA DE CREACIÓN", sortable: false },
                    ],
                },
                parse_header: [],
                parse_csv: [],
                sortOrders: {},
                alertMsg: [],
                filename: this.getNameWithShortDate(),
                prepareForExport: [],
                prepareForImport: false,
                proveedor:[],
                paramsGrid: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "row", label: "", sortable: false,imput:false  },
                        { key: "doi", label: "Doi", sortable: true,imput:true  },
                        { key: "nombre", label: "Nombre", sortable: true,imput:true },
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
                        nombre: "",
                    },
                    urlBack: "/api/proveedor",
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
                        ruta: "/compras/proveedores/editar",
                    },
                    pdf: {
                        available: false,
                        redirect: true,
                    },
                    delete: {
                        available: true,
                        ruta: "/api/proveedor",
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
                    url: "/api/proveedor/all",
                    method: "GET",
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                };
                var resp = await store.dispatch("back/EXECUTE", list);
                var tipodoi="DNI",estado="HABILITADO",email="N/A"
                for(let i=0;i<resp.length;i++){
                    if(resp[i].tipoDoi==="02"){
                        tipodoi="DNI"
                    }else{
                        tipodoi="RUC"
                    }
                    if(resp[i].estado){
                        estado="ACTIVO"
                    }else{
                        estado="INACTIVO"
                    }
                    if(resp[i].email===""){
                        email="N/A"
                    }else{
                        email=resp[i].email
                    }
                    this.ListData.data.push({
                        tipoDoi:tipodoi,
                        doi:resp[i].doi,
                        nombre:resp[i].nombre,
                        email:email,
                        direccion:resp[i].direccion,
                        created_at:resp[i].created_at,
                        estado:estado,
                    })
                }
            },
            getNameWithShortDate(){ 
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
                return "Proveedores"+output;
            },
            getNameWithLongDate(){
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') +"-"+ String(date.getMonth() + 1).padStart(2, '0') +"-"+ date.getFullYear() +" "+  String(date.getHours()).padStart(2, '0') +":"+ String(date.getMinutes()).padStart(2, '0')+":"+ String(date.getSeconds()).padStart(2, '0');
                return "LISTA DE PROVEEDORES ("+output+")";
            },
            updateDateNames(){
                this.filename=this.getNameWithShortDate();
                this.ListData.titulo=this.getNameWithLongDate();
            },
            getDateNow(){
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
                return output;
            },           
            async getProveedores(){
                let request = {
                    url: this.paramsGrid.urlBack+"/all",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                };
                var respRoles = await store.dispatch("back/EXECUTE", request);
                return respRoles;
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
                        "DOI": element.doi,
                        "TIPO DOI": element.tipo_doi==1?"RUC":"DNI",
                        "NOMBRE": element.nombre,
                        "DIRECCIÓN": element.direccion,
                        "EMAIL": element.email?element.email:"N/A",
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

            async exportarPDF(){
                this.updateDateNames();
                this.$refs.html2Pdf.generatePdf();
                /*const doc = new jsPDF();
                doc.text("Hello world!", 10, 10);
                doc.save("a4.pdf");*/
            },

            addImport(){
                this.proveedor.forEach(element => {
                    this.saveImport(element);
                });
                this.$refs["modal-import"].hide();
                this.proveedor = [];
            },

            async saveImport(proveedor) {
                let request = {
                    url: "/api/proveedor",
                    method: "POST",
                    data: proveedor, 
                };
                try {
                    var respRoles = await store.dispatch("back/EXECUTE", request);
                    if (respRoles == 201) {
                        this.sendMessage("Proveedor registrado satisfactoriamente","CheckSquareIcon","success");
                    } else if (respRoles == 400) {
                        this.sendMessage("El proveedor que intenta registrar ya existe","AlertTriangleIcon","danger");
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
            
            importar() {
                this.alertMsg = [];
                this.prepareForImport = false;
                this.$refs["modal-import"].show();
            },
            
            validarCsv(parsedCsv) {
                this.alertMsg = [];
                var contador=0;
                console.log("parsed",parsedCsv);
                if(parsedCsv.length == 0){
                    this.prepareForImport = false;
                    return "El archivo no contiene datos";
                } else if(!(Object.keys(parsedCsv[0])[1]=="doi"&&Object.keys(parsedCsv[0])[2]=="email"&&Object.keys(parsedCsv[0])[3]=="tipoDoi"&&Object.keys(parsedCsv[0])[4]=="direccion")){
                    this.prepareForImport = false;
                    return "El archivo no contiene el formato necesario";
                } else {
                    parsedCsv.forEach(element => {
                        if(!(element.doi && element.tipoDoi && element.nombre)){
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
                this.proveedor = [];
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
                this.proveedor = result;
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
                this.$router.push({ name: "compras-proveedor-agregar" });
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
                    label="CSV file to import:"
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
            <generalTable ref="generalTable" :paramsGrid="paramsGrid"> </generalTable>
        </b-card>
    </div>
</template>
<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
</style>
