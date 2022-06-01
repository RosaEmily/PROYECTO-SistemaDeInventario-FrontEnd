<script>
/* eslint-disable */
import Vue from "vue";
import store from "@/store/index";
import VueSweetalert2 from "vue-sweetalert2";
import { BootstrapVue, BFormSelect, BIconNutFill } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import axios from "axios";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import generalData from "@fakedata";
import vSelect from "vue-select";
vSelect.props.components.default = () => ({
    Deselect: {
        render: (h) =>
            h("feather-icon", { props: { size: "14", icon: "XIcon" } }),
    },
    OpenIndicator: {
        render: (h) =>
            h("feather-icon", {
                props: { size: "15", icon: "ChevronDownIcon" },
                class: "open-indicator",
            }),
    },
});
Vue.use(VueSweetalert2);
Vue.component("v-select", vSelect);
Vue.use(BootstrapVue);
const API_PERU_URL = process.env.VUE_APP_API_PERU_URL;
const API_PERU_TOKEN = process.env.VUE_APP_API_PERU_TOKEN;
export default {
    props: ["paramsGrid"],
    components: {
        BFormSelect,
        ValidationProvider,
        ValidationObserver,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            cuentas: [],
            nroCuentas:[],
            tipo:"1",
            tipos:generalData.plantilla.tipos,
            bancos: generalData.contabilidad.bancos,
            filtros:generalData.plantilla.filtros,
            medio_pagos:generalData.plantilla.medio_pago,
            cod_efecto:generalData.plantilla.cod_efecto,  
            plantilla: {              
                emp_id: 1,
                pl_nombre: "",
                pl_glosa: "",
                pl_modulo: "MD",
                pl_moneda:null,                
                detalle_plantilla: [
                    {
                        det_id_cta: null,
                        det_debe_haber: null,
                        det_descripcion: "",
                        det_nro_cta_banco:null,
                        det_pago:null,
                        det_codigo_efecto:null,
                        det_banco:null,
                        det_nro_cta:null,                       
                    }
                ],
            },
            monedas: generalData.contabilidad.monedas,
            debehaber: generalData.plantilla.debehaber,
            ctasContables: [],           
            fields2: [
                { key: "det_banco", label: "Banco", sortable: false },
                { key: "det_id_cta", label: "Cta Contable", sortable: false },
                { key: "det_descripcion", label: "Descripción", sortable: false },
                { key: "det_debe_haber", label: "D/H", sortable: false },
                { key: "det_nro_cta_banco", label: "Nro Cuenta", sortable: false },  
                { key: "det_codigo_efecto", label: "Cod. Efect", sortable: false },
                { key: "det_pago", label: "Medio Pago", sortable: false },            
                {
                    key: "actions",
                    label: "Acciones",
                    tdClass: "text-center",
                    thClass: "text-center",
                    sortable: false,
                },
            ],
            paramsGridNroCuenta: {
                selectOptions: {
                    allowSelect: true,
                    selectMode: "single",
                },
                fields: [
                    { key: "row", label: "", sortable: false },
                    { key: "cb_nro_cuenta", label: "Nro Cuenta", sortable: false },
                    { key: "cb_desc_banco", label: "Banco", sortable: false },
                    { key: "cb_moneda", label: "Moneda", sortable: false },                                    
                ],                             
                options: {
                    responsive: true,
                    primaryKey: "id",
                },                  
            },
            index: 0,
            nro_cuenta: "",
        };
    },
    mounted() {
        this.getConfiguraciones();
    },
    methods: {     
        changeValue(e, index) {
            this.ctasContables[index].det_id_cta = e;
        },
        async getConfiguraciones() {
            let request = {
                url: "/api/cctacontable/1/1",
                method: "GET",
            };
            var resp = await store.dispatch("back/EXECUTE", request);
            this.cuentas = resp.rows;

            let request2 = {
                url: "/api/cuenta_bancaria",
                method: "GET",
            };
            var resp2 = await store.dispatch("back/EXECUTE", request2);
            this.nroCuentas = resp2.rows;

        },
        changeCtaContable(item) {
            let cta = this.cuentas.find((cta) => cta.id == item.det_id_cta),c=0;            
            for(let i=0;i<this.plantilla.detalle_plantilla.length;i++){           
                if(this.plantilla.detalle_plantilla[i].det_id_cta == item.det_id_cta){
                    c++;
                }
            }
            if(c>1){
                this.sendMessage('La cuenta contable ya fue seleccionada',"AlertTriangleIcon","danger")
                item.det_id_cta=null;
                item.det_descripcion =null;
            }else{
                if (cta) {
                    item.det_descripcion = cta.plc_descripcion;
                    item.det_nro_cta = cta.plc_codigo;
                } else {
                    item.det_descripcion = "";
                }
            }                
        },
        deleteItem(row) {
            /*this.plantilla.detalle_plantilla =
                this.plantilla.detalle_plantilla.filter(function (item) {
                    return item.det_nro_cta !== row.item.det_nro_cta;
                });

            this.ctasContables = this.ctasContables.filter(function (item) {
                return item.det_nro_cta !== row.item.det_nro_cta;
            });
            console.log("this.ctasContables", this.ctasContables);*/
            this.$delete(this.plantilla.detalle_plantilla,row.index);
        },
        agregarElemento() {
            /*let itemsNull = this.plantilla.detalle_plantilla.filter(function (
                item
            ) {
                return item.det_nomb_cta == null;
            });
            if (itemsNull.length == 0) {                
                this.plantilla.detalle_plantilla.push({
                    det_id_cta: null,
                    det_debe_haber: "D",
                    det_descripcion: "",
                    det_nro_cta_banco:null,
                    det_moneda:null,
                    det_pago:null,
                    det_codigo_efecto:null,                        
                });               
                this.ctasContables.push({ det_id_cta: null, ctas: [] });
            }*/

            this.plantilla.detalle_plantilla.push({
                det_id_cta: null,
                det_debe_haber: null,
                det_descripcion: "",
                det_nro_cta_banco:null,
                det_pago:null,
                det_codigo_efecto:null,
                det_banco:null,
                det_nro_cta:null,                      
            });     
        },
        validationForm() {
            this.$refs.simpleRules.validate().then((success) => {
                if (success) {
                    if (this.plantilla.detalle_plantilla.length > 0){               
                        for(let i=0; i<this.plantilla.detalle_plantilla.length; i++){
                            if(this.plantilla.detalle_plantilla[i].det_id_cta == null || this.plantilla.detalle_plantilla[i].det_debe_haber == null 
                            || this.plantilla.detalle_plantilla[i].det_nro_cta_banco == null || this.plantilla.detalle_plantilla[i].det_codigo_efecto == null
                            || this.plantilla.detalle_plantilla[i].det_banco == null || this.plantilla.detalle_plantilla[i].det_pago == null){
                                this.sendMessage("Complete todos los datos requeridos en la tabla detalle de su plantilla","AlertTriangleIcon","danger");
                                return false;
                            }
                        }                                         
                        this.Guardar();
                    }else{
                        this.sendMessage(
                            "Por favor ingrese un detalle a su plantilla",
                            "error",
                            "error"
                        );
                    }
                }
            });
        },       
        Guardar() {
            console.log(this.plantilla);
            this.savePlantilla();
        },
        Cancelar() {
            this.$router.push({ name: "diario-plantilla" });
        },
        async savePlantilla() {
            let request = {
                url: "/api/plantillaDiario",
                method: "POST",
                data: this.plantilla,
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                console.log(respRoles);
                console.log(this.plantilla);
                if (respRoles.status == 200) {
                    this.sendMessage("Plantilla registrada satisfactoriamente",'EditIcon',"success");
                    this.$router.push({ name: "diario-plantilla" });
                } else if (respRoles.status == 500) {
                    this.sendMessage("Error de servidor","AlertTriangleIcon","danger");
                } else {
                    this.sendMessage(respRoles.message,"AlertTriangleIcon","danger")
                }
            } catch (e) {
                console.log(e.message);
            }
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
        showModal(index,item) {
            if(item.det_nro_cta_banco!=null){
                this.nro_cuenta=item.det_nro_cta_banco;
            }else{
                this.nro_cuenta='';
            }            
            this.index = index;
            this.$refs['modalNroCuenta'].show()
        },
        hideNroCuenta(){
            if(this.nro_cuenta!=false){
                this.plantilla.detalle_plantilla[this.index].det_nro_cta_banco=this.nro_cuenta;
            }else{
                this.plantilla.detalle_plantilla[this.index].det_nro_cta_banco=null;
            }
            //this.$refs['modalNroCuenta'].hide()
        }
    },
};
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="simpleRules">
                <b-form class="ml-1 mr-1 mt-1">                   
                    <b-row class="">
                        <b-col sm="6">
                            <b-form-group label="Nombre: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Nombre"
                                    rules="required"
                                >
                                    <b-form-input
                                        v-model="plantilla.pl_nombre"
                                        placeholder="Nombre"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Glosa: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Glosa"
                                    rules="required"
                                >
                                    <b-form-input
                                        v-model="plantilla.pl_glosa"
                                        placeholder="Glosa"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>              
                        <b-col sm="6">
                            <b-form-group label="Moneda: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Moneda"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-select
                                            v-model="plantilla.pl_moneda"
                                            class="form-control"
                                            :options="monedas"                                        
                                        />
                                    </b-input-group>
                                <small class="text-danger">{{errors[0]}}</small>
                                </validation-provider>
                            </b-form-group>                
                        </b-col>
                        <b-col md="12" class="text-right mb-1">
                            <b-button
                                variant="primary"
                                @click="agregarElemento"
                            >
                                Agregar Elemento
                            </b-button>
                        </b-col>                     
                        <b-col sm="12" >
                            <b-table
                                striped
                                responsive
                                select-mode="range"
                                :items="plantilla.detalle_plantilla"
                                :fields="fields2"
                            >
                                <template
                                    v-slot:cell(det_pago)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <v-select
                                        v-model="item[key]"
                                        label="value"
                                        :reduce="(medio_pagos) => medio_pagos.value"
                                        :options="medio_pagos"
                                    >
                                        <template
                                            v-slot:selected-option="option"
                                        >
                                            {{ option.value }}
                                        </template>
                                        <template v-slot:option="option">
                                            {{ option.value }} -
                                            {{ option.text }}
                                        </template>
                                    </v-select>
                                </template>
                                <template
                                    v-slot:cell(det_banco)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <b-form-select
                                        v-model="item[key]"
                                        style="min-width: 250px;"
                                        :options="bancos"
                                    />
                                </template>   
                                <template
                                    v-slot:cell(det_descripcion)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <b-input
                                        v-model="item[key]"
                                        size="21"
                                        style="min-width: 200px;"
                                    />
                                </template>
                                <template
                                    v-slot:cell(det_id_cta)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <v-select
                                        v-model="item[key]"
                                        label="plc_codigo"
                                        :reduce="(cuentas) => cuentas.id"
                                        :options="cuentas"
                                        @input="changeCtaContable(item)"
                                    >
                                        <template
                                            v-slot:selected-option="option"
                                        >
                                            {{ option.plc_codigo }}
                                        </template>
                                        <template v-slot:option="option">
                                            {{ option.plc_codigo }} -
                                            {{ option.plc_descripcion }}
                                        </template>
                                    </v-select>
                                </template>
                                <template
                                    v-slot:cell(det_nro_cta_banco)="{
                                        item,
                                        field: { key },index
                                    }"
                                >
                                    <b-input-group 
                                        style="flex-wrap: nowrap;"                                 
                                    >
                                        <b-form-input
                                            v-model="item[key]"
                                            size="21"
                                            style="min-width: 150px"
                                        />
                                        <b-input-group-append
                                        >
                                            <b-button
                                                size="21"
                                                class="btn-icon"
                                                style="display: block;"
                                                @click="showModal(index,item)"
                                            >
                                                <feather-icon icon="SearchIcon"/>
                                            </b-button>
                                        </b-input-group-append>
                                    </b-input-group>                                    
                                </template>
                                <template
                                    v-slot:cell(det_debe_haber)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <b-form-select
                                        v-model="item[key]"
                                        style="min-width: 80px"
                                        :options="debehaber"
                                    />
                                </template>
                                <template
                                    v-slot:cell(det_codigo_efecto)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <v-select
                                        v-model="item[key]"
                                        label="value"
                                        :reduce="(cod_efecto) => cod_efecto.value"
                                        :options="cod_efecto"
                                    >
                                        <template
                                            v-slot:selected-option="option"
                                        >
                                            {{ option.value }}
                                        </template>
                                        <template v-slot:option="option">
                                            {{ option.value }} -
                                            {{ option.text }}
                                        </template>
                                    </v-select>
                                </template>                                                                 
                                <template #cell(actions)="row">
                                    <b-button
                                        size="sm"
                                        class="btn-danger mr-1"
                                        @click="deleteItem(row)"
                                    >
                                        <feather-icon icon="TrashIcon" />
                                    </b-button>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                </b-form>
            </validation-observer>
            <b-row>
                <b-col md="12" class="text-center mt-1" style="">
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="mr-1"
                        @click.prevent="validationForm"
                    >
                        Guardar
                    </b-button>
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="danger"
                        class="ml-1"
                        @click="Cancelar()"
                    >
                        Cancelar
                    </b-button>
                </b-col>
            </b-row>
        </b-card>
        <b-modal
            id="modalNroCuenta"
            ref="modalNroCuenta"
            centered
            title="Lista de Cuenta Bancaria"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>       
                <b-row>
                    <b-col sm="12">
                        <b-table
                            show-empty
                            selectable
                            :select-mode="'single'"                                                        
                            empty-text="No matching records found"
                            :items="nroCuentas"
                            :fields="paramsGridNroCuenta.fields"
                        >
                            <template #cell(row)="data">
                                <div style="width: 0px !important">                                    
                                    <b-form-checkbox
                                        v-model="nro_cuenta"
                                        :value="data.item.cb_nro_cuenta"
                                        :id="data.item.cb_nro_cuenta"
                                        @change="hideNroCuenta()"
                                    ></b-form-checkbox>                                    
                                </div>
                            </template>                                                           
                            <template #cell()="data">
                                <span>{{ data.value }}</span>
                            </template>
                        </b-table>                         
                    </b-col>                   
                </b-row>
            </b-card-text>      
        </b-modal>   
    </div>
</template>

<style lang="scss">
    @import "~@core/scss/vue/libs/vue-select.scss";
</style>
