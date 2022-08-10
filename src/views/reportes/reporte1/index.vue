<script>
/* eslint-disable */
</script>
<template>
    <div class="container">
       <b-row>
            <b-col sm="6" align="center">
                <label>TOP 10 DE LOS PRODUCTOS MAS VENDIDOS</label>
                <canvas id="myChart" width="400" height="400"></canvas>
            </b-col>
            <b-col sm="6"  align="center">
                <label>CANTIDAD DE PRODUCTOS VENDIDOS POR MES</label>
                <canvas id="myLine" width="400" height="400"></canvas>
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
            }
        },
        mounted(){
            this.functionGrafico();

        },
        methods: {                      
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
                new Chart(document.getElementById('myChart').getContext('2d'), {
                    type: 'bar',
                    data: {
                        labels: nombres,
                        datasets: [{
                            label: 'Cantidad',
                            data: cantidad,
                            backgroundColor: [
                                'rgba('+255+', 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });

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
                new Chart(document.getElementById('myLine').getContext('2d'), {
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
                    }
                });
            }
        }
    }
</script>