<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="simpleRules">
                <b-form class="ml-1 mr-1 mt-1">
                    <b-row>
                        <b-col sm="4">
                            <b-form-group label="Foto: " >                                
                                <figure>
                                    <b-img id="imgusuario"  style="max-width: 100%;" name="imgusuario" :src="src" alt="foto_usuario" />
                                </figure>
                            </b-form-group>
                        </b-col>         
                        <b-col sm="8">
                            <b-form-group label="Correo: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Email"
                                    rules="required|email"
                                >
                                    <b-form-input
                                        id="address"
                                        v-model="usuarioData.email"
                                        placeholder="Correo"
                                        :readonly="true"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                            <b-form-group label="Username: " >                               
                                    <b-form-input
                                        id="address"
                                        v-model="usuarioData.username"
                                        placeholder="username"
                                        :readonly="true"
                                    />
                            </b-form-group>
                             <b-form-group label="Nombre: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Nombre"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="usuarioData.nombre"
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
                             <b-form-group label="Apellido: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Apellido"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="usuarioData.apellido"
                                            type="text"
                                            :state="
                                                errors.length > 0
                                                    ? false
                                                    : null
                                            "
                                            placeholder="Ingrese Apellido"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>
                            <b-col md="12" class="text-center mt-1">
                                <b-button
                                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                    variant="primary"
                                    class="mr-1"
                                    @click="booleanpassword=false,validatePassword()"
                                >
                                    Cambiar contraseña 
                                </b-button>                   
                            </b-col>
                            <b-form-group label="Elegir Foto: ">                               
                                <b-input-group>                                   
                                    <b-form-file
                                        v-model="foto" 
                                        accept=".jpg, .png, .jpeg"
                                        placeholder="Elija un archivo o suéltelo aquí..."
                                        drop-placeholder="Suelta el archivo aquí..."
                                        id="imgFoto"
                                        @change="Validar($event)"
                                    >
                                        <template slot="file-name" slot-scope="{ names }">
                                            <b-badge variant="dark">{{ names[0] }}</b-badge>
                                            <b-badge v-if="names.length > 1" variant="dark" class="ml-1">
                                            + {{ names.length - 1 }} More files
                                            </b-badge>
                                        </template>
                                    </b-form-file>                                    
                                </b-input-group>                                     
                            </b-form-group>
                        </b-col>                                                 
                    </b-row>
                </b-form>
            </validation-observer>
            <b-row>
                <b-col md="12" class="text-center mt-1">
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="mr-1"
                        @click="booleanpassword=true,validatePassword()"
                    >
                        Guardar 
                    </b-button>                   
                </b-col>
            </b-row>
        </b-card>
        <b-modal
            id="modalCambiarPassword"
            ref="modalCambiarPassword"
            centered
            title="Cambiar Contraseña"
            ok-only
            hide-footer
            size="sm"
        >
            <b-card-text>
                <validation-observer ref="validatePasswordCambioForm">
                    <b-form class="ml-1 mr-1 mt-1">
                        <b-row>
                            <b-col>
                                <b-form-group label="Nueva Contraseña: ">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="Nuevo contraseña"
                                        rules="required"
                                    >                           
                                        <b-input-group>                                   
                                            <b-form-input
                                                v-model="password0"
                                                :type="passwordFieldType"
                                                class="form-control-merge"                                        
                                                placeholder="Contraseña"
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
                                <b-form-group label="Confirmar contraseña: ">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="confirmar contraseña"
                                        rules="required"
                                    >                           
                                        <b-input-group>                                   
                                            <b-form-input
                                                v-model="password1"
                                                :type="passwordFieldType1"
                                                class="form-control-merge"                                        
                                                placeholder="Confirmar Contraseña"
                                            />

                                            <b-input-group-append is-text>
                                                <feather-icon
                                                    class="cursor-pointer"
                                                    :icon="passwordToggleIcon1"
                                                    @click="togglePasswordVisibility1"
                                                />
                                            </b-input-group-append>
                                        </b-input-group>
                                        <small class="text-danger">{{
                                            errors[0]
                                        }}</small>
                                    </validation-provider>                                   
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-form>
                </validation-observer>           
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
                    </b-col>
                </b-row>
            </b-card-text>      
        </b-modal>
        <b-modal
            id="modalValidatePassword"
            ref="modalValidatePassword"
            centered
            title="Confirmar con la contraseña"
            ok-only
            hide-footer
            size="sm"
        >
            <b-card-text>
                <validation-observer ref="validatePasswordForm">
                    <b-form class="ml-1 mr-1 mt-1">
                          <b-row>
                            <b-col>
                                <b-form-group label="Confirmar contraseña: ">
                                    <validation-provider
                                        #default="{ errors }"
                                        name="password"
                                        rules="required"
                                    >                           
                                        <b-input-group>                                   
                                            <b-form-input
                                                v-model="validatepassword"
                                                :type="passwordFieldType2"
                                                class="form-control-merge"                                        
                                                placeholder="Escriba Contraseña"
                                            />
                                
                                            <b-input-group-append is-text>
                                                <feather-icon
                                                    class="cursor-pointer"
                                                    :icon="passwordToggleIcon2"
                                                    @click="togglePasswordVisibility2"
                                                />
                                            </b-input-group-append>
                                        </b-input-group>
                                        <small class="text-danger">{{
                                            errors[0]
                                        }}</small>
                                    </validation-provider>                                   
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-form>
                </validation-observer>           
                <b-row>
                    <b-col md="12" class="text-center mt-1">
                        <b-button
                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                            variant="primary"
                            class="mr-1"
                            @click="savePassword"
                        >
                            Confirmar 
                        </b-button>                   
                    </b-col>
                </b-row>
            </b-card-text>      
        </b-modal> 
    </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import store from "@/store/index";
import VueSweetalert2 from "vue-sweetalert2";

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
import VuexyLogo from "@core/layouts/components/Logo.vue";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";



Vue.use(BootstrapVue);
Vue.use(VueSweetalert2);

export default {
    components: {
        BFormSelect,
        ValidationProvider,
        ValidationObserver,
        vSelect,
        BButton,
        BModal,
    },
    mixins: [togglePasswordVisibility],
    directives: {
        "b-modal": VBModal,
        Ripple,
    },
    data() {
        return {
            usuarioData: {
                id:0,
                nombre: "",
                apellido: "",
                email: "",
                password:"",
                username:"",
                restablecer:false,
                foto:"",
            },
            booleanpassword:true,
            validatepassword:"",
            formData:null,
            formData1:null,
            sideImg: require("@/assets/images/pages/login-v2.svg"),
            required,
            password0:"",
            password1:"",
            src:"",
            foto:null,       
        };
    },
    computed: {      
        passwordToggleIcon() {
            return this.passwordFieldType === "password"
                ? "EyeIcon"
                : "EyeOffIcon";
        },
        passwordToggleIcon1() {
            return this.passwordFieldType1 === "password"
                ? "EyeIcon"
                : "EyeOffIcon";
        },
        passwordToggleIcon2() {
            return this.passwordFieldType2 === "password"
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
    mounted() {
        this.getInfoByID();
    },
    methods: {
        validatePassword(){
            this.validatepassword=""
            this.$refs["modalValidatePassword"].show(); 
        },
        validateCambiarPassword(){
            this.validatepassword=""
            this.$refs["modalCambiarPassword"].show(); 
        },
        async savePassword(){
            this.$refs.validatePasswordForm.validate().then((success) => {
                if (success) {
                    let passowrd = {
                        url: "/api/auth/password/"+ this.usuarioData.id+"/"+this.validatepassword,
                        method: "GET",                        
                    };
                    store.dispatch("back/EXECUTE", passowrd).then((resp) => {
                        if(resp){                            
                            this.$refs["modalValidatePassword"].hide();
                            this.sendMessage(
                                "Password correcto",
                                "EditIcon",
                                "success"
                            );
                            if(this.booleanpassword){
                                this.validationForm();
                            }else{
                                this.validateCambiarPassword();
                            }
                        }else{
                            this.sendMessage(
                                "Password incorrecto",
                                "AlertTriangleIcon",
                                "danger"
                            );
                        }
                    });                                       
                }
            })
        },
        Validar(input) {
            var uploadFile = input.target.files[0];
            if (!(/\.(jpg|jpeg|png)$/i).test(uploadFile.name)) {                
                this.sendMessage(
                    "El archivo a adjuntar no es una imagen de tipo jpg , jpeg o png.",
                    "EditIcon",
                    "danger"
                );
                this.foto=null;
                document.getElementById("imgFoto").value="";
            }else{
                if(uploadFile.size>=1000000){
                    this.sendMessage(
                        "La foto no debe pasar los 10 MB",
                        "EditIcon",
                        "danger"
                    );
                    this.foto=null;
                    document.getElementById("imgFoto").value="";
                }else{
                    this.sendMessage(
                        "Foto adjutado correctamente.",
                        "EditIcon",
                        "succuss"
                    );
                    this.src=window.URL.createObjectURL(input.target.files[0]);
                }                
            }     
        },          
        async getInfoByID() {
            let request = {
                url: "/api/auth/perfil/" + JSON.parse(localStorage.getItem('userData')).id,
                method: "GET",
            };
            var respRoles = await store.dispatch("back/EXECUTE", request);
            this.usuarioData= respRoles;
            console.log(respRoles);
            this.src=respRoles.foto;          
        },       
        async Guardar() {
            if(this.password0!==this.password1){
                this.sendMessage(
                    "El password no coincide",
                    "AlertTriangleIcon",
                    "danger"
                );
            }else{
                this.$refs["modalCambiarPassword"].hide();
                this.$swal({
                    title: "¿Está seguro que desea editar su perfil?",
                    text: "El sistema cerrar la sesion y tendra que volver a iniciar sesion con los nuevos datos.",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Si, editar!",
                    customClass: {
                        confirmButton: "btn btn-primary",
                        cancelButton: "btn btn-outline-danger ml-1",
                    },
                    buttonsStyling: false,
                }).then((result) => {
                    if (result.value) {
                        this.usuarioData.password=this.password1;
                        this.formData= new FormData();
                        this.formData.append("file",this.foto);                        
                        this.formData.append("usuarioNombre",this.usuarioData.nombre);
                        this.formData.append("usuarioApellido",this.usuarioData.apellido);
                        this.formData.append("usuarioPassword",this.usuarioData.password);
                        if(this.foto==null){
                            let request = {
                                url: "/api/auth/perfil2/"+ this.usuarioData.id,
                                method: "PUT",
                                // data:this.usuarioData
                                data:this.formData,
                                headers: {
                                    Accept:'application/json',
                                    'Content-Type':'multipart/form-data'
                                },
                            };
                            try {
                                store.dispatch("back/EXECUTE", request).then((r) => {
                                    if (r == 201) {
                                        this.sendMessage(
                                            "Perfil editado satisfactoriamente",
                                            "EditIcon",
                                            "success"
                                        );
                                        localStorage.removeItem('userData')
                                        localStorage.removeItem('accessToken')
                                        this.$router.go({ name: 'login' })
                                        //this.$router.push({ name: "usuario-lista-index" });
                                    } else if (r == 400) {
                                        this.sendMessage("El usuario que quiere editar ya existe", "AlertTriangleIcon", "danger");
                                    } else {
                                        this.sendMessage("Error de servidor", "AlertTriangleIcon", "danger");
                                    }
                                    console.log(r);
                                });                        
                            } catch (e) {
                                console.log(e.message);
                            }
                        }else{
                            let request = {
                                url: "/api/auth/perfil1/"+ this.usuarioData.id,
                                method: "PUT",
                                // data:this.usuarioData
                                data:this.formData,
                                headers: {
                                    Accept:'application/json',
                                    'Content-Type':'multipart/form-data'
                                },
                            };
                            try {
                                store.dispatch("back/EXECUTE", request).then((r) => {
                                    if (r == 201) {
                                        localStorage.removeItem('userData')
                                        localStorage.removeItem('accessToken')
                                        this.$router.go({ name: 'login' })
                                        this.sendMessage(
                                            "Perfil editado satisfactoriamente",
                                            "EditIcon",
                                            "success"
                                        );
                                        //this.$router.push({ name: "usuario-lista-index" });
                                    } else if (r == 400) {
                                        this.sendMessage("El usuario que quiere editar ya existe", "AlertTriangleIcon", "danger");
                                    } else {
                                        this.sendMessage("Error de servidor", "AlertTriangleIcon", "danger");
                                    }
                                    console.log(r);
                                });                        
                            } catch (e) {
                                console.log(e.message);
                            }
                        }
                      
                    }
                });
            }
        },
        validationForm() {
            this.$refs.simpleRules.validate().then((success) => {
                if (success) {
                    this.Guardar();
                }
            });
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
