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
        <h1>{{ListData.correlativo}}</h1>
      </b-col>
    </b-row><br>    
  </div>
</template>
