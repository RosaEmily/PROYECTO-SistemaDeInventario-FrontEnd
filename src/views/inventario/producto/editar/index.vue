<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <b-tabs>
                <b-tab active title="Información principal">
                    <validation-observer ref="simpleRules">
                        <b-form class="ml-1 mr-1 mt-1">
                            <b-row>
                                <b-col sm="12">
                                    <b-form-group label="Codigo: ">
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Codigo"
                                            rules="required"
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    v-model="productData.codigo"
                                                    type="text"
                                                    :state="
                                                        errors.length > 0
                                                            ? false
                                                            : null
                                                    "
                                                    placeholder="Ingrese codigo"
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
                                                    v-model="productData.nombre"
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
                                    <b-form-group label="Descripcion: ">
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Descripcion"
                                            rules="required"
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    v-model="productData.descripcion"
                                                    type="text"
                                                    :state="
                                                        errors.length > 0
                                                            ? false
                                                            : null
                                                    "
                                                    placeholder="Ingrese descripcion"
                                                />
                                            </b-input-group>
                                            <small class="text-danger">{{
                                                errors[0]
                                            }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                    <b-form-group label="Marca: ">
                                        <b-input-group>
                                            <b-form-input
                                                v-model="productData.marca"
                                                type="text"
                                                placeholder="Ingrese marca"
                                            />
                                        </b-input-group>
                                    </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                    <b-form-group label="Categoria: ">
                                        <v-select
                                            v-model="productData.categoria"
                                            :dir="'ltr'"
                                            label="nombre"
                                            :value.sync="categorias.id"
                                            :options="categorias"
                                            placeholder="Ingrese categoria"
                                        />
                                    </b-form-group>
                                </b-col>                               
                                <b-col sm="6">
                                    <b-form-group label="Stock: ">
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Stock"
                                            rules="required|integer"
                                        >
                                            <b-input-group>
                                                <b-form-input
                                                    v-model="productData.stock"
                                                    type="number"
                                                    :state="
                                                        errors.length > 0
                                                            ? false
                                                            : null
                                                    "
                                                    placeholder="Ingrese stock"
                                                />
                                            </b-input-group>
                                            <small class="text-danger">{{
                                                errors[0]
                                            }}</small>
                                        </validation-provider>
                                    </b-form-group>
                                </b-col>
                                <b-col sm="6">
                                    <b-form-group label="Unidad de medida: ">
                                        <b-form-select
                                            v-model="productData.unidad"
                                            value-field="value"
                                            text-field="text"
                                            :options="unidades"
                                        />
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-form>
                    </validation-observer>
                </b-tab>
                <b-tab title="Precio">
                    <div>
                        <b-form>
                            <b-row class="mt-2 mb-2 justify-content-center">
                                <b-col md="10">
                                    <b-button
                                        id="toggle-btn"
                                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                        v-b-modal.modal-prevent-closing
                                        variant="secondary"
                                        class="float-right"
                                    >
                                        Añadir
                                    </b-button>
                                </b-col>
                            </b-row>
                        </b-form>
                        <b-row class="justify-content-center">
                            <b-col md="10" xl="10">
                                <b-table
                                    show-empty
                                    selectable
                                    :select-mode="'single'"
                                    responsive
                                    empty-text="No matching records found"
                                    :items="productData.precios"
                                    :fields="fields"
                                    @row-selected="onRowSelected"
                                >
                                    <template
                                        v-slot:cell(prepro_isprincipal)="{
                                            item,
                                            field: { key },
                                        }"
                                    >
                                        <div style="width: 0px !important">
                                            <b-form-checkbox
                                                v-model="item[key]"
                                            ></b-form-checkbox>
                                        </div>
                                    </template>
                                    <template #cell(actions)="data">
                                        <b-button
                                            size="sm"
                                            class="btn-danger mr-1"
                                            @click="deleteItem(data.index)"
                                        >
                                            <feather-icon icon="TrashIcon" />
                                        </b-button>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </div>
                </b-tab>
            </b-tabs>
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
        <b-modal
            id="modal-prevent-closing"
            ref="my-modal"
            title="Precio"
            centered
            ok-title="Aceptar"
            cancel-title="Cancelar"
            cancel-variant="outline-secondary"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                    :state="descripcionState"
                    label="Descripción"
                    invalid-feedback="Descripción es requerido"
                >
                    <b-form-input
                        id="descripcion-input"
                        v-model="descripcion"
                        :state="descripcionState"
                        required
                    />
                </b-form-group>
                <b-form-group
                    :state="precioState"
                    label="Precio: "
                    invalid-feedback="Precio es requerido"
                >
                    <b-form-input
                        id="precio-input"
                        v-model="precio"
                        type="number"
                        step="0.01"
                        :state="precioState"
                        required
                    />
                </b-form-group>
            </form>
        </b-modal>
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
            kardex: generalData.compra.tipokardex,
            productData: {
                codigo:"",
                nombre: "",
                marca: "",
                descripcion:"",
                stock: 0,
                categoria: null,
                unidad:"",
                sucursales: [],
                idUnm: 1,
                precios: [],
            },
            categorias: [],
            sucursales: [],
            unidades: generalData.inventario.unidades,
            fields: [
                {
                    key: "prepro_isprincipal",
                    label: "Precio principal",
                    sortable: false,
                },
                { key: "prepro_nombre", label: "Nombre", sortable: true },
                { key: "prepro_precio", label: "Precio", sortable: true },
                {
                    key: "actions",
                    label: "Acciones",
                    tdClass: "text-center",
                    thClass: "text-center",
                    sortable: false,
                },
            ],
            selected: [],
            descripcion: "",
            descripcionState: null,
            precio: "",
            precioState: null,
        };
    },
    mounted() {
        this.getConfiguraciones();
    },
    methods: {
        checkFormValidity() {
            const valid = this.$refs.form.checkValidity();
            this.descripcionState = valid;
            this.precioState = valid;
            return valid;
        },
        resetModal() {
            this.descripcion = "";
            this.descripcionState = null;
            this.precio = "";
            this.precioState = null;
        },
        handleOk(bvModalEvt) {
            bvModalEvt.preventDefault();
            this.handleSubmit();
        },
        handleSubmit() {
            if (!this.checkFormValidity()) {
                return;
            }
            this.productData.precios.push({
                prepro_nombre: this.descripcion,
                prepro_precio: this.precio,
                prepro_isprincipal: false,
            });
            this.$nextTick(() => {
                this.$refs["my-modal"].toggle("#toggle-btn");
            });
        },
        async getConfiguraciones() {         
            let cat = {
                url: "/api/categoria/lista",
                method: "GET",
            };
            var respCat = await store.dispatch("back/EXECUTE", cat);
            this.categorias = respCat;

            let request = {
                url: "/api/producto/" + this.$route.params.id,
                method: "GET",
            };
            var respRoles = await store.dispatch("back/EXECUTE", request);
            this.productData= respRoles;         
        },
        async Guardar() {
            console.log(this.productData);        
            let request = {
                url: "/api/producto/"+ this.$route.params.id,
                method: "PUT",
                // data:this.productData
                data: this.productData,
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                console.log("respuesta", respRoles);
                if (respRoles == 201) {
                    this.sendMessage(
                        "Producto registrado satisfactoriamente",
                        "EditIcon",
                        "success"
                    );
                    this.$router.push({ name: "inventario-lista-index" });
                } else if (respRoles == 400) {
                    this.sendMessage("El producto que quiere registrar ya existe", "EditIcon", "error");
                } else {
                    this.sendMessage("Error de servidor", "EditIcon", "error");
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
            this.$router.push({ name: "inventario-lista-index" });
        },
        deleteItem(index) {
            console.log("index:", index);
            this.$delete(this.productData.precios, index);
        },
        onRowSelected(items) {
            var i = 0;
            for (i in this.productData.precios) {
                this.productData.precios[i].prepro_isprincipal = false;
                if (
                    this.productData.precios[i].prepro_nombre ===
                        items[0].prepro_nombre &&
                    this.productData.precios[i].prepro_nombre ===
                        items[0].prepro_nombre
                ) {
                    this.productData.precios[i].prepro_isprincipal = true;
                }
            }
            this.selected = items;
            this.productData.precio = items[0].prepro_precio;
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
