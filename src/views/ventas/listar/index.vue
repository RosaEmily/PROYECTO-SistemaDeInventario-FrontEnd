<script>
/* eslint-disable */
</script>
<script>
    import Vue from "vue";
    import NotAuthorized from "@/views/NotAuthorized.vue";
    import { BootstrapVue } from "bootstrap-vue";
    import store from "@/store/index";
    import generalTable from "@/components/generalTable.vue";
    import { concat } from 'postcss-rtl/lib/affected-props';
    import { BTable } from 'bootstrap-vue'
    import moment from "moment";
    import {VBPopover, BButton} from 'bootstrap-vue'
    import Ripple from 'vue-ripple-directive'
    import generalData from "@fakedata";

    Vue.use(BootstrapVue);
    
    export default {
        components: {
            generalTable,
            BTable,
            NotAuthorized
        },
        directives: {
            'b-popover': VBPopover,
            Ripple,
        },
        data() {
            return {
                thisViewPermission: false,
                stickyHeader: true,
                parse_header: [],
                parse_csv: [],
                sortOrders: {},
                tipos_doc: generalData.compra.documentos,
                alertMsg: [],
                prepareForImport: false,
                paramsGrid: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "row", label: "", sortable: false,imput:false  },
                        { key: "desctipo", label: "Documento", sortable: false },
                        { key: "serie", label: "serie", sortable: true,imput:true  },
                        { key: "correlativo", label: "correlativo", sortable: true,imput:true  },
                        { key: "cliente.nombre", label: "Cliente", sortable: true,imput:true  },
                        { key: "created_at", label: "Fecha de Emision", sortable: false,imput:false  },
                        { key: "total", label: "Importe", sortable: false },
                        {
                            key: "actions",
                            label: "Acciones",
                            tdClass: "text-center",
                            thClass: "text-center",
                            sortable: false,
                            imput:false 
                        },
                    ],
                    urlBack: "/api/venta",
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
                    filters: {
                        serie: "",
                        correlativo: "",
                        proveedor: "",
                        desctipo: "",                      
                    },
                    edit: {
                        available: true,
                        redirect: true,
                        ruta: "/ventas/editar",
                    },
                    pdf: {
                        available: true,
                        redirect: true,
                    },
                    delete: {
                        available: true,
                        ruta: "/api/venta",
                    },
                    options: {
                        responsive: true,
                        primaryKey: "id",
                    },
                    pagination: true,
                },                
                selected: [],
                currentPage: 1,
                rows: 0,
                showEntrie: 10,
                showEntrie2: 10,
                totalElements: 0,
                entries: [10, 20, 50, 100],
                dataSource: [],
                dataSource2: [],
                optionFilter: {
                    column: null,
                },                
                paramsGridAsientosContables: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "serie", label: "Serie", sortable: false },
                        { key: "correlativo", label: "Correlativo", sortable: false },
                        { key: "created_at", label: "Fecha de Emision", sortable: false },
                        { key: "tipodoc", label: "DescDocumento", sortable: false },
                        { key: "tipo_cambio", label: "TC", sortable: false },
                        { key: "producto", label: "producto", sortable: false },
                        { key: "monedaO", label: "MO", sortable: false },
                        { key: "monedaN", label: "MN", sortable: false },
                    ],
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
                    pagination: true,
                },            
            };
        },
        mounted() {
            this.isAuthorized();
            this.loadDataSource2();
        },
        methods: {
            isAuthorized(){
                var permissions=JSON.parse(localStorage.getItem('UserDataPermisos'));
                permissions.forEach(element => {
                    if(element=='Ventas'){
                        this.thisViewPermission=true;
                    }
                });
            },
            rowClass(item){
                try{
                    const colorClass = 'table-primary'
                    /* eslint-disable-next-line consistent-return */
                    if (item.status === 'awesome') { return colorClass }
                } catch {
                    return ''
                }
            },

            importarCsv(){
            },

            importar(){
                this.alertMsg = [];
                this.prepareForImport = false;
                this.$refs["modal-import"].show();
            },

            validarCsv(){
                let msgError = [];
                return msgError;
            },

            csvJSON(csv){
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
                return result;
            },

            loadCSV(e){
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

            agregarCuenta(){
                this.$router.push({ name: "ventas-agregar-index" });
            },

            limpiarOtrosFiltros(exceptKey){
                for (let i = 0; i < this.paramsGrid.fields.length; i++) {
                    if (this.paramsGrid.fields[i].key != exceptKey) {
                        this.paramsGrid.filters[this.paramsGrid.fields[i].key] = "";
                    }
                }
            },

            cambioPagina(e){
                this.currentPage = e;
                this.loadDataSource();
            },

            changeSizePage(){
                this.loadDataSource();
            },

            onRowSelected(items){
                this.selected = items;
            },           

            async loadDataSource2(){
                var url = "/api/venta/detalle";               
                let request = {
                    url: url,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                };
                var respRoles = await store.dispatch("back/EXECUTE", request);
                var totalO=0.00,totalN=0.00;
                for(let i=0;i<respRoles.length;i++){
                    for(let j=0;j<respRoles[i].detalle_producto.length;j++){
                        this.dataSource2.push({
                            serie: respRoles[i].serie,
                            correlativo: respRoles[i].correlativo,
                            created_at: respRoles[i].created_at,
                            tipodoc:  this.tipos_doc.find((doc) => doc.value == respRoles[i].tipodoc).text,
                            tipo_cambio: parseFloat(respRoles[i].tipo_cambio).toFixed(2),
                            producto:respRoles[i].detalle_producto[j].producto.nombre,
                            monedaO:parseFloat(parseInt(respRoles[i].detalle_producto[j].cantidad)*
                                    parseFloat(respRoles[i].detalle_producto[j].precio)).toFixed(2),
                            monedaN:parseFloat(parseInt(respRoles[i].detalle_producto[j].cantidad)*
                                    parseFloat(respRoles[i].detalle_producto[j].precio)*parseFloat(respRoles[i].tipo_cambio)).toFixed(2),            
                        });
                        totalO+=parseFloat(parseInt(respRoles[i].detalle_producto[j].cantidad)*
                                    parseFloat(respRoles[i].detalle_producto[j].precio));
                        totalN+=parseFloat(parseInt(respRoles[i].detalle_producto[j].cantidad)*
                                    parseFloat(respRoles[i].detalle_producto[j].precio)*parseFloat(respRoles[i].tipo_cambio))
                    }
                }
                this.dataSource2.push({
                    serie: "",
                    correlativo: "",
                    created_at: "",
                    tipodoc:  "",
                    tipo_cambio: "",
                    producto:"",
                    monedaO:"",
                    monedaN:parseFloat(totalN).toFixed(2),            
                });
            },

            verElement(item){
                localStorage.setItem("idPlantillaCompra", item.id);
                if(item.id==0){
                    this.$router.push({ name: "nota-credito-agregar-index" });
                }else{
                    this.$router.push({ name: "compras-agregar-index" });
                }
            },       
        },
    };
</script>
<template>
    <div v-if="thisViewPermission">
        <b-card>
            <b-tabs>
                <b-tab active title="Registro General">                   
                    <b-row>
                        <b-col md="6" class="">
                        </b-col>
                        <b-col md="6" class="text-right">
                            <b-button variant="primary" @click="agregarCuenta">
                                Nueva Venta
                            </b-button>
                        </b-col>
                    </b-row>
                    <generalTable @deletedCompra="loadDataSource2()" :paramsGrid="paramsGrid"> </generalTable>
                </b-tab>
                <b-tab title="Detalle de Productos">
                    <div>
                        <b-row class="mb-1">
                            <b-col sm="9"> </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-table
                                    show-empty
                                    :select-mode="'single'"
                                    responsive
                                    empty-text="No matching records found"
                                    :items="dataSource2"
                                    :fields="paramsGridAsientosContables.fields"
                                    :tbody-tr-class="rowClass"
                                    v-on:row-selected="onRowSelected"
                                    :sticky-header="stickyHeader"
                                    style="max-height: 380px;"
                                    class="sticky-footer"
                                >                               
                                    <template #cell(row)="data">
                                        <div style="width: 0px !important">
                                            <b-form-checkbox
                                                :checked="selected.includes(data.item)"
                                            ></b-form-checkbox>
                                        </div>
                                    </template>                                    
                                    <template #cell()="data">
                                        <span class="text-nowrap">{{ data.value }}</span>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </div>
                </b-tab>
            </b-tabs>
        </b-card>       
    </div>
    <div v-else>
        <NotAuthorized></NotAuthorized>
    </div>
</template>
<style lang="scss">
    .sticky-footer tr:last-child {
        font-weight: 500;
        position: sticky;
        inset-block-end: 0;
    }
</style>