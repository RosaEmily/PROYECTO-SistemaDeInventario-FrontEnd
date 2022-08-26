<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="agregarCompraRules">
                <b-form>
                    <b-row>                     
                        <b-col sm="3">
                            <b-form-group label="Proveedor: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="proveedor"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <v-select
                                            v-model="data.proveedor"
                                            label="doi"
                                            style="width: 83%"
                                            :options="entidad"
                                            @input="changeSuplier($event)"
                                        />
                                        <b-button
                                            size="21"
                                            style="width: 17%"
                                            class="btn-icon"
                                            @click="showModalProveedor()"                 
                                        >
                                            <feather-icon icon="PlusCircleIcon"/>
                                        </b-button>
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="4">
                            <b-form-group label="Nombre Completo / Razón: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Razón"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="entidad_razon_social"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="5">
                            <b-form-group label="Dirección: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Dirección"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="data.entidad_direccion"
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
                                    <b-form-select
                                        v-model="data.moneda"
                                        class="form-control"
                                        :options="monedas"
                                        @input="changeMoneda($event)"
                                    />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="TC: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="TC"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="data.tipo_cambio"
                                            @keypress="onlyDecimalNumbers($event)"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>                     
                        <b-col sm="3">
                            <b-form-group label="Tipo Doc: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Tipo Doc"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <v-select
                                            v-model="tipo.doc"
                                            label="text"
                                            style="width: 100%"
                                            :options="tipos_doc"
                                            :selectable="tipos_doc => tipos_doc.value !='07'"
                                            @input="changeValue($event)"
                                        >
                                            <template v-slot:selected-option="option">
                                                {{ option.value }}
                                            </template>
                                            <template v-slot:option="option">
                                                {{ option.value }} - {{ option.text }}
                                            </template>
                                        </v-select>
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="4">
                            <b-form-group label="Descripción Doc: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Descripción Doc"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input 
                                            v-model="tipo.desc"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Serie: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Serie"
                                    rules="required|alpha-num|length:4"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="data.serie"
                                            :maxlength="4"
                                            @keypress="onlyNumbersAndLetters($event)"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="3">
                            <b-form-group label="Número : ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Número"
                                    rules="required|integer|max:20"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="data.correlativo"
                                            :maxlength="maxLenghtCorr"
                                            @keypress="onlyNumbers($event)"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="F. Emisión: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="F. Emisión"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-datepicker
                                            id="datepicker-dateformat1"
                                            v-model="data.created_at"
                                            :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                            locale="es"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>                
                        <b-col sm="2">
                            <b-form-group>
                                <b-button
                                    variant="success"
                                    style="width: 100%; margin-top: 2rem"
                                    @click="showModalProductoAgregar()"                 
                                >
                                    Agregar Producto
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
            centered
            title="Agregar Proveedor"
            ok-only
            hide-footer
            id="modal-proveedor"
            ref="modal-proveedor"
            size="lg"
        >
            <b-card-text>
                <validation-observer ref="agregarProveedorRules">     
                    <b-row>
                        <b-col sm="6">
                            <b-form-group
                                label="Tipo: "
                            >
                                <b-form-select
                                v-model="suplierData.tipoDoi"
                                :options="tipos"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group
                                label="Documento: "
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="Código"
                                rules="required|integer"
                                >
                                <b-input-group>
                                    <b-form-input
                                        v-model="suplierData.doi"
                                        placeholder="Ingrese el documento"
                                    />
                                    <b-input-group-append>
                                        <b-button
                                            variant="outline-primary"
                                            @click="validar"
                                        >
                                            Consultar
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group
                                label="Nombre / Razón Social: "
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="Nombre / Razón Social"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="suplierData.nombre"
                                    placeholder="Nombre / razón social"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                        <b-form-group
                            label="Dirección: "
                        >   
                            <validation-provider
                                #default="{ errors }"
                                name="Direccion"
                                rules="required"
                            >
                                <b-form-input
                                    id="address"
                                    v-model="suplierData.direccion"
                                    placeholder="Dirección"
                                />
                            <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                        </b-col>
                        <b-col sm="6">
                        <b-form-group
                            label="Correo: "
                        >                          
                            <b-form-input
                                id="address"
                                v-model="suplierData.email"
                                placeholder="Correo"
                            />                           
                        </b-form-group>
                        </b-col>
                    </b-row>
                </validation-observer>
                <b-row>
                <b-col
                    md="12"
                    class="text-center mt-1"
                    style=""
                    >
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="ml-1"
                        @click="validaterProveedor()"
                        >
                        Guardar
                    </b-button>
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="danger"
                        class="ml-1"
                        @click="hideModalProveedor()"
                    >
                        Cancelar
                    </b-button>
                </b-col>
            </b-row>   
            </b-card-text>      
        </b-modal>        
        <b-modal
            id="modalProducto"
            ref="modalProducto"
            centered
            title="Crear Producto"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>       
                <validation-observer ref="simpleRulesProducto">
                        <b-form class="ml-1 mr-1 mt-1">
                            <b-row>
                                <b-col sm="12">
                                    <b-form-group label="Codigo: ">
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Codigo"
                                            rules="required"
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    v-model="productData.codigo"
                                                    type="text"
                                                    :state="
                                                        errors.length > 0
                                                            ? false
                                                            : null
                                                    "
                                                    placeholder="Ingrese codigo"
                                                />
                                            </b-input-group>
                                            <small class="text-danger">{{
                                                errors[0]
                                            }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                    <b-form-group label="Nombre: ">
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Nombre"
                                            rules="required"
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    v-model="productData.nombre"
                                                    type="text"
                                                    :state="
                                                        errors.length > 0
                                                            ? false
                                                            : null
                                                    "
                                                    placeholder="Ingrese nombre"
                                                />
                                            </b-input-group>
                                            <small class="text-danger">{{
                                                errors[0]
                                            }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                    <b-form-group label="Descripcion: ">
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Descripcion"
                                            rules="required"
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    v-model="productData.descripcion"
                                                    type="text"
                                                    :state="
                                                        errors.length > 0
                                                            ? false
                                                            : null
                                                    "
                                                    placeholder="Ingrese descripcion"
                                                />
                                            </b-input-group>
                                            <small class="text-danger">{{
                                                errors[0]
                                            }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                    <b-form-group label="Marca: ">
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Marca"
                                            rules="required"
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    v-model="productData.marca"
                                                    type="text"
                                                    placeholder="Ingrese marca"
                                                />
                                            </b-input-group>
                                         <small class="text-danger">{{
                                                errors[0]
                                            }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                    <b-form-group label="Categoria: ">
                                        <v-select
                                            v-model="productData.categoria"
                                            :dir="'ltr'"
                                            label="nombre"
                                            :value.sync="categorias.id"
                                            :options="categorias"
                                            placeholder="Ingrese categoria"
                                        />
                                    </b-form-group>
                                </b-col>                               
                                <b-col sm="3">
                                    <b-form-group label="Stock: ">
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Stock"
                                            rules="required|integer"
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    v-model="productData.stock"
                                                    type="number"
                                                    :state="
                                                        errors.length > 0
                                                            ? false
                                                            : null
                                                    "
                                                    placeholder="Ingrese stock"
                                                />
                                            </b-input-group>
                                            <small class="text-danger">{{
                                                errors[0]
                                            }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col sm="3">
                                    <b-form-group label="Precio: ">
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Stock"
                                            rules="required"
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    v-model="productData.precio"
                                                    type="number"
                                                    :state="
                                                        errors.length > 0
                                                            ? false
                                                            : null
                                                    "
                                                    placeholder="Ingrese Precio"
                                                />
                                            </b-input-group>
                                            <small class="text-danger">{{
                                                errors[0]
                                            }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col sm="6">
                                    <b-form-group label="Unidad de medida: ">
                                        <b-form-select
                                            v-model="productData.unidad"
                                            value-field="value"
                                            text-field="text"
                                            :options="unidades"
                                        />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-form>
                </validation-observer>
                <b-row>
                    <b-col md="12" class="text-center mt-1">
                        <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            variant="primary"
                            class="mr-1"
                            @click="validationFormProducto"
                        >
                            Guardar
                        </b-button>
                        <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            variant="danger"
                            class="ml-1"
                            @click="cancelarProducto"
                        >
                            Cancelar
                        </b-button>
                    </b-col>
                </b-row>
            </b-card-text>      
        </b-modal>
        <b-modal
            id="modalAgregarProducto"
            ref="modalAgregarProducto"
            centered
            title="Vincular Productos a Compra"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>       
                <b-row>
                    <b-col sm="12">
                        <b-form-group label="Productos: " >
                            <b-input-group>
                                <v-select
                                    v-model="data.detalle_producto"
                                    label="nombre"
                                    style="width: 93%;"
                                    multiple
                                    :options="productos"
                                    @input="changeItemsProductos($event)"
                                >
                                    <template v-slot:selected-option="option">
                                    {{ option.nombre }}
                                    </template>
                                    <template v-slot:option="option">
                                    {{ option.codigo }} - {{ option.nombre }}
                                    </template>
                                </v-select>
                                <b-button
                                    size="21"
                                    style="width: 7%"
                                    class="btn-icon"
                                    @click="showModalProducto()"                 
                                >
                                    <feather-icon icon="PlusCircleIcon"/>
                                </b-button>                             
                            </b-input-group>
                        </b-form-group>              
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <b-table
                            striped
                            responsive
                            :items="data.detalle_producto"
                            :fields="fieldsMovimientoKardex"
                            >
                            <template v-slot:cell(cantidad)="{ item, field: { key }}">
                                <b-input
                                    v-model="item[key]"
                                    size="21"
                                    @input="changeCantidadPrecio()"
                                    @keypress="onlyNumbers($event,item)"
                                    @keyup="CalcularSubtotal(item)"
                                />
                            </template>
                            <template v-slot:cell(precio)="{ item, field: { key } }">
                                <b-input
                                    v-model="item[key]"
                                    size="21"
                                    @input="changeCantidadPrecio()"
                                    @keyup="CalcularSubtotal(item)"
                                    @keypress="onlyDecimalNumbers($event)"
                                />
                            </template>
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
                    doc:null,
                },
                unidades: generalData.inventario.unidades,
                monedas: generalData.contabilidad.monedas,
                tipos: generalData.persona.documentos,
                suplier: "",
                suplierData:{
                    nombre:"",
                    doi:"",
                    email:"",
                    tipoDoi:generalData.persona.documentos[0].value,
                    direccion:"",
                },                         
                cambio: 0,
                entidad: [],
                productos: [],             
                maxLenghtCorr:8,
                data: {
                    proveedor:null,
                    detalle_producto:[],
                    total:0.00,
                    entidad_direccion:"",                  
                    moneda: generalData.contabilidad.monedas[0].value,
                    tipo_cambio: 1,
                    serie: "",
                    correlativo: "",
                    created_at: moment().format("yyyy-MM-DD"),                    
                    descripcion: "", 
                    tipodoc:"", 
                    desctipo:"",               
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
                productData:{
                    codigo:"",
                    nombre: "",
                    marca: "",
                    descripcion:"",
                    stock: 0,
                    categoria: null,
                    unidad:"",
                    precio:0,
                },
                categorias: [],               
            };
        },
        mounted() {
            this.getConfiguraciones();
        },
        methods: {           
            validationFormCompra(){
                this.$refs.agregarCompraRules.validate().then(success => {              
                    if(success){
                        if(this.data.detalle_producto.length<=0){
                            this.sendMessage("Debe tener registrado por lo menos un PRODUCTO",
                                "AlertTriangleIcon","danger");
                            return false;
                        }
                        for(let i=0;i<this.data.detalle_producto.length;i++){
                            if(this.data.detalle_producto[i].cantidad<=0){
                                this.sendMessage("Existe PRODUCTOS con CANTIDAD MENOR O IGUAL a 0",
                                "AlertTriangleIcon","danger");
                                return false;
                            }
                            if(this.data.detalle_producto[i].precio<=0){
                                this.sendMessage("Existe PRODUCTOS con PRECIO MENOR O IGUAL a 0",
                                "AlertTriangleIcon","danger");
                                return false;
                            }
                        }
                        this.Guardar();
                    }                    
                })
            }, 
            async getSerieNumero(){
                let cat = {
                    url: "/api/compra/list/"+this.data.tipodoc,
                    method: "GET",
                };
                var respCat = await store.dispatch("back/EXECUTE", cat);
                //65-90
                //String a ASCCI String.fromCharCode(serie.substring(0,1).charCodeAt(0))
                //ASCCI a String .charCodeAt(0)
                var compra=respCat.split(','); 
                var serieA = compra[0],serie="",letra="",numSerie=1;
                var correlativoA = compra[1],correlativo="",auxcorrelativo=1;
                if(respCat===""){
                    serie="A001";
                    correlativo="00000001";
                }else{
                      if((parseInt(correlativoA)+1)>99999999){
                        auxcorrelativo=1;
                        if(parseInt(serieA.substring(1,4))+1>999){
                            numSerie=1;
                            letra=String.fromCharCode(serieA.substring(0,1).charCodeAt(0)+1);
                        }else{
                            numSerie=parseInt(serieA.substring(1,4))+1;
                            letra=serieA.substring(0,1);
                        }
                        serie=letra+"0".repeat(3-(numSerie).toString().length)
                            +(numSerie).toString(); 
                    }else{
                        auxcorrelativo=parseInt(correlativoA)+1;
                        serie=serieA;
                    }
                    correlativo="0".repeat(8-(parseInt(auxcorrelativo).toString().length))+parseInt(auxcorrelativo).toString();
                }              
                this.data.serie=serie;
                this.data.correlativo=correlativo;
            },
            showModalProductoAgregar(){
                this.$refs["modalAgregarProducto"].show(); 
            },
            Guardar(){
                //console.log(this.data);
                this.saveCompra();                
            },
            Cancelar(){
                this.$router.push({ name: "compras-lista-index" });
            },
            changeMoneda(e){
                if (e == "USD") {
                    if (!this.consulta) {
                        axios
                            .post(API_PERU_URL + "tipo_de_cambio?fecha=" + moment().format("yyyy-MM-DD") + "&&api_token=" + API_PERU_TOKEN)
                            .then((result) => {
                                if (result.data.success) {
                                    this.data.tipo_cambio = result.data.data.compra;
                                    this.cambio = result.data.data.compra;
                                    this.consulta = true;
                                } else {
                                    this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger");
                                    this.data.tipo_cambio = "";
                                }
                            });
                    } else {
                        this.data.tipo_cambio = this.cambio;
                    }
                } else {
                    this.data.tipo_cambio = 1;
                }
            }, 
            changeSuplier(e){
                if (e != null) {
                    this.entidad_razon_social = e.nombre;
                    this.data.entidad_direccion=e.direccion;
                } else {
                    this.entidad_razon_social = "";
                    this.data.entidad_direccion="";
                }
            },
            changeValue(e){
                this.st_nota_credito = false;
                if (e != null) {
                    this.tipo.desc = e.text;
                    this.data.desctipo=e.text;
                    this.data.tipodoc = e.value;
                    this.maxLenghtCorr=e.maxLengthCorr;
                    if (e.value== "07"){
                        this.st_nota_credito = true;
                    }
                } else {
                    this.tipo.desc = "";
                    this.data.tipodoc = "";
                    this.data.desctipo = "";
                    this.maxLenghtCorr=8;
                }
                this.data.correlativo=this.data.correlativo.substring(0,this.maxLenghtCorr);
                this.getSerieNumero();
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
            hideModalProveedor(){
                this.$refs["modal-proveedor"].hide()
            },
            showModalProveedor(){      
                this.$refs["modal-proveedor"].show()      
            },
            validaterProveedor(){
                this.$refs.agregarProveedorRules.validate().then(success => {
                    if (success) {
                        this.saveProveedor();
                    }
                })
            },
            async saveProveedor(){
                let request= {
                    url:"/api/proveedor",
                    method:"POST",
                    data:this.suplierData
                }
                try{
                    var respRoles = await store.dispatch('back/EXECUTE',request);
                    if (respRoles == 201) {
                        this.sendMessage("Proveedor registrado satisfactoriamente","CheckSquareIcon","success");
                        let suc2 = {
                            url: "/api/proveedor/all",
                            method: "GET",
                        };
                        var resp = await store.dispatch("back/EXECUTE", suc2);
                        this.entidad = resp; 
                        this.data.proveedor=this.entidad.find((ent) => ent.doi == this.suplierData.doi);
                        this.entidad_razon_social=this.suplierData.nombre
                        this.data.entidad_direccion=this.suplierData.direccion
                        this.hideModalProveedor()
                    } else if (respRoles == 400) {
                        this.sendMessage("El proveedor que intenta registrar ya existe","AlertTriangleIcon","danger");
                    } else {
                        this.sendMessage("Error de servidor","AlertTriangleIcon","danger");
                    }
                }
                catch(e){
                    console.log(e.message)
                }
            },
            onlyNumbers(e){
                if (e.keyCode < 48 || e.keyCode > 57) {
                    e.preventDefault();
                }                
            },
            validatStock(e,item){
                if(parseInt(item.stock)<parseInt(item.cantidad)){
                    this.sendMessage("La cantidad excede al stock del producto", "EditIcon", "error");
                    item.cantidad=parseInt(item.stock);
                }
            },
            CalcularSubtotal(item){
                var cantidad =item.cantidad;
                var precio =item.precio;
                if(item.cantidad===undefined){
                    cantidad=0;
                }
                if(item.precio===undefined){
                    precio=0.00;
                }               
                item.subtotal=parseFloat(parseInt(cantidad)*parseFloat(precio)).toFixed(2);
            },
            onlyNumbersAndLetters(e){

                if ( (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 65 || e.keyCode > 90) ) {
                    e.preventDefault();
                }
            },
            validar(){
                if (this.suplierData.doi.length == 8) {
                    axios
                        .get(API_PERU_URL + "dni/" + this.suplierData.doi + "?api_token=" + API_PERU_TOKEN)
                        .then((result) => {
                            if (result.data.success) {
                                this.suplierData.nombre =
                                    result.data.data.nombre_completo;
                                this.suplierData.direccion =
                                    result.data.data.direccion_completa;
                            } else {
                                this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger")
                            }
                        });
                } else if (this.suplierData.doi.length == 11) {
                    axios
                        .get(API_PERU_URL +"ruc/" + this.suplierData.doi + "?api_token=" + API_PERU_TOKEN)
                        .then((result) => {
                            if (result.data.success) {
                                this.suplierData.nombre =
                                    result.data.data.nombre_o_razon_social;
                                this.suplierData.direccion =
                                    result.data.data.direccion_completa;
                            } else {
                                this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger")
                            }
                        });
                } else {
                    this.sendMessage("Documento no valido", "AlertTriangleIcon", "danger");
                }
            },
            changeItemsProductos(e){                
                this.data.detalle_producto=[],
                //onsole.log(" e ->>>> ",e);
                
                e.forEach(element => {
                    var codigo=element.codigo,unidad=element.unidad;
                    if(codigo!=null){
                        unidad=this.unidades.find((unid) => unid.value == element.unidad).text;
                    }
                    if(element.cantidad && element.precio)
                    {
                        this.data.detalle_producto.push({
                            id: element.id,
                            nombre: element.nombre,
                            unidad: unidad,
                            cantidad: element.cantidad,
                            precio: element.precio,
                            stock: element.stock,
                            subtotal: (parseInt(element.cantidad)*parseFloat(element.precio)).toFixed(2),
                        });
                    } else if (element.cantidad) {
                        this.data.detalle_producto.push({
                            id: element.id,
                            nombre: element.nombre,
                            unidad: unidad,
                            cantidad: element.cantidad,
                            stock: element.stock,
                            subtotal: (parseInt(element.cantidad)*parseFloat(0)).toFixed(2),
                        });
                    } else if (element.precio) {
                        this.data.detalle_producto.push({
                            id: element.id,
                            nombre: element.nombre,
                            unidad:unidad,
                            precio: element.precio,
                            stock: element.stock,
                            subtotal: (parseInt(0)*parseFloat(element.precio)).toFixed(2),
                        });
                    } else {
                        this.data.detalle_producto.push({
                            id: element.id,
                            nombre: element.nombre,
                            unidad:unidad,
                            stock: element.stock,
                            subtotal: (parseInt(0)*parseFloat(0)).toFixed(2),
                            precio:0.00,
                            cantidad:0           
                        });
                    }
                });
                this.changeCantidadPrecio();
            },
            changeCantidadPrecio(){
                let totalItem=0.00;
                
                this.data.detalle_producto.forEach(element => {
                    var cantidad =element.cantidad;
                    var precio =element.precio;
                    if(element.cantidad===undefined){
                        cantidad=0;
                    }

                    if(element.precio===undefined){
                        precio=0.00;
                    }
                    totalItem+=parseInt(cantidad)*parseFloat(precio);
                });
                this.data.total=parseFloat(totalItem).toFixed(2);
            },
            async saveCompra(){
                var detalle_producto=this.data.detalle_producto;
                this.data.detalle_producto=[];
                for(let i=0;i<detalle_producto.length;i++){
                    this.data.detalle_producto.push({
                        id:detalle_producto[i].id,
                        cantidad:detalle_producto[i].cantidad,
                        precio:detalle_producto[i].precio,
                        unidad:detalle_producto[i].unidad,
                        nombre:detalle_producto[i].nombre,
                        producto:this.productos.find((prod) => prod.id == detalle_producto[i].id)
                    });
                }
                //console.log(this.data.detalle_producto);
                let request= {
                    url:"/api/compra",
                    method:"POST",
                    data:this.data
                }
                try{
                    var respRoles = await store.dispatch('back/EXECUTE',request)
                    if(respRoles==201){
                        this.sendMessage('Compra registrada satisfactoriamente',"CheckSquareIcon","success")
                        this.$router.push({ name: "compras-lista-index" });
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
            onlyDecimalNumbers(e){
                if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 46) {
                    return true;
                } else {
                    e.preventDefault();
                }
            },
            async SaveProducto(){
                let request = {
                    url: "/api/producto",
                    method: "POST",
                    // data:this.productData
                    data: this.productData,
                };
                try {
                    var respRoles = await store.dispatch("back/EXECUTE", request);
                    //console.log("respuesta", respRoles);
                    if (respRoles == 201) {
                        this.sendMessage(
                            "Producto registrado satisfactoriamente",
                            "EditIcon",
                            "success"
                        );
                        let suc3 = {
                            url: "/api/producto/all",
                            method: "GET",
                        };
                        var respPro = await store.dispatch("back/EXECUTE", suc3);
                        this.productos = respPro;
                        this.data.detalle_producto.push({
                            id: this.productos.find((pro) => pro.codigo == this.productData.codigo).id,
                            nombre: this.productData.nombre,
                            unidad: this.unidades.find((unid) => unid.value == this.productData.unidad).text,
                            cantidad: 0,
                            precio: this.productData.precio,
                        });
                        this.$refs["modalProducto"].hide();
                    } else if (respRoles == 400) {
                        this.sendMessage("El producto que quiere registrar ya existe", "EditIcon", "error");
                    } else {
                        this.sendMessage("Error de servidor", "EditIcon", "error");
                    }
                } catch (e) {
                    console.log(e.message);
                }              
            },
            cancelarProducto(){
                this.$refs["modalProducto"].hide();
            },
            validationFormProducto(){
                this.$refs.simpleRulesProducto.validate().then((success) => {
                    if (success) {
                        this.SaveProducto();
                    }
                });
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