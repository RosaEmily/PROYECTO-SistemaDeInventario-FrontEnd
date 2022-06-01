<script>
/* eslint-disable */
</script>
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
                cuentas: [],
                operaciones: generalData.compra.operacion,
                clasificaciones: generalData.compra.clasificacion,
                clasificacion: generalData.compra.clasificacion[0],
                tipos: generalData.persona.documentos,
                plantilla: {
                    pl_operacion:generalData.compra.operacion[0].value,
                    pl_clasificacion:generalData.compra.clasificacion[0].value,
                    emp_id: 1,
                    pl_nombre: "",
                    pl_glosa: "",
                    pl_modulo: "MV",
                    detalle_plantilla: [
                        {
                            det_nomb_cta: "",
                            det_id_cta: null,
                            det_debe_haber: "D",
                            det_formula: "",
                            det_tipo_anexo: null,
                            det_registro: "C01",
                        }
                    ],
                },
                debehaber: generalData.plantilla.debehaber,
                anexos: generalData.plantilla.anexo,
                registros: generalData.plantilla.registros,
                ctasContables: [],
                fields: [
                    { key: "det_nomb_cta", label: "Descripción", sortable: false },
                    { key: "det_id_cta", label: "Cta Contable", sortable: false },
                    { key: "det_debe_haber", label: "D/H", sortable: false },
                    { key: "det_tipo_anexo", label: "Anexo", sortable: false },
                    {
                        key: "det_registro",
                        label: "Registro Compra",
                        sortable: false,
                    },
                    {
                        key: "actions",
                        label: "Acciones",
                        tdClass: "text-center",
                        thClass: "text-center",
                        sortable: false,
                    },
                ],
            };
        },
        mounted() {
            this.getConfiguraciones();
        },
        methods: {
            changeClasif(e) {
                if (e != null) {
                    this.plantilla.pl_clasificacion = e.value;
                } else {
                    this.plantilla.pl_clasificacion = "";
                }
            },
            
            changeValue(e, index) {
                this.ctasContables[index].det_id_cta = e;
            },
            
            async getConfiguraciones() {
                let request = {
                    url: "/api/cctacontable/all/1/1",
                    method: "GET",
                };
                var resp = await store.dispatch("back/EXECUTE", request);
                this.cuentas = resp.rows;
            },
            
            
            changeCtaContable(item) {
                let cta = this.cuentas.find((cta) => cta.id == item.det_id_cta),c=0;            
                for(let i=0;i<this.plantilla.detalle_plantilla.length;i++){           
                    if(this.plantilla.detalle_plantilla[i].det_id_cta == item.det_id_cta){
                        c++;
                    }
                }
                if(c>1){
                    this.sendMessage('La cuenta contable ya fue seleccionada',"AlertTriangleIcon","danger")
                    item.det_id_cta=null;
                    item.det_nomb_cta =null;
                }else{
                    if (cta) {
                        item.det_nomb_cta = cta.plc_descripcion;
                        item.det_nro_cta = cta.plc_codigo;
                    } else {
                        item.det_nomb_cta = "";
                    }
                }                
            },

            deleteItem(row) {
                this.$delete(this.plantilla.detalle_plantilla,row.index);
                /*this.plantilla.detalle_plantilla =
                    this.plantilla.detalle_plantilla.filter(function (item) {
                        return item.det_nro_cta !== row.item.det_nro_cta;
                    });

                this.ctasContables = this.ctasContables.filter(function (item) {
                    return item.det_nro_cta !== row.item.det_nro_cta;
                });
                console.log("this.ctasContables", this.ctasContables);*/
            },

            agregarElemento() {
                /*let itemsNull = this.plantilla.detalle_plantilla.filter(function (
                    item
                ) {
                    return item.det_nomb_cta == null;
                });
                if (itemsNull.length == 0) {
                    this.plantilla.detalle_plantilla.push({
                        det_nomb_cta: "",
                        det_id_cta: null,
                        det_descripcion: "",
                        det_debe_haber: "D",
                        det_formula: "",
                        det_tipo_anexo: null,
                        det_registro: "C01",
                    });
                    this.ctasContables.push({ det_id_cta: null, ctas: [] });
                }*/
                this.plantilla.detalle_plantilla.push({
                    det_nomb_cta: "",
                    det_id_cta: null,
                    det_descripcion: "",
                    det_debe_haber: "D",
                    det_formula: "",
                    det_tipo_anexo: null,
                    det_registro: "C01",
                });
            },

            validationForm() {
                this.$refs.simpleRules.validate().then((success) => {
                    if (success) {
                        if (this.plantilla.detalle_plantilla.length > 0){
                            for(let i=0; i<this.plantilla.detalle_plantilla.length; i++){
                                if(this.plantilla.detalle_plantilla[i].det_id_cta == null){
                                    this.sendMessage("Complete todos los datos requeridos en la tabla detalle de su plantilla","AlertTriangleIcon","danger");
                                    return false;
                                }
                            }
                            this.Guardar();
                        }
                        else{
                            this.sendMessage("Añada una fila a la tabla detalle de su plantilla","AlertTriangleIcon","danger");
                        }
                    }
                });
            },

            Guardar() {
                console.log(this.plantilla);
                this.savePlantilla();
                this.$router.push({ name: "ventas-plantilla" });
            },
            
            Cancelar() {
                this.$router.push({ name: "ventas-plantilla" });
            },
            
            async savePlantilla() {
                let request = {
                    url: "/api/plantilla",
                    method: "POST",
                    data: this.plantilla,
                };
                try {
                    var respRoles = await store.dispatch("back/EXECUTE", request);
                    console.log(respRoles);
                    console.log(this.plantilla);
                    if (respRoles.status == 200) {
                        this.sendMessage("Plantilla registrada satisfactoriamente","CheckSquareIcon","success");
                    } else if (respRoles.status == 500) {
                        this.sendMessage("Error de servidor","AlertTriangleIcon","danger");
                    } else {
                        this.sendMessage(respRoles.message,"AlertTriangleIcon","danger");
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
<template>
    <div>
        <b-card>
            <validation-observer ref="simpleRules">
                <b-form class="ml-1 mr-1 mt-1">
                    <b-row>
                        <b-col sm="6">
                            <b-form-group label="Operación Tributaria: ">
                                <b-input-group>
                                    <b-form-select
                                        v-model="plantilla.pl_operacion"
                                        class="form-control"
                                        :options="operaciones"
                                    />
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Clasificación: ">
                                <b-input-group>
                                    <v-select
                                        v-model="clasificacion"
                                        label="text"
                                        style="width: 100%"
                                        :options="clasificaciones"
                                        @input="changeClasif($event)"
                                    />
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row class="">
                        <b-col sm="6">
                            <b-form-group label="Nombre: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Nombre"
                                    rules="required"
                                >
                                    <b-form-input
                                        v-model="plantilla.pl_nombre"
                                        placeholder="Nombre"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Glosa: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Glosa"
                                    rules="required"
                                >
                                    <b-form-input
                                        v-model="plantilla.pl_glosa"
                                        placeholder="Glosa"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="10">
                        </b-col>
                        <b-col sm="2">
                            <b-form-group>
                                <b-button
                                    class="mt-1"
                                    variant="success"
                                    style="width: 100%;"
                                    @click="agregarElemento()"                 
                                >
                                    Nueva Fila
                                </b-button>
                            </b-form-group>
                        </b-col>
                        <b-col sm="12">
                            <b-table
                                striped
                                responsive
                                select-mode="range"
                                :items="plantilla.detalle_plantilla"
                                :fields="fields"
                            >
                                <template
                                    v-slot:cell(det_nomb_cta)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <b-input
                                        v-model="item[key]"
                                        style="min-width: 200px"
                                    />
                                </template>
                                <template
                                    v-slot:cell(det_id_cta)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <v-select
                                        v-model="item[key]"
                                        label="plc_codigo"
                                        :reduce="(cuentas) => cuentas.id"
                                        :options="cuentas"
                                        @input="changeCtaContable(item)"
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
                                </template>
                                <template
                                    v-slot:cell(det_formula)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <b-form-input
                                        v-model="item[key]"
                                        size="sm"
                                        style="min-width: 80px"
                                        placeholder="Form"
                                    />
                                </template>
                                <template
                                    v-slot:cell(det_debe_haber)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <b-form-select
                                        v-model="item[key]"
                                        style="min-width: 80px"
                                        :options="debehaber"
                                    />
                                </template>
                                <template
                                    v-slot:cell(det_tipo_anexo)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <b-form-select
                                        v-model="item[key]"
                                        :options="anexos"
                                        style="min-width: 240px"
                                    />
                                </template>
                                <template
                                    v-slot:cell(det_registro)="{
                                        item,
                                        field: { key },
                                    }"
                                >
                                    <b-form-select
                                        v-model="item[key]"
                                        :options="registros"
                                        style="min-width: 200px"
                                    />
                                </template>
                                <template #cell(actions)="row">
                                    <b-button
                                        size="sm"
                                        class="btn-danger mr-1"
                                        @click="deleteItem(row)"
                                    >
                                        <feather-icon icon="TrashIcon" />
                                    </b-button>
                                </template>
                            </b-table>
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
                        @click.prevent="validationForm"
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
        </b-card>
    </div>
</template>
<style lang="scss">
    @import "~@core/scss/vue/libs/vue-select.scss";
</style>
