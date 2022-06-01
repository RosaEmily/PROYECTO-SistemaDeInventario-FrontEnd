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
                                    <b-form-group label="Nombre: " >
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
                                            v-model="productData.categorias"
                                            :dir="'ltr'"
                                            multiple
                                            label="cat_nombre"
                                            :value.sync="categorias.id"
                                            :options="categorias"
                                        />
                                    </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                    <b-form-group label="Kardex: ">
                                        <b-form-select
                                            v-model="productData.prod_tipo_kardex"
                                            :options="kardex"
                                        />
                                    </b-form-group>
                                </b-col>
                                <b-col sm="12">
                                    <b-form-group label="Sucursal: ">
                                        <v-select
                                            v-model="productData.sucursales"
                                            :dir="'ltr'"
                                            multiple
                                            label="suc_nombre"
                                            :value.sync="sucursales.id"
                                            :options="sucursales"
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
                                            v-model="productData.idUnm"
                                            value-field="id"
                                            text-field="unm_nombre"
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
            </b-tabs>
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
                    label-for="descripcion-input"
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
                    label-for="precio-input"
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
                nombre: "",
                marca: "",
                stock: "",
                prod_tipo_kardex: "MERCADERIA",
                precio: 50,
                idEmpresa: 1,
                categorias: [],
                sucursales: [],
                idUnm: 1,
                precios: [],
            },
            categorias: [],
            sucursales: [],
            unidades: [],
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
        this.getInfoByID();
    },
    methods: {
        async getInfoByID() {
            let request = {
                url: "/api/producto/product/" + this.$route.params.id,
                method: "GET",
            };
            var respRoles = await store.dispatch("back/EXECUTE", request);
            console.log("resp2", respRoles);
            this.productData.precios = respRoles.precio_producto;
            // this.productData.descripcion = respRoles.prod_descripcion
            this.productData.prod_tipo_kardex = respRoles.prod_tipo_kardex;
            this.productData.nombre = respRoles.prod_nombre;
            this.productData.marca = respRoles.prod_marca;
            this.productData.stock = respRoles.prod_stock_inicial;
            this.productData.idUnm = respRoles.prod_unm_id;
            this.productData.categorias = respRoles.producto_categoria;
            this.productData.sucursales = respRoles.producto_sucursal;
        },
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
            let suc = {
                url: "/api/sucursal",
                method: "GET",
            };
            var respSuc = await store.dispatch("back/EXECUTE", suc);
            this.sucursales = respSuc.rows;

            let cat = {
                url: "/api/categoria/1",
                method: "GET",
            };
            var respCat = await store.dispatch("back/EXECUTE", cat);
            this.categorias = respCat;

            let unid = {
                url: "/api/unidadMedida",
                method: "GET",
            };
            var respUnid = await store.dispatch("back/EXECUTE", unid);
            this.unidades = respUnid;
        },
        async Guardar() {
            var i;
            var result = [];
            for (i in this.productData.categorias) {
                var obj = {};
                obj["cat_id"] = this.productData.categorias[i].id;
                result.push(obj);
            }
            var sucur = [];
            for (i in this.productData.sucursales) {
                var obj = {};
                obj["suc_id"] = this.productData.sucursales[i].id;
                sucur.push(obj);
            }
            let request = {
                url: "/api/producto/" + this.$route.params.id,
                method: "PUT",
                // data:this.productData
                data: {
                    nombre: this.productData.nombre,
                    marca: this.productData.marca,
                    stock: this.productData.stock,
                    precio: this.productData.precio,
                    idEmpresa: this.productData.idEmpresa,
                    prod_tipo_kardex: this.productData.prod_tipo_kardex,
                    categorias: result,
                    sucursales: sucur,
                    idUnm: this.productData.idUnm,
                    precios: this.productData.precios,
                },
            };
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                console.log("respuesta", respRoles);
                if (respRoles.status == 200) {
                    this.sendMessage(
                        "Producto editado satisfactoriamente",
                        "EditIcon",
                        "success"
                    );
                    this.$router.push({ name: "inventario-lista-index" });
                } else if (respRoles.status == 500) {
                    this.sendMessage("Error de servidor", "EditIcon", "error");
                } else {
                    this.sendMessage(respRoles.message, "EditIcon", "error");
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
        agregar() {},
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
