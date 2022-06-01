<script>
/* eslint-disable */
</script>
<script>
    import Vue from "vue";
    import { BootstrapVue } from "bootstrap-vue";
    import store from "@/store/index";
    import generalTable from "@/components/generalTable.vue";
    import { concat } from 'postcss-rtl/lib/affected-props';
    import { BTable } from 'bootstrap-vue'
    import moment from "moment";
    import {VBPopover, BButton} from 'bootstrap-vue'
    import Ripple from 'vue-ripple-directive'

    Vue.use(BootstrapVue);
    
    export default {
        components: {
            generalTable,
            BTable,
        },
        directives: {
            'b-popover': VBPopover,
            Ripple,
        },
        data() {
            return {
                stickyHeader: true,
                parse_header: [],
                parse_csv: [],
                sortOrders: {},
                alertMsg: [],
                prepareForImport: false,
                paramsGrid: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "row", label: "", sortable: false },
                        { key: "cut", label: "Cut", sortable: true },
                        { key: "ca_created_at", label: "Fecha", sortable: true },
                        { key: "ca_serie", label: "Serie", sortable: true },
                        { key: "ca_correlativo", label: "Nro", sortable: true },
                        { key: "ca_doi", label: "RUC", sortable: true },
                        { key: "ca_razon_social", label: "Razon Social", sortable: true },
                        { key: "monto_total", label: "Importe", sortable: true },
                        {
                            key: "actions",
                            label: "Acciones",
                            tdClass: "text-center",
                            thClass: "text-center",
                            sortable: false,
                        },
                    ],
                    urlBack: "/api/compra/1/1",
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
                        ca_correlativo: "",
                    },
                    edit: {
                        available: true,
                        redirect: true,
                        ruta: "/compras/editar",
                    },
                    delete: {
                        available: true,
                        ruta: "/api/compra",
                    },
                    options: {
                        responsive: true,
                        primaryKey: "id",
                    },
                    pagination: true,
                },
                paramsGridPlantilla: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "pl_nombre", label: "Nombre", sortable: true },
                        { key: "actions", label: "Acciones", tdClass: "text-center", thClass: "text-center", sortable: false },
                    ],
                    filters: {
                        pl_nombre: "",
                        pl_glosa: "",
                    },
                    urlBack: "/api/pago_cobro/plantillas/1/MB/1",
                    edit: {
                        available: true,
                        redirect: true,
                        ruta: "/compras/plantillas/editar",
                    },
                    delete: {
                        available: true,
                        ruta: "/api/plantilla",
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
                filters: {
                    id: "",
                    tienda: "",
                    marca: "",
                    perfil: "",
                    fechaCreacion: "",
                    fechaEdit: "",
                },                
                paramsGridAsientosContables: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "cut", label: "Cut", sortable: false },
                        { key: "libd_nro_cta", label: "CTA", sortable: false },
                        { key: "libd_descripcion", label: "Descripcion", sortable: false },
                        { key: "libd_debe", label: "DEBE MO", sortable: false },
                        { key: "libd_haber", label: "HABER MO", sortable: false },
                        { key: "ca_tipo_cambio", label: "TC", sortable: false },
                        { key: "libd_debe_cambio", label: "DEBE MN", sortable: false },
                        { key: "libd_haber_cambio", label: "HABER MN", sortable: false },
                        { key: "actions", label: "Acciones", tdClass: "text-center", thClass: "text-center", sortable: false },

                    ],
                    urlBack: "/api/pago_cobro/1/1",
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
                        ca_correlativo: "",
                    },
                    edit: {
                        available: true,
                        redirect: true,
                        ruta: "/compras/editar",
                    },
                    delete: {
                        available: true,
                        ruta: "/api/compra",
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
            this.loadDataSource2();
        },
        methods: {
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
                this.loadDataSource();           
                this.$refs["modal-plantilla"].show();
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

            filterColumn(field){
                if (this.paramsGridPlantilla.filters[field.key].trim() != "") {
                    this.optionFilter.column = field.key;
                    this.limpiarOtrosFiltros(field.key);
                } else {
                    this.optionFilter.column = null;
                }
                this.loadDataSource();
            },

            onRowSelected(items){
                this.selected = items;
            },

            async loadDataSource(){
                var url = this.paramsGridPlantilla.urlBack;
                url += "?limit=" + this.showEntrie + "&page=" + this.currentPage;
                if (this.optionFilter.column) {
                    url += "&contains=" + this.optionFilter.column + "&value=" + this.paramsGridPlantilla.filters[this.optionFilter.column];
                }
                let request = {
                    url: url,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                };
                var respRoles = await store.dispatch("back/EXECUTE", request);
                /*respRoles.rows.forEach((element) => {
                    if (element.pl_tipo == "1") {
                        element.pl_tipo = "Cancelacion de Documentos";
                    }else{
                        element.pl_tipo = "Otras Operaciones";
                    }
                })*/

                this.dataSource = [{"id": null, "pl_glosa": "Sin plantilla", "pl_nombre": "Sin plantilla"}].concat(respRoles.rows);
                this.totalElements = respRoles.responseFilter.total_rows;
                this.rows = respRoles.responseFilter.total_rows;
                this.showEntrie = respRoles.responseFilter.limit;
            },

            async loadDataSource2(){
                this.dataSource2=[];              
                let request = {
                    url: "/api/pago_cobro/1/1",
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                };
                var respRoles = await store.dispatch("back/EXECUTE", request);

                respRoles.rows.forEach(detalle => {
                    detalle.libd_debe_cambio=(detalle.libd_debe_cambio).toFixed(2);
                    detalle.libd_haber_cambio=(detalle.libd_haber_cambio).toFixed(2);
                    detalle.libd_debe=(detalle.libd_debe).toFixed(2);
                    detalle.libd_haber=(detalle.libd_haber).toFixed(2);
                    detalle.ca_tipo_cambio=(detalle.ca_tipo_cambio).toFixed(2);
                    detalle.ca_created_at=moment(detalle.ca_created_at).format("DD/MM/YYYY");
                });
                if(respRoles.totales[0].totalDebe!=null && respRoles.totales[0].totalHaber!=null){
                    this.dataSource2 = respRoles.rows.concat( [{"cut": "TOTAL", "ca_created_at": "", "libd_nro_cta": ""
                    , "libd_descripcion": "", "libd_debe": "", "libd_haber": "", "ca_tipo_cambio": ""
                    , "libd_debe_cambio": respRoles.totales[0].totalDebe.toFixed(2), "libd_haber_cambio": respRoles.totales[0].totalHaber.toFixed(2), "status": "awesome"
                    }]);
                };
            },

            verElement(item){
                localStorage.setItem("idPlantillaCajaBanco", item.id);                
                this.$router.push({ name: "caja-pago-cobro-agregar" });                
            },
            async deleteItem(item) {
                this.$swal({
                    title: "Está seguro que desea eliminar el registro?",
                    text: "",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si, eliminar!",
                    customClass: {
                        confirmButton: "btn btn-primary",
                        cancelButton: "btn btn-outline-danger ml-1",
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    if (result.value) {
                        let request = {
                            url: "/api/pago_cobro/" + item.id,
                            method: "DELETE",
                        };
                        try {
                            store.dispatch("back/EXECUTE", request).then((r) => {
                                if (r.status === 200) {
                                    this.$swal({
                                        icon: "success",
                                        title: "Eliminado!",
                                        text: "El registro fue eliminado.",
                                        customClass: {
                                            confirmButton: "btn btn-success",
                                        },
                                    });
                                    this.loadDataSource2();
                                }
                                if(r.status==400){
                                    this.$toast({
                                        component: ToastificationContent,
                                        props: {
                                            title: r.message,
                                            icon: "AlertTriangleIcon",
                                            variant: "danger",
                                        },
                                    });                                
                                }
                            });
                        } catch (e) {
                            console.log(e.message);
                        }
                    }
                });
            },
            showItem(item){
                this.$router.push("/caja/pago_cobro/ver/" + item.id);
            }
        },
    };
</script>
<template>
    <div>
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
            <div>
                <b-row>
                    <b-col md="6" class="">
                        <b-button variant="success"> Exportar </b-button>
                        <b-button class="ml-25" variant="light" @click="importar">
                            Importar
                        </b-button>
                    </b-col>
                    <b-col md="6" class="text-right">
                        <b-button variant="primary" @click="agregarCuenta">
                            Agregar Elemento
                        </b-button>
                    </b-col>
                </b-row>
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
                            <template #cell(actions)="data">
                                <div class="text-nowrap" >
                                    <feather-icon
                                        :id="`invoice-row-${data.item.id}-preview-icon`"
                                        icon="EyeIcon"
                                        size="16"
                                        style="cursor: pointer;"
                                        @click="showItem(data.item)"
                                        class="mx-1"
                                    />
                                    <b-tooltip
                                        title="Ver"
                                        :target="`invoice-row-${data.item.id}-preview-icon`"
                                    />
                                    <feather-icon
                                        :id="`invoice-row-${data.item.id}-delete-icon`"
                                        icon="Trash2Icon"
                                        size="16"
                                        style="cursor: pointer;"
                                        @click="deleteItem(data.item)"
                                        class="mx-1"
                                    />
                                    <b-tooltip
                                        title="Eliminar"
                                        :target="`invoice-row-${data.item.id}-delete-icon`"
                                    />
                                </div>
                            </template>                                    
                            <template #cell()="data">
                                <span class="text-nowrap">{{ data.value }}</span>
                            </template>
                        </b-table>
                    </b-col>
                </b-row>
            </div>
        </b-card>
        <b-modal
            id="modal-plantilla"
            ref="modal-plantilla"
            centered
            title="Lista de Plantillas"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>
                <div>
                    <b-row class="mb-1">
                        <b-col sm="9"> </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="12">
                            <b-table
                                show-empty
                                selectable
                                :select-mode="'single'"
                                responsive
                                empty-text="No matching records found"
                                :items="dataSource"
                                :fields="paramsGridPlantilla.fields"
                                v-on:row-selected="onRowSelected"
                            >
                                <template slot="top-row">
                                    <td v-for="field in paramsGridPlantilla.fields" :key="field.key">
                                        <input
                                            v-if="!field.key.includes('actions') && !field.key.includes('row')"
                                            class="form-control form-control-sm"
                                            v-model="paramsGridPlantilla.filters[field.key]"
                                            @change="filterColumn(field)"
                                            :placeholder="field.label"
                                        />
                                    </td>
                                </template>
                                <template #cell(row)="data">
                                    <div style="width: 0px !important">
                                        <b-form-checkbox
                                            :checked="selected.includes(data.item)"
                                        ></b-form-checkbox>
                                    </div>
                                </template>
                                <template #cell(actions)="data">
                                    <div class="text-nowrap">
                                        <feather-icon
                                            v-if="paramsGridPlantilla.edit.available"
                                            :id="`invoice-row-${data.item.id}-preview-icon`"
                                            icon="ArrowRightCircleIcon"
                                            size="16"
                                            class="mx-1"
                                            @click="verElement(data.item)"
                                        />
                                        <b-tooltip
                                            title="Seleccionar"
                                            :target="`invoice-row-${data.item.id}-preview-icon`"
                                        />                                        
                                    </div>
                                </template>
                                <template #cell()="data">
                                    <span class="text-nowrap">{{ data.value }}</span>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                    <b-row v-if="paramsGridPlantilla.pagination">
                        <b-col sm="12">
                            <b-pagination
                                v-model="currentPage"
                                :per-page="showEntrie"
                                v-on:change="cambioPagina"
                                :total-rows="20"
                                :align="'center'"
                            />
                        </b-col>
                    </b-row>
                </div>                           
            </b-card-text>      
        </b-modal>
    </div>
</template>
<style lang="scss">
    .sticky-footer tr:last-child {
        font-weight: 500;
        position: sticky;
        inset-block-end: 0;
    }

    .sticky-footer tr:last-child td:last-child {
        content-visibility: hidden;
    }
    .sticky-footer .b-table-empty-row td:last-child {
        content-visibility: visible !important;
    }
</style>