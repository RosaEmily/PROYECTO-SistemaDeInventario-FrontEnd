<script>
/* eslint-disable */
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import store from "@/store/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import vSelect from "vue-select";
import Ripple from "vue-ripple-directive";
import VueSweetalert2 from "vue-sweetalert2";
import moment from "moment";
import DocumentoPDF from "@/components/DocumentoPDF.vue";
import VueHtml2pdf from 'vue-html2pdf';
import generalData from "@fakedata";

Vue.use(VueSweetalert2);
Vue.use(BootstrapVue);
export default {
    props: ["paramsGrid"],
    components: {
        vSelect,
        VueHtml2pdf,
        DocumentoPDF,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            unidades: generalData.inventario.unidades,
            selected: [],
            currentPage: 1,
            rows: 0,
            namefilename: "",
            showEntrie: 10,
            totalElements: 0,
            entries: [10, 20, 50, 100],
            dataSource: [],
            optionFilter: {
                column: null,
            },
            arrayFilters:[],
            filtro:"",
            ListData:{
                data:{},
                productos:[]
            },
        };
    },
    mounted() {
        this.loadDataSource();
        this.loadDataCombox();
    },
    methods: {
        limpiarOtrosFiltros(exceptKey) {
            for (let i = 0; i < this.paramsGrid.fields.length; i++) {
                if (this.paramsGrid.fields[i].key != exceptKey) {
                    this.paramsGrid.filters[this.paramsGrid.fields[i].key] = "";
                }
            }
        },
        getDateNow(){
            let date = new Date();
            let output = String(date.getDate()).padStart(2, '0') + String(date.getMonth() + 1).padStart(2, '0') + date.getFullYear();
            return output;
        },  
        downloadPDF(item) {
            this.ListData={
                data:{},
                productos:[]
            }
            if(item.proveedor){               
                this.namefilename="C-"+item.desctipo+"-"+item.serie+"-"+item.correlativo+"-"+this.getDateNow()
                this.ListData.data.desctipo=item.desctipo
                this.ListData.data.serie=item.serie
                this.ListData.data.correlativo=item.correlativo
                this.ListData.data.nombre=item.proveedor.nombre
                this.ListData.data.doi=item.proveedor.doi
                this.ListData.data.direccion=item.proveedor.direccion
                this.ListData.data.fecha=item.created_at
            }else{                
                this.namefilename="V-"+item.desctipo+"-"+item.serie+"-"+item.correlativo+"-"+this.getDateNow()
                this.ListData.data.desctipo=item.desctipo
                this.ListData.data.serie=item.serie
                this.ListData.data.correlativo=item.correlativo
                this.ListData.data.nombre=item.cliente.nombre
                this.ListData.data.doi=item.cliente.doi
                this.ListData.data.direccion=item.cliente.direccion
                this.ListData.data.fecha=item.created_at
            }           
            for(let i=0;i<item.detalle_producto.length;i++){
                this.ListData.productos.push({
                    nombre:item.detalle_producto[i].producto.nombre,
                    unidad:this.unidades.find((unid) => unid.value == item.detalle_producto[i].producto.unidad).text,
                    cantidad:item.detalle_producto[i].cantidad,
                    precio:parseFloat(item.detalle_producto[i].precio).toFixed(2),
                    subtotal:parseFloat(item.detalle_producto[i].cantidad*item.detalle_producto[i].precio).toFixed(2)
                })
            }
            this.ListData.productos.push({
                nombre:"",
                unidad:"",
                cantidad:"",
                precio:"TOTAL",
                subtotal:parseFloat(item.total).toFixed(2),
            })            
            this.$refs.html2Pdf.generatePdf();
        },
        filterColumn(field) {
            //this.filtro="&doi="+this.paramsGrid.filters["doi"].trim()+"&nombre="+this.paramsGrid.filters["nombre"].trim();
            if (this.paramsGrid.filters[field.key].trim() != "") {
                this.optionFilter.column = field.key;
                //this.limpiarOtrosFiltros(field.key);
            } else {
                this.optionFilter.column = null;
            }
            var indexFind=null
            for (let i = 0; i < this.arrayFilters.length; i++) {
                if(this.arrayFilters[i].keyContains == field.key){
                    indexFind = i
                }
            }
            if(indexFind!=null){
                if (this.paramsGrid.filters[field.key].trim() != "") {
                    this.arrayFilters[indexFind].value=this.paramsGrid.filters[field.key].trim()
                    //editar
                }else{
                    // eliminar
                    this.arrayFilters.splice(indexFind,1)
                }
            }else{
                //añadir
                this.arrayFilters.push({
                    keyContains:field.key,                    
                    value:this.paramsGrid.filters[field.key].trim()
                })
            }         
            this.loadDataSource();
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
                        url: this.paramsGrid.delete.ruta + "/" + item.id,
                        method: "DELETE",
                    };
                    try {
                        store.dispatch("back/EXECUTE", request).then((r) => {
                            if (r === 200) {
                                this.$swal({
                                    icon: "success",
                                    title: "Eliminado!",
                                    text: "El registro fue eliminado.",
                                    customClass: {
                                        confirmButton: "btn btn-success",
                                    },
                                });
                                this.currentPage=1;
                                this.loadDataSource();
                                this.$emit("deletedCompra");
                            }
                            if(r === 201){
                                this.$swal({
                                    icon: "error",
                                    title: "Accion denegada!",
                                    text: "El registro esta asociada a una nota de credito.",
                                    customClass: {
                                        confirmButton: "btn btn-danger",
                                    },
                                });
                                this.currentPage=1;                         
                            }
                            if(r === 400){
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

        cambioPagina(e) {
            this.currentPage = e;
            this.loadDataSource();
        },
 
        changeSizePage() {
            this.loadDataSource();
        },

        async loadDataCombox(){
            for(let i=0;i<this.paramsGrid.fields.length;i++){
                if(this.paramsGrid.fields[i].combox){
                    let combox = {
                        url: this.paramsGrid.fields[i].url,
                        method: "GET",
                    };
                    var repcombox = await store.dispatch("back/EXECUTE", combox);
                    repcombox=this.paramsGrid.fields[i].arrayInicial.concat(repcombox);
                    this.paramsGrid.filters[this.paramsGrid.fields[i].key]=" ";
                    this.paramsGrid.fields[i].datoCombox = repcombox;
                }
            }
            //console.log("ASASASA",this.paramsGrid.fields);
        },
        async loadDataSource() {
            //console.log("passsoooooooooooooooooo");      
            var url = this.paramsGrid.urlBack;
            url += "?limit=" + this.showEntrie + "&page=" + this.currentPage;
            // if (this.optionFilter.column) {
            //     url += "&contains=" + this.optionFilter.column + "&value=" + this.paramsGrid.filters[this.optionFilter.column];
            // }
            if(this.arrayFilters.length>0){
                for(let i=0;i<this.arrayFilters.length;i++){
                    this.filtro +="&"+this.arrayFilters[i].keyContains+"="+this.arrayFilters[i].value;
                }
                url += "&filter="+JSON.stringify(this.arrayFilters)
            }else{
                url += "&filter=nada"
            }
            //url+=this.filtro;
            let request = {
                url: url,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            };            
            var respRoles = await store.dispatch("back/EXECUTE", request);

            console.log("respuesta", respRoles);

            respRoles.rows.forEach(respuesta => {
                Object.values(respuesta).forEach((elemento, index) => {
                    if(typeof(elemento)=="string" && moment(elemento.substring(0,10), "YYYY-MM-DD", true).isValid()){
                        respuesta[Object.keys(respuesta)[index]] = moment(elemento.substring(0,10), "YYYY-MM-DD").format("DD/MM/YYYY");
                    }
                });
            });

            this.dataSource = respRoles.rows;
            this.totalElements = respRoles.responseFilter.total_rows;
            this.rows = respRoles.responseFilter.total_rows;
            this.showEntrie = respRoles.responseFilter.limit;
        },
        editElement(item) {
            if (this.paramsGrid.edit.redirect) {
                this.$router.push(this.paramsGrid.edit.ruta + "/" + item.id);
            } else {
                this.$children[3].showModal();
            }
        },        
        onRowSelected(items) {
            this.selected = items;
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
                :filename=this.namefilename
                :pdf-quality="2"
                :manual-pagination="true"
                pdf-format="a4"
                :pdf-margin="10"
                pdf-orientation="landscape"
                pdf-content-width="100%"
                ref="html2Pdf"
                >
                <section slot="pdf-content">
                    <DocumentoPDF :ListData="ListData"> </DocumentoPDF>
                </section>
            </vue-html2pdf>
        </div>
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
                    :fields="paramsGrid.fields"
                    v-on:row-selected="onRowSelected"
                >
                    <template slot="top-row">
                        <td v-for="field in paramsGrid.fields" :key="field.key">
                            <input
                                v-if="
                                    field.imput
                                "
                                class="form-control form-control-sm"
                                v-model="paramsGrid.filters[field.key]"
                                @change="filterColumn(field)"
                                :placeholder="field.label"
                            />
                            <b-form-select
                                v-if="field.combox"
                                v-model="paramsGrid.filters[field.key]"
                                :value-field=field.value
                                :text-field=field.text
                                :options="field.datoCombox"
                                @change="filterColumn(field)"
                            />
                            <b-form-datepicker
                                v-if="field.fecha"
                                v-model="paramsGrid.filters[field.key]"
                                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                locale="es"
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
                                v-if="paramsGrid.pdf.available"
                                :id="`invoice-row-${data.item.id}-preview-icon`"
                                icon="DownloadIcon"
                                size="16"
                                class="mx-1"
                                @click="downloadPDF(data.item)"
                            />
                            <b-tooltip
                                title="PDF"
                                :target="`invoice-row-${data.item.id}-preview-icon`"
                            />
                            <feather-icon
                                v-if="paramsGrid.edit.available"
                                :id="`invoice-row-${data.item.id}-preview-icon`"
                                icon="PenToolIcon"
                                size="16"
                                class="mx-1"
                                @click="editElement(data.item)"
                            />
                            <b-tooltip
                                title="Editar"
                                :target="`invoice-row-${data.item.id}-preview-icon`"
                            />
                            <feather-icon
                                v-if="paramsGrid.delete.available"
                                :id="`invoice-row-${data.item.id}-delete-icon`"
                                icon="Trash2Icon"
                                size="16"
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
        <b-row v-if="paramsGrid.pagination">
            <b-col sm="3">
                <b-form-group
                    label-cols="4"
                    label-cols-md="4"
                    label-size="md"
                    label="Entradas:"
                    label-for="input-md"
                >
                    <b-form-select
                        v-model="showEntrie"
                        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                        label="title"
                        @change="changeSizePage"
                        :options="entries"
                    />
                </b-form-group>
            </b-col>
            <b-col sm="3" class="mt-75" style="font-size: 12px">
                <span>{{ totalElements }} Registros en total</span>
            </b-col>
            <b-col sm="6" style="text-align: right">
                <b-pagination
                    v-model="currentPage"
                    :per-page="showEntrie"
                    v-on:change="cambioPagina"
                    :total-rows="totalElements"
                    :align="'right'"
                />
            </b-col>
        </b-row>
        <slot></slot>
    </div>
</template>

<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}
.invoice-filter-select {
    min-width: 190px;
    ::v-deep .vs__selected-options {
        flex-wrap: nowrap;
    }
    ::v-deep .vs__selected {
        width: 100px;
    }
}
</style>
<style lang="scss">
    @import "@core/scss/vue/libs/vue-select.scss";
</style>
