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
import moment from "moment";

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
            documentosReferencia:[],
            tipos:generalData.plantilla.tipos,
            bancos: generalData.contabilidad.bancos,
            filtros:generalData.plantilla.filtros,
            medio_pagos:generalData.plantilla.medio_pago,
            cod_efecto:generalData.plantilla.cod_efecto,
            fecha_actual:moment().format('yyyy-MM-DD'),
            otro: {              
                lib_fecha_registro: moment().format("yyyy-MM-DD"),
                per_id:1,
                emp_id:1,
                componente_id:null,
                lib_tipo:"OP",
                lib_moneda:"PEN",
                lib_modulo:"MB",
                detalle_operacion:[],
                detalle_hijo:[],
                lib_glosa: "",
                lib_tc: 1,
                lib_diferencia: parseFloat(0).toFixed(2),
                lib_total_debe: parseFloat(0).toFixed(2),
                lib_total_haber: parseFloat(0).toFixed(2),
                lib_total_debe_cambio: parseFloat(0).toFixed(2),
                lib_total_haber_cambio: parseFloat(0).toFixed(2),
            },            
            fieldsDetalle: [
                { key: "det_id_cta", label: "CtaContable", sortable: false },
                { key: "det_id_cta", label: "CtaContable", sortable: false },
                { key: "det_banco", label: "Banco", sortable: false },
                { key: "det_nro_cta_banco", label: "Nro Cta", sortable: false },
                { key: "det_pago", label: "MP Sunat", sortable: false },
                { key: "det_nro_doc", label: "Nro Doc", sortable: false },
                { key: "det_debe", label: "Monto D", sortable: false },
                { key: "det_haber", label: "Monto H", sortable: false },
                { key: "det_codigo_efecto", label: "Flujo Efecto", sortable: false },                            
            ],          
            monedas: generalData.contabilidad.monedas,
            ctasContables: [],            
            index: 0,
            consulta:false,
            fields_destinos:[
                { key: "dest_origin", label: "Origen", sortable: false },
                { key: "libd_nro_cta", label: "Destino", sortable: false },
                { key: "libd_desc", label: "Descripcion", sortable: false },
                { key: "libd_debe", label: "Debe", sortable: false },
                { key: "libd_haber", label: "haber", sortable: false },                 
            ],
        };
    },
    mounted() {
        this.getConfiguraciones();
    },
    methods: {
        rowClass(item, type) {
            if (!item || type !== 'row') { return }
            // eslint-disable-next-line consistent-return
            if (item.status === 'primary') { return 'table-primary' }
            // eslint-disable-next-line consistent-return
            if (item.status === 'secondary') { return 'table-secondary' }
            // eslint-disable-next-line consistent-return
            if (item.status === 'success') { return 'table-success' }
            // eslint-disable-next-line consistent-return
            if (item.status === 'danger') { return 'table-danger' }
            // eslint-disable-next-line consistent-return
            if (item.status === 'warning') { return 'table-warning' }
            // eslint-disable-next-line consistent-return
            if (item.status === 'info') { return 'table-info' }
        },              
        async getConfiguraciones() {            
            let request = {
                url: "/api/cctacontable/all/1/1",
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
            

            let request3= {
                url:"/api/pago_cobro/otro/"+this.$route.params.id,
                method:"GET",
            }
            var respRoles = await store.dispatch('back/EXECUTE',request3)
            console.log("respRoles",respRoles)
            this.otro.lib_fecha_registro=respRoles.lib_fecha_registro,
            this.otro.lib_tc=respRoles.detalle_libro[0].libd_tipo_cambio;
            if(this.otro.lib_tc>1){
                this.otro.lib_moneda="USD"
            };
            this.otro.lib_glosa=respRoles.lib_glosa;
            respRoles.detalle_libro.forEach(e => {
                if(e.Detalle_Operacion!=null){
                    this.otro.detalle_operacion.push({
                        det_nro_cta:e.libd_nro_cta,
                        det_banco:e.Detalle_Operacion.det_banco,
                        det_nro_doc:e.Detalle_Operacion.det_nro_doc,
                        det_anexo:e.libd_anexo,
                        det_codigo_efecto:e.Detalle_Operacion.det_codigo_efecto,
                        det_haber:parseFloat(e.libd_haber).toFixed(2),
                        det_debe:parseFloat(e.libd_debe).toFixed(2),
                        det_id_cta:e.libd_id_cta,
                        det_descripcion:e.libd_descripcion,
                        det_nro_cta_banco:e.Detalle_Operacion.det_nro_cta,
                        det_debe_haber:e.libd_dh,
                        det_pago:e.Detalle_Operacion.det_pago,
                        det_pago_desc:this.medio_pagos.find((mp) => mp.value ==e.Detalle_Operacion.det_pago).text,
                    })
                }              
            });
            this.destinosAll();
            this.sumaTotal();
        },
        getMoneda(){
            if(this.otro.lib_moneda=="USD"){
                if (!this.consulta) {
                    axios
                        .post(API_PERU_URL + "tipo_de_cambio?fecha=" + this.otro.lib_fecha_registro + "&&api_token=" + API_PERU_TOKEN)
                        .then((result) => {
                        if (result.data.success) {
                            this.otro.lib_tc = result.data.data.compra;                                  
                            this.consulta = true;
                            this.sumaTotal();                                        
                        } else {
                            this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger");
                            this.tc = "";
                        }
                    });
                };
            }else{
                this.otro.lib_tc =1;
                this.consulta = true;  
            }
            
        },      
        changeCtaContable(item,e) {
            if(e!=null){
                let cta = this.cuentas.find((cta) => cta.id == item.det_id_cta),c=0;            
                for(let i=0;i<this.otro.detalle_operacion.length;i++){           
                    if(this.otro.detalle_operacion[i].det_id_cta == item.det_id_cta){
                        c++;
                    }
                }
                if(c>1){
                    this.sendMessage('La cuenta contable ya fue seleccionada',"AlertTriangleIcon","danger")
                    item.det_id_cta=null;
                    item.det_descripcion =null;
                    item.det_nro_cta =null;
                    item.det_anexo=null;
                    item.det_banco=null;
                }else{
                    if (cta) {
                        item.det_descripcion = cta.plc_descripcion;
                        item.det_nro_cta = cta.plc_codigo;
                        item.det_anexo = cta.plc_anexo;
                    } else {
                        item.det_descripcion = "";
                    }
                }
            }else{
                item.det_id_cta=null;
                item.det_descripcion =null;
                item.det_nro_cta =null;
                item.det_anexo=null;
                item.det_banco=null;
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
            this.$delete(this.otro.detalle_operacion,row.index);
            this.sumaTotal();
        },
        agregarElemento() {
            this.otro.detalle_operacion.push({
                det_nro_cta:null,
                det_banco:null,
                det_nro_doc:"",
                det_anexo:null,
                det_codigo_efecto:null,
                det_haber:0,
                det_debe:0,
                det_id_cta:null,
                det_descripcion:null,
                det_nro_cta_banco:null,
                det_debe_haber:null,
                det_pago:null,
                det_pago_desc:"",                     
            });     
        },
        validationForm() {
            this.$refs.validateotro.validate().then((success) => {
                if (success) {
                    if(this.otro.detalle_operacion.length==0){
                        this.sendMessage("Añada una fila a la tabla detalle","AlertTriangleIcon","danger");
                        return false;
                    }
                    for(let i=0; i<this.otro.detalle_operacion.length; i++){
                        if(this.otro.detalle_operacion[i].det_id_cta == null || this.otro.detalle_operacion[i].det_descripcion== "" || 
                            this.otro.detalle_operacion[i].det_haber === "" || this.otro.detalle_operacion[i].det_debe === "" ||
                            this.otro.detalle_operacion[i].det_codigo_efecto == null || this.otro.detalle_operacion[i].det_pago== ""){                             
                            this.sendMessage("Complete todos los datos requeridos en la tabla detalle","AlertTriangleIcon","danger");
                            return false;
                        }
                        if(this.otro.detalle_operacion[i].det_debe_haber == "D"){
                            if(this.otro.detalle_operacion[i].det_debe == 0){
                                this.sendMessage("El MONTO D debe ser mayor a 0 en cada una de las filas de la tabla detalle","AlertTriangleIcon","danger");
                                return false;
                            }
                        }else{
                            if(this.otro.detalle_operacion[i].det_haber == 0){
                                this.sendMessage("El MONTO H debe ser mayor a 0 en cada una de las filas de la tabla detalle","AlertTriangleIcon","danger");
                                return false;
                            }
                        }
                    }
                    if(this.otro.lib_total_debe!=this.otro.lib_total_haber){
                        this.sendMessage("En la tabla detalle la suma de los MONTO D y MONTO H deben ser iguales","AlertTriangleIcon","danger");
                        return false;
                    }                 
                    this.saveOtro();
                }
            });
        },        
        Cancelar() {
            this.$router.push({ name: "caja-otro-index" });
        },
        async saveOtro() {
            let request = {
                url: "/api/pago_cobro/otro/",
                method: "POST",
                data: this.otro,
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                if (respRoles.status == 200) {
                    this.sendMessage("Otro Procesos registrada satisfactoriamente",'EditIcon',"success");
                    this.$router.push({ name: "caja-otro-index" });
                } else if (respRoles.status == 500) {
                    this.sendMessage("Error de servidor","AlertTriangleIcon","danger");
                } else {
                    this.sendMessage(respRoles.message,"AlertTriangleIcon","danger")
                }
                console.log("respuesta",respRoles);
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
        onlyNumbers(e){
            if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 46) {
                return true;
            } else {
                e.preventDefault();
            }
        },
        changePago(item,index,e){
            if(e!=null){
                this.otro.detalle_operacion[index].det_pago_desc=this.medio_pagos.find((mp) => mp.value == item.det_pago).text;
            }else{
                this.otro.detalle_operacion[index].det_pago_desc="";
            }
        },
        async destinosAll(){
            this.otro.detalle_hijo=[];
            for(let i=0;i<this.otro.detalle_operacion.length;i++){
                
                if(this.otro.detalle_operacion[i].det_id_cta!=null){
                    var valor=0.00;
                    let request = {
                        url: "/api/cctacontable/" + this.otro.detalle_operacion[i].det_id_cta,
                        method: "GET",
                    };
                    var resp = await store.dispatch("back/EXECUTE", request);

                    if(this.otro.detalle_operacion[i].det_debe_haber=='H'){
                        valor=this.otro.detalle_operacion[i].det_haber;
                    }else{
                        valor=this.otro.detalle_operacion[i].det_debe;
                    }

                    resp.destino.forEach(element => {
                        this.otro.detalle_hijo.push({
                            libd_id_padre: this.otro.detalle_operacion[i].det_id_cta,
                            dest_origin: this.otro.detalle_operacion[i].det_nro_cta,
                            libd_nro_cta:element.dest_cod_dest,                        
                            libd_debe: ((parseFloat(element.dest_porcentaje_debe).toFixed(2)*parseFloat(valor).toFixed(2))/100).toFixed(2),
                            libd_haber: ((parseFloat(element.dest_porcentaje_haber).toFixed(2)*parseFloat(valor).toFixed(2))/100).toFixed(2),
                            libd_debe_cambio: ((((parseFloat(element.dest_porcentaje_debe).toFixed(2)*parseFloat(valor).toFixed(2))/100).toFixed(2))*parseFloat(this.otro.lib_tc).toFixed(2)).toFixed(2),
                            libd_haber_cambio: ((((parseFloat(element.dest_porcentaje_haber).toFixed(2)*parseFloat(valor).toFixed(2))/100).toFixed(2))*parseFloat(this.otro.lib_tc).toFixed(2)).toFixed(2),
                            libd_desc: this.cuentas.find((clas) => clas.id == element.dest_id).plc_descripcion,
                            libd_id_cta:element.dest_id,
                            libd_anexo:"NINGUNO",
                            libd_kardex: null,
                            movimiento_kardex: null,
                            libd_dh: null,
                        });
                    });                
                }                            
            }
        },
        sumaTotal(){
            var sumaDebe=0.00,sumaHaber=0.00,debe=0.00,haber=0.00;
            for(let i=0;i<this.otro.detalle_operacion.length;i++){
                if(this.otro.detalle_operacion[i].det_debe==""){
                    debe=parseFloat(0);
                }else{
                    debe=parseFloat(this.otro.detalle_operacion[i].det_debe);
                }
                if(this.otro.detalle_operacion[i].det_haber==""){
                    haber=parseFloat(0);
                }else{
                    haber=parseFloat(this.otro.detalle_operacion[i].det_haber);
                }
                sumaDebe=sumaDebe+parseFloat(debe);
                sumaHaber=sumaHaber+parseFloat(haber);
            }
            this.otro.lib_total_debe=parseFloat(sumaDebe).toFixed(2);
            this.otro.lib_total_haber=parseFloat(sumaHaber).toFixed(2);
            this.otro.lib_total_debe_cambio=parseFloat(parseFloat(sumaDebe)*parseFloat(this.otro.lib_tc)).toFixed(2);
            this.otro.lib_total_haber_cambio=parseFloat(parseFloat(sumaHaber)*parseFloat(this.otro.lib_tc)).toFixed(2);
            this.otro.lib_diferencia=Math.abs(parseFloat(parseFloat(sumaDebe)-parseFloat(sumaHaber))).toFixed(2);
            this.destinosAll();
        },    
    },
};
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="validateotro">
                <b-form>                   
                    <b-row>
                        <b-col sm="2">
                            <b-form-group label="F. de Cancelación: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="F. de Cancelación"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-datepicker
                                            id="datepicker-dateformat1"
                                            v-model="otro.lib_fecha_registro"
                                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                            locale="es"
                                            :max="fecha_actual"
                                            @input="consulta=false,getMoneda()"
                                            :disabled="true"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="TC: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="TC"
                                    rules="required"
                                > 
                                <b-input-group>
                                    <b-form-input 
                                        v-model= "otro.lib_tc"
                                        :readonly="true"
                                    />
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider> 
                            </b-form-group>
                        </b-col>                      
                        <b-col sm="2">
                            <b-form-group label="Moneda: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Moneda"
                                    rules="required"
                                >                                 
                                    <b-input-group>
                                        <b-form-input 
                                            v-model= "otro.lib_moneda"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                <small class="text-danger">{{errors[0]}}</small>
                                </validation-provider>
                            </b-form-group>        
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Destino: ">
                                <b-input-group>
                                    <b-button
                                        size="21"
                                        style="width: 100%"
                                        class="btn"
                                        @click="destinosAll(),$refs['modalDestinos'].show()"
                                    >
                                        Ver
                                    </b-button>
                                    
                                </b-input-group>
                            </b-form-group>
                        </b-col>                                    
                        <b-col sm="4">
                            <b-form-group label="Glosa: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Glosa"
                                    rules="required"
                                > 
                                <b-input-group>
                                    <b-form-input 
                                        v-model= "otro.lib_glosa"
                                        :readonly="true"
                                    />
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider> 
                            </b-form-group>
                        </b-col>             
                    </b-row>
                </b-form>
            </validation-observer>
            <b-row>
                <b-col sm="12">
                    <b-table
                        responsive
                        :items="otro.detalle_operacion"
                        :fields="fieldsDetalle"
                    >                        
                        <template
                            v-slot:cell(det_pago)="{
                                item
                            }"
                        >
                            <div style="width: 250px">
                                {{item.det_pago+' - '+item.det_pago_desc}}
                            </div>
                        </template>
                        <template
                            v-slot:cell(det_codigo_efecto)="{
                                item,
                            }"
                        >    
                            <div style="width: 400px">
                                {{item.det_codigo_efecto+' - '+cod_efecto.find((ce) => ce.value == item.det_codigo_efecto).text}}
                            </div>                 
                        </template>                     
                        <template
                            v-slot:cell(det_id_cta)="{
                                item
                            }"
                        >
                            <div style="width: 250px">
                                {{item.det_nro_cta+' - '+item.det_descripcion}}
                            </div>                                                   
                        </template>
                        <template
                            v-slot:cell(det_banco)="{
                                item
                            }"
                        >   
                            <div style="width: 250px">
                                {{item.det_banco!=null?item.det_banco+' - '+bancos.find((ce) => ce.value == item.det_banco).text:'SIN BANCO ASOCIADO'}}
                            </div>                
                        </template>                      
                    </b-table>                        
                </b-col>
            </b-row>           
            <b-row class="pt-1 justify-content-center">
                <b-col sm="2">                    
                    <b-form-group label="Total Debe">
                        <b-form-input
                            v-model="otro.lib_total_haber"          
                            size="21"
                            style="width: 100%;"
                            :readonly="true"                  
                        />
                    </b-form-group>                 
                </b-col>              
                <b-col sm="2">
                    <b-form-group label="Total Haber">
                        <b-form-input
                            v-model="otro.lib_total_debe"          
                            size="21"
                            style="width: 100%;"
                            :readonly="true"                  
                        />
                    </b-form-group>
                </b-col>              
                <b-col sm="2">
                    <b-form-group label="Diferencia: ">
                        <b-form-input
                            v-model="otro.lib_diferencia"                 
                            size="21"
                            style="width: 100%;"
                            v-bind:style="otro.lib_diferencia == 0.00 ? 'backgroundColor:#d1e7dd' : 'backgroundColor:#f8d7da'"
                            :readonly="true"
                            type="number"
                            />
                    </b-form-group>
                </b-col>              
            </b-row>
            <b-row>
                <b-col md="12" class="text-center mt-1" style="">                   
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="ml-1"
                        @click="Cancelar()"
                    >
                        Regresar
                    </b-button>
                </b-col>
            </b-row>            
        </b-card>
        <b-modal
            id="modalDestinos"
            ref="modalDestinos"
            centered
            title="Lista de Destinos"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>       
                <b-row>
                    <b-col sm="12">
                        <b-table
                            striped
                            responsive
                            show-empty
                            empty-text="No matching records found"
                            :items="otro.detalle_hijo"
                            :fields="fields_destinos"                   
                        >
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
