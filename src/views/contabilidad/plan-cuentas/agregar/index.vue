<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="rulesAgregarPlanContable">
                <b-form>
                    <b-row class="mb-2">
                        <b-col sm="6">
                            <b-form-group label="Código: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Código"
                                    rules="required"
                                >
                                    <b-form-input
                                        id="codigo"
                                        v-model="ctaContable.plc_codigo"
                                    />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Tipo: ">
                                <b-form-select
                                    v-model="ctaContable.plc_tipo"
                                    :options="tipos"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Anexo: ">
                                <b-form-select
                                    v-model="ctaContable.plc_anexo"
                                    :options="anexos"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Moneda: ">
                                <b-form-select
                                    v-model="ctaContable.plc_moneda"
                                    :options="monedas"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="10">
                            <b-form-group label="Descripción: ">
                                <b-form-textarea
                                    id="descripcion"
                                    v-model="ctaContable.plc_descripcion"
                                    rows="3"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <br>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="ctaContable.plc_cta_register"
                                    class="mt-50"
                                >
                                Cta. Registro?
                                </b-form-checkbox>
                            </b-form-group>
                            <b-form-group>
                                <b-form-checkbox
                                    v-model="destino"
                                    @change="(destino) ? ctaContable.destino : ctaContable.destino=[]"
                                    class="mt-50"
                                >
                                Tiene destino?
                                </b-form-checkbox>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                        </b-col>
                    </b-row>
                </b-form>
            </validation-observer>
            <div v-if="destino">
                <validation-observer ref="rulesAgregarCompra">
                    <b-form>
                        <b-row class="justify-content-center">
                            <b-col md="2" class="mb-1">
                                <b-form-group label="Código: " label-for="basicInput">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Código"
                                        rules="required|integer"
                                    >
                                        <b-input-group>
                                            <v-select
                                                v-model="idcod"
                                                label="plc_codigo"
                                                style="width: 100%"
                                                :reduce="(cuentas) => cuentas.id"
                                                :options="cuentas"
                                                @input="changeCtaContable($event)"
                                            >
                                                <template v-slot:selected-option="option">
                                                    {{ option.plc_codigo }}
                                                </template>
                                                <template v-slot:option="option">
                                                    {{ option.plc_codigo }} -
                                                    {{ option.plc_descripcion }}
                                                </template>
                                            </v-select>
                                        </b-input-group>
                                        <small class="text-danger">
                                            {{ errors[0] }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="2" class="mb-1">
                                <b-form-group label="Descripción: " label-for="basicInput">
                                    <b-form-input
                                        id="descripcion"
                                        v-model="desc"
                                        :readonly="true"
                                    />
                                </b-form-group>
                            </b-col>
                            <b-col md="2" class="mb-1">
                                <b-form-group label="Debe (%)" label-for="basicInput">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Debe"
                                        rules="required|between:0,100"
                                    >
                                        <b-form-input
                                            id="debe"
                                            v-model="debe"
                                            @keypress="onlyDecimalNumbers($event)"
                                            @keyup="betweenZeroAndHundred($event,'debe')"
                                            type="number"
                                            step="any"
                                        />
                                        <small class="text-danger">{{
                                            errors[0]
                                        }}</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="2" class="mb-1">
                                <b-form-group label="Haber (%)" label-for="basicInput">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Haber"
                                        rules="required|between:0,100"
                                    >
                                        <b-form-input
                                            id="haber"
                                            v-model="haber"
                                            @keypress="onlyDecimalNumbers($event)"
                                            @keyup="betweenZeroAndHundred($event,'haber')"
                                            type="number"
                                            step="any"
                                        />
                                        <small class="text-danger">
                                            {{ errors[0] }}
                                        </small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="2" class="mt-2">
                                <b-button
                                    style="width: 100%"
                                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                    variant="success"
                                    @click.prevent="validationAgregarDestino"
                                >
                                    Añadir
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-form>
                </validation-observer>
                <b-row class="justify-content-center">
                    <b-col md="10" xl="10">
                        <b-table
                            striped
                            selectable
                            responsive
                            select-mode="range"
                            :items="ctaContable.destino"
                            :fields="fields"
                        >
                            <template #cell(actions)="row">
                                <b-button
                                    size="sm"
                                    class="btn-danger mr-1"
                                    @click="deleteItem(row.index)"
                                >
                                    <feather-icon icon="TrashIcon" />
                                </b-button>
                            </template>
                        </b-table>
                    </b-col>
                </b-row>
            </div>
            <b-row class="text-center mt-1">
                <b-col md="12" class="mb-1">
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="mr-1"
                        @click.prevent="validationAgregarPlanContable"
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
    import vSelect from "vue-select";
    import Ripple from "vue-ripple-directive";
    import { required, email } from "@validations";
    import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import generalData from "@fakedata";
    Vue.use(BootstrapVue);
    export default {
        components: {
            vSelect,
            BFormSelect,
            ValidationProvider,
            ValidationObserver,
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                destino: false,
                ctaContable: {
                    plc_anexo: generalData.contabilidad.anexos[0].value,
                    plc_tipo: generalData.contabilidad.tipos[0].value,
                    plc_codigo: "",
                    plc_cta_register: true,
                    plc_descripcion: "",
                    plc_dif_cambio_gan: "",
                    plc_dif_cambio_per: "",
                    plc_estado: 1,
                    plc_moneda: "PEN",
                    per_id: 1,
                    emp_id: 1,
                    destino: [],
                },
                fields: [
                    { key: "dest_codigo", label: "Código", sortable: true },
                    { key: "dest_desc", label: "Descripción", sortable: true },
                    { key: "dest_debe", label: "% Debe", sortable: true },
                    { key: "dest_haber", label: "% Haber", sortable: true },
                    { key: "actions", label: "Acciones", tdClass: "text-center", thClass: "text-center", sortable: false },
                ],
                tipos: generalData.contabilidad.tipos,
                monedas: generalData.contabilidad.monedas,
                anexos: generalData.contabilidad.anexos,
                cod: "",
                debe: 0,
                haber: 0,
                idcod: "",
                desc: "",
                totalDebe: 0,
                totalHaber: 0,
                cuentas: [],
            };
        },
        mounted() {
            this.getConfiguraciones();
        },
        methods: {
            changeCtaContable(event) {
                console.log(event);
                let cta = this.cuentas.find((cta) => cta.id == event),c=0;            
                for(let i=0;i<this.ctaContable.destino.length;i++){           
                    if(this.ctaContable.destino[i].dest_id == event){
                        c++;
                    }
                }
                if(c>0){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: "La cuenta contable ya fue seleccionada",
                            icon: "AlertTriangleIcon",
                            variant: "danger",
                        },
                    });
                    this.idcod = "";
                    this.cod = "";
                    this.desc = "";
                }else{
                    if (cta) {
                        this.cod = cta.plc_codigo;
                        this.desc = cta.plc_descripcion;
                    } else {
                        this.cod = "";
                        this.desc = "";
                    }
                }                
            },

            async getConfiguraciones() {
                let request = {
                    url: "/api/cctacontable/all/1/1",
                    method: "GET",
                };
                var resp = await store.dispatch("back/EXECUTE", request);
                this.cuentas = resp.rows;
            },

            validationAgregarDestino() {
                this.$refs.rulesAgregarCompra.validate().then(success => {
                    if (success) {
                        // eslint-disable-next-line
                        if(this.haber+this.debe>0) {
                            if(this.ctaContable.destino.length>0){
                                var totalDebe=0;
                                var totalHaber=0;
                                this.ctaContable.destino.forEach(element => {
                                    totalDebe = totalDebe + parseFloat(element.dest_debe);
                                    totalHaber = totalHaber + parseFloat(element.dest_haber)
                                });
                                totalDebe = totalDebe + parseFloat(this.debe);
                                totalHaber = totalHaber + parseFloat(this.haber);
                                console.log("totalDebe",totalDebe, "totalHaber",totalHaber);
                            }
                            if(totalDebe>100 || totalHaber>100){
                                this.$toast({
                                    component: ToastificationContent,
                                    props: {
                                        title: "La suma de columnas debe y haber no pueden superar el 100%",
                                        icon: "AlertTriangleIcon",
                                        variant: "danger",
                                    },
                                });
                            } else {
                                this.$refs.rulesAgregarCompra.reset();
                                this.agregarDestino();
                            }
                        } else {
                            this.$toast({
                                component: ToastificationContent,
                                props: {
                                    title: "Ambos porcentajes de debe y haber no pueden ser 0",
                                    icon: "AlertTriangleIcon",
                                    variant: "danger",
                                },
                            });
                        }
                    }
                })
            },

            validationAgregarPlanContable(){
                this.$refs.rulesAgregarPlanContable.validate().then(success => {
                    if (success) {
                        if(this.destino && this.ctaContable.destino.length==0){
                            this.$toast({
                                component: ToastificationContent,
                                props: {
                                    title: "La casilla TIENE DESTINO está activa, debe añadir por lo menos un destino a la tabla detalle",
                                    icon: "AlertTriangleIcon",
                                    variant: "danger",
                                },
                            });
                        } else {
                            this.$refs.rulesAgregarPlanContable.reset();
                            this.Guardar();
                        }
                    }
                })
            },

            cancelar() {
                this.$router.push({ name: "contabilidad-configuracion-plan-cuenta", });
            },

            agregarDestino() {
                this.ctaContable.destino.push({
                    dest_codigo: this.cod,
                    dest_debe: this.debe,
                    dest_haber: this.haber,
                    dest_id: this.idcod,
                    dest_desc: this.desc,
                });
                this.cod = "";
                this.idcod = "";
                this.debe = 0;
                this.haber = 0;
                this.desc = "";
            },

            deleteItem(index) {
                this.$delete(this.ctaContable.destino, index);
            },

            async Guardar() {
                if (!this.destino) {
                    this.ctaContable.destino = [];
                }
                let request = {
                    url: "/api/cctacontable",
                    method: "POST",
                    data: this.ctaContable,
                };
                console.log(request.data);
                try {
                    var respRoles = await store.dispatch("back/EXECUTE", request);
                    console.log("res", respRoles);
                    if (respRoles.status == 200) {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Cuenta registrada satisfactoriamente",
                                icon: "CheckSquareIcon",
                                variant: "success",
                            },
                        });
                        this.$router.push({ name: "contabilidad-configuracion-plan-cuenta", });
                    } else if (respRoles.status == 500) {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Error de servidor",
                                icon: "AlertTriangleIcon",
                                variant: "danger",
                            },
                        });
                        console.log(respRoles.message);
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: respRoles.message,
                                icon: "AlertTriangleIcon",
                                variant: "danger",
                            },
                        });
                    }
                } catch (e) {
                    console.log(e.message);
                }
            },
            
            onlyDecimalNumbers(e) {
                if ((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode == 46) {
                    return true;
                } else {
                    e.preventDefault();
                }
            },

            betweenZeroAndHundred(e,input) {
                if(parseFloat(e.target.value)> 100){
                    if(input=='debe'){
                        this.debe=100;
                    }else if (input=='haber'){
                        this.haber=100;
                    }
                }
            },
        },
    };
</script>
<style lang="scss">
    @import "~@core/scss/vue/libs/vue-select.scss";
</style>