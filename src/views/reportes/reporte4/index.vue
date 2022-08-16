<script>
/* eslint-disable */
import Vue from "vue";
import Chart from 'chart.js';
import { BootstrapVue } from "bootstrap-vue";
import generalTable from "@/components/generalTable.vue";
import planCuenta from "@/components/plan-cuenta/edicion.vue";
import store from "@/store/index";
Vue.use(BootstrapVue);
export default {
    components: {
        generalTable,
    },
    data() {
        return {
            dataSource: [],
            dataResumen: [],
            grafico: null,
            fields: [
                { key: "nombre", label: "Nombre", sortable: false },
                { key: "cantidad", label: "Cantidad", sortable: false },
                { key: "precio", label: "Precio", sortable: false },
                { key: "inversion", label: "Inversion", sortable: false },
                { key: "acumulado", label: "Acumulado", sortable: false },
                { key: "porcentaje", label: "Porcentaje", sortable: false },
                { key: "zona", label: "Zona", sortable: false },
            ],
            resumen: [
                { key: "zona", label: "Zona", sortable: false },
                { key: "elementos", label: "Nro Productos", sortable: false },
                { key: "porcentaje_articulos", label: "% Productos", sortable: false },
                { key: "porcentaje_acumulado", label: "% Acumulado", sortable: false },
                { key: "porcentaje_inversion", label: "% Inversion", sortable: false },
                { key: "porcentaje_inversion_acumulado", label: "% Inversion Acumulada", sortable: false },
            ],
            stickyHeader: true,
            selected: [],
        };
    },
    mounted() {
        this.loadDataSource();
    },
    methods: {
        rowClass(item){
            try{
                const colorClass = 'table-primary'
                /* eslint-disable-next-line consistent-return */
                if (item.status === 'awesome') { return colorClass }
            } catch {
                return ''
            }
        },
        onRowSelected(items){
            this.selected = items;
        },
        async loadDataSource(){
            let request = {
                url: "/api/producto/productoABC",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            };
            var respRoles = await store.dispatch("back/EXECUTE", request);
            var acumulado_total=0.00, elementosA=0,elementosB=0,elementosC=0;
            for(let i = 0; i < respRoles.length; i++){
                let arr =  respRoles[i].split(',');
                acumulado_total = acumulado_total + parseFloat(arr[3]);                
            }
            var acumulado=0.00,total_cantidad=0,iA=0,iB=0,iC=0;
            for(let i = 0; i < respRoles.length; i++){
                let arr =  respRoles[i].split(',');
                acumulado = acumulado + parseFloat(arr[3]);
                total_cantidad = total_cantidad + parseInt(arr[1]);
                var zonas="";
                if((parseFloat(acumulado)/parseFloat(acumulado_total))<=0.8){
                    zonas= "A"
                    elementosA++;
                    iA=i;
                }else{
                    if((parseFloat(acumulado)/parseFloat(acumulado_total))<=0.95){
                        zonas= "B"
                        elementosB++;
                        iB=i;
                    }else{
                        zonas= "C"
                        elementosC++;
                        iC=i;
                    }
                }
                this.dataSource.push({
                    nombre: arr[0],
                    cantidad: arr[1],
                    precio: parseFloat(arr[2]).toFixed(2),
                    inversion: parseFloat(arr[3]).toFixed(2),
                    acumulado: parseFloat(acumulado).toFixed(2),
                    porcentaje:((parseFloat(acumulado)/parseFloat(acumulado_total))*100).toFixed(2)+"%",
                    zona:zonas,
                });
            }
            this.dataSource.push({
                nombre: "TOTAL",
                cantidad: total_cantidad,
                precio: "",
                inversion: parseFloat(acumulado).toFixed(2),
                acumulado: "",
                porcentaje:"",
                zona:"",
            });
            this.functionResumen(elementosA,elementosB,elementosC,iA,iB,iC);            
        },
        functionResumen(elementosA,elementosB,elementosC,iA,iB,iC){
            this.dataResumen.push({
                zona: "A",
                elementos: elementosA,
                porcentaje_articulos:((parseFloat(elementosA)/parseFloat(elementosA+elementosB+elementosC))*100).toFixed(2)+"%",
                porcentaje_acumulado:((parseFloat(elementosA)/parseFloat(elementosA+elementosB+elementosC))*100).toFixed(2)+"%",
                porcentaje_inversion:this.dataSource[iA].porcentaje,
                porcentaje_inversion_acumulado:this.dataSource[iA].porcentaje,
            });
            this.dataResumen.push({
                zona: "B",
                elementos: elementosB,
                porcentaje_articulos:((parseFloat(elementosB)/parseFloat(elementosA+elementosB+elementosC))*100).toFixed(2)+"%",
                porcentaje_acumulado:((parseFloat(elementosA+elementosB)/parseFloat(elementosA+elementosB+elementosC))*100).toFixed(2)+"%",
                porcentaje_inversion:(parseFloat(this.dataSource[iB].porcentaje)-parseFloat(this.dataSource[iA].porcentaje)).toFixed(2)+"%",
                porcentaje_inversion_acumulado:this.dataSource[iB].porcentaje,
            });
            this.dataResumen.push({
                zona: "C",
                elementos: elementosC,
                porcentaje_articulos:((parseFloat(elementosC)/parseFloat(elementosA+elementosB+elementosC))*100).toFixed(2)+"%",
                porcentaje_acumulado:((parseFloat(elementosA+elementosB+elementosC)/parseFloat(elementosA+elementosB+elementosC))*100).toFixed(2)+"%",
                porcentaje_inversion:(parseFloat(this.dataSource[iC].porcentaje)-(parseFloat(this.dataResumen[1].porcentaje_inversion)+parseFloat(this.dataSource[iA].porcentaje))).toFixed(2)+"%",
                porcentaje_inversion_acumulado:this.dataSource[iC].porcentaje
            });
            this.dataResumen.push({
                zona: "TOTAL",
                elementos: elementosA+elementosB+elementosC,
                porcentaje_articulos:((parseFloat(elementosA+elementosB+elementosC)/parseFloat(elementosA+elementosB+elementosC))*100).toFixed(2)+"%",
                porcentaje_acumulado:"",
                porcentaje_inversion:(parseFloat(this.dataResumen[0].porcentaje_inversion)+(parseFloat(this.dataResumen[1].porcentaje_inversion)+parseFloat(this.dataResumen[2].porcentaje_inversion))).toFixed(2)+"%",
                porcentaje_inversion_acumulado:"",
            });
            this.functionPareto();
        },
        functionPareto(){           
            var mixedChart = new Chart(document.getElementById('myPareto').getContext('2d'), {
                type: 'bar',
                data: {
                    datasets: [{
                        label: '% INVERSION ',
                        data: [parseFloat(this.dataResumen[0].porcentaje_inversion),parseFloat(this.dataResumen[1].porcentaje_inversion),
                        parseFloat(this.dataResumen[2].porcentaje_inversion)],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor:[
                            'rgba(255, 99, 132, 2)',
                            'rgba(255, 99, 132, 2)',
                            'rgba(255, 99, 132, 2)',
                        ],
                    }, 
                    {
                        label: '% INVERSION ACUMULADO',
                        data: [parseFloat(this.dataResumen[0].porcentaje_inversion_acumulado), parseFloat(this.dataResumen[1].porcentaje_inversion_acumulado),
                        parseFloat(this.dataResumen[2].porcentaje_inversion_acumulado)],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                        options: {
                            scales: {
                                yAxes: [{
                                    stacked: true
                                }]
                            }
                        },                        
                        type: 'line'
                    }],
                    labels: ['A', 'B', 'C']
                },
            });

        },
        onRowSelected(items){
            this.selected = items;
        }, 
       
    },
};
</script>

<template>
    <div>        
        <b-card>
             <b-tabs>
                <b-tab active title="Tabla de ABC">
                    <div>
                        <b-row class="mb-1">
                            <b-col sm="9"> </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-table
                                    show-empty
                                    :select-mode="'single'"
                                    responsive
                                    empty-text="No matching records found"
                                    :items="dataSource"
                                    :fields="fields"
                                    :tbody-tr-class="rowClass"
                                    v-on:row-selected="onRowSelected"
                                    :sticky-header="stickyHeader"
                                    style="max-height: 380px;"
                                    class="sticky-footer"
                                >                                                   
                                    <template #cell()="data">
                                        <span class="text-nowrap">{{ data.value }}</span>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </div>                    
                </b-tab>
                <b-tab title="Resumen">
                    <div>
                        <b-row class="mb-1">
                            <b-col sm="9"> </b-col>
                        </b-row>
                        <b-row>
                            <b-col cols="12">
                                <b-table
                                    show-empty
                                    :select-mode="'single'"
                                    responsive
                                    empty-text="No matching records found"
                                    :items="dataResumen"
                                    :fields="resumen"
                                    :tbody-tr-class="rowClass"
                                    v-on:row-selected="onRowSelected"
                                    :sticky-header="stickyHeader"
                                    style="max-height: 380px;"
                                    class="sticky-footer"
                                >                                                   
                                    <template #cell()="data">
                                        <span class="text-nowrap">{{ data.value }}</span>
                                    </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </div>                    
                </b-tab>
                <b-tab title="Grafico de Pareto">
                    <div>                                 
                        <b-row>                            
                            <b-col cols="12" align="center">
                                <canvas id="myPareto" width="800" height="300"></canvas>
                            </b-col>
                        </b-row>
                    </div>
                </b-tab>
            </b-tabs>       
        </b-card>
    </div>
</template>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
