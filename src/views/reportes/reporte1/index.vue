<script>
/* eslint-disable */
</script>
<template>
    <div class="container">
        <b-row>
            <b-col sm="6" align="center">
                <label>AÑO</label>
                <b-input-group>
                    <v-select
                        v-model="anio"
                        label="text"
                        style="width: 100%"
                        :options="anios"
                        @input="getAnioMes()"
                    >
                        <template v-slot:selected-option="option">
                            {{ option.text }}
                        </template>
                        <template v-slot:option="option">
                            {{ option.text }}
                        </template>
                    </v-select>
                </b-input-group>            
            </b-col>
            <b-col sm="6"  align="center">
                <label>MES</label>
                 <b-input-group>
                    <v-select
                        v-model="mes"
                        label="text"
                        style="width: 100%"
                        :options="meses"
                        @input="functionGraficoParametroMes()"
                    >
                        <template v-slot:selected-option="option">
                            {{ option.text }}
                        </template>
                        <template v-slot:option="option">
                            {{ option.text }}
                        </template>
                    </v-select>
                </b-input-group> 
            </b-col>
       </b-row>
       <br>
       <b-row>
            <b-col sm="6" align="center">
                <label>TOP 10 DE LOS PRODUCTOS MAS VENDIDOS</label>
                <canvas id="myChart" width="400" height="400"></canvas>
            </b-col>
            <b-col sm="6"  align="center">
                <label>CANTIDAD DE PRODUCTOS VENDIDOS</label>
                <canvas id="myLine" width="400" height="400"></canvas>
            </b-col>
       </b-row>
       <br>
       <b-row>
            <b-col sm="6" align="center">
                <label>TOP 10 DE LOS PROVEEDORES MAS FRECUENTES</label>
                <canvas id="myPie" width="400" height="400"></canvas>
            </b-col>
            <b-col sm="6"  align="center">
                <label>TOP 10 DE LOS CLIENTES MAS FRECUENTES</label>
                <canvas id="myPolar" width="400" height="400"></canvas>
            </b-col>
       </b-row>
    </div>
</template>
<script>
    import Chart from 'chart.js';
    import Vue from "vue";
    import store from "@/store/index";
    import { BootstrapVue} from "bootstrap-vue";
    import vSelect from "vue-select";
    import Ripple from "vue-ripple-directive";
    import { ValidationProvider, ValidationObserver } from "vee-validate";    
    import moment from "moment";
    import axios from "axios";
    
    Vue.use(BootstrapVue);

    export default{
        components: {
            vSelect,
            ValidationProvider,
            ValidationObserver,
        },
        directives: {
            Ripple,
        },
        data() {
            return {
                cantidad: [],
                graficoChar: null,
                graficoLine: null,
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
            }
        },
        mounted(){
            this.functionGrafico();
            this.getConfigurarion();
        },
        methods: {
            async getAnioMes(){
                if(this.anio.value!="TODOS"){
                    this.meses = [];
                    let mes = {
                        url: "/api/venta/MesAnio/"+this.anio.value,
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

                    /** LINE CHART */
                    let catM = {
                        url: "/api/venta/CantidadMesParam/"+this.anio.value,
                        method: "GET",
                    };
                    let nomM = {
                        url: "/api/venta/NombreMesParam/"+this.anio.value,
                        method: "GET",
                    };
                    var cantidadMes = await store.dispatch("back/EXECUTE", catM);
                    var nombresMes = await store.dispatch("back/EXECUTE", nomM);
                    this.functionLine(nombresMes,cantidadMes);

                    /* Grafico BAR */
                    let cat = {
                        url: "/api/venta/CantidadTop10Anio/"+this.anio.value,
                        method: "GET",
                    };
                    let nom = {
                        url: "/api/venta/NombresTop10Anio/"+this.anio.value,
                        method: "GET",
                    };
                    var cantidad = await store.dispatch("back/EXECUTE", cat);
                    var nombres = await store.dispatch("back/EXECUTE", nom);
                    this.functionChart(nombres,cantidad);

                     /* Grafico PIE */
                    let P = {
                        url: "/api/venta/Top10ProveedorAnio/"+this.anio.value,
                        method: "GET",
                    };
                    var PR = await store.dispatch("back/EXECUTE", P);
                    var arrayDoi=[];
                    var arrayCantidad=[];
                    for(let i = 0; i < PR.length; i++){
                        let arr =  PR[i].split(',');
                        arrayDoi.push(arr[0]);
                        arrayCantidad.push(arr[1]);
                    }
                    this.functionPie(arrayDoi,arrayCantidad);

                    /* Grafico POLAR */
                    let C = {
                        url: "/api/venta/Top10ClienteAnio/"+this.anio.value,
                        method: "GET",
                    };
                    var CL = await store.dispatch("back/EXECUTE", C);
                    var arrayDoiC=[];
                    var arrayCantidadC=[];
                    for(let i = 0; i < CL.length; i++){
                        let arr =  CL[i].split(',');
                        arrayDoiC.push(arr[0]);
                        arrayCantidadC.push(arr[1]);
                    }
                    this.functionPolar(arrayDoiC,arrayCantidadC);



                }else{
                    this.functionMes();
                    this.functionGrafico();
                }            
            },
            async getConfigurarion(){                
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
                this.functionMes();            
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
            async functionGrafico(){
                /* Grafico BAR */
                let cat = {
                    url: "/api/venta/cantidadTOP10",
                    method: "GET",
                };
                let nom = {
                    url: "/api/venta/nombresTOP10",
                    method: "GET",
                };
                var cantidad = await store.dispatch("back/EXECUTE", cat);
                var nombres = await store.dispatch("back/EXECUTE", nom);
                this.functionChart(nombres,cantidad);
                /* LINE CHART */
                let catM = {
                    url: "/api/venta/CantidadMes",
                    method: "GET",
                };
                let nomM = {
                    url: "/api/venta/NombreMes",
                    method: "GET",
                };
                var cantidadMes = await store.dispatch("back/EXECUTE", catM);
                var nombresMes = await store.dispatch("back/EXECUTE", nomM);
                this.functionLine(nombresMes,cantidadMes);            
                /* Grafico PIE */
                let P = {
                    url: "/api/venta/Top10Proveedor",
                    method: "GET",
                };
                var PR = await store.dispatch("back/EXECUTE", P);
                var arrayDoi=[];
                var arrayCantidad=[];
                for(let i = 0; i < PR.length; i++){
                    let arr =  PR[i].split(',');
                    arrayDoi.push(arr[0]);
                    arrayCantidad.push(arr[1]);
                }
                this.functionPie(arrayDoi,arrayCantidad);

                /* Grafico POLAR */
                let C = {
                    url: "/api/venta/Top10Cliente",
                    method: "GET",
                };
                var CL = await store.dispatch("back/EXECUTE", C);
                var arrayDoiC=[];
                var arrayCantidadC=[];
                for(let i = 0; i < CL.length; i++){
                    let arr =  CL[i].split(',');
                    arrayDoiC.push(arr[0]);
                    arrayCantidadC.push(arr[1]);
                }
                this.functionPolar(arrayDoiC,arrayCantidadC);
            },
            async functionGraficoParametroMes(){
                if(this.anio.value!="TODOS" && this.mes.value!="TODOS"){
                    /* LINE CHART */
                    let catM = {
                        url: "/api/venta/CantidadSemana/"+this.anio.value+"/"+this.mes.value,
                        method: "GET",
                    };
                    let nomM = {
                        url: "/api/venta/NombreSemana/"+this.anio.value+"/"+this.mes.value,
                        method: "GET",
                    };
                    var cantidadMes = await store.dispatch("back/EXECUTE", catM);
                    var nombresMes = await store.dispatch("back/EXECUTE", nomM); 
                    this.functionLine(nombresMes,cantidadMes);

                    /* Grafico BAR */
                    let cat = {
                        url: "/api/venta/CantidadTop10Anio2/"+this.anio.value+"/"+this.mes.value,
                        method: "GET",
                    };
                    let nom = {
                        url: "/api/venta/NombresTop10Anio2/"+this.anio.value+"/"+this.mes.value,
                        method: "GET",
                    };
                    var cantidad = await store.dispatch("back/EXECUTE", cat);
                    var nombres = await store.dispatch("back/EXECUTE", nom);
                    this.functionChart(nombres,cantidad);
                    /* Grafico PIE */
                    let P = {
                        url: "/api/venta/Top10ProveedorMesAnio/"+this.anio.value+"/"+this.mes.value,
                        method: "GET",
                    };
                    var PR = await store.dispatch("back/EXECUTE", P);
                    var arrayDoi=[];
                    var arrayCantidad=[];
                    for(let i = 0; i < PR.length; i++){
                        let arr =  PR[i].split(',');
                        arrayDoi.push(arr[0]);
                        arrayCantidad.push(arr[1]);
                    }
                    this.functionPie(arrayDoi,arrayCantidad);

                    /* Grafico POLAR */
                    let C = {
                        url: "/api/venta/Top10ClienteMesAnio/"+this.anio.value+"/"+this.mes.value,
                        method: "GET",
                    };
                    var CL = await store.dispatch("back/EXECUTE", C);
                    var arrayDoiC=[];
                    var arrayCantidadC=[];
                    for(let i = 0; i < CL.length; i++){
                        let arr =  CL[i].split(',');
                        arrayDoiC.push(arr[0]);
                        arrayCantidadC.push(arr[1]);
                    }
                    this.functionPolar(arrayDoiC,arrayCantidadC);
                }else{
                    if(this.mes.value!="TODOS" && this.anio.value==="TODOS"){
                        /* LINE CHART */
                        let catM = {
                            url: "/api/venta/CantidadSemanaOtro/"+this.mes.value,
                            method: "GET",
                        };
                        let nomM = {
                            url: "/api/venta/NombreSemanaOtro/"+this.mes.value,
                            method: "GET",
                        };
                        var cantidadMes = await store.dispatch("back/EXECUTE", catM);
                        var nombresMes = await store.dispatch("back/EXECUTE", nomM); 
                        this.functionLine(nombresMes,cantidadMes);

                        /* Grafico BAR */
                        let cat = {
                            url: "/api/venta/CantidadTop10Anio1/"+this.mes.value,
                            method: "GET",
                        };
                        let nom = {
                            url: "/api/venta/NombresTop10Anio1/"+this.mes.value,
                            method: "GET",
                        };
                        var cantidad = await store.dispatch("back/EXECUTE", cat);
                        var nombres = await store.dispatch("back/EXECUTE", nom);
                        this.functionChart(nombres,cantidad);
                        /* Grafico PIE */
                        let P = {
                            url: "/api/venta/Top10ProveedorMes/"+this.mes.value,
                            method: "GET",
                        };
                        var PR = await store.dispatch("back/EXECUTE", P);
                        var arrayDoi=[];
                        var arrayCantidad=[];
                        for(let i = 0; i < PR.length; i++){
                            let arr =  PR[i].split(',');
                            arrayDoi.push(arr[0]);
                            arrayCantidad.push(arr[1]);
                        }
                        this.functionPie(arrayDoi,arrayCantidad);

                        /* Grafico POLAR */
                        let C = {
                            url: "/api/venta/Top10ClienteMes/"+this.mes.value,
                            method: "GET",
                        };
                        var CL = await store.dispatch("back/EXECUTE", C);
                        var arrayDoiC=[];
                        var arrayCantidadC=[];
                        for(let i = 0; i < CL.length; i++){
                            let arr =  CL[i].split(',');
                            arrayDoiC.push(arr[0]);
                            arrayCantidadC.push(arr[1]);
                        }
                        this.functionPolar(arrayDoiC,arrayCantidadC);
                    }else{
                        if(this.mes.value==="TODOS" && this.anio.value!="TODOS"){
                            /** LINE CHART */
                            let catM = {
                                url: "/api/venta/CantidadMesParam/"+this.anio.value,
                                method: "GET",
                            };
                            let nomM = {
                                url: "/api/venta/NombreMesParam/"+this.anio.value,
                                method: "GET",
                            };
                            var cantidadMes = await store.dispatch("back/EXECUTE", catM);
                            var nombresMes = await store.dispatch("back/EXECUTE", nomM);
                            this.functionLine(nombresMes,cantidadMes);

                            /* Grafico BAR */
                            let cat = {
                                url: "/api/venta/CantidadTop10Anio/"+this.anio.value,
                                method: "GET",
                            };
                            let nom = {
                                url: "/api/venta/NombresTop10Anio/"+this.anio.value,
                                method: "GET",
                            };
                            var cantidad = await store.dispatch("back/EXECUTE", cat);
                            var nombres = await store.dispatch("back/EXECUTE", nom);
                            this.functionChart(nombres,cantidad);

                             /* Grafico PIE */
                            let P = {
                                url: "/api/venta/Top10ProveedorAnio/"+this.anio.value,
                                method: "GET",
                            };
                            var PR = await store.dispatch("back/EXECUTE", P);
                            var arrayDoi=[];
                            var arrayCantidad=[];
                            for(let i = 0; i < PR.length; i++){
                                let arr =  PR[i].split(',');
                                arrayDoi.push(arr[0]);
                                arrayCantidad.push(arr[1]);
                            }
                            this.functionPie(arrayDoi,arrayCantidad);

                            /* Grafico POLAR */
                            let C = {
                                url: "/api/venta/Top10ClienteAnio/"+this.anio.value,
                                method: "GET",
                            };
                            var CL = await store.dispatch("back/EXECUTE", C);
                            var arrayDoiC=[];
                            var arrayCantidadC=[];
                            for(let i = 0; i < CL.length; i++){
                                let arr =  CL[i].split(',');
                                arrayDoiC.push(arr[0]);
                                arrayCantidadC.push(arr[1]);
                            }
                            this.functionPolar(arrayDoiC,arrayCantidadC);
                        }else{
                            this.functionGrafico();          
                        }                      
                    }                    
                }                
            },
            functionLine(nombresMes,cantidadMes){
                if(this.graficoLine!=null){
                    this.graficoLine.destroy();
                }
                this.graficoLine=new Chart(document.getElementById('myLine').getContext('2d'), {
                    type: 'line',
                    data:  {
                        labels: nombresMes,
                        datasets: [{
                            label: 'Cantidad',
                            data: cantidadMes,
                            fill: false,
                            borderColor: 'rgb(75, 192, 192)',
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
            functionChart(nombres,cantidad){
                var backgroundColor= [],borderColor=[];
                if(this.graficoChar!=null){
                    this.graficoChar.destroy();
                }
                for(let i = 0; i < nombres.length; i++){
                    backgroundColor.push(this.backgroundColor[i]);
                    borderColor.push(this.borderColor[i]);
                }
                this.graficoChar=new Chart(document.getElementById('myChart').getContext('2d'), {
                    type: 'bar',
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
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
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
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                });
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
                            label: 'Cantidad',
                            data: cantidad,
                            backgroundColor:backgroundColor,
                            borderColor:borderColor,
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                });
            }      
        }
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