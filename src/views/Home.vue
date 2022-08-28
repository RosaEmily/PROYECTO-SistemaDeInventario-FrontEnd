<script>
/* eslint-disable */
</script>
<template>
    <div>
        <div>
            <b-row>
                <div class="col-4">
                    <b-card>
                        <b-row>
                            <b-col align="center">
                                <div class="pb-1">CLIENTES</div>
                                <h1> {{this.clientes}} </h1>
                            </b-col>
                        </b-row>
                    </b-card>   
                </div>
                <div class="col-4">
                    <b-card>
                        <b-row>
                            <b-col align="center">
                                <div class="pb-1">PROVEEDORES</div>
                                <h1> {{this.proveedores}} </h1>
                            </b-col>
                        </b-row>
                    </b-card>   
                </div>
                <div class="col-4">
                    <b-card>
                        <b-row>
                            <b-col align="center">
                                <div class="pb-1">PRODUCTOS</div>
                                <h1> {{this.productos}} </h1>
                            </b-col>
                        </b-row>
                    </b-card>   
                </div>       
            </b-row>
            <b-row>
                <div class="col-6">
                    <b-card>
                        <b-row>
                            <div class="col-6 mt-2">
                                <span class="p-1 text-success bg-light-success" style="font-size: 25px;">
                                    <i class="fa-solid fa-money-bill-trend-up"></i>
                                </span>
                            </div>
                            <div class="col-6" align="right">
                                <div class="pb-1">TOTAL DE INGRESOS</div>
                                <h1>S/. {{this.ingresos.toFixed(2)}}</h1>
                            </div>
                        </b-row>
                        <br>
                        <b-row>
                            <b-col align="center">
                                <canvas id="myLineI" height="200px" max-height="200px"></canvas>               
                            </b-col>
                        </b-row>
                    </b-card>   
                </div>
                <div class="col-6">
                    <b-card>
                        <b-row>
                            <div class="col-6 mt-2">
                                <span class="p-1 text-danger bg-light-danger" style="font-size: 25px;">
                                    <i class="fa-solid fa-money-bill-transfer"></i>
                                </span>
                            </div>
                            <div class="col-6" align="right">
                                <div class="pb-1">TOTAL DE COSTOS</div>
                                <h1>S/. {{this.egresos.toFixed(2)}}</h1>
                            </div>
                        </b-row>
                        <br>
                        <b-row>
                            <b-col align="center">
                                <canvas id="myLineE" height="200px" max-height="200px"></canvas>
                            </b-col>
                        </b-row>
                    </b-card>   
                </div>       
            </b-row>
            <b-row>
                <div class="col-12">
                    <b-card>
                        <b-row>
                            <div class="col-6 mt-2">
                                <span class="p-1 text-warning bg-light-warning" style="font-size: 25px;">
                                    <i class="fa-solid fa-cash-register"></i>
                                </span>
                            </div>
                            <div class="col-6" align="right">
                                <div class="pb-1">TOTAL DE UTILIDADES</div>
                                <h1>S/. {{this.utilidad.toFixed(2)}}</h1>
                            </div>
                        </b-row>
                        <br>
                        <b-row>
                            <b-col align="center">
                                <canvas id="myLineU" height="100px" max-height="100px"></canvas>
                            </b-col>
                        </b-row>
                    </b-card>   
                </div>       
            </b-row>
            <b-row>
                <div class="col-6">
                    <b-card>
                        <b-row>
                            <div class="col-6 mt-2">
                                <span class="p-1 text-secondary bg-light-secondary" style="font-size: 25px;">
                                    <i class="fa-solid fa-truck-ramp-box"></i>
                                </span>
                            </div>
                            <div class="col-6" align="right">
                                <div class="pb-1">PROVEEDORES MAS FRECUENTES</div>
                                <h1>TOP 10 (S/.)</h1>
                            </div>
                        </b-row>
                        <br>
                        <b-row>
                            <b-col align="center">
                                <canvas id="myPie" height="200px" max-height="200px"></canvas>
                            </b-col>
                        </b-row>
                    </b-card>   
                </div>       
                <div class="col-6">
                    <b-card>
                        <b-row>
                            <div class="col-6 mt-2">
                                <span class="p-1 text-secondary bg-light-secondary" style="font-size: 25px;">
                                    <i class="fa-solid fa-basket-shopping"></i>
                                </span>
                            </div>
                            <div class="col-6" align="right">
                                <div class="pb-1">CLIENTES MAS FRECUENTES</div>
                                <h1>TOP 10 (S/.)</h1>
                            </div>
                        </b-row>
                        <br>
                        <b-row>
                            <b-col align="center">
                                <canvas id="myPolar" height="200px" max-height="200px"></canvas>
                            </b-col>
                        </b-row>
                    </b-card>   
                </div>       
            </b-row>   
        </div>
    </div>
</template> 

<script>
    import { BCard, BCardText, BLink } from 'bootstrap-vue';
    import Chart from 'chart.js';
    //import ChartDataLabels from 'chartjs-plugin-datalabels';
    import Vue from "vue";
    import store from "@/store/index";
    import { BootstrapVue, BFormSelect } from "bootstrap-vue";
    import vSelect from "vue-select";
    import Ripple from "vue-ripple-directive";
    import { ValidationProvider, ValidationObserver } from "vee-validate";
    import '@fortawesome/fontawesome-free/js/all.js';
    Vue.use(BootstrapVue);
    //Chart.plugins.register(ChartDataLabels);
    export default {
    components: {
        BCard,
        BCardText,
        BLink,
        vSelect,
        ValidationProvider,
        ValidationObserver,
    },
    directives: {
        Ripple,
    },
    data() {
        return {
        egresos:0.00,
        ingresos:0.00,
        utilidad:0.00,
        productos:0.00,
        proveedores:0.00,
        clientes:0.00,
        graficoLineI: null,
        graficoLineE: null,
        graficoLineU: null,
        graficoPie: null,
        graficoPolar: null,
        anios: [],
        anio: {
            value: "",
            text: "",            
        },
        meses: [],
        mes: {
            value: "",
            text: "",            
        },
        backgroundColor:[
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(219, 218, 218, 0.2)',
            'rgba(0, 255, 31, 0.2)',
            'rgba(0, 151, 255, 0.2)',
            'rgba(255, 116, 0, 0.2)',
        ],
        borderColor:[
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(219, 218, 218, 1)',
            'rgba(0, 255, 31, 1)',
            'rgba(0, 151, 255, 1)',
            'rgba(255, 116, 0, 1)',
        ],                          
        };
    },
    mounted() {
        this.getConfigurarion();
    },
    methods: {
        async functionAnio(){
            /** AÑOOO **/
            let anio = {
                url: "/api/venta/Anio",
                method: "GET",
            };
            var anios = await store.dispatch("back/EXECUTE", anio);
            this.anios.push({
                text: "TODOS",
                value: "TODOS",
            });
            for(let i = 0; i < anios.length; i++){
                this.anios.push({
                    text: anios[i],
                    value: anios[i],
                });
            }
            this.anio = {
                text: this.anios[0].value,
                value: this.anios[0].value,
            };
        },
        async functionMes(){
            this.meses = [];
            /** MES **/
            let mes = {
                url: "/api/venta/MesTotal",
                method: "GET",
            };
            var meses = await store.dispatch("back/EXECUTE", mes);
            this.meses.push({
                text: "TODOS",
                value: "TODOS",
            });
            for(let i = 0; i < meses.length; i++){
                let arr =  meses[i].split(',');
                this.meses.push({
                    text: arr[1],
                    value: arr[0],
                });
            }
            this.mes = {
                text: this.meses[0].value,
                value: this.meses[0].value,
            };
        },  
        async getConfigurarion(){
            this.functionAnio();
            this.functionMes();
            let egresos = {
                url: "/api/compra/Egresos",
                method: "GET",
            };
            var egresoss = await store.dispatch("back/EXECUTE", egresos);
            this.egresos = egresoss;

            let ingresos = {
                url: "/api/compra/Ingresos",
                method: "GET",
            };
            var ingresoss = await store.dispatch("back/EXECUTE", ingresos);
            this.ingresos = ingresoss;

            this.utilidad = this.ingresos - this.egresos;

            let cantidadProd = {
                url: "/api/producto/cantidad",
                method: "GET",
            };
            var cantidadProds = await store.dispatch("back/EXECUTE", cantidadProd);

            this.productos = cantidadProds;

            let cantidadProv = {
                url: "/api/proveedor/cantidad",
                method: "GET",
            };
            var cantidadProvs = await store.dispatch("back/EXECUTE", cantidadProv);

            this.proveedores = cantidadProvs;

            let cantidadCli = {
                url: "/api/cliente/cantidad",
                method: "GET",
            };
            var cantidadClis = await store.dispatch("back/EXECUTE", cantidadCli);

            this.clientes = cantidadClis;

            this.functionGraficos();

            this.functionGraficos2();
            
        },
        async functionGraficos(){
            let egresosGrafico = {
                url: "/api/compra/EgresosAnio",
                method: "GET",
            };
            var egresosGraficoS = await store.dispatch("back/EXECUTE", egresosGrafico);
            var arrayAnioE=[];
            var arrayTotalE=[];
            for(let i = 0; i < egresosGraficoS.length; i++){
                let arr =  egresosGraficoS[i].split(',');
                arrayAnioE.push(arr[0]);
                arrayTotalE.push(parseFloat(arr[1]).toFixed(2));
            }
            this.functionLineE(arrayAnioE,arrayTotalE);

            let ingresosGrafico = {
                url: "/api/compra/IngresosAnio",
                method: "GET",
            };
            var ingresosGraficoS = await store.dispatch("back/EXECUTE", ingresosGrafico);
            var arrayAnioI=[];
            var arrayTotalI=[];
            for(let i = 0; i < ingresosGraficoS.length; i++){
                let arr =  ingresosGraficoS[i].split(',');
                arrayAnioI.push(arr[0]);
                arrayTotalI.push(parseFloat(arr[1]).toFixed(2));
            }
            this.functionLineI(arrayAnioI,arrayTotalI);

            if(arrayAnioI.length>arrayAnioE.length){
                var arrayAnio=[];
                var arrayTotal=[];
                for(let i = 0; i < arrayAnioI.length; i++){
                    arrayAnio.push(arrayAnioI[i]);
                    for(let j = 0; j < arrayAnioE.length; j++){
                        if(arrayAnioI[i]===arrayAnioE[j]){
                            arrayTotal.push(parseFloat(arrayTotalI[i]-arrayTotalE[j]).toFixed(2));
                            j=arrayAnioE.length;
                        }
                        if(j+1===arrayAnioE.length){
                            arrayTotal.push(parseFloat(arrayTotalI[i]).toFixed(2));
                        }
                    }
                }
                this.functionLineU(arrayAnio,arrayTotal);
            }else{
                var arrayAnio=[];
                var arrayTotal=[];
                for(let i = 0; i < arrayAnioE.length; i++){
                    arrayAnio.push(arrayAnioE[i]);
                    for(let j = 0; j < arrayAnioI.length; j++){
                        if(arrayAnioE[i]===arrayAnioI[j]){
                            arrayTotal.push(parseFloat(arrayTotalI[i]-arrayTotalE[j]).toFixed(2));
                            j=arrayAnioI.length;
                        }
                        if(j+1===arrayAnioI.length){
                            arrayTotal.push(parseFloat(-arrayTotalE[i]).toFixed(2));
                        }
                    }
                }
                this.functionLineU(arrayAnio,arrayTotal);
            }
        },
        async functionGraficos2(){
            let P = {
                url: "/api/compra/EgresosProveedor",
                method: "GET",
            };
            var PR = await store.dispatch("back/EXECUTE", P);
            var arrayDoi=[];
            var arrayCantidad=[];
            for(let i = 0; i < PR.length; i++){
                let arr =  PR[i].split(',');
                arrayDoi.push(arr[0]);
                arrayCantidad.push(parseFloat(arr[1]).toFixed(2));
            }
            this.functionPie(arrayDoi,arrayCantidad);
            
            let C = {
                url: "/api/compra/IngresosCliente",
                method: "GET",
            };
            var CL = await store.dispatch("back/EXECUTE", C);
            var arrayDoiC=[];
            var arrayCantidadC=[];
            for(let i = 0; i < CL.length; i++){
                let arr =  CL[i].split(',');
                arrayDoiC.push(arr[0]);
                arrayCantidadC.push(parseFloat(arr[1]).toFixed(2));
            }
            this.functionPolar(arrayDoiC,arrayCantidadC);
        },
        functionPolar(nombres,cantidad){
            var backgroundColor= [],borderColor=[];
            if(this.graficoPolar!=null){
                this.graficoPolar.destroy();
            }
            for(let i = 0; i < nombres.length; i++){
                backgroundColor.push(this.backgroundColor[i]);
                borderColor.push(this.borderColor[i]);
            }
            this.graficoPolar=new Chart(document.getElementById('myPolar').getContext('2d'), {
                type: 'polarArea',
                data: {
                    labels: nombres,
                    datasets: [{
                        label: 'Total',
                        data: cantidad,
                        backgroundColor:backgroundColor,
                        borderColor:borderColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        position: 'right',
                    }
                }
            });
        },
        functionPie(nombres,cantidad){
            var backgroundColor= [],borderColor=[];
            if(this.graficoPie!=null){
                this.graficoPie.destroy();
            }
            for(let i = 0; i < nombres.length; i++){
                backgroundColor.push(this.backgroundColor[i]);
                borderColor.push(this.borderColor[i]);
            }
            this.graficoPie=new Chart(document.getElementById('myPie').getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: nombres,
                    datasets: [{
                        label: 'Cantidad',
                        data: cantidad,
                        backgroundColor:backgroundColor,
                        borderColor:borderColor,
                        borderWidth: 1
                    }]
                },
                options: {
                    legend: {
                        position: 'right',
                    }
                }
            });
        },
        functionLineI(nombresMes,cantidadMes){
            if(this.graficoLineI!=null){
                this.graficoLineI.destroy();
            }
            this.graficoLineI=new Chart(document.getElementById('myLineI').getContext('2d'), {
                type: 'line',
                data:  {
                    labels: nombresMes,
                    datasets: [{
                        label: 'INGRESOS',
                        data: cantidadMes,
                        fill: false,
                        borderColor: 'rgb(40, 199, 111)',
                        backgroundColor: 'rgba(40, 199, 111, .3)',
                        tension: 0.1,
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true,
                        }]
                    }
                }
            });
        },
        functionLineE(nombresMes,cantidadMes){
            if(this.graficoLineE!=null){
                this.graficoLineE.destroy();
            }
            this.graficoLineE=new Chart(document.getElementById('myLineE').getContext('2d'), {
                type: 'line',
                data:  {
                    labels: nombresMes,
                    datasets: [{
                        label: 'COSTOS',
                        data: cantidadMes,
                        fill: false,
                        borderColor: 'rgb(234, 84, 85)',
                        backgroundColor: 'rgba(234, 84, 85, .3)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
        },
        functionLineU(nombresMes,cantidadMes){
            if(this.graficoLineU!=null){
                this.graficoLineU.destroy();
            }
            this.graficoLineU=new Chart(document.getElementById('myLineU').getContext('2d'), {
                type: 'line',
                data:  {
                    labels: nombresMes,
                    datasets: [{
                        label: 'UTILIDADES',
                        data: cantidadMes,
                        fill: false,
                        borderColor: 'rgb(255, 159, 67)',
                        backgroundColor: 'rgba(255, 159, 67, .3)',
                        tension: 0.1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    },
                }
            });
        },                        
    },
    }
</script>
<style lang="scss" scoped>
    .per-page-selector {
        width: 90px;
    }
    .invoice-filter-select {
        min-width: 190px;
        ::v-deep .vs__selected-options {
            flex-wrap: nowrap;
        }
        ::v-deep .vs__selected {
            width: 100px;
        }
    }
</style>
<style lang="scss">
    @import "~@core/scss/vue/libs/vue-select.scss";
</style>