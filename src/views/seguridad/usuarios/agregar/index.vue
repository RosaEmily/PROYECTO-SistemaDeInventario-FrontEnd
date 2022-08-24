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
                                <b-form-group label="Username: ">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Username"
                                        rules="required"
                                    >
                                        <b-input-group>
                                            <b-form-input
                                                v-model="usuarioData.username"
                                                type="text"
                                                :state="
                                                    errors.length > 0
                                                        ? false
                                                        : null
                                                "
                                                placeholder="Ingrese username"
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
                                            v-model="usuarioData.role"
                                            :dir="'ltr'"
                                            label="name"
                                            :value.sync="roles.id"
                                            :options="roles"
                                            multiple
                                            placeholder="Ingrese rol"
                                        />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
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
    },
    directives: {
        "b-modal": VBModal,
        Ripple,
    },
    data() {
        return {
            usuarioData: {
                username:"",
                nombre: "",
                apellido: "",
                email: "",
                role: null,
            },
            roles: [],
            unidades: generalData.inventario.unidades            
        };
    },
    mounted() {
        this.getConfiguraciones();
    },
    methods: {       
        async getConfiguraciones() {         
            let rol = {
                url: "/api/rol/listar",
                method: "GET",
            };
            var repRol = await store.dispatch("back/EXECUTE", rol);
            this.roles = repRol;
        },
        async Guardar() {
            let request = {
                url: "/api/auth/signup",
                method: "POST",
                // data:this.usuarioData
                data: this.usuarioData,
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                if (respRoles == 201) {
                    this.sendMessage(
                        "Usuario registrado satisfactoriamente",
                        "EditIcon",
                        "success"
                    );
                    this.$router.push({ name: "usuario-lista-index" });
                } else if (respRoles == 400) {
                    this.sendMessage("El username que quiere registrar ya existe", "AlertTriangleIcon", "danger");
                } else if (respRoles == 401) {
                    this.sendMessage("El correo que quiere registrar ya existe", "AlertTriangleIcon", "danger");
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
