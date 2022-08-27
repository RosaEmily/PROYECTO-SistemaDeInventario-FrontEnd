<script>
/* eslint-disable */
</script>
<template>
    <div class="h-screen flex w-full bg-img">
        <div class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center">
            <img src="@/assets/images/pages/not-authorized.svg" alt="graphic-not-authorized" class="col-4 mx-auto mb-4">
            <h1 class="sm:mx-0 mx-4 sm:mb-12 mb-8 text-5xl d-theme-heading-color">Contenido no autorizado!</h1>
            <p class="sm:mx-0 mx-4 sm:mb-12 mb-8 d-theme-text-inverse">Usted no tiene permisos para acceder a esta sección del sistema F.M. Tonny's</p>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";
    import NotAuthorized from "@/views/NotAuthorized.vue";
    import store from "@/store/index";
    import { BootstrapVue, BFormSelect } from "bootstrap-vue";
    import vSelect from "vue-select";
    import generalData from "@fakedata";
    import Ripple from "vue-ripple-directive";
    import { ValidationProvider, ValidationObserver } from "vee-validate";

    import moment from "moment";
    import axios from "axios";

    import { required, email } from '@validations';
    import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
    import { reduce } from 'postcss-rtl/lib/affected-props';
    import { formatDate } from '@/@core/utils/filter';

    Vue.use(BootstrapVue);
    
    export default {
        components: {
            vSelect,
            ValidationProvider,
            ValidationObserver,
            NotAuthorized,
        },
        directives: {
            Ripple,
        },
    };
</script>