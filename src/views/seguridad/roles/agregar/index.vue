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
                                <b-form-group label="Rol: ">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Rol"
                                        rules="required"
                                    >
                                        <b-input-group>
                                            <b-form-input
                                                v-model="rol.name"
                                                type="text"
                                                :state="
                                                    errors.length > 0
                                                        ? false
                                                        : null
                                                "
                                                placeholder="Ingrese rol"
                                            />
                                        </b-input-group>
                                        <small class="text-danger">{{
                                            errors[0]
                                        }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col sm="12">
                                <b-form-group label="Permiso: ">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Permiso"
                                        rules="required"
                                    >
                                        <v-select
                                            v-model="rol.permisos"
                                            :dir="'ltr'"
                                            label="permiso"
                                            :value.sync="permisos.id"
                                            :options="permisos"
                                            multiple
                                            placeholder="Ingrese Permisos"
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
            permisos:[],
            rol: {
                name:"",
                permisos:[],            
            },            
        };
    },
    mounted() {
        this.getConfiguraciones();
    },
    methods: {      
        async getConfiguraciones() {         
            let permiso = {
                url: "/api/permiso",
                method: "GET",
            };
            var respPer = await store.dispatch("back/EXECUTE", permiso);
            this.permisos = respPer;
        },
        async Guardar() {
            let request = {
                url: "/api/rol",
                method: "POST",
                // data:this.productData
                data: this.rol,
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                console.log(respRoles);
                if (respRoles == 201) {
                    this.sendMessage(
                        "Rol registrado satisfactoriamente",
                        "EditIcon",
                        "success"
                    );
                    this.$router.push({ name: "rol-lista-index" });
                } else if (respRoles == 400) {
                    this.sendMessage("El rol que quiere registrar ya existe", "AlertTriangleIcon", "danger");
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
            this.$router.push({ name: "rol-lista-index" });
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
