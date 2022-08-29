<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="agregarCompraRules">
                <b-form>
                    <b-row> 
                        <b-col sm="5">
                            <b-form-group label="Documento: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Documento"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <v-select
                                            v-model="nota_credito.venta"
                                            style="width: 100%"
                                            label="serie"
                                            :options="documentos"
                                            @input="getInfoByID(nota_credito.venta.id)"
                                        >
                                         <template v-slot:selected-option="option">
                                                {{ option.serie }} - {{ option.correlativo }} - {{ option.desctipo }}
                                            </template>
                                            <template v-slot:option="option">
                                                {{ option.serie }} - {{ option.correlativo }} - {{ option.desctipo }}
                                            </template> 
                                        </v-select> 
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="4">
                            <b-form-group label="Motivo: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Motivo"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="nota_credito.motivo"                                            
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>                
                        <b-col sm="3">
                            <b-form-group label="Doi: ">                                
                                    <b-input-group>
                                        <b-form-input
                                            v-model="data.cliente.doi"                                           
                                            :readonly="true"
                                        />                                        
                                    </b-input-group>                                  
                            </b-form-group>
                        </b-col>
                        <b-col sm="5">
                            <b-form-group label="Nombre Completo / Razón: ">                               
                                    <b-input-group>
                                        <b-form-input
                                            v-model="entidad_razon_social"
                                            :readonly="true"
                                        />
                                    </b-input-group>                              
                            </b-form-group>
                        </b-col>
                        <b-col sm="5">
                            <b-form-group label="Dirección: ">                                
                                    <b-input-group>
                                        <b-form-input
                                            v-model="data.entidad_direccion"
                                            :readonly="true"
                                        />
                                    </b-input-group>                                    
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Moneda: ">                               
                                    <b-form-input
                                        v-model="data.moneda"
                                        :readonly="true"
                                    />
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="TC: ">                               
                                    <b-input-group>
                                        <b-form-input
                                            v-model="data.tipo_cambio"
                                            :readonly="true"
                                        />
                                    </b-input-group>                                   
                            </b-form-group>
                        </b-col>                     
                        <b-col sm="3">
                            <b-form-group label="Tipo Doc: ">                               
                                    <b-input-group>
                                        <b-form-input
                                            v-model="tipo.doc.value"                                           
                                            :readonly="true"
                                        />
                                    </b-input-group>                                   
                            </b-form-group>
                        </b-col>
                        <b-col sm="5">
                            <b-form-group label="Descripción Doc: ">                                
                                    <b-input-group>
                                        <b-form-input 
                                            v-model="tipo.desc"
                                            :readonly="true"
                                        />
                                    </b-input-group>                                  
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Serie: ">                               
                                    <b-input-group>
                                        <b-form-input
                                            v-model="data.serie"
                                            :maxlength="4"
                                            :readonly="true"
                                        />
                                    </b-input-group>                              
                            </b-form-group>
                        </b-col>
                        <b-col sm="3">
                            <b-form-group label="Correlativo : ">                              
                                    <b-input-group>
                                        <b-form-input
                                            v-model="data.correlativo"
                                            :maxlength="maxLenghtCorr"
                                            :readonly="true"
                                        />
                                    </b-input-group>                                
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="F. Emisión: ">                               
                                    <b-input-group>
                                        <b-form-input
                                            id="datepicker-dateformat1"
                                            v-model="data.created_at"
                                            :readonly="true"
                                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                            locale="es"
                                        />
                                    </b-input-group>                                
                            </b-form-group>
                        </b-col>                
                        <b-col sm="2">
                            <b-form-group>
                                <b-button
                                    variant="success"
                                    style="width: 100%; margin-top: 2rem"
                                    @click="showModalProductoAgregar()"                 
                                >
                                    Productos
                                </b-button>
                            </b-form-group>
                        </b-col>                     
                    </b-row>                   
                    <b-row>
                        <b-col sm="12">
                            <b-form-group label="Descripcion: " >                                
                                <b-input-group>
                                    <b-form-input 
                                        v-model= "data.descripcion"
                                        :readonly="true"
                                    />
                                </b-input-group>                           
                            </b-form-group>   
                        </b-col>                        
                    </b-row>
                    <b-row>
                        <b-col md="12" class="text-center mt-1">
                            <b-button
                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                variant="primary"
                                class="mr-1"
                                @click.prevent="validationFormCompra"
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
                </b-form>
            </validation-observer>
        </b-card>  
        <b-modal
            id="modalAgregarProducto"
            ref="modalAgregarProducto"
            centered
            title="Productos de la compra"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>       
                <!--<b-row>
                    <b-col sm="12">
                        <b-form-group label="Productos: " >
                            <b-input-group>
                                <v-select
                                    v-model="data.detalle_producto"
                                    label="nombre"
                                    style="width: 100%;"
                                    multiple
                                    :clearable="false"
                                    :options="productos"
                                >
                                    <template v-slot:selected-option="option">
                                    {{ option.nombre }}
                                    </template>
                                    <template v-slot:option="option">
                                    {{ option.codigo }} - {{ option.nombre }}
                                    </template>
                                </v-select>                                                     
                            </b-input-group>
                        </b-form-group>              
                    </b-col>
                </b-row> -->
                <b-row>
                    <b-col sm="12">
                        <b-table
                            striped
                            responsive
                            :items="data.detalle_producto"
                            :fields="fieldsMovimientoKardex"
                            >                           
                        </b-table>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="10">
                    </b-col>                                 
                    <b-col sm="2">
                        <b-form-group label="Total: ">
                            <b-form-input
                                :value="data.total"                                                              
                                size="21"
                                style="max-width:150px"
                                :readonly="true"
                                type="number"
                                />
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card-text>      
        </b-modal>
    </div>
</template>

<script>
    import Vue from "vue";
    import store from "@/store/index";
    import { BootstrapVue, BFormSelect } from "bootstrap-vue";
    import vSelect from "vue-select";
    import generalData from "@fakedata";
    import Ripple from "vue-ripple-directive";
    import { ValidationProvider, ValidationObserver } from "vee-validate";

    import moment from "moment";
    import axios from "axios";

    import { required, email } from '@validations';
    import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
    import { reduce } from 'postcss-rtl/lib/affected-props';
    import { formatDate } from '@/@core/utils/filter';

    const API_PERU_URL = process.env.VUE_APP_API_PERU_URL;
    const API_PERU_TOKEN = process.env.VUE_APP_API_PERU_TOKEN;

    Vue.use(BootstrapVue);
    
    export default {
        components: {
            vSelect,
            ValidationProvider,
            ValidationObserver,
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                tipos_doc: generalData.compra.documentos,
                tipo: {
                    cod: "",
                    desc: "",
                    doc:{
                        value:"",
                        text:"",
                        maxLengthCorr:0,
                    },
                },
                nota_credito:{
                    venta:null,
                    motivo:"",
                },
                unidades: generalData.inventario.unidades,
                monedas: generalData.contabilidad.monedas,
                tipos: generalData.persona.documentos,
                suplier: "",                                        
                cambio: 0,
                entidad: [],
                productos: [],             
                maxLenghtCorr:8,
                data: {
                    cliente:{
                        doi:"",
                    },
                    detalle_producto:[],
                    total:0.00,
                    entidad_direccion:"",                  
                    moneda: generalData.contabilidad.monedas[0].value,
                    tipo_cambio: "",
                    serie: "",
                    correlativo: "",
                    created_at: "",                    
                    descripcion: "",
                    tipodoc:"",                 
                },
                entidad_razon_social: "",      
                fieldsMovimientoKardex:[
                    { key: "id", label: "Id", sortable: false },
                    { key: "nombre", label: "Producto", sortable: false },
                    { key: "unidad", label: "Medida", sortable: false },
                    { key: "cantidad", label: "Cantidad", sortable: false },
                    { key: "precio", label: "Precio", sortable: false },
                    { key: "subtotal", label: "Subtotal", sortable: false },
                ],                
                categorias: [],
                documentos:[],           
            };
        },
        mounted() {
            this.getConfiguraciones();
        },
        methods: {
            async getInfoByID(id) {
                this.data= {
                    cliente:{
                        doi:"",
                    },
                    detalle_producto:[],
                    total:0.00,
                    entidad_direccion:"",                  
                    moneda: generalData.contabilidad.monedas[0].value,
                    tipo_cambio: 1,
                    serie: "F001",
                    correlativo: "123",
                    created_at: moment().format("yyyy-MM-DD"),                    
                    descripcion: "",
                    tipodoc:"",                 
                };
                this.entidad_razon_social= "";
                let request = {
                    url: "/api/venta/" + id,
                    method: "GET",
                };
                var respRoles = await store.dispatch("back/EXECUTE", request);
                this.entidad_razon_social=respRoles.cliente.nombre;
                this.data.entidad_direccion=respRoles.cliente.direccion;
                this.data.cliente=respRoles.cliente;
                this.total=respRoles.total;
                this.data.descripcion=respRoles.descripcion;
                this.data.tipo_cambio=respRoles.tipo_cambio;
                this.data.moneda=respRoles.moneda;
                this.data.serie=respRoles.serie;
                this.data.tipodoc=respRoles.tipodoc;
                this.data.correlativo=respRoles.correlativo;                
                this.tipo.cod=respRoles.tipodoc;
                this.tipo.desc=this.tipos_doc.find((doc) => respRoles.tipodoc == doc.value).text;
                this.tipo.doc.value=respRoles.tipodoc;
                this.tipo.doc.text=this.tipos_doc.find((doc) => respRoles.tipodoc == doc.value).text;
                this.tipo.doc.maxLengthCorr=this.tipos_doc.find((doc) => respRoles.tipodoc == doc.value).maxLengthCorr;
                this.data.created_at=respRoles.created_at;
                respRoles.detalle_producto.forEach((item) => {
                    this.data.detalle_producto.push({
                        id:item.producto.id,
                        producto:item.producto,
                        cantidad:item.cantidad,
                        precio:item.precio,
                        nombre:item.producto.nombre,
                        stock:item.producto.stock,
                        unidad:this.unidades.find((unid) => unid.value == item.producto.unidad).text,
                        subtotal:parseFloat(parseFloat(item.precio)*parseInt(item.cantidad)).toFixed(2),
                    });
                });
                this.data.total=respRoles.total;
            },         
            validationFormCompra(){
                this.$refs.agregarCompraRules.validate().then(success => {
                    if(success){
                       this.Guardar();
                    }                    
                })
            },
            showModalProductoAgregar(){
                this.$refs["modalAgregarProducto"].show(); 
            },
            Guardar(){
                console.log(this.data);
                this.saveCompra();                
            },
            Cancelar(){
                this.$router.push({ name: "nota-credito-venta-lista-index" });
            },                     
            async getConfiguraciones(){                
                let cat = {
                    url: "/api/categoria/lista",
                    method: "GET",
                };
                var respCat = await store.dispatch("back/EXECUTE", cat);
                this.categorias = respCat;         
                
                let suc2 = {
                    url: "/api/proveedor/all",
                    method: "GET",
                };
                var resp = await store.dispatch("back/EXECUTE", suc2);
                this.entidad = resp;

                let suc3 = {
                    url: "/api/producto/all",
                    method: "GET",
                };
                var respPro = await store.dispatch("back/EXECUTE", suc3);
                this.productos = respPro;

                let suc4 = {
                    url: "/api/notaCredito/Listventas",
                    method: "GET",
                };
                var respPro = await store.dispatch("back/EXECUTE", suc4);
                this.documentos = respPro;
                console.log(this.documentos);
            },          
            sendMessage(title, icon, variant){
                this.$toast({
                    component: ToastificationContent,
                    props: {
                        title: title,
                        icon: icon,
                        variant: variant,
                    },
                });
            },            
            async saveCompra(){                
                let request= {
                    url:"/api/notaCredito/venta",
                    method:"POST",
                    data:this.nota_credito
                }
                try{
                    var respRoles = await store.dispatch('back/EXECUTE',request)
                    if(respRoles==201){
                        this.sendMessage('Nota de Credito registrada satisfactoriamente',"CheckSquareIcon","success")
                        this.$router.push({ name: "nota-credito-venta-lista-index" });
                    }else if(respRoles==400){
                        this.sendMessage("La serie "+this.data.serie+" y el correlativo "+this.data.correlativo+" ya existe","AlertTriangleIcon","danger")
                    }else{
                        this.sendMessage(respRoles,"AlertTriangleIcon","danger")
                    }
                }
                catch(e){
                    console.log(e.message)
                }
            },            
            showModalProducto(){                
                this.productData={
                    codigo:"",
                    nombre: "",
                    marca: "",
                    descripcion:"",
                    stock: 0,
                    categoria: null,
                    unidad:"",
                    precio:0,
                },
                this.$refs["modalProducto"].show()      
            },              
        },
    };
</script>
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
    @import "~@core/scss/vue/libs/vue-select.scss";
</style>