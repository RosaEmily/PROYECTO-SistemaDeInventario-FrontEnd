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
  };
</script>
<template>
  <div>
    <br>
    <b-row >
      <b-col sm="12" style="text-align:center">
        <h1>{{ListData.titulo}}</h1>
      </b-col>
    </b-row><br>
    <b-row>
      <b-col class="mr-4 ml-4">
          <b-table
              :items="ListData.data"
              :fields="ListData.fields"
              >                           
          </b-table>
      </b-col>
    </b-row>    
  </div>
</template>
