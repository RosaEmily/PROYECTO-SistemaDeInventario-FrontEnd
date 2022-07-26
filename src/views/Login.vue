<script>
/* eslint-disable */
</script>
<template>
    <div class="auth-wrapper auth-v1 px-2">
        <div class="auth-inner py-2">
            <!-- Login v1 -->
            <b-card class="mb-0">
                <b-link class="brand-logo">
                    <!-- <vuexy-logo /> -->
                    <img src="@/assets/images/pages/logo.png" height="100" />

                    <!-- <h2 class="brand-text text-primary ml-1">
            Vuexy
          </h2> -->
                </b-link>

                <b-card-text class="text-center mb-2">
                    Bienvenid@ a WS CONTABILIDAD, por favor ingresa con tus
                    credenciales
                </b-card-text>

                <!-- form -->
                <validation-observer
                    ref="loginValidation"
                    #default="{ invalid }"
                >
                    <b-form class="auth-login-form mt-2" @submit.prevent>
                        <!-- email -->
                        <b-form-group label-for="email" label="Correo">
                            <validation-provider
                                #default="{ errors }"
                                name="Email"
                                rules="required"
                            >
                                <b-form-input
                                    id="login-email"
                                    v-model="userEmail"
                                    name="login-email"
                                    :state="errors.length > 0 ? false : null"
                                    placeholder="john@example.com"
                                    autofocus
                                />
                                <small class="text-danger">{{
                                    errors[0]
                                }}</small>
                            </validation-provider>
                        </b-form-group>

                        <!-- password -->
                        <b-form-group>
                            <div class="d-flex justify-content-between">
                                <label for="password">Contraseña</label>
                            </div>
                            <validation-provider
                                #default="{ errors }"
                                name="Password"
                                rules="required"
                            >
                                <b-input-group
                                    class="input-group-merge"
                                    :class="
                                        errors.length > 0 ? 'is-invalid' : null
                                    "
                                >
                                    <b-form-input
                                        id="login-password"
                                        v-model="password"
                                        :type="passwordFieldType"
                                        class="form-control-merge"
                                        :state="
                                            errors.length > 0 ? false : null
                                        "
                                        name="login-password"
                                        placeholder="Password"
                                    />

                                    <b-input-group-append is-text>
                                        <feather-icon
                                            class="cursor-pointer"
                                            :icon="passwordToggleIcon"
                                            @click="togglePasswordVisibility"
                                        />
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{
                                    errors[0]
                                }}</small>
                            </validation-provider>
                        </b-form-group>

                        <!-- submit button -->
                        <b-button
                            variant="primary"
                            type="submit"
                            block
                            :disabled="invalid"
                            @click="validationForm"
                        >
                            Ingresar
                        </b-button>
                    </b-form>
                </validation-observer>
            </b-card>
            <!-- /Login v1 -->
        </div>
    </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BCard,
} from "bootstrap-vue";
import store from "@/store/index";
import router from "@/router/index";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
// import {  } from ''

export default {
    components: {
        BRow,
        BCol,
        BLink,
        BFormGroup,
        BFormInput,
        BInputGroupAppend,
        BInputGroup,
        BCard,
        BFormCheckbox,
        BCardText,
        BCardTitle,
        BImg,
        BForm,
        BButton,
        VuexyLogo,
        ValidationProvider,
        ValidationObserver,
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            status: "",
            password: "",
            userEmail: "",
            sideImg: require("@/assets/images/pages/login-v2.svg"),
            required,
            email,
        };
    },
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === "password"
                ? "EyeIcon"
                : "EyeOffIcon";
        },
        imgUrl() {
            if (store.state.appConfig.layout.skin === "dark") {
                this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
                return this.sideImg;
            }
            return this.sideImg;
        },
    },
    methods: {
        validationForm() {
            this.$refs.loginValidation.validate().then(async (success) => {
                if (success) {
                    let request = {
                        url: "/api/auth/login",
                        method: "POST",
                        data: {
                            email: this.userEmail,
                            password: this.password,
                        },
                    };
                    var respRoles = await store.dispatch("back/EXECUTE",request);
                    if (respRoles == 200) {                     
                        let requestCorreo = {
                            url: "/api/auth/correo",
                            method: "POST",
                            data: {
                                email: this.userEmail,
                            },
                        };
                        var repCorreo = await store.dispatch("back/EXECUTE",requestCorreo);
                        localStorage.setItem("userData", repCorreo);
                        localStorage.setItem("accessToken","token")
                        console.log(" USERDATRA ->> ",localStorage.getItem("userData"))
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Bienvenido",
                                icon: "CheckSquareIcon",
                                variant: "success",
                            },
                        });
                        router.push({name:"index"})
                    } else if (respRoles == 403)  {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Usuario inactivo",
                                icon: "AlertTriangleIcon",
                                variant: "warning",
                            },
                        });
                    } else if (respRoles == 401)  {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Credenciales incorrectas",
                                icon: "AlertTriangleIcon",
                                variant: "danger",
                            },
                        });
                    } else {
                        this.$toast({
                            component: ToastificationContent,
                            props: {
                                title: "Error de servidor",
                                icon: "AlertTriangleIcon",
                                variant: "danger",
                            },
                        });
                    }
                }
            });
        },
    },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
