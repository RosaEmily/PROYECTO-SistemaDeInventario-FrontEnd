<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="simpleRules">
                    <b-form class="ml-1 mr-1 mt-1">
                        <b-row>                            
                            <b-col sm="12">
                                <b-form-group label="Nombre: ">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Nombre"
                                        rules="required"
                                    >
                                        <b-input-group>
                                            <b-form-input
                                                v-model="usuarioData.nombre"
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
                                <b-form-group label="Apellido: ">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Apellido"
                                        rules="required"
                                    >
                                        <b-input-group>
                                            <b-form-input
                                                v-model="usuarioData.apellido"
                                                type="text"
                                                :state="
                                                    errors.length > 0
                                                        ? false
                                                        : null
                                                "
                                                placeholder="Ingrese Apellido"
                                            />
                                        </b-input-group>
                                        <small class="text-danger">{{
                                            errors[0]
                                        }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                           <b-col sm="12">
                                <b-form-group label="Correo: " >
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Email"
                                        rules="required|email"
                                    >
                                        <b-form-input
                                            id="address"
                                            v-model="usuarioData.email"
                                            placeholder="Correo"
                                        />
                                        <small class="text-danger">{{
                                            errors[0]
                                        }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col sm="12">
                                <b-form-group label="Rol: ">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Rol"
                                        rules="required"
                                    >
                                        <v-select
                                            v-model="usuarioData.rol"
                                            :dir="'ltr'"
                                            label="rol"
                                            :value.sync="roles.id"
                                            :options="roles"
                                            placeholder="Ingrese rol"
                                        />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                                </b-form-group>
                            </b-col>
                             <b-col sm="2">
                                <b-form-group>
                                    <b-form-checkbox
                                        v-model="usuarioData.restablecer"
                                        class="mt-50"
                                        @change="Functionrestablecer()"
                                    >
                                    ¿De se ha restablecer contraseña?
                                    </b-form-checkbox>
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
                        @click="Guardar"
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
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import store from "@/store/index";
import VueSweetalert2 from "vue-sweetalert2";

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
Vue.use(VueSweetalert2);

export default {
    components: {
        BFormSelect,
        ValidationProvider,
        ValidationObserver,
        vSelect,
        BButton,
        BModal,
    },
    directives: {
        "b-modal": VBModal,
        Ripple,
    },
    data() {
        return {
            usuarioData: {
                nombre: "",
                apellido: "",
                email: "",
                rol: null,
                restablecer:false,
            },    
            roles: [],
            unidades: generalData.inventario.unidades            
        };
    },
    mounted() {
        this.getConfiguraciones();
        this.getInfoByID();
    },
    methods: {
        Functionrestablecer(){
            console.log(this.usuarioData.restablecer);
            if(this.usuarioData.restablecer){
                this.$swal({
                    title: "¿Está seguro que quieres restablacer contraseña?",
                    text: "Contraseña por defecto: 'password'",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si, restrablecer!",
                    customClass: {
                        confirmButton: "btn btn-primary",
                        cancelButton: "btn btn-outline-danger ml-1",
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    if (!result.value) {              
                        if(this.usuarioData.restablecer==false){
                            this.usuarioData.restablecer=true;
                        }else{
                            this.usuarioData.restablecer=false;
                        }
                    }
                }); 
            }            
        },
        async getInfoByID() {
            let request = {
                url: "/api/auth/" + this.$route.params.id,
                method: "GET",
            };
            var respRoles = await store.dispatch("back/EXECUTE", request);
            this.usuarioData= respRoles;
        }, 
        async getConfiguraciones() {         
            let rol = {
                url: "/api/rol/listar",
                method: "GET",
            };
            var repRol = await store.dispatch("back/EXECUTE", rol);
            this.roles = repRol;            
        },
        async Guardar() {
            console.log(this.usuarioData);        
            let request = {
                url: "/api/auth/"+ this.$route.params.id,
                method: "PUT",
                // data:this.usuarioData
                data: this.usuarioData,
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                console.log("respuesta", respRoles);
                if (respRoles == 201) {
                    this.sendMessage(
                        "Usuario editado satisfactoriamente",
                        "EditIcon",
                        "success"
                    );
                    this.$router.push({ name: "usuario-lista-index" });
                } else if (respRoles == 400) {
                    this.sendMessage("El usuario que quiere editar ya existe", "AlertTriangleIcon", "danger");
                } else {
                    this.sendMessage("Error de servidor", "AlertTriangleIcon", "danger");
                }
            } catch (e) {
                console.log(e.message);
            }
        },
        validationForm() {
            this.$refs.simpleRules.validate().then((success) => {
                if (success) {
                    this.Guardar();
                }
            });
        },
        cancelar() {
            this.$router.push({ name: "usuario-lista-index" });
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
    },
};
</script>
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
