<script>
/* eslint-disable */
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import generalTable from "@/components/generalTable.vue";
import planCuenta from "@/components/plan-cuenta/edicion.vue";
import store from "@/store/index";
Vue.use(BootstrapVue);
export default {
    components: {
        generalTable,
    },
    data() {
        return {
            parse_header: [],
            parse_csv: [],
            sortOrders: {},
            alertMsg: [],
            datosCombox:[],
            prepareForImport: false,
            child_component: planCuenta,
            paramsGrid: {
                selectOptions: {
                    allowSelect: true,
                    selectMode: "single",
                },
                fields: [
                    { key: "row", label: "", sortable: true,combox:false,imput:false  },
                    { key: "codigo", label: "Codigo", sortable: true,combox:false,imput:true  },
                    { key: "nombre", label: "Nombre", sortable: true,combox:false,imput:true  },
                    { key: "categoria.nombre", label: "Categoria", sortable: true,combox:true,
                        url:"/api/categoria/lista",value:"codigo",text:"nombre", datoCombox:[], 
                        arrayInicial:[{"nombre":"TODOS","codigo":" "}],imput:false ,combox:false,},
                    {
                        key: "stock",
                        label: "Stock",
                        sortable: true,
                        combox:false,
                        imput:false 
                    },
                    /**{
                        key: "actions",
                        label: "Acciones",
                        tdClass: "text-center",
                        thClass: "text-center",
                        sortable: false,
                        combox:false,
                        imput:false 
                    },**/
                ],
                filters: {
                    codigo: "",
                    nombre: "",
                    stock: "",
                    categoria:"",
                },
                urlBack: "/api/producto/reposicion",
                items: [
                    {
                        isActive: true,
                        age: 40,
                        first_name: "Dickerson",
                        last_name: "Macdonald",
                    },
                    {
                        isActive: false,
                        age: 21,
                        first_name: "Larsen",
                        last_name: "Shaw",
                    },
                    {
                        isActive: false,
                        age: 89,
                        first_name: "Geneva",
                        last_name: "Wilson",
                    },
                    {
                        isActive: true,
                        age: 38,
                        first_name: "Jami",
                        last_name: "Carney",
                    },
                ],
                edit: {
                    available: false,
                    redirect: true,
                    ruta: "/inventario/productos/editar",
                },
                delete: {
                    available: false,
                    ruta: "/api/producto",
                },
                options: {
                    responsive: true,
                    primaryKey: "id",
                },
                pagination: true,
            },
        };
    },
    mounted() {
        this.listaCategoria();
    },
    methods: {
        async listaCategoria(){
            let cat = {
                url: "/api/categoria/lista",
                method: "GET",
            };
            var respCat = await store.dispatch("back/EXECUTE", cat);
            this.datosCombox = respCat;
            console.log(this.datosCombox)        
        },
        async importarCsv() {
            let request = {
                url: "/api/producto/insertArrayProduct/1",
                method: "POST",
                data: this.parse_csv,
            };
            console.log("reques:", this.parse_csv);
            try {
                var respRoles = await store.dispatch("back/EXECUTE", request);
                console.log(respRoles);
                if (respRoles.status === 200) {
                    this.$refs["modal-import"].hide();
                    //generalTable.methods.loadDataSource()
                }
            } catch (e) {
                console.log(e.message);
            }
        },
        importar() {
            this.alertMsg = [];
            this.prepareForImport = false;
            this.$refs["modal-import"].show();
        },
        validarCsv() {
            let msgError = [];
            return msgError;
        },
        csvJSON(csv) {
            var lines = csv.split("\n");
            var result = [];
            var headers = lines[0].split(",");
            this.parse_header = lines[0].split(",");
            lines[0].split(",").forEach((key) => {
                this.sortOrders[key] = 1;
            });
            lines.map(function (line, indexLine) {
                if (indexLine < 1) return; // Jump header line
                var obj = {};
                var currentline = line.split(",");
                headers.map(function (header, indexHeader) {
                    header = header.trim();
                    if (currentline[indexHeader]) {
                        let str = currentline[indexHeader].trim();
                        str = str.split("\r");
                        obj[header] = str[0];
                    } else {
                        obj[header] = currentline[indexHeader];
                    }
                });
                result.push(obj);
            });
            result.pop();
            console.log("result", result);
            return result;
        },
        loadCSV(e) {
            if (window.FileReader) {
                var reader = new FileReader();
                reader.readAsText(e.target.files[0]);
                document.querySelector("input[name=csv_file]").value =
                    e.target.files;
                reader.onload = (event) => {
                    var csv = event.target.result;
                    this.parse_csv = this.csvJSON(csv);
                    //validar si es error limpiar
                    let error = this.validarCsv();
                    if (error != []) {
                        e.target.value = "";
                        this.prepareForImport = false;
                        this.alertMsg = error;
                    } else {
                        this.prepareForImport = true;
                        this.alertMsg = ["Datos listos para la importación"];
                    }
                };
                reader.onerror = function (evt) {
                    if (evt.target.error.name == "NotReadableError") {
                        alert("Canno't read file !");
                    }
                };
            } else {
                alert("FileReader are not supported in this browser.");
            }
        },
        agregarCuenta() {
            this.$router.push({ name: "inventario-agregar-index" });
        },
    },
};
</script>

<template>
    <div>
        <b-modal
            centered
            title="Importación de datos"
            ok-only
            hide-footer
            id="modal-import"
            ref="modal-import"
            size="md"
        >
            <b-card-text class="">
                <b-form-group
                    label="CSV file to import: *"
                    label-for="account-nombres"
                    class="text-center"
                >
                    <input
                        type="file"
                        id="csv_file"
                        name="csv_file"
                        class="form-control"
                        @change="loadCSV($event)"
                    />
                </b-form-group>
                <b-alert
                    v-if="alertMsg.length > 0"
                    :variant="prepareForImport ? 'success' : 'danger'"
                    show
                >
                    <div class="alert-body">
                        <span v-for="item in alertMsg" :key="item">
                            {{ item }}<br />
                        </span>
                    </div>
                </b-alert>
            </b-card-text>
            <div class="text-center">
                <b-button variant="primary" @click="importarCsv"
                    >Importar Datos
                </b-button>
            </div>
        </b-modal>
        <b-card>         
            <generalTable :paramsGrid="paramsGrid"> </generalTable>
        </b-card>
    </div>
</template>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
