<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="formRules">
                <b-form>
                    <b-row class="ml-2 mr-2">
                        <b-col sm="6">
                            <b-form-group label="Código: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Código"
                                    rules="required"
                                >
                                    <b-form-input
                                        id="codigo"
                                        v-model="proyecto.proy_codigo"
                                    />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="Descripción: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Descripción"
                                    rules="required"
                                >
                                    <b-form-input
                                        id="descripcion"
                                        v-model="proyecto.proy_descripcion"
                                        rows="3"
                                    />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="F. Inicial: ">
                                <b-input-group>
                                    <b-form-datepicker
                                        id="datepicker-dateformat1"
                                        v-model="proyecto.proy_fecha_inicio"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                        locale="es"
                                        @input="changeDate($event)"
                                    />
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group label="F. Final: ">
                                <b-input-group>
                                    <b-form-datepicker
                                        id="datepicker-dateformat2"
                                        v-model="proyecto.proy_fecha_final"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                        :min="proyecto.proy_fecha_inicio"
                                        locale="es"
                                    />
                                </b-input-group>
                            </b-form-group>
                        </b-col>      
                    </b-row>
                </b-form>
            </validation-observer>
            <div>
                <validation-observer ref="detailRules">
                    <b-form>
                        <b-row class="justify-content-center">                          
                            <b-col md="2" class="mb-1">
                                <b-form-group label="Codigo:" label-for="basicInput">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Código"
                                        rules="required"
                                    >
                                        <b-form-input v-model="codigo" />
                                    <small class="text-danger">
                                            {{ errors[0] }}
                                        </small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="2" class="mb-1">
                                <b-form-group label="Descripción:" label-for="basicInput">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Descripción"
                                        rules="required"
                                    >
                                        <b-form-input v-model="descripcion"/>
                                        <small class="text-danger">
                                            {{ errors[0] }}
                                        </small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="2" class="mb-1">
                                <b-form-group
                                    label="Tipo:"
                                    label-for="basicInput"
                                >
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Tipo"
                                        rules="required"
                                    >
                                        <v-select
                                            v-model="tipo"
                                            style="width: 100%"
                                            label="value"
                                            size="21"
                                            :reduce="(tipos) => tipos.value"
                                            :options="tipos"                                       
                                        >
                                            <template v-slot:selected-option="option">
                                                {{ option.text }}
                                            </template>
                                            <template v-slot:option="option">
                                                {{ option.value }} -
                                                {{ option.text }}
                                            </template>
                                        </v-select>
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
                                    @click.prevent="validationDetail"
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
                            :items="proyecto.componente"
                            :fields="fields"
                        >
                            <template v-slot:cell(comp_codigo)="{ item, field: { key } , index}" >
                                <b-input
                                    v-model="item[key]"
                                    size="21"
                                    style="max-width: 100px"
                                    @input="validarCodigo($event,item, index)"                   
                                />
                            </template>
                            <template v-slot:cell(comp_descripcion)="{ item, field: { key }}" >
                                <b-input
                                    v-model="item[key]"
                                    size="21"
                                    style="max-width: 100px"                
                                />
                            </template>                         
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
    import vSelect from "vue-select";
    import Ripple from "vue-ripple-directive";
    import moment from "moment";
    import axios from "axios";
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
                proyecto: {       
                    proy_codigo: "",
                    proy_descripcion: "",
                    proy_fecha_inicio: moment().format("yyyy-MM-DD"),
                    proy_fecha_final: moment().format("yyyy-MM-DD"),
                    proy_estado: 1,     
                    componente: [],
                },
                fields: [
                    { key: "comp_codigo", label: "Código", sortable: true },
                    { key: "comp_descripcion", label: "Descripción", sortable: true },
                    { key: "comp_tipo", label: "Tipo", sortable: true },
                    { key: "actions", label: "Acciones", tdClass: "text-center", thClass: "text-center", sortable: false },
                ],
                tipos: [
                    { value: "COGA", text: "Costo/Gasto" },
                    { value: "VENT", text: "Venta" },
                    { value: "ACTI", text: "Act. Fijo" },
                ],
                codigo:"",
                descripcion:"",
                tipo:"",                
            };
        },
        mounted() {
            this.getInfoByID();
        },
        methods: {
            validationDetail() {
                this.$refs.detailRules.validate().then(success => {
                    if (success) {
                        // eslint-disable-next-line
                        this.$refs.detailRules.reset();
                        this.agregarComponente();
                    }
                })
            },

            validationForm() {
                this.$refs.formRules.validate().then(success => {
                    if (success) {
                        // eslint-disable-next-line
                        this.$refs.formRules.reset();
                        if(this.proyecto.componente.length > 0) {
                            this.Guardar();
                        } else {
                            this.$toast({
                                component: ToastificationContent,
                                props: {
                                    title: "El proyecto debe tener al menos un componente",
                                    icon: "AlertTriangleIcon",
                                    variant: "danger",
                                },
                            });
                        }
                    }
                })
            },

            agregarComponente(){
                let c=0;
                for(let i = 0; i < this.proyecto.componente.length; i++){
                    if(this.proyecto.componente[i].comp_codigo == this.codigo.trim()){
                        c++;
                    }
                }
                if(c>0){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: "El codigo ya esta registrado",
                            icon: "AlertTriangleIcon",
                            variant: "danger",
                        },
                    });
                    this.codigo = "";
                }else{
                    this.proyecto.componente.push({
                        comp_codigo: this.codigo,
                        comp_descripcion: this.descripcion,
                        comp_tipo: this.tipo,
                    });
                    this.codigo = "";
                    this.descripcion = "";
                    this.tipo = "";
                }
            },       

            cancelar() {
                this.$router.push({ name: "contabilidad-configuracion-proyecto", });
            },           

            deleteItem(index) {
                this.$delete(this.proyecto.componente, index);
            },

            async Guardar() {             
                let request = {
                    url: "/api/proyecto/"+ this.$route.params.id,
                    method: "PUT",
                    data: this.proyecto,
                };
                try {
                    var respRoles = await store.dispatch("back/EXECUTE", request);
                    console.log("res", respRoles);
                    if (respRoles.status == 200) {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Proyecto editada satisfactoriamente",
                                icon: "CheckSquareIcon",
                                variant: "success",
                            },
                        });
                        this.$router.push({ name: "contabilidad-configuracion-proyecto", });
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
            
            changeDate(e) {
                if(e != null){
                    this.proyecto.proy_fecha_final=this.proyecto.proy_fecha_inicio;
                }
            },

            validarCodigo(event,item,index){
                let c=0;
                for(let i = 0; i < this.proyecto.componente.length; i++){
                    if(this.proyecto.componente[i].comp_codigo == event && i != index){
                        c++;
                    }
                }
                if(c>0){
                    this.$toast({
                        component: ToastificationContent,
                        props: {
                            title: "El codigo ya fue utilizado en este proyecto",
                            icon: "AlertTriangleIcon",
                            variant: "danger",
                        },
                    });
                    item.comp_codigo="";
                }
            },

            async getInfoByID() {          
                let request = {
                    url: "/api/proyecto/" + this.$route.params.id,
                    method: "GET",
                };
                var respRoles = await store.dispatch("back/EXECUTE", request);
                console.log(respRoles);
                this.proyecto.proy_codigo = respRoles.proy_codigo;
                this.proyecto.proy_descripcion = respRoles.proy_descripcion;
                this.proyecto.proy_fecha_final = respRoles.proy_fecha_final;
                this.proyecto.proy_fecha_inicio = respRoles.proy_fecha_inicio;         
                respRoles.componente.forEach((element) => {
                    this.proyecto.componente.push({
                        comp_codigo: element.comp_codigo,
                        comp_descripcion: element.comp_descripcion,
                        comp_tipo: element.comp_tipo,                      
                    });
                });
            },
        },
    };
</script>
<style lang="scss">
    @import "~@core/scss/vue/libs/vue-select.scss";
</style>