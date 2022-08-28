<script>
/* eslint-disable */
</script>
<script>
    import Vue from "vue";
    import { BootstrapVue } from "bootstrap-vue";
    import Ripple from "vue-ripple-directive";
    Vue.use(BootstrapVue);
    export default {
        props: ["ListData"],
        directives: {
            Ripple,
        },
        data() {
            return {
                productos: [],
                fields:[
                    { key: "nombre", label: "Producto", sortable: false },
                    { key: "unidad", label: "Medida", sortable: false },
                    { key: "cantidad", label: "Cantidad", sortable: false },
                    { key: "precio", label: "Precio", sortable: false },
                    { key: "subtotal", label: "Subtotal", sortable: false },
                ],
            };
        },     
    };
    
</script>
<template>
  <div>
    <br>
    <b-row class="mr-4 ml-4">
      <b-col sm="8">
        <b-row>
            <b-col sm="4" style="text-align:center">
                <img src="@/assets/images/pages/logomatizados.png" height="160" />
            </b-col>
            <b-col sm="8" >
                <b-row style="text-align:center">
                    <b-col sm="12">
                        <h1>Ferretería y Matizados Tonny's</h1>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <h5><b>DNI/RUC   :</b> {{ListData.data.doi}}</h5>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <h5><b>NOMBRE    :</b> {{ListData.data.nombre}}</h5>
                    </b-col>                   
                </b-row>
                <b-row>
                    <b-col sm="12">
                        <h5><b>DIRECCIÓN :</b> {{ListData.data.direccion}}</h5>
                    </b-col>                   
                </b-row>
            </b-col>
        </b-row>
      </b-col>
      <b-col sm="4" style="text-align:center">
        <b-row>
            <b-col sm="12">
                <h1>R.U.C. 1234567891011</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="12">
                <h1>{{ListData.data.desctipo}}</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="12">
                <h1>{{ListData.data.serie}}-{{ListData.data.correlativo}}</h1>
            </b-col>
        </b-row>
        <b-row>
            <b-col sm="12">
                <h3>{{ListData.data.fecha}}</h3>
            </b-col>
        </b-row>
      </b-col>    
    </b-row><br>
    <b-row class="mr-4 ml-4">
      <b-col>
          <b-table
              :items="ListData.productos"
              :fields="this.fields"
              >                           
          </b-table>
      </b-col>
    </b-row>
    <br>    
  </div>
</template>
