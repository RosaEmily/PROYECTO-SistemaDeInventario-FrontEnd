<script>
/* eslint-disable */
</script>
<script>
    import NotAuthorized from "@/views/NotAuthorized.vue";
    import Vue from "vue";
    import { BootstrapVue } from "bootstrap-vue"    
    import generalTable from "@/components/generalTable.vue";
    import planCuenta from "@/components/plan-cuenta/edicion.vue";
    import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
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
                cliente:[],
                paramsGrid: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "row", label: "", sortable: false,imput:false  },
                        { key: "doi", label: "Doi", sortable: true,imput:true  },
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
                        doi: "",
                        nombre: "",
                    },
                    urlBack: "/api/cliente",
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
                        ruta: "/ventas/clientes/editar",
                    },
                    pdf: {
                        available: false,
                        redirect: true,
                    },
                    delete: {
                        available: true,
                        ruta: "/api/cliente",
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
                    if(element=='Clientes'){
                        this.thisViewPermission=true;
                    }
                });
            },
            async listarData() {
                let list = {
                    url: "/api/cliente/all",
                    method: "GET",
                    headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                };
                var resp = await store.dispatch("back/EXECUTE", list);
                var tipodoi="DNI",estado="ACTIVO",email="N/A"
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
            getDateNow(){
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
                return output;
            },
            getNameWithShortDate(){ 
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
                return "Clientes"+output;
            },
            getNameWithLongDate(){
                let date = new Date();
                let output = String(date.getDate()).padStart(2, '0') +"-"+ String(date.getMonth() + 1).padStart(2, '0') +"-"+ date.getFullYear() +" "+  String(date.getHours()).padStart(2, '0') +":"+ String(date.getMinutes()).padStart(2, '0')+":"+ String(date.getSeconds()).padStart(2, '0');
                return "LISTA DE CLIENTES ("+output+")";
            },
            updateDateNames(){
                this.filename=this.getNameWithShortDate();
                this.ListData.titulo=this.getNameWithLongDate();
            },
            
            addImport(){
                this.cliente.forEach(element => {
                    this.saveImport(element);
                });
                console.log(this.cliente);
                this.$refs["modal-import"].hide();
                this.cliente = [];
            },

            async saveImport(cliente) {
                console.log(cliente);
                let request = {
                    url: "/api/cliente",
                    method: "POST",
                    data: cliente, 
                };
                try {
                    var respRoles = await store.dispatch("back/EXECUTE", request);
                    if (respRoles == 201) {
                        this.sendMessage("Cliente registrado satisfactoriamente","CheckSquareIcon","success");
                    } else if (respRoles == 400) {
                        this.sendMessage("El cliente que intenta registrar ya existe","AlertTriangleIcon","danger");
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
                } else if(!(Object.keys(parsedCsv[0])[0]=="nombre"&&Object.keys(parsedCsv[0])[1]=="doi"&&Object.keys(parsedCsv[0])[2]=="email"&&Object.keys(parsedCsv[0])[3]=="tipoDoi"&&Object.keys(parsedCsv[0])[4]=="direccion"&&Object.keys(parsedCsv[0])[5]=="estado")){
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
                this.cliente = [];
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
                this.cliente = result;
                console.log(this.cliente);
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
                this.$router.push({ name: "ventas-cliente-agregar" });
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
                para importar los datos de CLIENTES correctamente, si desconoce este formato puede descargarlo desde 
                <a class="text-primary" href="https://drive.google.com/uc?id=1uopFHsnVhGUDZzVaziZe-_uzJXS-KtDN&export=download" style="font-weight: 500;" download="">este enlace</a>
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
                        Nuevo Cliente
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
