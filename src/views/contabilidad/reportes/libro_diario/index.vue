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
                modulos: [
                    {
                        value: "T",
                        text: "TODOS",
                    },
                    {
                        value: "MC",
                        text: "COMPRAS",
                    },
                    {
                        value: "MV",
                        text: "VENTAS",
                    },
                    {
                        value: "MB",
                        text: "CAJA Y BANCOS",
                    },
                    {
                        value: "MD",
                        text: "DIARIO",
                    },
                ],
                libro_diario: {
                    modulo: "T",
                },
                stickyHeader: true,
                parse_header: [],
                parse_csv: [],
                sortOrders: {},
                alertMsg: [],
                prepareForImport: false,
                fieldsTodo: [
                    { key: "libd_nro_cta", label: "Nro Cuenta", sortable: true },
                    { key: "libd_descripcion", label: "Denominación", sortable: true },
                    { key: "libd_debe_cambio", label: "DEBE MN", sortable: true },
                    { key: "libd_haber_cambio", label: "HABER MN", sortable: true },                   
                ],
                fieldsDetalle: [
                    { key: "cut", label: "Cut", sortable: true },
                    { key: "libd_nro_cta", label: "Nro Cuenta", sortable: true },
                    { key: "libd_descripcion", label: "Denominación", sortable: true },
                    { key: "libd_debe_cambio", label: "DEBE MN", sortable: true },
                    { key: "libd_haber_cambio", label: "HABER MN", sortable: true },                   
                ],              
                currentPage: 1,
                rows: 0,
                showEntrie: 10,
                showEntrie2: 10,
                totalElements: 0,
                dataSource: [],
                dataSource2: [],                     
            };
        },
        mounted() {
            this.loadDataSource();
        },
        methods: {
            async loadDataSource(){
                let request = {
                    url: "/api/reporte/LibroDiarioTodo/"+this.libro_diario.modulo,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                };
                var respRoles = await store.dispatch("back/EXECUTE", request);
                respRoles.rows.forEach(detalle => {
                    detalle.libd_debe_cambio=(detalle.libd_debe_cambio).toFixed(2);
                    detalle.libd_haber_cambio=(detalle.libd_haber_cambio).toFixed(2);                 
                });
                console.log(respRoles);
                this.dataSource=respRoles.rows;
                if(respRoles.totales[0].totalDebe!=null && respRoles.totales[0].totalHaber!=null){
                    this.dataSource = respRoles.rows.concat( [{"libd_nro_cta": "TOTAL", "libd_descripcion": ""
                    , "libd_debe_cambio": respRoles.totales[0].totalDebe.toFixed(2),
                    "libd_haber_cambio": respRoles.totales[0].totalHaber.toFixed(2), "status": "awesome"
                    }]);
                };
                console.log(this.dataSource);

                let request2 = {
                    url: "/api/reporte/LibroDiarioDetalle/"+this.libro_diario.modulo,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                };
                var respRoles2 = await store.dispatch("back/EXECUTE", request2);
                respRoles2.rows.forEach(detalle => {
                    detalle.libd_debe_cambio=(detalle.libd_debe_cambio).toFixed(2);
                    detalle.libd_haber_cambio=(detalle.libd_haber_cambio).toFixed(2);                 
                });
                this.dataSource2=respRoles2.rows;
                if(respRoles2.totales[0].totalDebe!=null && respRoles2.totales[0].totalHaber!=null){
                    this.dataSource2 = respRoles2.rows.concat( [{"cut": "TOTAL", "libd_nro_cta": "", "libd_descripcion": ""
                    , "libd_debe_cambio": respRoles2.totales[0].totalDebe.toFixed(2),
                    "libd_haber_cambio": respRoles2.totales[0].totalHaber.toFixed(2), "status": "awesome"
                    }]);
                };    
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
        },
    };
</script>
<template>
    <div>
        <b-card>
            <!--Select de módulo-->
            <b-form-group label="Módulo: ">
                <b-input-group>
                    <b-form-select
                        v-model="libro_diario.modulo"
                        class="form-control"
                        :options="modulos"
                        @change="loadDataSource"
                    />
                </b-input-group>
            </b-form-group> 
            <b-tabs>
                <b-tab active title="General">                   
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
                                    :items="dataSource"
                                    :fields="fieldsTodo"
                                    :tbody-tr-class="rowClass"
                                    :sticky-header="stickyHeader"
                                    style="max-height: 380px;"
                                    class="sticky-footer"
                                >                     
                                    
                                    <template #cell()="data">
                                        <span class="text-nowrap">{{ data.value }}</span>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </div>
                </b-tab>
                <b-tab title="Detalle">
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
                                    :fields="fieldsDetalle"
                                    :tbody-tr-class="rowClass"
                                    :sticky-header="stickyHeader"
                                    style="max-height: 380px;"
                                    class="sticky-footer"
                                > 
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
</template>
<style lang="scss">
    .sticky-footer tr:last-child {
        font-weight: 500;
        position: sticky;
        inset-block-end: 0;
    }
</style>