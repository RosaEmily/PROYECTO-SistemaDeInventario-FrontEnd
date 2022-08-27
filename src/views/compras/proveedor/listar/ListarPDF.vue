<script>
/* eslint-disable */
</script>
<script>
  import Vue from "vue";
  import store from "@/store/index";
  import { BootstrapVue, BFormSelect } from "bootstrap-vue";
  import Ripple from "vue-ripple-directive";
  import { ValidationProvider, ValidationObserver } from "vee-validate";
  import generalData from "@fakedata";

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
              data: [],
              fields:[
                { key: "doi", label: "DNI/RUC", sortable: false },
                { key: "tipoDoi", label: "TIPO", sortable: false },
                { key: "nombre", label: "NOMBRE", sortable: false },
                { key: "direccion", label: "DIRECCION", sortable: false },
                { key: "email", label: "EMAIL", sortable: false },
                { key: "estado", label: "ESTADO", sortable: false },
                { key: "created_at", label: "FECHA DE CREACIÓN", sortable: false },
              ],            
          };
      },
      mounted() {
        this.listarData();
      },
      methods: {
        async listarData() {
          let list = {
            url: "/api/proveedor/all",
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          };
          var resp = await store.dispatch("back/EXECUTE", list);
          var tipodoi="DNI",estado="HABILITADO",email="N/A"
          for(let i=0;i<resp.length;i++){
            if(resp[i].tipoDoi==="02"){
              tipodoi="DNI"
            }else{
              tipodoi="RUC"
            }
            if(resp[i].estado){
              estado="ACTIVO"
            }else{
              estado="INACTIVO"
            }
            if(resp[i].email===""){
              email="N/A"
            }else{
              email=resp[i].email
            }
            this.data.push({
              tipoDoi:tipodoi,
              doi:resp[i].doi,
              nombre:resp[i].nombre,
              email:email,
              direccion:resp[i].direccion,
              created_at:resp[i].created_at,
              estado:estado,
            })
          }
        },
      },
  };
</script>
<template>
  <div>
    <br>
    <b-row >
      <b-col sm="12" style="text-align:center">
        <h1>LISTADO DE PROVEEDORES</h1>
      </b-col>
    </b-row><br>
    <b-row>
      <b-col class="mr-4 ml-4">
          <b-table
              :items="data"
              :fields="fields"
              >                           
          </b-table>
      </b-col>
    </b-row>    
  </div>
</template>
