<script>
/* eslint-disable */
import Vue from "vue";
import { BootstrapVue } from "bootstrap-vue";
import generalTable from "@/components/generalTable.vue";
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
            prepareForImport: false,
            paramsGrid: {
                selectOptions: {
                    allowSelect: true,
                    selectMode: "single",
                },
                fields: [
                    { key: "row", label: "", sortable: false },
                    {
                        key: "cb_nro_cuenta",
                        label: "Nro Cuenta",
                        sortable: true,
                    },
                    { key: "cb_moneda", label: "Moneda", sortable: true },
                    { key: "cb_desc_banco", label: "Banco", sortable: true },
                    {
                        key: "cb_nro_cta",
                        label: "Cuenta Contable",
                        sortable: true,
                    },
                    {
                        key: "actions",
                        label: "Acciones",
                        tdClass: "text-center",
                        thClass: "text-center",
                        sortable: false,
                    },
                ],
                filters: {
                    cb_nro_cuenta: "",
                    cb_moneda: "",
                    cb_desc_banco: "",
                    cb_nro_cta: "",
                },
                urlBack: "/api/cuenta_bancaria",
                edit: {
                    available: true,
                    redirect: true,
                    ruta: "/configuracion/cuenta_bancaria/editar",
                },
                delete: {
                    available: true,
                    ruta: "/api/cuenta_bancaria",
                },
                options: {
                    responsive: true,
                    primaryKey: "id",
                },
                pagination: true,
            },
        };
    },
    methods: {
        importarCsv() {},
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
            this.$router.push({
                name: "configuracion-cuenta-bancaria-agregar",
            });
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
            <b-row>
                <b-col md="6" class="">
                    <b-button variant="success"> Exportar </b-button>
                    <b-button class="ml-25" variant="light" @click="importar">
                        Importar
                    </b-button>
                </b-col>
                <b-col md="6" class="text-right">
                    <b-button variant="primary" @click="agregarCuenta">
                        Agregar Elemento
                    </b-button>
                </b-col>
            </b-row>
            <generalTable :paramsGrid="paramsGrid"> </generalTable>
        </b-card>
    </div>
</template>

<style lang="scss"></style>
