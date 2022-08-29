<script>
/* eslint-disable */
</script>
<template>
    <div v-if="thisViewPermission">
        <b-card>
            <validation-observer ref="simpleRules">
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
                                    <b-input-group>
                                        <b-form-input
                                            v-model="productData.marca"
                                            type="text"
                                            placeholder="Ingrese marca"
                                        />
                                    </b-input-group>
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
                                                @keypress="onlyNumbers($event)"
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
                                                @keypress="onlyDecimalNumbers($event)"
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
                        @click="validationForm"
                    >
                        Guardar
                    </b-button>
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="danger"
                        class="ml-1"
                        @click="cancelar"
                    >
                        Cancelar
                    </b-button>
                </b-col>
            </b-row>
        </b-card>     
    </div>
    <div v-else>
        <NotAuthorized></NotAuthorized>
    </div>
</template>

<script>
/* eslint-disable */
import NotAuthorized from "@/views/NotAuthorized.vue";
import Vue from "vue";
import store from "@/store/index";
import {
    BootstrapVue,
    BFormSelect,
    BButton,
    BModal,
    VBModal,
} from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import Ripple from "vue-ripple-directive";
import { required, email } from "@validations";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import generalData from "@fakedata";
import vSelect from "vue-select";

Vue.use(BootstrapVue);
export default {
    components: {
        BFormSelect,
        ValidationProvider,
        ValidationObserver,
        vSelect,
        BButton,
        BModal,
        NotAuthorized
    },
    directives: {
        "b-modal": VBModal,
        Ripple,
    },
    data() {
        return {
            thisViewPermission: false,
            productData: {
                codigo:"",
                nombre: "",
                marca: "",
                descripcion:"",
                stock: 0,
                categoria: null,
                unidad:"u",
                precio:0,
            },
            categorias: [],
            unidades: generalData.inventario.unidades            
        };
    },
    mounted() {
        this.isAuthorized();
        this.getConfiguraciones();
    },
    methods: {
        isAuthorized(){
            var permissions=JSON.parse(localStorage.getItem('UserDataPermisos'));
            permissions.forEach(element => {
                if(element=='Productos'){
                    this.thisViewPermission=true;
                }
            });
        },      
        async getConfiguraciones() {         
            let cat = {
                url: "/api/categoria/lista",
                method: "GET",
            };
            var respCat = await store.dispatch("back/EXECUTE", cat);
            this.categorias = respCat;            
        },
        async Guardar() {
            let request = {
                url: "/api/producto",
                method: "POST",
                // data:this.productData
                data: this.productData,
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                console.log("respuesta", respRoles);
                if (respRoles == 201) {
                    this.sendMessage(
                        "Producto registrado satisfactoriamente",
                        "EditIcon",
                        "success"
                    );
                    this.$router.push({ name: "inventario-lista-index" });
                } else if (respRoles == 400) {
                    this.sendMessage("El producto que quiere registrar ya existe", "EditIcon", "error");
                } else {
                    this.sendMessage("Error de servidor", "EditIcon", "error");
                }
            } catch (e) {
                console.log(e.message);
            }
        },
        validationForm() {
            this.$refs.simpleRules.validate().then((success) => {
                if (success) { 
                    if(this.productData.stock<=0){
                        this.sendMessage("El STOCK debe ser MAYOR a 0","AlertTriangleIcon","danger");
                    }else if(this.productData.precio<=0){
                        this.sendMessage("El PRECIO debe ser MAYOR a 0","AlertTriangleIcon","danger");
                    }else{
                        this.Guardar();
                    }
                }
            });
        },
        cancelar() {
            this.$router.push({ name: "inventario-lista-index" });
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
        onlyDecimalNumbers(e){
            if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 46) {
                return true;
            } else {
                e.preventDefault();
            }
        },
        onlyNumbers(e){
            if (e.keyCode < 48 || e.keyCode > 57) {
                e.preventDefault();
            }                
        },
    },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
