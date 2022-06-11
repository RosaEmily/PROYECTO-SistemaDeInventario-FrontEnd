<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="rulesAgregarProveedor">
                <b-form class="ml-1 mr-1 mt-1">
                    <b-row class="">
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
                                            :state="
                                                errors.length > 0 ? false : null
                                            "
                                            placeholder="Ingrese el documento"
                                        />
                                        <b-input-group-append>
                                            <b-button
                                                variant="outline-primary"
                                                @click="validarDocumento"
                                            >
                                                Consultar
                                            </b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
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
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group
                                label="Dirección: "
                            >
                                <b-form-input
                                    id="address"
                                    v-model="suplierData.direccion"
                                    placeholder="Dirección"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Correo: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Email"
                                    rules="email"
                                >
                                    <b-form-input
                                        id="address"
                                        v-model="suplierData.email"
                                        placeholder="Correo"
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
                <b-col md="12" class="text-center mt-1" style="">
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="mr-1"
                        @click.prevent="validationAgregarProveedor"
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
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                tipos: generalData.persona.documentos,
                suplierData: {
                    nombre: "",
                    doi: "",
                    email: "",
                    tipoDoi: generalData.persona.documentos[0].value,
                    direccion: "",
                },
            };
        },
        mounted() {
        },
        methods: {
            validationAgregarProveedor() {
                this.$refs.rulesAgregarProveedor.validate().then((success) => {
                    if (success) {
                        this.saveProveedor();
                    }
                });
            },

            cancelar() {
                this.$router.push({ name: "compras-lista-proveedor" });
            },

            validarDocumento() {
                if (this.suplierData.doi.length == 8) {
                    axios.get(API_PERU_URL + "dni/" + this.suplierData.doi + "?api_token=" + API_PERU_TOKEN)
                    .then((result) => {
                        if (result.data.success) {
                            this.suplierData.nombre = result.data.data.nombre_completo;
                            this.suplierData.direccion = result.data.data.direccion_completa;
                        } else {
                            this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger");
                        }
                    });
                } else if (this.suplierData.doi.length == 11) {
                    axios.get(API_PERU_URL + "ruc/" + this.suplierData.doi + "?api_token=" + API_PERU_TOKEN)
                    .then((result) => {
                        if (result.data.success) {
                            this.suplierData.nombre = result.data.data.nombre_o_razon_social;
                            this.suplierData.direccion = result.data.data.direccion_completa;
                        } else {
                            this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger");
                        }
                    });
                } else {
                    this.sendMessage("Documento no valido","AlertTriangleIcon","danger");
                }
            },

            async saveProveedor() {
                let request = {
                    url: "/api/proveedor",
                    method: "POST",
                    data: this.suplierData, 
                };
                try {
                    var respRoles = await store.dispatch("back/EXECUTE", request);
                    if (respRoles == 201) {
                        this.sendMessage("Proveedor registrado satisfactoriamente","CheckSquareIcon","success");
                        this.$router.push({ name: "compras-lista-proveedor" });
                    } else if (respRoles == 400) {
                        this.sendMessage("El proveedor que intenta registrar ya existe","AlertTriangleIcon","danger");
                    } else {
                        this.sendMessage("Error de servidor","AlertTriangleIcon","danger");
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
        },
    };
</script>
<style lang="scss">
</style>