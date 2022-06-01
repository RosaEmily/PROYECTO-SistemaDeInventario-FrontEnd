<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="simpleRules">
                <b-form class="ml-1 mr-1 mt-1">
                    <b-row>
                        <b-col sm="4">
                            <b-form-group label="Numero de Cuenta: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Numero de Cuenta"
                                    rules="required|integer|max:20"
                                >
                                    <b-form-input
                                        v-model="ctaBancoData.cb_nro_cuenta"
                                        :maxlength="20"
                                        @keypress="onlyNumbers($event)"
                                        placeholder="Numero de Cuenta"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="8">
                            <b-form-group label="Observacion: ">
                                <b-form-input
                                    id="Observacion"
                                    v-model="ctaBancoData.cb_observacion"
                                    placeholder="Observacion"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="5">
                            <b-form-group label="Cuenta Contable: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Cuenta Contable"
                                    rules="required"
                                >
                                    <v-select
                                        v-model="ctaBancoData.cb_id_cta"
                                        style="width: 100%"
                                        label="plc_codigo"
                                        size="21"
                                        :reduce="(cuentas) => cuentas.id"
                                        :options="cuentas"
                                        @input="changeCtaContable($event)"
                                    >
                                        <template
                                            v-slot:selected-option="option"
                                        >
                                            {{ option.plc_codigo }}
                                        </template>
                                        <template v-slot:option="option">
                                            {{ option.plc_codigo }} -
                                            {{ option.plc_descripcion }}
                                        </template>
                                    </v-select>
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="7">
                            <b-form-group label="Descripción Doc: ">
                                <b-input-group>
                                    <b-form-input 
                                        v-model="ctaBancoData.cb_desc_cta"
                                        :readonly="true"
                                    />
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col sm="3">
                            <b-form-group label="Moneda: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Moneda"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-select
                                            v-model="ctaBancoData.cb_moneda"
                                            class="form-control"
                                            :options="monedas"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="9">
                            <b-form-group label="Banco: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Banco"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-select
                                            v-model="ctaBancoData.cb_banco"
                                            class="form-control"
                                            :options="bancos"
                                            @change="changeBanco($event)"
                                        />
                                    </b-input-group>
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
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { required, email } from "@validations";
import generalData from "@fakedata";
import vSelect from "vue-select";
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
Vue.component("v-select", vSelect);
Vue.use(BootstrapVue);
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
            monedas: generalData.contabilidad.monedas,
            bancos: generalData.contabilidad.bancos,
            ctaBancoData: {
                cb_banco: "",
                cb_moneda: "",
                cb_nro_cuenta: "",
                cb_observacion: null,
                cb_id_cta: null,
                cb_desc_banco: "",
                cb_desc_cta: "",
                cb_nro_cta: "",
            },
        };
    },
    mounted() {
        this.getConfiguraciones();
    },
    methods: {
        validationForm() {
            this.$refs.simpleRules.validate().then((success) => {
                if (success) {
                    this.Guardar();
                }
            });
        },
        cancelar() {
            this.$router.push({ name: "configuracion-cuenta-bancaria" });
        },
        async getConfiguraciones() {
            let request = {
                url: "/api/cuenta_bancaria/cta/",
                method: "GET",
            };
            var resp = await store.dispatch("back/EXECUTE", request);
            this.cuentas = resp.rows;
        },
        changeBanco(item) {
            let ban = this.bancos.find((ban) => ban.value == item);
            if (ban) {
                this.ctaBancoData.cb_desc_banco = ban.text;
            } else {
                this.ctaBancoData.cb_desc_banco = "";
            }
        },
        changeCtaContable(item) {
            let cta = this.cuentas.find((cta) => cta.id == item);
            if (cta) {
                this.ctaBancoData.cb_desc_cta = cta.plc_descripcion;
                this.ctaBancoData.cb_nro_cta = cta.plc_codigo;
            } else {
                this.ctaBancoData.cb_desc_cta = "";
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
        onlyNumbers(e) {
            if (e.keyCode < 48 || e.keyCode > 57) {
                e.preventDefault();
            }
        },
        async Guardar() {
            let request = {
                url: "/api/cuenta_bancaria",
                method: "POST",
                data: this.ctaBancoData,
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                if (respRoles.status == 500) {
                    this.sendMessage(
                        "Error de servidor",
                        "AlertTriangleIcon",
                        "danger"
                    );
                } else {
                    if (respRoles.status == 400) {
                        this.sendMessage(
                            respRoles.message,
                            "AlertTriangleIcon",
                            "danger"
                        );
                    } else {
                        this.sendMessage(
                            "Cuenta Bancaria registrada satisfactoriamente",
                            "EditIcon",
                            "success"
                        );
                        this.$router.push({
                            name: "configuracion-cuenta-bancaria",
                        });
                    }
                }
            } catch (e) {
                console.log(e.message);
            }
        },
    },
};
</script>
<style lang="scss">
    @import "~@core/scss/vue/libs/vue-select.scss";
</style>
