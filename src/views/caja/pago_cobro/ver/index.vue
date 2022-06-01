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
            pago_cobro: {              
                pc_fecha_cancelacion: moment().format("yyyy-MM-DD"),
                pc_opcion: "1",
                desc_opcion: "",
                per_id:1,
                emp_id:1,
                componente_id:null,
                pc_tipo:"",
                pc_moneda:"PEN",
                pc_doi: "",
                pc_modulo:"MB",
                pc_razon_social: "",
                documentos: [],
                detalle_operacion:[],
                detalle_calculo:[],
                diferencia:{},
                pc_monto_total_dolar: 0.00,
                pc_monto_total_soles: 0.00,
                pc_monto_total_pago: 0.00,
                pc_monto_total_pago_Sindolar:0.00,
                pc_pago_total:0.00,
                pc_diferencia: 0.00,
                pc_diferencia_tc:0.00,
                pc_glosa: "",
            },
            fieldsPago: [
                { key: "libd_nro_cta", label: "Plan Cta", sortable: false },
                { key: "ca_fecha_registro", label: "F.E", sortable: false },
                { key: "pa_fecha_vencimiento", label: "F.V", sortable: false },
                { key: "ca_tipo_doc", label: "Doc. Tipo", sortable: false },
                { key: "ca_serie", label: "Serie", sortable: false }, 
                { key: "ca_correlativo", label: "Nro", sortable: false }, 
                { key: "ca_doi", label: "RUC", sortable: false },
                { key: "ca_razon_social", label: "RAZON SOCIAL", sortable: false },               
                { key: "ca_moneda", label: "MON", sortable: false },               
                { key: "ca_tipo_cambio", label: "TC", sortable: false },
                { key: "detraccion", label: "Detrac", sortable: false },
                { key: "importe", label: "Importe", sortable: false },
                { key: "saldo", label: "Saldo", sortable: false },
                { key: "pago", label: "Pago", sortable: false },  
            ],
            fieldsCobro: [
                { key: "libd_nro_cta", label: "Plan Cta", sortable: false },
                { key: "ca_fecha_registro", label: "F.E", sortable: false },
                { key: "pa_fecha_vencimiento", label: "F.V", sortable: false },
                { key: "ca_tipo_doc", label: "Doc. Tipo", sortable: false },
                { key: "ca_serie", label: "Serie", sortable: false }, 
                { key: "ca_correlativo", label: "Nro", sortable: false }, 
                { key: "ca_doi", label: "RUC", sortable: false },
                { key: "ca_razon_social", label: "RAZON SOCIAL", sortable: false },               
                { key: "ca_moneda", label: "MON", sortable: false },               
                { key: "ca_tipo_cambio", label: "TC", sortable: false },
                { key: "detraccion", label: "Detrac", sortable: false },
                { key: "importe", label: "Importe", sortable: false },
                { key: "saldo", label: "Saldo", sortable: false },
                { key: "pago", label: "Cobro", sortable: false },  
            ],
            fieldsDetalle: [
                { key: "det_pago", label: "Medio pago Sunat", sortable: false },
                { key: "det_id_cta", label: "CtaContable", sortable: false },
                { key: "det_moneda", label: "Mon", sortable: false },
                { key: "det_banco", label: "Banco", sortable: false },
                { key: "det_nro_doc", label: "Nro Doc", sortable: false }, 
                { key: "det_codigo_efecto", label: "Flujo Efecto", sortable: false },
                { key: "det_monto", label: "MONto", sortable: false },               
                { key: "det_tc", label: "TC", sortable: false },                          
            ],
            fieldsDetalleCalculo: [
                { key: "det_ident", label: "IDENTIFICACION", sortable: false },
                { key: "det_moneda", label: "Moneda", sortable: false },
                { key: "det_debe", label: "DEBE O", sortable: false },
                { key: "det_haber", label: "HABER O", sortable: false },
                { key: "det_tc", label: "TC", sortable: false },
                { key: "det_debe_mn", label: "DEBE MN", sortable: false }, 
                { key: "det_haber_mn", label: "HABER MN", sortable: false }, 
            ],
            monedas: generalData.contabilidad.monedas,
            debehaber: generalData.plantilla.debehaber,
            ctasContables: [],            
            index: 0,
            supliers: [],
            tc:0,
            titulo:"cobrar",
            consulta:false,
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
        changeValue(e, index) {
            this.ctasContables[index].det_id_cta = e;
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
                url:"/api/pago_cobro/"+this.$route.params.id,
                method:"GET",
            }
            var respRoles = await store.dispatch('back/EXECUTE',request3)
            var monto_pago=[];
            console.log(respRoles)
            this.pago_cobro.pc_fecha_cancelacion = respRoles.accountResponseFind.lib_fecha_registro
            this.pago_cobro.pc_glosa = respRoles.accountResponseFind.lib_glosa
            this.pago_cobro.pc_moneda= respRoles.documentos[0].ca_moneda
            if(respRoles.accountResponseFind.cuota_pago.length>0){
                this.pago_cobro.pc_opcion = "2"
                this.pago_cobro.desc_opcion = "Por Pagar"
                monto_pago = respRoles.accountResponseFind.cuota_pago
                this.titulo="pagar"
            }else{
                this.pago_cobro.pc_opcion = "1"
                this.pago_cobro.desc_opcion = "Por Cobrar"
                monto_pago = respRoles.accountResponseFind.cuota_cobro
                this.titulo="cobrar"
            }
            
            this.pago_cobro.pc_doi='TODOS';                   
            this.pago_cobro.pc_razon_social='TODOS';
            this.documentosReferencia=respRoles.documentos
            
            for(let i=0; i<respRoles.documentos.length; i++){
                this.pago_cobro.documentos.push({
                    ca_correlativo: respRoles.documentos[i].ca_correlativo,
                    ca_created_at: moment(respRoles.documentos[i].ca_created_at).format("yyyy-MM-DD"),
                    ca_doi: respRoles.documentos[i].ca_doi,
                    ca_fecha_registro: moment(respRoles.documentos[i].ca_fecha_registro).format("yyyy-MM-DD"),
                    ca_moneda: respRoles.documentos[i].ca_moneda,
                    ca_razon_social: respRoles.documentos[i].ca_razon_social,
                    ca_serie: respRoles.documentos[i].ca_serie,
                    ca_tipo_cambio: parseFloat(respRoles.documentos[i].ca_tipo_cambio).toFixed(2),
                    ca_tipo_doc: respRoles.documentos[i].ca_tipo_doc,   
                    cut: respRoles.documentos[i].cut,
                    id: respRoles.documentos[i].id,
                    detraccion: parseFloat(respRoles.documentos[i].detraccion).toFixed(2),
                    importe: parseFloat(respRoles.documentos[i].importe).toFixed(2),
                    saldo: parseFloat(respRoles.documentos[i].saldo).toFixed(2),
                    identi: respRoles.documentos[i].identi,
                    libd_nro_cta: respRoles.documentos[i].libd_nro_cta,
                    monto_total: respRoles.documentos[i].monto_total,
                    identi: respRoles.documentos[i].identi,
                    pa_fecha_emision: moment(respRoles.documentos[i].pa_fecha_emision).format("yyyy-MM-DD"),
                    pa_fecha_vencimiento: moment(respRoles.documentos[i].pa_fecha_vencimiento).format("yyyy-MM-DD"),
                    pago:parseFloat(monto_pago[i].cuo_monto).toFixed(2),
                    id_detalle: respRoles.documentos[i].id_detalle,
                    libd_anexo: respRoles.documentos[i].libd_anexo,
                    libd_dh: respRoles.documentos[i].libd_dh,
                    libd_descripcion: respRoles.documentos[i].libd_descripcion,
                    libd_id_cta: respRoles.documentos[i].libd_id_cta,
                    id_pc: respRoles.documentos[i].id_pc,
                });               
            }
            var detalle_libro=respRoles.accountResponseFind.detalle_libro,det_moneda="PEN",det_monto=0.00;
            for(let i=0; i<detalle_libro.length; i++){
                det_moneda="PEN"
                if(parseFloat(detalle_libro[i].libd_tipo_cambio).toFixed(2)!=1.00){
                    det_moneda="USD"
                    this.tc=parseFloat(detalle_libro[i].libd_tipo_cambio).toFixed(2)
                }
                if(parseFloat(detalle_libro[i].libd_haber).toFixed(2)>0){
                    det_monto=parseFloat(detalle_libro[i].libd_haber).toFixed(2)
                }else{
                    det_monto=parseFloat(detalle_libro[i].libd_debe).toFixed(2)
                }
                if(detalle_libro[i].Detalle_Operacion!=null){
                    this.pago_cobro.detalle_operacion.push({
                        det_pago_desc:this.medio_pagos.find((mp) => mp.value == detalle_libro[i].Detalle_Operacion.det_pago).text,
                        det_nro_cta:detalle_libro[i].libd_nro_cta,
                        det_anexo:this.cuentas.find((cta) =>cta.id == detalle_libro[i].libd_id_cta).plc_anexo,
                        det_moneda:det_moneda,
                        det_banco:detalle_libro[i].Detalle_Operacion.det_banco,
                        det_pago:detalle_libro[i].Detalle_Operacion.det_pago,
                        det_nro_doc:detalle_libro[i].Detalle_Operacion.det_nro_doc,
                        det_codigo_efecto:detalle_libro[i].Detalle_Operacion.det_codigo_efecto,
                        det_monto:det_monto,
                        det_id_cta:detalle_libro[i].libd_id_cta,
                        det_descripcion:detalle_libro[i].libd_descripcion,                    
                        det_tc:parseFloat(detalle_libro[i].libd_tipo_cambio).toFixed(2),
                    })
                }                
            }
            this.sumaPago();
            this.sumaTotal();
            this.sumaTotalCalculo();
        },
        getMoneda(){
            if (!this.consulta) {
                axios
                    .post(API_PERU_URL + "tipo_de_cambio?fecha=" + this.pago_cobro.pc_fecha_cancelacion + "&&api_token=" + API_PERU_TOKEN)
                    .then((result) => {
                    if (result.data.success) {
                        this.tc = result.data.data.compra;
                        this.pago_cobro.detalle_operacion.forEach(e => {
                            var tc=1;
                            if(e.det_moneda!="PEN"){
                                tc=this.tc;
                            }                                                            
                            e.det_tc=parseFloat(tc).toFixed(2);
                        });                    
                        this.consulta = true;
                        this.sumaTotal();
                        var suma=0.00;
                        for(let i=0; i<this.pago_cobro.documentos.length; i++){
                            if(this.pago_cobro.documentos[i].pago==""){
                                suma=suma+parseFloat(0);
                            }else{
                                suma=suma+parseFloat(this.pago_cobro.documentos[i].pago);
                            }   
                        }
                    } else {
                        this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger");
                        this.tc = "";
                    }
                });
            };
        }, 
        changeCtaContable(item,e) {
            if(e!=null){
                let cta = this.cuentas.find((cta) => cta.id == item.det_id_cta),c=0;            
                for(let i=0;i<this.pago_cobro.detalle_operacion.length;i++){           
                    if(this.pago_cobro.detalle_operacion[i].det_id_cta == item.det_id_cta){
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
            this.$delete(this.pago_cobro.detalle_operacion,row.index);
            this.sumaTotal();
        },
        agregarElemento() {
            this.pago_cobro.detalle_operacion.push({
                det_pago_desc:"",
                det_nro_cta:null,
                det_moneda:null,
                det_banco:null,
                det_pago:null,
                det_nro_doc:null,
                det_anexo:null,
                det_codigo_efecto:null,
                det_monto:0,
                det_id_cta:null,
                det_descripcion:null,                        
                det_tc:null,                      
            });     
        },
        validationForm() {
            /*this.$refs.simpleRules.validate().then((success) => {
                if (success) {
                    this.Guardar();
                }
            });*/
            this.savePagoCobro();
        },       
        Cancelar() {
            this.$router.push({ name: "caja-pago-cobro-index" });
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
        changeSuplier(e){
            if (e != null) {
                this.pago_cobro.pc_razon_social = e.razon_social;
            } else {
                this.pago_cobro.pc_razon_social = "";
            }           
            this.pago_cobro.documentos = [];      
        },
        showModalDocRef(){
            this.$refs['modal-documento'].show();
        },  
        sumaPago(){         
            var suma=0.00,suma_cambio=0.00;
            for(let i=0; i<this.pago_cobro.documentos.length; i++){
                if(this.pago_cobro.documentos[i].pago==""){
                    suma=suma+parseFloat(0);
                    suma_cambio=suma_cambio+parseFloat(0);
                }else{
                    suma=suma+parseFloat(this.pago_cobro.documentos[i].pago);
                    suma_cambio=suma_cambio+parseFloat(this.pago_cobro.documentos[i].pago)*parseFloat(this.pago_cobro.documentos[i].ca_tipo_cambio);
                }   
            }
            if(this.pago_cobro.pc_moneda=="USD"){
                this.pago_cobro.pc_monto_total_dolar=parseFloat(suma).toFixed(2);
                this.pago_cobro.pc_monto_total_soles=parseFloat(suma_cambio).toFixed(2);
            }else{
                this.pago_cobro.pc_monto_total_dolar=parseFloat(suma_cambio/parseFloat(this.tc).toFixed(2)).toFixed(2);
                this.pago_cobro.pc_monto_total_soles=parseFloat(suma).toFixed(2); 
            }
            this.pago_cobro.pc_pago_total=parseFloat(suma).toFixed(2);
            this.pago_cobro.pc_diferencia=parseFloat(parseFloat(this.pago_cobro.pc_monto_total_soles).toFixed(2)-
            parseFloat(parseFloat(this.pago_cobro.pc_monto_total_pago).toFixed(2)).toFixed(2)).toFixed(2);
            if(this.pago_cobro.pc_opcion=="1"){
                this.pago_cobro.pc_diferencia=-parseFloat(this.pago_cobro.pc_diferencia);
            }
            //this.sumaTotalCalculo();
        },
        sumaTotal(){
            var suma=0.00, suma_dolar=0.00;
            for(let i=0; i<this.pago_cobro.detalle_operacion.length; i++){
                if(this.pago_cobro.detalle_operacion[i].det_monto==""){
                    suma=suma+parseFloat(0);
                    suma_dolar=suma_dolar+parseFloat(0);
                }else{
                    suma=suma+parseFloat(this.pago_cobro.detalle_operacion[i].det_monto);
                    suma_dolar=suma_dolar+parseFloat(this.pago_cobro.detalle_operacion[i].det_monto*this.pago_cobro.detalle_operacion[i].det_tc);
                }
            }
            this.pago_cobro.pc_monto_total_pago=parseFloat(suma_dolar).toFixed(2);
            this.pago_cobro.pc_monto_total_pago_Sindolar=parseFloat(suma).toFixed(2);
            this.pago_cobro.pc_diferencia=parseFloat(parseFloat(this.pago_cobro.pc_monto_total_soles).toFixed(2)-
            parseFloat(parseFloat(this.pago_cobro.pc_monto_total_pago).toFixed(2)).toFixed(2)).toFixed(2);
            if(this.pago_cobro.pc_opcion=="1"){
                this.pago_cobro.pc_diferencia=-parseFloat(this.pago_cobro.pc_diferencia);
            }
            //this.sumaTotalCalculo();
        },      
        changePago(item,index,e){
            if(e!=null){
                this.pago_cobro.detalle_operacion[index].det_pago_desc=this.medio_pagos.find((mp) => mp.value == item.det_pago).text;
            }else{
                this.pago_cobro.detalle_operacion[index].det_pago_desc="";
            }
        },        
        showDetalle(){
            this.sumaTotalCalculo();
            this.$refs['modal-detalle-calculo'].show();
        },
        sumaTotalCalculo(){
            this.pago_cobro.detalle_calculo=[];
            var suma_doc=0.00;
            if(this.pago_cobro.pc_opcion=="2"){
                this.pago_cobro.documentos.forEach(e=>{
                    var pago=0.00;
                    if(e.pago!=""){
                        pago=parseFloat(e.pago).toFixed(2);
                    }
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:e.ca_moneda,
                        det_debe:parseFloat(pago).toFixed(2),
                        det_haber:"",
                        det_tc:parseFloat(e.ca_tipo_cambio).toFixed(2),
                        det_debe_mn:parseFloat(parseFloat(pago).toFixed(2)*parseFloat(e.ca_tipo_cambio).toFixed(2)).toFixed(2),
                        det_haber_mn:"",
                        det_ident:"DOCUMENTO" 
                    })
                    suma_doc=suma_doc+parseFloat(parseFloat(pago).toFixed(2)*parseFloat(e.ca_tipo_cambio).toFixed(2));
                })
                if(this.pago_cobro.documentos.length>0){
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:"",
                        det_debe:"",
                        det_haber:"",
                        det_tc:"",
                        det_debe_mn:parseFloat(suma_doc).toFixed(2),
                        det_haber_mn:"",
                        det_ident:"SUBTOTAL DOCUMENTOS",
                    })
                }            
                var suma_pago=0.00;
                this.pago_cobro.detalle_operacion.forEach(e=>{
                    var monto=0.00;
                    if(e.det_monto!=""){
                        monto=parseFloat(e.det_monto).toFixed(2);
                    }
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:e.det_moneda,
                        det_debe:"",
                        det_haber:parseFloat(monto).toFixed(2),
                        det_tc:parseFloat(e.det_tc).toFixed(2),
                        det_debe_mn:"",
                        det_haber_mn:parseFloat(parseFloat(monto).toFixed(2)*parseFloat(e.det_tc).toFixed(2)).toFixed(2),
                        det_ident:"PAGO" 
                    })
                    suma_pago=suma_pago+parseFloat(parseFloat(monto).toFixed(2)*parseFloat(e.det_tc).toFixed(2));
                })
                if(this.pago_cobro.detalle_calculo.length>0){
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:"",
                        det_debe:"",
                        det_haber:"",
                        det_tc:"",
                        det_debe_mn:"",
                        det_haber_mn:parseFloat(suma_pago).toFixed(2),
                        det_ident:"SUBTOTAL PAGOS",
                    })
                }
                if(this.pago_cobro.documentos.length>0 && this.pago_cobro.detalle_operacion.length>0){
                    var id=null,plc_anexo="DIFERENCIA",plc_codigo_ganancia="776",plc_codigo_gasto="676",
                    plc_descripcion_ganacia="CUENTA DE DIFERENCIA GANACIA",
                    plc_descripcion_gasto="CUENTA DE DIFERENCIA GASTO",plc_codigo="",dif_pago=0.00,dif_doc=0.00,
                    status_class="success",plc_descripcion="",plc_codigo_1="";
                    if(parseFloat(suma_doc)>parseFloat(suma_pago)){
                        dif_pago=parseFloat(suma_doc-suma_pago);
                        suma_pago=suma_pago+parseFloat(dif_pago);
                        if(this.cuentas.find((c) => c.plc_codigo == plc_codigo_ganancia)){
                            id=this.cuentas.find((c) => c.plc_codigo == plc_codigo_ganancia).id;
                            plc_anexo=this.cuentas.find((c) => c.plc_codigo == plc_codigo_ganancia).plc_anexo;
                            plc_descripcion_ganacia=this.cuentas.find((c) => c.plc_codigo == plc_codigo_ganancia).plc_descripcion;
                        }
                        plc_codigo=plc_codigo_ganancia;
                        plc_descripcion=plc_descripcion_ganacia;
                        plc_codigo_1="("+plc_codigo+")";                   
                    }else{
                        if(parseFloat(suma_doc)==parseFloat(suma_pago)){
                            plc_codigo_1="";
                        }else{
                            dif_doc=parseFloat(suma_pago-suma_doc);           
                            suma_doc=suma_doc+parseFloat(dif_doc);
                            status_class="danger";                    
                            if(this.cuentas.find((c) => c.plc_codigo == plc_codigo_gasto)){
                                id=this.cuentas.find((c) => c.plc_codigo == plc_codigo_gasto).id;
                                plc_anexo=this.cuentas.find((c) => c.plc_codigo == plc_codigo_gasto).plc_anexo;
                                plc_descripcion_gasto=this.cuentas.find((c) => c.plc_codigo == plc_codigo_gasto).plc_descripcion;
                            }
                            plc_codigo=plc_codigo_gasto;
                            plc_descripcion=plc_descripcion_gasto;
                            plc_codigo_1="("+plc_codigo+")";
                        }
                    }                    
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:"",
                        det_debe:"",
                        det_haber:"",
                        det_tc:"",
                        det_debe_mn:parseFloat(dif_doc).toFixed(2),
                        det_haber_mn:parseFloat(dif_pago).toFixed(2),
                        det_ident:"DIFERENCIA "+plc_codigo_1,
                        status: status_class
                    })
                    this.pago_cobro.diferencia={
                        libd_kardex: null,
                        libd_desc: plc_descripcion,
                        libd_dh: "",
                        libd_debe: parseFloat(dif_doc).toFixed(2),
                        libd_haber:parseFloat(dif_pago).toFixed(2),
                        libd_debe_cambio: parseFloat(dif_doc).toFixed(2),
                        libd_haber_cambio:parseFloat(dif_pago).toFixed(2),
                        libd_nro_cta: plc_codigo,
                        libd_id_cta: id,
                        libd_id_padre:null,
                        libd_anexo:plc_anexo,
                        movimiento_kardex: [],
                    },
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:"",
                        det_debe:"",
                        det_haber:"",
                        det_tc:"",
                        det_debe_mn:parseFloat(suma_doc).toFixed(2),
                        det_haber_mn:parseFloat(suma_pago).toFixed(2),
                        det_ident:"TOTAL",
                        status: 'primary'
                    })
                }                
            }else{
                this.pago_cobro.documentos.forEach(e=>{
                    var pago=0.00;
                    if(e.pago!=""){
                        pago=parseFloat(e.pago).toFixed(2);
                    }
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:e.ca_moneda,
                        det_debe:parseFloat(pago).toFixed(2),
                        det_haber:"",
                        det_tc:parseFloat(e.ca_tipo_cambio).toFixed(2),
                        det_debe_mn:parseFloat(parseFloat(pago).toFixed(2)*parseFloat(e.ca_tipo_cambio).toFixed(2)).toFixed(2),
                        det_haber_mn:"",
                        det_ident:"DOCUMENTO" 
                    })
                    suma_doc=suma_doc+parseFloat(parseFloat(pago).toFixed(2)*parseFloat(e.ca_tipo_cambio).toFixed(2));
                })
                if(this.pago_cobro.documentos.length>0){
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:"",
                        det_debe:"",
                        det_haber:"",
                        det_tc:"",
                        det_debe_mn:"",
                        det_haber_mn:parseFloat(suma_doc).toFixed(2),
                        det_ident:"SUBTOTAL DOCUMENTOS",
                    })
                }            
                var suma_pago=0.00;
                this.pago_cobro.detalle_operacion.forEach(e=>{
                    var monto=0.00;
                    if(e.det_monto!=""){
                        monto=parseFloat(e.det_monto).toFixed(2);
                    }
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:e.det_moneda,
                        det_debe:"",
                        det_haber:parseFloat(monto).toFixed(2),
                        det_tc:parseFloat(e.det_tc).toFixed(2),
                        det_debe_mn:"",
                        det_haber_mn:parseFloat(parseFloat(monto).toFixed(2)*parseFloat(e.det_tc).toFixed(2)).toFixed(2),
                        det_ident:"PAGO" 
                    })
                    suma_pago=suma_pago+parseFloat(parseFloat(monto).toFixed(2)*parseFloat(e.det_tc).toFixed(2));
                })
                if(this.pago_cobro.detalle_calculo.length>0){
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:"",
                        det_debe:"",
                        det_haber:"",
                        det_tc:"",
                        det_debe_mn:parseFloat(suma_pago).toFixed(2),
                        det_haber_mn:"",
                        det_ident:"SUBTOTAL PAGOS",
                    })
                }
                if(this.pago_cobro.documentos.length>0 && this.pago_cobro.detalle_operacion.length>0){
                    var id=null,plc_anexo="DIFERENCIA",plc_codigo_ganancia="776",plc_codigo_gasto="676",
                    plc_descripcion_ganacia="CUENTA DE DIFERENCIA GANACIA",
                    plc_descripcion_gasto="CUENTA DE DIFERENCIA GASTO",plc_codigo="",dif_pago=0.00,dif_doc=0.00,
                    status_class="success",plc_descripcion="",plc_codigo_1="";
                    if(parseFloat(suma_doc)<parseFloat(suma_pago)){
                        dif_doc=parseFloat(suma_pago-suma_doc);
                        suma_doc=suma_doc+parseFloat(dif_doc);
                        if(this.cuentas.find((c) => c.plc_codigo == plc_codigo_ganancia)){
                            id=this.cuentas.find((c) => c.plc_codigo == plc_codigo_ganancia).id;
                            plc_anexo=this.cuentas.find((c) => c.plc_codigo == plc_codigo_ganancia).plc_anexo;
                            plc_descripcion_ganacia=this.cuentas.find((c) => c.plc_codigo == plc_codigo_ganancia).plc_descripcion;
                        }
                        plc_codigo=plc_codigo_ganancia;
                        plc_descripcion=plc_descripcion_ganacia;
                        plc_codigo_1="("+plc_codigo+")";                   
                    }else{
                        if(parseFloat(suma_doc)==parseFloat(suma_pago)){
                            plc_codigo_1="";
                        }else{
                            dif_pago=parseFloat(suma_doc-suma_pago);           
                            suma_pago=suma_pago+parseFloat(dif_pago);
                            status_class="danger";                    
                            if(this.cuentas.find((c) => c.plc_codigo == plc_codigo_gasto)){
                                id=this.cuentas.find((c) => c.plc_codigo == plc_codigo_gasto).id;
                                plc_anexo=this.cuentas.find((c) => c.plc_codigo == plc_codigo_gasto).plc_anexo;
                                plc_descripcion_gasto=this.cuentas.find((c) => c.plc_codigo == plc_codigo_gasto).plc_descripcion;
                            }
                            plc_codigo=plc_codigo_gasto;
                            plc_descripcion=plc_descripcion_gasto;
                            plc_codigo_1="("+plc_codigo+")";
                        }
                    }                    
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:"",
                        det_debe:"",
                        det_haber:"",
                        det_tc:"",
                        det_debe_mn:parseFloat(dif_pago).toFixed(2),
                        det_haber_mn:parseFloat(dif_doc).toFixed(2),
                        det_ident:"DIFERENCIA "+plc_codigo_1,
                        status: status_class
                    })
                    this.pago_cobro.diferencia={
                        libd_kardex: null,
                        libd_desc: plc_descripcion,
                        libd_dh: "",
                        libd_debe: parseFloat(dif_pago).toFixed(2),
                        libd_haber:parseFloat(dif_doc).toFixed(2),
                        libd_debe_cambio: parseFloat(dif_pago).toFixed(2),
                        libd_haber_cambio:parseFloat(dif_doc).toFixed(2),
                        libd_nro_cta: plc_codigo,
                        libd_id_cta: id,
                        libd_id_padre:null,
                        libd_anexo:plc_anexo,
                        movimiento_kardex: [],
                    },
                    this.pago_cobro.detalle_calculo.push({
                        det_moneda:"",
                        det_debe:"",
                        det_haber:"",
                        det_tc:"",
                        det_debe_mn:parseFloat(suma_pago).toFixed(2),
                        det_haber_mn:parseFloat(suma_doc).toFixed(2),
                        det_ident:"TOTAL",
                        status: 'primary'
                    })
                }
            }
        },      
    },
};
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="simpleRules">
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
                                            v-model="pago_cobro.pc_fecha_cancelacion"
                                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                            locale="es"
                                            :max="fecha_actual"
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
                                            v-model= "tc"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                    </validation-provider> 
                                </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Opción: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Opción"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="pago_cobro.desc_opcion"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                <small class="text-danger">{{errors[0]}}</small>
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
                                    <b-form-input
                                        v-model="pago_cobro.pc_moneda"
                                        :readonly="true"
                                    />
                                <small class="text-danger">{{errors[0]}}</small>
                                </validation-provider>
                            </b-form-group>        
                        </b-col>
                        <b-col sm="4">                       
                            <b-form-group label="Entidad: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Entidad"
                                    rules="required"
                                >
                                    <b-input-group>                                       
                                        <b-form-input
                                            v-model="pago_cobro.pc_doi"
                                            :readonly="true"
                                        />                                       
                                    </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="4">
                            <b-form-group label="Razón: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Razón"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="pago_cobro.pc_razon_social"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Doc. Referencia ">
                                <b-button 
                                    class="btn-secondary"
                                    style="width: 100%"
                                    @click="showModalDocRef()"
                                >
                                    <feather-icon icon="SearchIcon" />
                                </b-button>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Glosa: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Glosa"
                                    rules="required"
                                > 
                                <b-input-group>
                                    <b-form-input 
                                        v-model= "pago_cobro.pc_glosa"
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
            <b-row class="mt-2">
                <b-col sm="12">
                    <b-table
                        responsive
                        :items="pago_cobro.detalle_operacion"
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
                    <b-form-group label="Total de docs: Soles">
                        <b-form-input
                            v-model="pago_cobro.pc_monto_total_soles"          
                            size="21"
                            style="width: 100%;"
                            :readonly="true"                  
                        />
                    </b-form-group>
                </b-col>
                <b-col sm="2">                    
                    <b-form-group label="Total de docs: Dolares">
                        <b-form-input
                            v-model="pago_cobro.pc_monto_total_dolar"          
                            size="21"
                            style="width: 100%;"
                            :readonly="true"                  
                        />
                    </b-form-group>                 
                </b-col>                
                <b-col sm="2">
                    <b-form-group :label="'Monto a '+titulo+': Soles'">
                        <b-form-input
                            v-model="pago_cobro.pc_monto_total_pago"                 
                            size="21"
                            style="width: 100%;"
                            :readonly="true"
                            />
                    </b-form-group>                 
                </b-col>              
                <b-col sm="2">
                    <b-form-group label="Diferencia: ">
                        <b-form-input
                            id="compraData.monto_total"
                            v-model="pago_cobro.pc_diferencia"                 
                            size="21"
                            style="width: 100%;"
                            v-bind:style="pago_cobro.pc_diferencia >= 0.00 ? 'backgroundColor:#d1e7dd' : 'backgroundColor:#f8d7da'"
                            :readonly="true"
                            type="number"
                            />
                    </b-form-group>
                </b-col>
                <b-col sm="2">
                    <b-form-group label="Detalle: ">
                        <b-button 
                            class="btn-secondary"
                            style="width: 100%"
                            @click="showDetalle()"
                        >
                            Ver
                        </b-button>
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
            id="modal-documento"
            ref="modal-documento"
            centered
            title="Agregar Documentos"
            ok-only
            hide-footer
            size="xl"
        >
            <b-card-text>       
                <b-row>
                    <b-col sm="12">
                        <b-form-group label="Documentos: " >
                            <b-input-group>
                                <v-select
                                    v-model="pago_cobro.documentos"
                                    label="identi"
                                    style="width: 100%;"
                                    multiple
                                    :clearable="false"
                                    :options="pago_cobro.documentos"
                                >
                                    <template v-slot:selected-option="option">
                                    {{ option.ca_serie }} - {{ option.ca_correlativo }}
                                    </template>
                                    <template v-slot:option="option">
                                    {{ option.identi }}
                                    </template>
                                </v-select>                             
                            </b-input-group>
                        </b-form-group>              
                    </b-col>
                </b-row>               
                <b-row>
                    <b-col sm="12" v-if="pago_cobro.pc_opcion=='2'">
                        <b-table
                            striped
                            selectable
                            responsive
                            select-mode="range"
                            :items="pago_cobro.documentos"
                            :fields="fieldsPago"
                            >
                        </b-table>                        
                    </b-col>
                    <b-col sm="12" v-else>
                        <b-table
                            responsive
                            :items="pago_cobro.documentos"
                            :fields="fieldsCobro"
                            >                                      
                        </b-table>                        
                    </b-col>
                </b-row>            
            </b-card-text>      
        </b-modal>
        <b-modal
            id="modal-detalle-calculo"
            ref="modal-detalle-calculo"
            centered
            title="Detalle de Calculo"
            ok-only
            hide-footer
            size="xl"
        >
            <b-card-text>              
                <b-row>
                    <b-col sm="12">
                        <b-table
                            responsive
                            :items="pago_cobro.detalle_calculo"
                            :fields="fieldsDetalleCalculo"
                            :tbody-tr-class="rowClass"
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
    .vs__deselect {
        display: none;
    }
</style>
