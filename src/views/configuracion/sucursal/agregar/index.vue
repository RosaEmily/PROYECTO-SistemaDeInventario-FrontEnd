<template>
  <div>
    <b-card>
      <validation-observer ref="simpleRules">
        <b-form class="ml-1 mr-1 mt-1">
          <b-row>
            <b-col sm="12">
              <b-form-group
                label="Nombre: "
              >
                <validation-provider
                  #default="{ errors }"
                  name="Nombre"
                  rules="required"
                >
                  <b-form-input
                    v-model="sucursalData.nombre"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Nombre"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group
                label="Dirección: "
              >
                <b-form-input
                  id="direccion"
                  v-model="sucursalData.direccion"
                  placeholder="Dirección"
                />
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group
                label="Telefono: "
              >
                <validation-provider
                  #default="{ errors }"
                  name="Telefono"
                  rules="integer"
                >
                  <b-form-input
                    v-model="sucursalData.telefono"
                    :state="errors.length > 0 ? false:null"
                    type="text"
                    placeholder="Telefono"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col sm="12">
              <b-form-group
                label="Descripción: "
              >
                <b-form-input
                  v-model="sucursalData.descripcion"
                  type="text"
                  placeholder="Descripción"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
      <b-row>
        <b-col
          md="12"
          class="text-center mt-1"
        >
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
/* eslint-disable */ 
import Vue from "vue"
import store from '@/store/index'
import {BootstrapVue } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'
import generalData from '@fakedata'
Vue.use(BootstrapVue)
export default {
 props: ["paramsGrid"],
 components: {
   ValidationProvider,
   ValidationObserver,
 },
 directives: {
    Ripple,
  },
 data() {
    return {
      sucursalData:{
        nombre: "",
        direccion: "",
        telefono: "",
        descripcion: "",
        empId: 1
      },
    }
 },
 mounted(){

 },
 methods:{
   validationForm() {
      this.$refs.simpleRules.validate().then(success => {        
      if (success) {
        this.Guardar()
      }
      })
    },
   cancelar(){
     this.$router.push({name:"configuracion-sucursal"})
   },
   sendMessage(title,icon,variant){
      this.$toast({
      component: ToastificationContent,
      props: {
        title: title,
        icon:icon,
        variant: variant,
      },
    })
   },
   async Guardar(){
     let request= {
        url:"/api/sucursal",
        method:"POST",
        data:this.sucursalData
      }
      try{
        var respRoles = await store.dispatch('back/EXECUTE',request)
        if(respRoles.status==500){
          this.sendMessage('Error de servidor','EditIcon',"error")
        }
        else {
          this.sendMessage('Sucursal registrada satisfactoriamente','EditIcon',"success")
          this.$router.push({name:"configuracion-sucursal"})
        }
      }
      catch(e){
        console.log(e.message)
      }
   }
 }
}
</script>

<style lang="scss">

</style>
