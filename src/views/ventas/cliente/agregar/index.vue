<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="simpleRules">
                <b-form class="ml-1 mr-1 mt-1">
                    <b-row>
                        <b-col sm="6">
                            <b-form-group label="Tipo: " >
                                <b-form-select
                                    v-model="customerData.tipoDoi"
                                    :options="tipos"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Documento: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Documento"
                                    rules="required|integer|min:8"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="customerData.doi"
                                            type="number"
                                            :state="
                                                errors.length > 0 ? false : null
                                            "
                                            placeholder="Ingrese documento"
                                        />
                                        <b-input-group-append>
                                            <b-button
                                                variant="outline-primary"
                                                @click.prevent="validar"
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
                            <b-form-group label="Nombre / Razón Social: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Nombre / Razón social"
                                    rules="required"
                                >
                                    <b-form-input
                                        v-model="customerData.nombre"
                                        :state="
                                            errors.length > 0 ? false : null
                                        "
                                        placeholder="Nombre / Razón social"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col v-if="customerData.tipoDoi == '02'" sm="6">
                            <b-form-group label="Apellido" >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Apellido"
                                    rules="required"
                                >
                                    <b-form-input
                                        v-model="customerData.apellido"
                                        :state="
                                            errors.length > 0 ? false : null
                                        "
                                        placeholder="Apellido"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Dirección: " >
                                <b-form-input
                                    id="direccion"
                                    v-model="customerData.direccion"
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
                                        v-model="customerData.email"
                                        :state="
                                            errors.length > 0 ? false : null
                                        "
                                        type="email"
                                        placeholder="Email"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Estado: " >
                                <b-form-select
                                    v-model="customerData.estado"
                                    :options="estados"
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
                        @click.prevent="validationForm"
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
                estado: generalData.persona.estado[0].value,
                estados: generalData.persona.estado,
                tipos: generalData.persona.documentos,
                customerData: {
                    nombre: "",
                    apellido: "",
                    doi: "",
                    direccion: "",
                    email: "",
                    estado: true,
                    tipoDoi: generalData.persona.documentos[0].value,
                },
            };
        },
        mounted() {},
        methods: {
            validationForm() {
                this.$refs.simpleRules.validate().then((success) => {
                    if (success) {
                        this.Guardar();
                    }
                });
            },
            
            cancelar() {
                this.$router.push({ name: "ventas-lista-cliente" });
            },
            
            validar() {
                this.isLoading = true;
                if (this.customerData.doi.length === 8) {
                    axios
                        .get(API_PERU_URL + "dni/" + this.customerData.doi + "?api_token=" + API_PERU_TOKEN)
                        .then((result) => {
                            if (result.data.success) {
                                this.customerData.nombre = result.data.data.nombres;
                                this.customerData.apellido =
                                    result.data.data.apellido_paterno +
                                    " " +
                                    result.data.data.apellido_materno;
                                    this.customerData.direccion =
                                        result.data.data.direccion_completa;
                            } else {
                                this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger");
                            }
                        });
                } else if (this.customerData.doi.length === 11) {
                    axios
                        .get(API_PERU_URL + "ruc/" + this.customerData.doi + "?api_token=" + API_PERU_TOKEN)
                        .then((result) => {
                            if (result.data.success) {
                                this.customerData.nombre =
                                    result.data.data.nombre_o_razon_social;
                                this.customerData.direccion =
                                    result.data.data.direccion_completa;
                            } else {
                                this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger");
                            }
                        });
                } else {
                    this.sendMessage("Documento no valido","AlertTriangleIcon","danger");
                }
                this.isLoading = false;
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
            
            Guardar() {
                console.log(this.plantilla);
                this.saveCliente();
                this.$router.push({ name: "ventas-lista-cliente" });
            },

            async saveCliente() {
                let request = {
                    url: "/api/cliente/1",
                    method: "POST",
                    data: this.customerData,
                };
                try {
                    var respRoles = await store.dispatch("back/EXECUTE", request);
                    if (respRoles.status == 200) {
                        this.sendMessage("Cliente registrado satisfactoriamente","CheckSquareIcon","success");
                    } else if (respRoles.status == 500) {
                        this.sendMessage("Error de servidor","AlertTriangleIcon","danger");
                    } else {
                        this.sendMessage(respRoles.message,"AlertTriangleIcon","danger");
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
