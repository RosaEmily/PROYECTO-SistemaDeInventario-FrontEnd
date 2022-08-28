<script>
/* eslint-disable */
</script>
<template>
    <div v-if="thisViewPermission">
        <b-card>
            <validation-observer ref="rulesAgregarCategoria">
                <b-form class="ml-1 mr-1 mt-1">
                    <b-row>             
                        <b-col sm="6">
                            <b-form-group label="Codigo: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Codigo"
                                    rules="required"
                                >
                                    <b-form-input
                                        v-model="categoria.codigo"                                   
                                        placeholder="Codigo"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Nombre: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Nombre"
                                    rules="required"
                                >
                                    <b-form-input
                                        v-model="categoria.nombre"                                
                                        placeholder="Nombre"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>   
                        <b-col sm="12">
                            <b-form-group label="Descripcion: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Descripcion"
                                >
                                    <b-form-input
                                        v-model="categoria.descripcion"                                   
                                        placeholder="Descripcion"
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
                        @click.prevent="validationAgregarCategoria"
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
    import NotAuthorized from "@/views/NotAuthorized.vue";
    import Vue from "vue";
    import store from "@/store/index";
    import { BootstrapVue, BFormSelect } from "bootstrap-vue";
    import Ripple from "vue-ripple-directive";
    import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
    import axios from "axios";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import { required, email } from "@validations";
    import generalData from "@fakedata";

    Vue.use(BootstrapVue);

    const API_PERU_URL = process.env.VUE_APP_API_PERU_URL;
    const API_PERU_TOKEN = process.env.VUE_APP_API_PERU_TOKEN;

    export default {
        props: ["paramsGrid"],
        components: {
            BFormSelect,
            ValidationProvider,
            ValidationObserver,
            NotAuthorized
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                thisViewPermission: false,            
                categoria: {
                    nombre: "",
                    codigo: "",
                    descripcion: "",
                },
            };
        },
        mounted() {
            this.isAuthorized();
        },
        methods: {
            isAuthorized(){
                var permissions=JSON.parse(localStorage.getItem('UserDataPermisos'));
                permissions.forEach(element => {
                    if(element=='Categorias'){
                        this.thisViewPermission=true;
                    }
                });
            },
            validationAgregarCategoria() {
                this.$refs.rulesAgregarCategoria.validate().then((success) => {
                    if (success) {
                        this.saveCategoria();
                    }
                });
            },
            
            cancelar() {
                this.$router.push({ name: "inventario-categoria-listar-index" });
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

            async saveCategoria() {
                let request = {
                    url: "/api/categoria",
                    method: "POST",
                    data: this.categoria,
                };
                try {
                    var respRoles = await store.dispatch("back/EXECUTE", request);
                    if (respRoles == 201) {
                        this.sendMessage("Categoria registrado satisfactoriamente","CheckSquareIcon","success");
                        this.$router.push({ name: "inventario-categoria-listar-index" });
                    } else if (respRoles == 400) {
                        this.sendMessage("La categoria que intenta registrar ya existe","AlertTriangleIcon","danger");
                    } else {
                        this.sendMessage("Error de servidor","AlertTriangleIcon","danger");
                    }
                } catch (e) {
                    console.log(e.message);
                }
            },
        },
    };
</script>
<style lang="scss">
</style>
