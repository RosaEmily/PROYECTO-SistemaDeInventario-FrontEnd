<script>
/* eslint-disable */
</script>
<template>
    <div>
        <b-card>
            <validation-observer ref="agregarCompraRules">
                <b-form>
                    <b-row>
                        <b-col sm="4">
                            <b-form-group label="Operación Tributaria: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Operación Tributaria"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-select
                                            v-model="compraData.ca_operacion"
                                            class="form-control"
                                            :options="operaciones"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="8">
                            <b-form-group label="Clasificación: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Classificacion"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <v-select
                                            v-model="clasificacion"
                                            label="text"
                                            style="width: 100%"
                                            :options="clasificaciones"
                                            @input="changeClasif($event)"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="3">
                            <b-form-group label="Entidad: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Entidad"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <v-select
                                            v-model="compraData.ca_doi"
                                            label="prov_doi"
                                            style="width: 83%"
                                            :options="supliers"
                                            @input="changeSuplier($event)"
                                        />
                                        <b-button
                                            size="21"
                                            style="width: 17%"
                                            class="btn-icon"
                                            @click="showModalProveedor()"                 
                                        >
                                            <feather-icon icon="PlusCircleIcon"/>
                                        </b-button>
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="4">
                            <b-form-group label="Razón: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Razón"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="compraData.ca_razon_social"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="5">
                            <b-form-group label="Dirección: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Dirección"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="compraData.ca_direccion"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Moneda: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Moneda"
                                    rules="required"
                                >
                                    <b-form-select
                                        v-model="compraData.ca_moneda"
                                        class="form-control"
                                        :options="monedas"
                                        @input="changeMoneda($event)"
                                    />
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="TC: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="TC"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="compraData.ca_tipo_cambio"
                                            @keypress="onlyDecimalNumbers($event)"
                                            @input="changeTipoCambio()"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="1">
                            <b-form-group label="Destino: ">
                                <b-input-group>
                                    <b-button
                                        size="21"
                                        style="width: 100%"
                                        class="btn"
                                        @click="showModalDestino()"
                                    >
                                        Ver
                                    </b-button>
                                    
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Tipo Doc: ">
                                <b-input-group>
                                    <b-input-group>
                                        <b-form-input 
                                            v-model="tipo.doc.value"
                                            :readonly="true"
                                        />
                                    </b-input-group>                                
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col sm="3">
                            <b-form-group label="Descripción Doc: ">
                                <b-input-group>
                                    <b-form-input 
                                        v-model="tipo.doc.text"
                                        :readonly="true"
                                    />
                                </b-input-group>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Serie: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Serie"
                                    rules="required|alpha-num|length:4"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="compraData.ca_serie"
                                            :maxlength="4"
                                            placeholder="Ingrese serie"
                                            @keypress="onlyNumbersAndLetters($event)"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Número : ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Número"
                                    rules="required|integer|max:10"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="compraData.ca_correlativo"
                                            :maxlength="10"
                                            @keypress="onlyNumbers($event)"
                                        />
                                    </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2" v-if="st_nota_credito">
                            <b-form-group label="Doc. Referencia: ">
                                <b-button 
                                    class="btn-secondary"
                                    style="width: 100%"
                                    @click="showModalDocRef()"
                                >
                                    <feather-icon icon="SearchIcon" />
                                </b-button>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="Motivo : ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Motivo"
                                    rules="required"
                                >
                                    <v-select
                                        v-model="motivo.doc"
                                        label="text"
                                        style="width: 100%"
                                        :options="notas_credito"
                                        @input="changeMotivo($event)"
                                    >
                                        <template v-slot:selected-option="option">
                                            {{ option.value }}
                                        </template>
                                        <template v-slot:option="option">
                                            {{ option.value }} - {{ option.text }}
                                        </template>
                                    </v-select>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="4">
                            <b-form-group label="Descripción Motivo: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Descripción Motivo"
                                    rules="required"
                                >
                                    <b-input-group>
                                        <b-form-input 
                                            v-model="motivo.desc"
                                            :readonly="true"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="F. Emisión: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="F. Emisión"
                                    rules="required"
                                >
                                <b-input-group>
                                    <b-form-datepicker
                                        id="datepicker-dateformat1"
                                        v-model="compraData.pa_fecha_emision"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                        locale="es"
                                        @input="changeDate($event)"
                                    />
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group label="F. Vencimiento: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="F. Vencimiento"
                                    rules="required"
                                >
                                <b-input-group>
                                    <b-form-datepicker
                                        id="datepicker-dateformat2"
                                        v-model="compraData.pa_fecha_vencimiento"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                        :min="compraData.pa_fecha_emision"
                                        locale="es"
                                    />
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="3">
                            <b-form-group label="Opción: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Opción"
                                    rules="required"
                                >
                                <b-input-group>
                                    <b-form-select 
                                        v-model="compraData.ca_opcion"
                                        :options="opciones"
                                    />
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2" v-if="compraData.ca_opcion=='3'">
                            <b-form-group label="Porcentaje: " >                               
                                <validation-provider
                                    #default="{ errors }"
                                    name="Porcentaje"
                                    rules="selectedItem"
                                >                             
                                <b-input-group>
                                    <b-form-input
                                        v-model="compraData.detracciones.porcentaje"
                                        :disabled="true"
                                    />
                                    <b-input-group-append>
                                        <b-button
                                            size="21"
                                            class="btn-icon"
                                            @click="showModalDetraccion()"
                                        >
                                            <feather-icon icon="SearchIcon"/>
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2" v-if="compraData.ca_opcion=='3'">
                            <b-form-group label="Total: " >                                
                                    <b-input-group>
                                        <b-form-input
                                            :value="(compraData.detracciones==false || compraData.lib_total_debe=='NaN') ? 0 : (compraData.detracciones.porcentaje*compraData.lib_total_debe)/100"
                                            :disabled="true"
                                        />                                      
                                    </b-input-group>                                
                            </b-form-group>
                        </b-col>
                        <b-col sm="3" v-if="compraData.ca_opcion=='3'">
                            <b-form-group label="Nro. de Operación: ">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Nro. de Operación"
                                    rules="required|integer|max:20"
                                >
                                    <b-input-group>
                                        <b-form-input
                                            v-model="compraData.det_numeroCuenta" 
                                            :maxlength="20"
                                        />
                                    </b-input-group>
                                    <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2" v-if="compraData.ca_opcion=='3'">
                            <b-form-group label="Fecha: " >
                                <validation-provider
                                    #default="{ errors }"
                                    name="Fecha"
                                    rules="required"
                                >
                                <b-input-group>
                                    <b-form-datepicker
                                        id="datepicker-dateformat3"
                                        v-model="compraData.det_fecha"
                                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                        locale="es"
                                    />
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="2" v-if="compraData.ca_opcion=='2'">
                            <b-form-group label="Porcentaje: " >                                
                                    <b-input-group>
                                        <b-form-input
                                            v-model="compraData.per_porcentaje"
                                            :disabled="true"
                                        />                                      
                                    </b-input-group> 
                            </b-form-group>
                        </b-col>
                        <b-col sm="2" v-if="compraData.ca_opcion=='2'">
                            <b-form-group label="Total: " >                              
                                    <b-input-group>
                                        <b-form-input
                                            :value="(compraData.lib_total_debe=='NaN') ? 0 : (3*compraData.lib_total_debe)/100"
                                            :disabled="true"          
                                        />                                      
                                    </b-input-group>                         
                            </b-form-group>
                        </b-col>
                        <b-col sm="5" v-if="compraData.ca_opcion=='1'">
                        </b-col>
                        <b-col sm="1" v-if="compraData.ca_opcion=='2'">
                        </b-col>
                        <b-col sm="8" v-if="compraData.ca_opcion=='3'">
                        </b-col>
                        <b-col sm="2">
                            <b-form-group>
                                <b-button
                                    variant="success"
                                    style="width: 100%; margin-top: 2rem"
                                    @click="addItemDetalleLibro()"                 
                                >
                                    Nueva Fila
                                </b-button>
                            </b-form-group>
                        </b-col>
                         <b-col sm="12">
                            <b-table 
                                striped
                                responsive
                                :items="compraData.detalle_libro"
                                :fields="fields"
                            >
                                <template v-slot:cell(libd_desc)="{ item, field: { key } }">
                                    <b-input
                                        v-model="item[key]"
                                        size="21"
                                        style="min-width: 200px"
                                    />
                                </template>
                                <template v-slot:cell(libd_id_cta)="{ item, field: { key } }">
                                    <v-select
                                        v-model="item[key]"
                                        label="plc_codigo"
                                        size="21"
                                        :reduce="(cuentas) => cuentas.id"
                                        :options="cuentas"
                                        @input="changeCtaContable(item)" 
                                    >
                                        <template v-slot:selected-option="option">
                                            {{ option.plc_codigo }}
                                        </template>
                                        <template v-slot:option="option">
                                            {{ option.plc_codigo }} -
                                            {{ option.plc_descripcion }}
                                        </template>
                                    </v-select>
                                </template>
                                <template v-slot:cell(libd_dh)="{ item, field: { key }, index }">
                                    <b-form-select
                                        v-model="item[key]"
                                        size="21"
                                        :options="dh"
                                        style="min-width: 80px"
                                        @input="changeDH(item)"
                                        @change="compraData.detalle_libro[index].movimiento_kardex=[]"
                                    />
                                    <b-modal
                                        :id="'modalProducto_'+index"
                                        :ref="'modalProducto_'+index"
                                        centered
                                        title="Vincular Productos a Kardex"
                                        ok-only
                                        hide-footer
                                        size="lg"
                                    >
                                        <b-card-text>       
                                            <b-row>
                                                <b-col sm="12">
                                                    <b-form-group label="Productos: " >
                                                        <b-input-group>
                                                            <v-select
                                                                v-model="compraData.detalle_libro[index].movimiento_kardex"
                                                                label="prod_nombre"
                                                                style="width: 93%;"
                                                                multiple
                                                                :options="kardexProducto"
                                                                @input="changeItemsProductos($event,index,item)"
                                                            >
                                                                <template v-slot:selected-option="option">
                                                                {{ option.prod_nombre }}
                                                                </template>
                                                                <template v-slot:option="option">
                                                                {{ option.id }} - {{ option.prod_nombre }}
                                                                </template>
                                                            </v-select>
                                                            <b-button
                                                                size="21"
                                                                style="width: 7%"
                                                                class="btn-icon"
                                                                @click="showModalProducto(item,index)"                 
                                                            >
                                                                <feather-icon icon="PlusCircleIcon"/>
                                                            </b-button>                             
                                                        </b-input-group>
                                                    </b-form-group>              
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col sm="12">
                                                    <b-table
                                                        striped
                                                        responsive
                                                        :items="compraData.detalle_libro[index].movimiento_kardex"
                                                        :fields="fieldsMovimientoKardex"
                                                        >
                                                        <template v-slot:cell(mov_cantidad)="{ item, field: { key }}">
                                                            <b-input
                                                                v-model="item[key]"
                                                                size="21"
                                                                @input="changeCantidadPrecio(index)"
                                                                @keypress="onlyNumbers($event)"
                                                            />
                                                        </template>
                                                        <template v-slot:cell(mov_precio)="{ item, field: { key } }">
                                                            <b-input
                                                                v-model="item[key]"
                                                                size="21"
                                                                @input="changeCantidadPrecio(index)"
                                                                @keypress="onlyDecimalNumbers($event)"
                                                            />
                                                        </template>
                                                    </b-table>
                                                </b-col>
                                            </b-row>
                                            <b-row>
                                                <b-col sm="10">
                                                </b-col>                                 
                                                <b-col sm="2">
                                                    <b-form-group label="Total: ">
                                                        <b-form-input
                                                            :value="compraData.detalle_libro[index].libd_dh=='D'?
                                                            compraData.detalle_libro[index].libd_debe:
                                                            compraData.detalle_libro[index].libd_haber"                                                              
                                                            size="21"
                                                            style="max-width:150px"
                                                            :readonly="true"
                                                            type="number"
                                                            />
                                                    </b-form-group>
                                                </b-col>
                                            </b-row>
                                        </b-card-text>      
                                    </b-modal>
                                </template>
                                <template v-slot:cell(libd_debe)="{ item, field: { key }, index }" >
                                    <b-input
                                        v-model="item[key]"
                                        size="21"
                                        style="min-width: 100px"
                                        :disabled="item.libd_dh == 'H'"
                                        @input="changeLibdDebe(item)"
                                        @keypress="onlyDecimalNumbers($event)"
                                        @keyup="sumaD()"
                                        @dblclick="doubleClickKardex(item,index)"
                                        :onkeydown="item.libd_kardex != null ? 'return false' : ''"
                                    />
                                </template>
                                <template v-slot:cell(libd_haber)="{ item, field: { key }, index }" >
                                    <b-input
                                        v-model="item[key]"
                                        size="21"
                                        style="min-width: 100px"
                                        :disabled="item.libd_dh == 'D'"
                                        @input="changeLibdHaber(item)"
                                        @keypress="onlyDecimalNumbers($event)"
                                        @keyup="sumaH()"
                                        @dblclick="doubleClickKardex(item,index)"
                                        :onkeydown="item.libd_kardex != null ? 'return false' : ''"
                                    />
                                </template>
                                <template v-slot:cell(libd_kardex)="{ item, field: { key }, index }">
                                    <b-form-select
                                        v-model="item[key]"
                                        size="21"
                                        :options="kardex"
                                        style="min-width: 200px"
                                        @change="compraData.detalle_libro[index].movimiento_kardex=[], 
                                        compraData.detalle_libro[index].libd_debe=0.00,
                                        compraData.detalle_libro[index].libd_haber=0.00"
                                    />
                                </template>
                                <template #cell(actions)="row">
                                    <b-button
                                        size="21"
                                        class="btn-icon btn-danger"
                                        @click="deleteItemDetalleLibro(row)"
                                    >
                                        <feather-icon icon="TrashIcon" />
                                    </b-button>
                                </template>
                            </b-table>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="3">
                        </b-col>
                        <b-col sm="2">
                            <b-form-group>
                                <b-form-input
                                    v-model="compraData.lib_total_debe"          
                                    size="21"
                                    style="max-width:150px"
                                    :readonly="true"                  
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group>
                                <b-form-input
                                    v-model="compraData.lib_total_haber"                 
                                    size="21"
                                    style="max-width:150px"
                                    :readonly="true"
                                    />
                            </b-form-group>
                        </b-col>
                        <b-col sm="2">
                            <b-form-group>
                                <b-form-input
                                    id="compraData.monto_total"
                                    v-model="compraData.monto_total"                 
                                    v-bind:style="compraData.monto_total ==0 ? 'backgroundColor:#d1e7dd' : 'backgroundColor:#f8d7da'"
                                    size="21"
                                    style="max-width:150px"
                                    :readonly="true"
                                    type="number"
                                    />
                            </b-form-group>
                        </b-col>
                        <b-col sm="3">
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="6">
                            <b-form-group label="Glosa: " >
                                <b-input-group>
                                    <b-form-input 
                                        v-model= "compraData.lib_glosa"
                                    />
                                </b-input-group>
                            </b-form-group>   
                        </b-col>
                        <b-col sm="3">
                            <b-form-group label="Proyecto: ">
                                <b-input-group>
                                    <v-select
                                        v-model="proyecto"
                                        label="proy_codigo"
                                        style="width: 100%"
                                        :options="proyectos"
                                        @input="getProyecto()"
                                    >
                                        <template v-slot:selected-option="option">
                                            {{ option.proy_codigo }}
                                        </template>
                                        <template v-slot:option="option">
                                            {{ option.proy_codigo }} - {{ option.proy_descripcion }}
                                        </template>
                                    </v-select>
                                </b-input-group>
                            </b-form-group> 
                        </b-col>
                        <b-col sm="3">
                            <b-form-group label="Componente: ">
                                <b-input-group>
                                    <v-select
                                        v-model="componente"
                                        label="comp_codigo"
                                        style="width: 100%"
                                        :options="componentes"
                                        @input="getComponente()"
                                    >
                                        <template v-slot:selected-option="option">
                                            {{ option.comp_codigo }}
                                        </template>
                                        <template v-slot:option="option">
                                            {{ option.comp_codigo }} - {{ option.comp_descripcion }}
                                        </template>
                                    </v-select>
                                </b-input-group>
                            </b-form-group>   
                        </b-col>        
                    </b-row>
                    <b-row>
                        <b-col md="12" class="text-center mt-1" style="">
                            <b-button
                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                variant="primary"
                                class="ml-1"
                                @click.prevent="validationForm"
                            >
                                Guardar
                            </b-button>
                            <b-button
                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                variant="danger"
                                class="ml-1"
                                @click="Cancelar()"
                            >
                                Cancelar
                            </b-button>
                        </b-col>
                    </b-row>
                </b-form>
            </validation-observer>
        </b-card>
            <b-modal
            centered
            title="Agregar Proveedor"
            ok-only
            hide-footer
            id="modal-proveedor"
            ref="modal-proveedor"
            size="lg"
        >
            <b-card-text>
                <validation-observer ref="agregarProveedorRules">     
                    <b-row>
                        <b-col sm="6">
                            <b-form-group
                                label="Tipo: "
                            >
                                <b-form-select
                                v-model="suplierData.tipoDoi"
                                :options="tipos"
                                />
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group
                                label="Documento: "
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="Código"
                                rules="required|integer"
                                >
                                <b-input-group>
                                    <b-form-input
                                        v-model="suplierData.doi"
                                        placeholder="Ingrese el documento"
                                    />
                                    <b-input-group-append>
                                        <b-button
                                            variant="outline-primary"
                                            @click="validar"
                                        >
                                            Consultar
                                        </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                            <b-form-group
                                label="Nombre / Razón Social: "
                            >
                                <validation-provider
                                #default="{ errors }"
                                name="Nombre / Razón Social"
                                rules="required"
                                >
                                <b-form-input
                                    v-model="suplierData.nombre"
                                    placeholder="Nombre / razón social"
                                />
                                <small class="text-danger">{{ errors[0] }}</small>
                                </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col sm="6">
                        <b-form-group
                            label="Dirección: "
                        >   
                            <validation-provider
                                #default="{ errors }"
                                name="Direccion"
                                rules="required"
                            >
                                <b-form-input
                                    id="address"
                                    v-model="suplierData.direccion"
                                    placeholder="Dirección"
                                />
                            <small class="text-danger">{{ errors[0] }}</small>
                            </validation-provider>
                        </b-form-group>
                        </b-col>
                        <b-col sm="6">
                        <b-form-group
                            label="Correo: "
                        >                          
                            <b-form-input
                                id="address"
                                v-model="suplierData.email"
                                placeholder="Correo"
                            />                           
                        </b-form-group>
                        </b-col>
                    </b-row>
                </validation-observer>
                <b-row>
                <b-col
                    md="12"
                    class="text-center mt-1"
                    style=""
                    >
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="primary"
                        class="ml-1"
                        @click="validaterProveedor()"
                        >
                        Guardar
                    </b-button>
                    <b-button
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        variant="danger"
                        class="ml-1"
                        @click="hideModalProveedor()"
                    >
                        Cancelar
                    </b-button>
                </b-col>
            </b-row>   
            </b-card-text>      
        </b-modal>
        <b-modal
            id="modal-documento"
            ref="modal-documento"
            centered
            title="Agregar Documento"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>       
                <b-row>
                    <b-col sm="12">
                        <b-form-group label="Documentos: " >
                            <b-input-group>
                                <v-select
                                    v-model="compraData.nota_credito"                                    
                                    label="ca_correlativo"
                                    style="width: 100%;"                                    
                                    :options="documentosReferencia"
                                    @input="changeItemsDocRef($event)"
                                >
                                    <template v-slot:selected-option="option">
                                    {{ option.ca_correlativo }}
                                    </template>
                                    <template v-slot:option="option">
                                    {{ option.ca_serie }} - {{ option.ca_correlativo }}
                                    </template>
                                </v-select>                             
                            </b-input-group>
                        </b-form-group>              
                    </b-col>
                </b-row>               
                <b-row>
                    <b-col sm="12">
                        <b-table
                            striped
                            selectable
                            responsive="lg"
                            select-mode="range"
                            :fields="fieldsDocRef"
                            :items="compraData.nota_credito"
                            >                           
                        </b-table>
                    </b-col>
                </b-row>              
            </b-card-text>      
        </b-modal>
        <b-modal
            id="modalDestinos"
            ref="modalDestinos"
            centered
            title="Lista de Destinos"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>       
                <b-row>
                    <b-col sm="12">
                        <b-table
                            show-empty
                            :select-mode="'single'"
                            responsive
                            empty-text="No matching records found"
                            :items="compraData.detalle_hijo"
                            :fields="paramsGridDestino.fields"                   
                        >
                        </b-table>     
                    </b-col>
                </b-row>                
            </b-card-text>      
        </b-modal>
        <b-modal
            id="modalDetraccion"
            ref="modalDetraccion"
            centered
            title="Lista de Detracciones"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>       
                <b-row>
                    <b-col sm="12">
                        <b-table
                            show-empty
                            selectable
                            :select-mode="'single'"
                            responsive
                            empty-text="No matching records found"
                            :items="detracciones"
                            :fields="paramsGridDetraccion.fields"
                        >
                            <template #cell(row)="data">
                                <div style="width: 0px !important">                                    
                                    <b-form-checkbox
                                        v-model="compraData.detracciones"
                                        :value="data.item"
                                        :id="data.item.codigo"
                                        @change="compraData.detracciones==false?compraData.detracciones={
                                                codigo:'',
                                                text:'',
                                                porcentaje:0}:compraData.detracciones"
                                    ></b-form-checkbox>                                    
                                </div>
                            </template>                                                           
                            <template #cell()="data">
                                <span>{{ data.value }}</span>
                            </template>
                        </b-table>     
                    </b-col>
                </b-row>                
            </b-card-text>      
        </b-modal>
        <b-modal
            id="modalProducto"
            ref="modalProducto"
            centered
            title="Crear Producto"
            ok-only
            hide-footer
            size="lg"
        >
            <b-card-text>       
                <b-tabs>
                    <b-tab active title="Información principal">
                        <validation-observer ref="agregarProductoRules">
                            <b-form class="mt-2">
                                <b-row>
                                    <b-col sm="12">
                                        <b-form-group label="Nombre: ">
                                            <validation-provider
                                                #default="{ errors }"
                                                name="Nombre"
                                                rules="required"
                                            >
                                                <b-input-group>
                                                    <b-form-input
                                                    v-model="productData.nombre"
                                                    type="text"
                                                    placeholder="Ingrese nombre"
                                                    />
                                                </b-input-group>
                                                <small class="text-danger">{{ errors[0] }}</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="12">
                                        <b-form-group label="Marca: ">
                                            <validation-provider
                                                #default="{ errors }"
                                                name="Marca"
                                                rules="required"
                                            >
                                                <b-input-group>
                                                    <b-form-input
                                                        v-model="productData.marca"
                                                        type="text"
                                                        placeholder="Ingrese marca"
                                                    />
                                                </b-input-group>
                                                <small class="text-danger">{{ errors[0] }}</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="12">
                                        <b-form-group label="Categoria: ">
                                            <validation-provider
                                                #default="{ errors }"
                                                name="Categoria"
                                                rules="required"
                                            >
                                                <v-select
                                                    v-model="productData.categorias"
                                                    :dir="'ltr'"
                                                    multiple
                                                    label="cat_nombre"
                                                    :value.sync="categorias.id"
                                                    :options="categorias"
                                                />
                                                <small class="text-danger">{{ errors[0] }}</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="12">
                                        <b-form-group label="Kardex: " >
                                            <validation-provider
                                                #default="{ errors }"
                                                name="Kardex"
                                                rules="required"
                                            >
                                                <b-form-input
                                                    v-model="productData.prod_tipo_descripcion"                                    
                                                    :readonly="true"
                                                />
                                                <small class="text-danger">{{ errors[0] }}</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="12">
                                        <b-form-group label="Sucursal: " >
                                            <validation-provider
                                                #default="{ errors }"
                                                name="Sucursal"
                                                rules="required"
                                            >
                                                <v-select
                                                    v-model="productData.sucursales"
                                                    :dir="'ltr'"
                                                    multiple
                                                    label="suc_nombre"
                                                    :value.sync="sucursales.id"
                                                    :options="sucursales"
                                                />
                                                <small class="text-danger">{{ errors[0] }}</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="6">
                                        <b-form-group label="Stock: " >
                                            <validation-provider
                                                #default="{ errors }"
                                                name="Stock"
                                                rules="required|integer"
                                            >
                                                <b-input-group>
                                                    <b-form-input
                                                    v-model="productData.stock"
                                                    type="number"
                                                    placeholder="Ingrese stock"
                                                    />
                                                </b-input-group>
                                                <small class="text-danger">{{ errors[0] }}</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col sm="6">
                                        <b-form-group
                                            label="Unidad de medida: "
                                        >
                                            <validation-provider
                                                #default="{ errors }"
                                                name="Unidad de medida"
                                                rules="required"
                                            >
                                                <b-form-select
                                                v-model="productData.idUnm"
                                                value-field="id"
                                                text-field="unm_nombre"
                                                :options="unidades"
                                                />
                                                <small class="text-danger">{{ errors[0] }}</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </b-tab>
                    <b-tab title="Precio">
                    <div>
                        <b-form>
                            <validation-observer ref="agregarProductoPrecioRules">
                                <b-row class="mt-2">
                                    <b-col md="12">
                                        <b-form-group
                                            :state="descripcionState"
                                            label="Descripción"
                                            invalid-feedback="Descripción es requerido"
                                        >
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Descripción"
                                            rules="required"
                                        >
                                            <b-form-input
                                                id="descripcion-input"
                                                v-model="descripcion"
                                                :state="descripcionState"
                                                required
                                            />
                                            <small class="text-danger">{{ errors[0] }}</small>
                                        </validation-provider>
                                        </b-form-group>
                                        <b-form-group
                                            :state="precioState"
                                            label="Precio: "
                                            invalid-feedback="Precio es requerido"
                                        >
                                        <validation-provider
                                            #default="{ errors }"
                                            name="Precio"
                                            rules="required"
                                        >
                                            <b-form-input
                                                id="precio-input"
                                                v-model="precio"
                                                type="number"
                                                step="0.01"
                                                :state="precioState"                                        
                                            />
                                            <small class="text-danger">{{ errors[0] }}</small>
                                        </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col 
                                        md="12" 
                                        class="text-right mb-1"
                                        style="justify-content: flex-end"
                                    >
                                        <b-button
                                            id="toggle-btn"
                                            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                            variant="secondary"
                                            @click="addPrecios()"
                                        >
                                            Añadir
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </validation-observer>
                        </b-form>
                        <b-row class="justify-content-center mb-1">
                            <b-col md="12">
                                <b-table
                                show-empty
                                selectable
                                :select-mode="'single'"
                                responsive
                                empty-text="No matching records found"
                                :items="productData.precios"
                                :fields="fieldsProducto"
                                @row-selected="onRowSelected"
                                >
                                <template  v-slot:cell(prepro_isprincipal)="{ item, field: { key }}">
                                    <div style="width: 0px !important">
                                    <b-form-checkbox
                                        v-model="item[key]"                        
                                    ></b-form-checkbox> 
                                    </div>
                                </template>
                                <template #cell(actions)="data">
                                    <b-button
                                    size="sm"
                                    class="btn-danger mr-1"
                                    @click="deleteItem(data.index)"
                                    >
                                    <feather-icon icon="TrashIcon" />
                                    </b-button>
                                </template>
                                </b-table>
                            </b-col>
                        </b-row>
                    </div>
                    </b-tab>
                    <b-row>
                        <b-col
                            md="12"
                            class="text-right mb-2"
                            style="justify-content: flex-end"
                        >
                            <b-button
                                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                                variant="primary"
                                @click="validationFormProducto"
                            >
                            Guardar
                            </b-button>                    
                        </b-col>
                    </b-row>
                </b-tabs>
            </b-card-text>      
        </b-modal>
    </div>
</template>
<script>
    import Vue from "vue";
    import store from "@/store/index";
    import { BootstrapVue, BFormSelect } from "bootstrap-vue";
    import vSelect from "vue-select";
    import generalData from "@fakedata";
    import Ripple from "vue-ripple-directive";
    import { ValidationProvider, ValidationObserver } from "vee-validate";

    import moment from "moment";
    import axios from "axios";

    import { required, email } from '@validations'
    import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
    import { reduce } from 'postcss-rtl/lib/affected-props';
    import { formatDate } from '@/@core/utils/filter';

    const API_PERU_URL = process.env.VUE_APP_API_PERU_URL;
    const API_PERU_TOKEN = process.env.VUE_APP_API_PERU_TOKEN;

    Vue.use(BootstrapVue);

    export default {
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
                operaciones: generalData.compra.operacion,
                clasificaciones: generalData.compra.clasificacion,
                tipos_doc: generalData.compra.documentos,
                monedas: generalData.contabilidad.monedas,
                opciones: generalData.compra.opciones,
                dh: generalData.compra.debehaber,
                tipos: generalData.persona.documentos,
                detracciones: generalData.compra.detracciones,
                notas_credito: generalData.compra.notacredito,
                kardex: [{"value":null,"text":"SIN KARDEX"}].concat(generalData.compra.tipokardex),
                suplier: "",
                suplierData:{
                    nombre:"",
                    doi:"",
                    email:"",
                    tipoDoi:generalData.persona.documentos[0].value,
                    direccion:"",
                },
                tipo: {
                    cod: "",
                    desc: "",
                    doc:{
                        value:"",
                        text:"",
                    },
                },
                motivo: {
                    cod: "",
                    desc: "",
                    doc:null,
                },
                consulta: false,
                cambio: 0,
                cuentas: [],
                supliers: [],
                documentosReferencia:[],
                kardexProducto:[],
                clasificacion: {
                    value: generalData.compra.clasificacion[0].value,
                    text: generalData.compra.clasificacion[0].text,
                },
                compraData: {
                    per_porcentaje:3,
                    per_total:0.00,
                    detracciones: {
                        porcentaje: 0,
                    },
                    id_compra: null,
                    venta_id:null,
                    nc_fecha_relacionado:moment().format("yyyy-MM-DD"),
                    nc_serie_relacionado:"",
                    nc_correlativo_relacionado:"",
                    det_total:0.00,
                    det_numeroCuenta: "",
                    det_fecha: moment().format("yyyy-MM-DD"),
                    ca_operacion: generalData.compra.operacion[0].value,
                    ca_clasificacion: generalData.compra.clasificacion[0].value,
                    nc_motivo: "",
                    nc_motivo_desc: "",
                    ca_doi: "",
                    ca_razon_social: "", 
                    ca_direccion: "",
                    ca_moneda: generalData.contabilidad.monedas[0].value,
                    ca_tipo_cambio: 1,
                    ca_tipo_doc: "",
                    nota_credito: [],
                    componente_id:null,
                    ca_serie: "F001",
                    ca_correlativo: "123",
                    ca_opcion: "1",
                    monto_total:0.00,
                    pa_fecha_emision: moment().format("yyyy-MM-DD"),
                    pa_fecha_vencimiento: moment().format("yyyy-MM-DD"),
                    detalle_libro: [],
                    detalle_hijo:[],
                    lib_total_debe: 0.00,
                    lib_total_haber: 0.00,
                    lib_total_debe_cambio: 0.00,
                    lib_total_haber_cambio: 0.00,
                    lib_glosa: "",
                    lib_tipo: "",                                   //variables por defecto en blanco
                    lib_modulo: "MC",                               //variables por defecto
                    emp_id: 1,                                      //variables por defecto
                    per_id: 1,                                      //variables por defecto
                    suc_id: 1,                                      //variables por defecto
                    pa_tipo_pago: "CONTADO",                        //variables por defecto
                    lib_fecha_registro: "2021-12-26 18:34:00",      //variables por defecto
                    cut: "",                                        //variables por defecto en blanco
                },
                edit: null,
                fields: [
                    { key: "libd_desc", label: "Descripción", sortable: false },
                    { key: "libd_id_cta", label: "CtaConta", sortable: false },
                    { key: "libd_dh", label: "D/H", sortable: false },
                    { key: "libd_debe", label: "Monto D", sortable: false },
                    { key: "libd_haber", label: "Monto H", sortable: false },
                    { key: "libd_kardex", label: "Kardex", sortable: false },
                    {
                        key: "actions",
                        label: "Acciones",
                        tdClass: "text-center",
                        thClass: "text-center",
                        sortable: false,
                    },
                ],
                fieldsMovimientoKardex:[
                    { key: "id", label: "Id producto", sortable: false },
                    { key: "prod_nombre", label: "Producto", sortable: false },
                    { key: "unm_nombre", label: "Medida", sortable: false },
                    { key: "mov_cantidad", label: "Cantidad", sortable: false },
                    { key: "mov_precio", label: "Precio", sortable: false },
                ],
                fieldsDocRef: [
                    { key: "ca_serie", label: "Serie", sortable: false },
                    { key: "ca_correlativo", label: "Numero", sortable: false },
                    { key: "nc_fecha_registro", label: "Fecha Registro", sortable: false },
                ],
                st_nota_credito: false,
                st_fecha_vencimiento: true,
                st_entidad: false,
                paramsGridDestino: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "dest_origin", label: "Origen", sortable: false },
                        { key: "libd_nro_cta", label: "Destino", sortable: false },
                        { key: "libd_desc", label: "Descripcion", sortable: false },
                        { key: "libd_debe", label: "Debe", sortable: false },
                        { key: "libd_haber", label: "haber", sortable: false },                 
                    ],                
                    items: [
                        {
                            isActive: true,
                            age: 40,
                            first_name: "Dickerson",
                            last_name: "Macdonald",
                        },
                        {
                            isActive: false,
                            age: 21,
                            first_name: "Larsen",
                            last_name: "Shaw",
                        },
                        {
                            isActive: false,
                            age: 89,
                            first_name: "Geneva",
                            last_name: "Wilson",
                        },
                        {
                            isActive: true,
                            age: 38,
                            first_name: "Jami",
                            last_name: "Carney",
                        },
                    ],
                    filters: {
                        ca_correlativo: "",
                    },               
                    options: {
                        responsive: true,
                        primaryKey: "id",
                    },
                    pagination: true,
                },
                paramsGridDetraccion: {
                    selectOptions: {
                        allowSelect: true,
                        selectMode: "single",
                    },
                    fields: [
                        { key: "row", label: "", sortable: false },
                        { key: "codigo", label: "Código", sortable: false },
                        { key: "text", label: "Descripcion", sortable: false },
                        { key: "porcentaje", label: "Porcentaje", sortable: false },                                    
                    ],                             
                    options: {
                        responsive: true,
                        primaryKey: "id",
                    },                  
                },
                proyectos: [],
                componentes: [],
                proyecto:"",
                componente:"",
                dest_origin: "",
                productData: {
                    nombre: "",
                    marca: "",
                    stock: "",
                    prod_tipo_kardex: "MERCADERIA",
                    prod_tipo_descripcion: "",
                    precio: 50,
                    idEmpresa: 1,
                    categorias: [],
                    sucursales: [],
                    idUnm: 1,
                    precios: [],
                },
                categorias: [],
                sucursales: [],
                unidades: [],
                fieldsProducto: [
                    { key: "prepro_isprincipal", label: "Precio principal", sortable: false },
                    { key: "prepro_nombre", label: "Nombre", sortable: true },
                    { key: "prepro_precio", label: "Precio", sortable: true },
                    {
                    key: "actions",
                    label: "Acciones",
                    tdClass: "text-center",
                    thClass: "text-center",
                    sortable: false,
                    },
                ],
                selected: [],
                descripcion: "",
                descripcionState: null,
                precio: "",
                precioState: null,
                productoAux: {
                    kardex:"",
                    index: 0,
                },
                id_cuenta:0,
            };
        },
        mounted() {
            this.getConfiguraciones();        
        },
        methods: {
            async getInfoByID(idcompra){        
                this.compraData.detalle_libro = [];
                this.compraData.detalle_hijo = [];
                let request= {
                    url:"/api/compra/"+idcompra,
                    method:"GET",
                }
                var respRoles = await store.dispatch('back/EXECUTE',request)
                
                if(respRoles.ca_opcion=='3'){
                    this.compraData.detracciones={
                        codigo:respRoles.detraccion.detr_codigo,
                        porcentaje:parseFloat(respRoles.detraccion.detr_porcentaje),
                        text:this.detracciones.find((det) => det.codigo == respRoles.detraccion.detr_codigo).text,
                    };
                    this.compraData.det_numeroCuenta=respRoles.detraccion.detr_nro_cta;
                    this.compraData.det_fecha=respRoles.detraccion.detr_fecha;
                }
                console.log(respRoles);
                this.compraData.id_compra=respRoles.id
                this.compraData.lib_glosa=respRoles.libro.lib_glosa
                this.compraData.ca_doi=this.supliers.find((sup) => sup.prov_doi == respRoles.ca_doi)
                this.compraData.ca_razon_social=respRoles.ca_razon_social
                this.compraData.ca_direccion=respRoles.ca_direccion
                this.compraData.ca_serie=respRoles.ca_serie
                this.compraData.ca_correlativo=respRoles.ca_correlativo
                this.compraData.nc_fecha_relacionado=respRoles.ca_fecha_registro
                this.compraData.nc_serie_relacionado=respRoles.ca_serie
                this.compraData.nc_correlativo_relacionado=respRoles.ca_correlativo
                this.compraData.ca_opcion=respRoles.ca_opcion
                this.compraData.ca_clasificacion=respRoles.ca_clasificacion
                this.clasificacion.value=this.clasificaciones.find((clas) => clas.value == respRoles.ca_clasificacion).value
                this.clasificacion.text=this.clasificaciones.find((clas) => clas.value == respRoles.ca_clasificacion).text
                this.compraData.ca_operacion=respRoles.ca_operacion
                this.compraData.ca_moneda=respRoles.ca_moneda
                this.compraData.ca_tipo_cambio=respRoles.ca_tipo_cambio       
                this.compraData.prov_id=respRoles.prov_id  
                this.compraData.per_id=respRoles.per_id  
                this.compraData.suc_id=respRoles.suc_id            
                this.compraData.pa_fecha_emision=respRoles.pago.pa_fecha_emision
                this.compraData.pa_fecha_vencimiento=respRoles.pago.pa_fecha_vencimiento
                this.compraData.lib_total_debe_cambio=respRoles.libro.lib_total_debe_cambio,
                this.compraData.lib_total_haber_cambio=respRoles.libro.lib_total_haber_cambio,
                this.proyecto=respRoles.libro.componente.proyecto,
                
                this.proyectos.forEach((proyecto) => {
                    if(proyecto.id == this.proyecto.id){
                        this.componentes=proyecto.componente;
                    }
                });

                this.componente=respRoles.libro.componente,
                this.compraData.componente_id=respRoles.libro.componente.id,

                respRoles.libro.detalle_libro.forEach(element => {       
                    if(element.libd_id_padre==null){
                        this.dest_origin=element.libd_nro_cta;
                        this.id_cuenta=element.libd_id_cta;
                        if(element.libd_dh=="D"){
                            this.compraData.detalle_libro.push({                     
                                libd_kardex: element.libd_kardex,
                                libd_desc: element.libd_descripcion,
                                libd_dh: "H",
                                libd_debe: element.libd_haber,
                                libd_haber: element.libd_debe,
                                libd_nro_cta: element.libd_nro_cta,
                                libd_id_cta: element.libd_id_cta,
                                libd_debe_cambio: element.libd_haber_cambio,
                                libd_haber_cambio: element.libd_debe_cambio,
                                libd_id_padre: element.libd_id_padre,
                                libd_anexo: element.libd_anexo,
                                movimiento_kardex: [],
                            });    
                        }else{
                            this.compraData.detalle_libro.push({                     
                                libd_kardex: element.libd_kardex,
                                libd_desc: element.libd_descripcion,
                                libd_dh: "D",
                                libd_debe: element.libd_haber,
                                libd_haber: element.libd_debe,
                                libd_nro_cta: element.libd_nro_cta,
                                libd_id_cta: element.libd_id_cta,
                                libd_debe_cambio: element.libd_haber_cambio,
                                libd_haber_cambio: element.libd_debe_cambio,
                                libd_id_padre: element.libd_id_padre,
                                libd_anexo: element.libd_anexo,
                                movimiento_kardex: [],
                            });    
                        }                                
                    }else{
                        if(element.libd_dh=="D"){
                            this.compraData.detalle_hijo.push({
                                dest_origin:this.dest_origin,
                                libd_kardex: element.libd_kardex,
                                libd_desc: element.libd_descripcion,
                                libd_dh: "H",
                                libd_debe: parseFloat(element.libd_haber).toFixed(2),
                                libd_haber: parseFloat(element.libd_debe).toFixed(2),
                                libd_nro_cta: element.libd_nro_cta,
                                libd_id_cta: element.libd_id_cta,
                                libd_debe_cambio: element.libd_haber_cambio,
                                libd_haber_cambio: element.libd_debe_cambio,
                                libd_id_padre: this.id_cuenta,
                                movimiento_kardex: element.movimiento_kardex,
                                libd_anexo: element.libd_anexo,
                            });
                        }else{
                            this.compraData.detalle_hijo.push({
                                dest_origin:this.dest_origin,
                                libd_kardex: element.libd_kardex,
                                libd_desc: element.libd_descripcion,
                                libd_dh: "D",
                                libd_debe: parseFloat(element.libd_haber).toFixed(2),
                                libd_haber: parseFloat(element.libd_debe).toFixed(2),
                                libd_nro_cta: element.libd_nro_cta,
                                libd_id_cta: element.libd_id_cta,
                                libd_debe_cambio: element.libd_haber_cambio,
                                libd_haber_cambio: element.libd_debe_cambio,
                                libd_id_padre: this.id_cuenta,
                                movimiento_kardex: element.movimiento_kardex,
                                libd_anexo: element.libd_anexo,
                            });
                        } 
                        
                    }             
                });

                
                let z=0;
                var detalle_libro=[];
                while(z<respRoles.libro.detalle_libro.length){
                    if(respRoles.libro.detalle_libro[z].libd_id_padre==null){
                        detalle_libro.push(respRoles.libro.detalle_libro[z]);
                    }                           
                    z++;              
                }

                console.log(detalle_libro);

                let i=0,j=0;
                while(i<this.compraData.detalle_libro.length){
                    while(j<detalle_libro[i].movimiento_kardex.length){
                        this.compraData.detalle_libro[i].movimiento_kardex.push({
                            id: detalle_libro[i].movimiento_kardex[j].mov_product_id,
                            prod_nombre: detalle_libro[i].movimiento_kardex[j].mov_descripcion,
                            unm_nombre: detalle_libro[i].movimiento_kardex[j].mov_unidad_medida,
                            mov_cantidad: detalle_libro[i].movimiento_kardex[j].mov_cantidad,
                            mov_precio: detalle_libro[i].movimiento_kardex[j].mov_precio,
                        })
                        j++;
                    }                
                    i++;              
                }
                this.sumaD();
                this.sumaH();
                
                console.log(this.compraData);
            },
            
            validationForm() {
                if(this.compraData.nota_credito.length==0){
                    this.sendMessage("Debe seleccionar un documento de referencia","AlertTriangleIcon","danger");
                    return false;
                }
                this.$refs.agregarCompraRules.validate().then(success => {
                    if (success) {
                        for(let i=0; i<this.compraData.detalle_libro.length; i++){
                            if(this.compraData.detalle_libro[i].libd_id_cta == null || this.compraData.detalle_libro[i].libd_desc== "" || 
                                this.compraData.detalle_libro[i].libd_debe === "" || this.compraData.detalle_libro[i].libd_haber === ""){                             
                                this.sendMessage("Complete todos los datos requeridos en la tabla detalle","AlertTriangleIcon","danger");
                                return false;
                            }
                            if(this.compraData.detalle_libro[i].libd_dh == "D"){
                                if(this.compraData.detalle_libro[i].libd_debe == 0){
                                    this.sendMessage("El MONTO D debe ser mayor a 0 en cada una de las filas de la tabla detalle","AlertTriangleIcon","danger");
                                    return false;
                                }
                            }else{
                                if(this.compraData.detalle_libro[i].libd_haber == 0){
                                    this.sendMessage("El MONTO H debe ser mayor a 0 en cada una de las filas de la tabla detalle","AlertTriangleIcon","danger");
                                    return false;
                                }
                            }
                        }
                        if(this.compraData.lib_total_debe!=this.compraData.lib_total_haber){
                            this.sendMessage("En la tabla detalle la suma de los MONTO D y MONTO H deben ser iguales","AlertTriangleIcon","danger");
                            return false;
                        }
                        this.Guardar();
                    }
                })
            },
            
            showModalDetraccion(){
                this.$refs["modalDetraccion"].show(); 
            },
            
            Guardar() {
                console.log(this.compraData);
                this.saveNotaCredito();
            },
            
            Cancelar() {
                this.$router.push({ name: "nota-credito-compra-lista-index" });
            },
            
            changeMoneda(e) {
                if (e == "USD") {
                    if (!this.consulta) {
                        axios
                            .post(
                                API_PERU_URL +
                                    "tipo_de_cambio?fecha=" +
                                    moment().format("yyyy-MM-DD") +
                                    "&&api_token=" +
                                    API_PERU_TOKEN
                            )
                            .then((result) => {
                                if (result.data.success) {
                                    this.compraData.ca_tipo_cambio =
                                        result.data.data.compra;
                                    this.cambio = result.data.data.compra;
                                    this.changeTipoCambio();
                                    this.consulta = true;
                                } else {
                                    this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger")
                                    this.compraData.ca_tipo_cambio = "";
                                }
                            });
                    } else {
                        this.compraData.ca_tipo_cambio = this.cambio;
                        this.changeTipoCambio();
                    }
                } else {
                    this.compraData.ca_tipo_cambio = 1;
                    this.changeTipoCambio();
                }
            },
            
            changeClasif(e) {
                if (e != null) {
                    this.compraData.ca_clasificacion = e.value;
                } else {
                    this.compraData.ca_clasificacion = "";
                }
            },
            
            changeSuplier(e) {
                if (e != null) {
                    this.compraData.nota_credito=[];
                    this.compraData.ca_razon_social = e.prov_nombre;
                    this.compraData.ca_direccion = e.prov_direccion;
                } else {
                    this.limpiar();
                    this.compraData.ca_razon_social = "";
                    this.compraData.ca_direccion = "";
                }
            },
            
            getComponente(){
                this.compraData.componente_id=this.componente.id;
            },
            
            getProyecto(){
                this.componente="";
                this.compraData.componente_id=null;
                if(this.proyecto!=null){
                    this.componentes=this.proyecto.componente;
                }else{
                    this.componente="";
                    this.componentes=[];                    
                }
            },
            
            changeValue(e) {
                this.st_nota_credito = false;
                if (e != null) {
                    this.tipo.desc = e.text;
                    this.compraData.ca_tipo_doc = e.value;
                    if (e.value== "07"){
                        this.st_nota_credito = true;
                    }
                } else {
                    this.tipo.desc = "";
                    this.compraData.ca_tipo_doc = "";
                }
            },
            
            changeMotivo(e) {
                if (e != null) {
                    this.motivo.desc = e.text;
                    this.compraData.nc_motivo = e.value;
                    this.compraData.nc_motivo_desc = e.text;
                } else {
                    this.motivo.desc = "";
                    this.compraData.nc_motivo = "";
                    this.compraData.nc_motivo_desc = "";
                }
            },
            
            changeDate(e) {
                if(e != null){
                    this.st_fecha_vencimiento = false;
                    this.compraData.pa_fecha_vencimiento=this.compraData.pa_fecha_emision;
                }
            },
            
            async getConfiguraciones() {
                let suc = {
                    url: "/api/sucursal",
                    method: "GET",
                };
                var respSuc = await store.dispatch("back/EXECUTE", suc);
                this.sucursales = respSuc.rows;      

                let cat = {
                    url: "/api/categoria/1",
                    method: "GET",
                };
                var respCat = await store.dispatch("back/EXECUTE", cat);
                this.categorias = respCat;

                let unid = {
                    url: "/api/unidadMedida",
                    method: "GET",
                };
                var respUnid = await store.dispatch("back/EXECUTE", unid);
                this.unidades = respUnid;
                let suc2 = {
                    url: "/api/proveedor/all/1",
                    method: "GET",
                };
                var resp = await store.dispatch("back/EXECUTE", suc2);
                this.supliers = "";
                this.supliers = resp.rows;
                let request = {
                    url: "/api/cctacontable/1/1",
                    method: "GET",
                };
                var resp = await store.dispatch("back/EXECUTE", request);
                this.cuentas = resp.rows;

                let proy = {
                url: "/api/proyecto/",
                method: "GET",
                };
                var respRolesproy = await store.dispatch("back/EXECUTE", proy);
                this.proyectos=respRolesproy.rows; 

                this.tipo.doc.value="07"
                this.tipo.doc.text="Nota de Crédito"
                this.tipo.desc="Nota de Crédito"
                this.compraData.ca_tipo_doc="07"
                this.st_nota_credito=true;
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
            
            hideModalProveedor(){
                this.$refs["modal-proveedor"].hide()
            },
            
            showModalProveedor(){      
                this.$refs["modal-proveedor"].show()      
            },
            
            async saveProveedor(){
                let request= {
                    url:"/api/proveedor/1",
                    method:"POST",
                    data:this.suplierData
                }
                try{
                    var respRoles = await store.dispatch('back/EXECUTE',request)
                    if(respRoles.status==200){
                        this.sendMessage('Proveedor registrado satisfactoriamente',"CheckSquareIcon","success")
                        this.st_entidad=true
                        this.compraData.ca_doi={
                            id: respRoles.supplier.id,
                            prov_direccion: respRoles.supplier.prov_direccion,
                            prov_doi: respRoles.supplier.prov_doi,
                            prov_email: respRoles.supplier.prov_email,
                            prov_nombre: respRoles.supplier.prov_nombre,
                            prov_tipo_doi: respRoles.supplier.prov_tipo_doi,
                        }
                        this.compraData.ca_razon_social= respRoles.supplier.prov_nombre
                        this.compraData.ca_direccion= respRoles.supplier.prov_direccion
                        this.hideModalProveedor()
                        this.getConfiguraciones()
                    }else if(respRoles.status==500){
                        this.sendMessage('Error de servidor',"AlertTriangleIcon","danger")
                    }
                    else{
                        this.sendMessage(respRoles.message,"AlertTriangleIcon","danger")
                    }
                }
                catch(e){
                    console.log(e.message)
                }
            },
            
            onlyNumbers(e) {
                if (e.keyCode < 48 || e.keyCode > 57) {
                    e.preventDefault();
                }
            },
            
            onlyNumbersAndLetters(e) {
                if ( (e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 65 || e.keyCode > 90) ) {
                    e.preventDefault();
                }
            },
            
            validar() {
                if (this.suplierData.doi.length == 8) {
                    axios
                        .get(
                            API_PERU_URL +
                                "dni/" +
                                this.suplierData.doi +
                                "?api_token=" +
                                API_PERU_TOKEN
                        )
                        .then((result) => {
                            if (result.data.success) {
                                this.suplierData.nombre =
                                    result.data.data.nombre_completo;
                                this.suplierData.direccion =
                                    result.data.data.direccion_completa;
                            } else {
                                this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger");
                            }
                        });
                } else if (this.suplierData.doi.length == 11) {
                    axios
                        .get(
                            API_PERU_URL +
                                "ruc/" +
                                this.suplierData.doi +
                                "?api_token=" +
                                API_PERU_TOKEN
                        )
                        .then((result) => {
                            if (result.data.success) {
                                this.suplierData.nombre =
                                    result.data.data.nombre_o_razon_social;
                                this.suplierData.direccion =
                                    result.data.data.direccion_completa;
                            } else {
                                this.sendMessage("Ocurrió un error","AlertTriangleIcon","danger");
                            }
                        });
                } else {
                    this.sendMessage("Documento no valido","AlertTriangleIcon","danger");
                }
            },
            
            addItemDetalleLibro(){
                this.compraData.detalle_libro.push({
                    libd_kardex: null,
                    libd_desc: "",
                    libd_dh: "D",
                    libd_debe: 0.00,
                    libd_debe_cambio: 0.00,
                    libd_haber: 0.00,
                    libd_haber_cambio: 0.00,
                    libd_nro_cta: "",
                    libd_id_cta: "",
                    libd_anexo:"NINGUNO",
                    libd_id_padre: null,
                    movimiento_kardex: [],
                });
            },
            
            changeDH(item){
                if(item.libd_dh=="D"){
                    item.libd_haber=0.00;
                    item.libd_haber_cambio=0.00;
                    this.sumaH();
                }else{
                    item.libd_debe=0.00;
                    item.libd_debe_cambio=0.00;
                    this.sumaD();
                }
            },
            
            changeCtaContable(item){
                let cta = this.cuentas.find((cta) => cta.id == item.libd_id_cta),c=0;            
                for(let i=0;i<this.compraData.detalle_libro.length;i++){           
                    if(this.compraData.detalle_libro[i].libd_id_cta == item.libd_id_cta){
                        c++;
                    }
                }
                if(c%2==0){
                    this.sendMessage('La cuenta contable ya fue seleccionada',"AlertTriangleIcon","danger")
                    item.libd_id_cta=null;
                    item.libd_desc =null;
                }else{
                    if(cta){
                        item.libd_desc = cta.plc_descripcion;
                        item.libd_nro_cta = cta.plc_codigo;
                        item.libd_anexo=cta.plc_anexo;
                    }else{
                        item.libd_desc = "";
                    }
                }
                this.destinosAll();         
            },
            
            deleteItemDetalleLibro(row){
                if(this.compraData.detalle_libro.length>1){
                    this.$delete(this.compraData.detalle_libro,row.index);
                    this.sumaH();
                    this.sumaD();            
                    this.destinosAll(); 
                }else{
                    this.sendMessage('La tabla detalle debe tener al menos una fila',"AlertTriangleIcon","danger")
                }                        
            },
            
            sumaD(){
                var i=0,suma=0.00,suma_cambio=0.00;;      
                while(this.compraData.detalle_libro.length>i){        
                    suma=suma+parseFloat(this.compraData.detalle_libro[i].libd_debe);
                    suma_cambio=suma_cambio+parseFloat(this.compraData.detalle_libro[i].libd_debe_cambio);
                    i++;       
                }
                this.compraData.lib_total_debe=parseFloat(suma).toFixed(2); 
                this.compraData.lib_total_debe_cambio=parseFloat(suma_cambio).toFixed(2);
                this.compraData.monto_total=parseFloat(parseFloat(this.compraData.lib_total_debe)-parseFloat(this.compraData.lib_total_haber)).toFixed(2)   
            },
            
            sumaH(){
                var i=0,suma=0.00,suma_cambio=0.00;
                while(this.compraData.detalle_libro.length>i){        
                    suma=suma+parseFloat(this.compraData.detalle_libro[i].libd_haber);
                    suma_cambio=suma_cambio+parseFloat(this.compraData.detalle_libro[i].libd_haber_cambio);
                    i++;       
                }
                this.compraData.lib_total_haber=parseFloat(suma).toFixed(2);
                this.compraData.lib_total_haber_cambio=parseFloat(suma_cambio).toFixed(2);
                this.compraData.monto_total=parseFloat(parseFloat(this.compraData.lib_total_debe)-parseFloat(this.compraData.lib_total_haber)).toFixed(2);
            },
            
            doubleClickKardex(item,index){
                if(item.libd_kardex){
                    this.loadDataSourceProducto(item.libd_kardex);
                    this.$refs['modalProducto_'+index].show();
                } else {
                    this.sendMessage("Seleccione un KARDEX que permita vincular productos","AlertTriangleIcon","danger");
                }
            },
            
            async loadDataSourceProducto(tipoKardex){
                var url = "/api/producto/1/"+tipoKardex     
                let request= {
                    url:url,
                    method:"GET",
                    headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    },
                }
                var respRoles = await store.dispatch('back/EXECUTE',request)
                this.kardexProducto=respRoles.rows
            },
            
            changeItemsProductos(e,index){
                this.compraData.detalle_libro[index].movimiento_kardex=[],
                e.forEach(element => {
                    if(element.mov_cantidad || element.mov_precio)
                    {
                        this.compraData.detalle_libro[index].movimiento_kardex.push({
                            id: element.id,
                            prod_nombre: element.prod_nombre,
                            unm_nombre: element.unm_nombre,
                            mov_cantidad: element.mov_cantidad,
                            mov_precio: element.mov_precio,
                        });
                    } else if (element.mov_cantidad) {
                        this.compraData.detalle_libro[index].movimiento_kardex.push({
                            id: element.id,
                            prod_nombre: element.prod_nombre,
                            unm_nombre: element.unm_nombre,
                            mov_cantidad: element.mov_cantidad,
                        });
                    } else if (element.mov_precio) {
                        this.compraData.detalle_libro[index].movimiento_kardex.push({
                            id: element.id,
                            prod_nombre: element.prod_nombre,
                            unm_nombre: element.unm_nombre,
                            mov_precio: element.mov_precio,
                        });
                    } else {
                        this.compraData.detalle_libro[index].movimiento_kardex.push({
                            id: element.id,
                            prod_nombre: element.prod_nombre,
                            unm_nombre: element.unm_nombre,
                            mov_cantidad: 0,
                            mov_precio: 0,
                        });
                    }
                });
                this.changeCantidadPrecio(index);
            },
            
            changeCantidadPrecio(index){
                let totalItem=0;
                this.compraData.detalle_libro[index].movimiento_kardex.forEach(element => {
                    if(element.mov_cantidad){
                        totalItem=totalItem+parseFloat(element.mov_cantidad*element.mov_precio);
                    }
                });

                if(this.compraData.detalle_libro[index].libd_dh=="D"){
                    this.compraData.detalle_libro[index].libd_debe=totalItem;
                    this.compraData.detalle_libro[index].libd_debe_cambio=totalItem*this.compraData.ca_tipo_cambio;
                    this.sumaD();
                }else{
                    this.compraData.detalle_libro[index].libd_haber=totalItem;
                    this.compraData.detalle_libro[index].libd_haber_cambio=totalItem*this.compraData.ca_tipo_cambio;
                    this.sumaH();
                }
                this.destinosAll();
            },
            
            showModalDocRef(){
                if(this.compraData.ca_doi){
                    this.loadDocRef();
                    this.$refs['modal-documento'].show();
                } else {
                    this.sendMessage("Seleccione una entidad","AlertTriangleIcon","danger");
                }
            },

            validaterProveedor(){
                this.$refs.agregarProveedorRules.validate().then(success => {
                    if (success) {
                        this.saveProveedor();
                    }
                })
            },
            
            async loadDocRef(){
                var url = "/api/compra/docref/1/1/"+this.compraData.ca_doi.id   
                let request= {
                    url:url,
                    method:"GET",
                    headers: {
                    'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                    },
                }
                var respRoles = await store.dispatch('back/EXECUTE',request)
                this.documentosReferencia=respRoles.rows            
            },
            
            changeItemsDocRef(e){            
                this.compraData.nota_credito=[];
                if(e!=null){
                    this.compraData.nota_credito.push({
                        id: e.id,
                        ca_serie: e.ca_serie,
                        ca_correlativo: e.ca_correlativo,
                        nc_fecha_registro: moment(e.ca_fecha_registro).format("yyyy-MM-DD"),
                        monto_total: e.monto_total,
                        emp_id: 1,
                        per_id: 1,
                        nc_doi: e.ca_doi,
                        nc_razon_social: e.ca_razon_social,   
                    });
                    this.getInfoByID(e.id);
                }else{
                    this.limpiar();
                }          
            },
            
            async saveNotaCredito(){
                let request= {
                    url:"/api/nota_credito/",
                    method:"POST",
                    data:this.compraData
                }
                try{
                    var respRoles = await store.dispatch('back/EXECUTE',request);
                    console.log("respRoles",respRoles);
                    if(respRoles.status==200){
                        this.sendMessage('Nota de crédito registrada satisfactoriamente',"CheckSquareIcon","success");
                        this.$router.push({ name: "nota-credito-compra-lista-index" });
                    }else if(respRoles.status==500){
                        this.sendMessage('Error de servidor',"AlertTriangleIcon","danger");
                    }
                    else{
                        this.sendMessage(respRoles.message,"AlertTriangleIcon","danger");
                    }
                }
                catch(e){
                    console.log(e.message)
                }
            },
            
            changeLibdDebe(input){
                input.libd_debe_cambio= (parseFloat(input.libd_debe).toFixed(2)*parseFloat(this.compraData.ca_tipo_cambio).toFixed(2)).toFixed(2);
                this.destinosAll();
            },
            
            changeLibdHaber(input){
                input.libd_haber_cambio= (parseFloat(input.libd_haber).toFixed(2)*parseFloat(this.compraData.ca_tipo_cambio).toFixed(2)).toFixed(2);
                this.destinosAll();
            },
            
            changeTipoCambio(){
                this.compraData.detalle_libro.forEach(detalle => {
                    detalle.libd_debe_cambio=(parseFloat(this.compraData.ca_tipo_cambio).toFixed(2)*parseFloat(detalle.libd_debe).toFixed(2)).toFixed(2);
                    detalle.libd_haber_cambio=(parseFloat(this.compraData.ca_tipo_cambio).toFixed(2)*parseFloat(detalle.libd_haber).toFixed(2)).toFixed(2);
                });
                this.sumaD();
                this.sumaH();
                this.destinosAll();
            },        
            limpiar(){
                this.compraData= {
                    per_porcentaje:3,
                    per_total:0.00,
                    detracciones: {
                        porcentaje: 0,
                    },
                    id_compra: null,
                    venta_id:null,
                    nc_fecha_relacionado:moment().format("yyyy-MM-DD"),
                    nc_serie_relacionado:"",
                    nc_correlativo_relacionado:"",
                    det_total:0.00,
                    det_numeroCuenta: "",
                    det_fecha: moment().format("yyyy-MM-DD"),
                    ca_operacion: generalData.compra.operacion[0].value,
                    ca_clasificacion: generalData.compra.clasificacion[0].value,
                    nc_motivo: "",
                    nc_motivo_desc: "",
                    ca_doi: "",
                    ca_razon_social: "",
                    ca_direccion: "",
                    ca_moneda: generalData.contabilidad.monedas[0].value,
                    ca_tipo_cambio: 1,
                    ca_tipo_doc: "",
                    nota_credito: [],
                    componente_id:null,
                    ca_serie: "F001",
                    ca_correlativo: "123",
                    ca_opcion: "1",
                    monto_total:0.00,
                    pa_fecha_emision: moment().format("yyyy-MM-DD"),
                    pa_fecha_vencimiento: moment().format("yyyy-MM-DD"),
                    detalle_libro: [],
                    detalle_hijo:[],
                    lib_total_debe: 0.00,
                    lib_total_haber: 0.00,
                    lib_total_debe_cambio: 0.00,
                    lib_total_haber_cambio: 0.00,
                    lib_glosa: "",
                    lib_tipo: "",                                   //variables por defecto en blanco
                    lib_modulo: "MC",                               //variables por defecto
                    emp_id: 1,                                      //variables por defecto
                    per_id: 1,                                      //variables por defecto
                    suc_id: 1,                                      //variables por defecto
                    pa_tipo_pago: "CONTADO",                        //variables por defecto
                    lib_fecha_registro: "2021-12-26 18:34:00",      //variables por defecto
                    cut: "",                                        //variables por defecto en blanco
                },
                this.motivo= {
                    cod: "",
                    desc: "",
                    doc:null,
                }
                this.proyectos= []
                this.componentes= []
                this.proyecto= null
                this.componente= null
            },
            showModalDestino(){
                this.$refs["modalDestinos"].show()  
            },
            
            async destinosAll(){
                this.compraData.detalle_hijo=[];
                for(let i=0;i<this.compraData.detalle_libro.length;i++){
                    
                    if(this.compraData.detalle_libro[i].libd_id_cta!=null){
                        var valor=0.00;
                        let request = {
                            url: "/api/cctacontable/" + this.compraData.detalle_libro[i].libd_id_cta,
                            method: "GET",
                        };
                        var resp = await store.dispatch("back/EXECUTE", request);

                        if(this.compraData.detalle_libro[i].libd_dh=='H'){
                            valor=this.compraData.detalle_libro[i].libd_haber;
                        }else{
                            valor=this.compraData.detalle_libro[i].libd_debe;
                        }

                        resp.destino.forEach(element => {
                            this.compraData.detalle_hijo.push({
                                libd_id_padre: this.compraData.detalle_libro[i].libd_id_cta,
                                dest_origin: this.compraData.detalle_libro[i].libd_nro_cta,
                                libd_nro_cta:element.dest_cod_dest,                        
                                libd_debe: ((parseFloat(element.dest_porcentaje_debe).toFixed(2)*
                                parseFloat(valor).toFixed(2))/100).toFixed(2),
                                libd_haber: ((parseFloat(element.dest_porcentaje_haber).toFixed(2)*
                                parseFloat(valor).toFixed(2))/100).toFixed(2),
                                libd_debe_cambio: ((((parseFloat(element.dest_porcentaje_debe).toFixed(2)*
                                parseFloat(valor).toFixed(2))/100).toFixed(2))*parseFloat(this.compraData.ca_tipo_cambio).toFixed(2)).toFixed(2),
                                libd_haber_cambio: ((((parseFloat(element.dest_porcentaje_haber).toFixed(2)*
                                parseFloat(valor).toFixed(2))/100).toFixed(2))*parseFloat(this.compraData.ca_tipo_cambio).toFixed(2)).toFixed(2),
                                libd_desc: this.cuentas.find((clas) => clas.id == element.dest_id).plc_descripcion,
                                libd_id_cta:element.dest_id,
                                libd_kardex: null,
                                libd_anexo:"NINGUNO",
                                movimiento_kardex: null,
                                libd_dh: null,
                            });
                        });                  
                    }                            
                }      
            },
            
            async SaveProducto() {
                    var i;
                    var result = [];
                    for (i in this.productData.categorias) {
                        var obj = {};
                        obj["cat_id"] = this.productData.categorias[i].id;
                        result.push(obj);
                    }
                    var sucur = [];
                    for (i in this.productData.sucursales) {
                        var obj = {};
                        obj["suc_id"] = this.productData.sucursales[i].id;
                        sucur.push(obj);
                    }
                    let request = {
                        url: "/api/producto",
                        method: "POST",
                        // data:this.productData
                        data: {
                        nombre: this.productData.nombre,
                        marca: this.productData.marca,
                        stock: this.productData.stock,
                        precio: this.productData.precio,
                        idEmpresa: this.productData.idEmpresa,
                        prod_tipo_kardex:this.productData.prod_tipo_kardex,
                        categorias: result,
                        sucursales: sucur,
                        idUnm: this.productData.idUnm,
                        precios: this.productData.precios,
                        },
                    };
                    try {
                        var respRoles = await store.dispatch("back/EXECUTE", request);
                        if (respRoles.status == 200) {
                            var url = "/api/producto/1/"+this.productoAux.kardex     
                            let request= {
                                url:url,
                                method:"GET",
                                headers: {
                                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`
                                },
                            }
                            var respRoles = await store.dispatch('back/EXECUTE',request)
                            this.kardexProducto=respRoles.rows                     
                            this.compraData.detalle_libro[this.productoAux.index].movimiento_kardex.push({
                                id: this.kardexProducto[this.kardexProducto.length-1].id,
                                prod_nombre: this.kardexProducto[this.kardexProducto.length-1].prod_nombre,
                                unm_nombre: this.kardexProducto[this.kardexProducto.length-1].unm_nombre,
                                mov_cantidad: 0,
                                mov_precio: 0,
                            });
                            this.sendMessage("Producto registrado satisfactoriamente","CheckSquareIcon","success");
                            this.$refs["modalProducto"].hide();
                        } else if (respRoles.status == 500) {
                            this.sendMessage("Error de servidor","AlertTriangleIcon","danger");
                        } else {
                            this.sendMessage(respRoles.message,"AlertTriangleIcon","danger");
                        }
                    } catch (e) {
                        console.log(e.message);
                    }
            },
            
            validationFormProducto() {
                this.$refs.simpleRules.validate().then((success) => {
                    if (success) {
                        this.SaveProducto();
                    }
                });
            },
            validationFormProducto() {
                this.$refs.agregarProductoRules.validate().then((success) => {
                    if (success) {
                        this.SaveProducto();
                    }
                });
            },       
            
            deleteItem(index) {
                this.$delete(this.productData.precios, index);
            },
            
            onRowSelected(items) {
                var i = 0;
                for (i in this.productData.precios) {
                    this.productData.precios[i].prepro_isprincipal = false;
                    if (
                    this.productData.precios[i].prepro_nombre ===
                        items[0].prepro_nombre &&
                    this.productData.precios[i].prepro_nombre === items[0].prepro_nombre
                    ) {
                    this.productData.precios[i].prepro_isprincipal = true;
                    }
                }
                this.selected = items;
                this.productData.precio = items[0].prepro_precio;
            },
            
            showModalProducto(item,index){
                this.productoAux={
                    kardex:item.libd_kardex,
                    index:index,
                }
                this.productData= {
                    nombre: "",
                    marca: "",
                    stock: "",
                    prod_tipo_kardex: item.libd_kardex,
                    prod_tipo_descripcion: this.kardex.find((kar) => kar.value == item.libd_kardex).text,
                    precio: 50,
                    idEmpresa: 1,
                    categorias: [],
                    sucursales: [],
                    idUnm: 1,
                    precios: [],
                },      
                this.$refs["modalProducto"].show()      
            },
            
            addPrecios(){
                this.$refs.agregarProductoPrecioRules.validate().then(success => {
                    if (success) {
                        this.productData.precios.push({
                            prepro_nombre: this.descripcion,
                            prepro_precio: this.precio,
                            prepro_isprincipal: false,
                        });
                        this.descripcion = "";
                        this.precio = "";
                    }
                });    
            },
        },
    };
</script>
<style lang="scss">
    @import "~@core/scss/vue/libs/vue-select.scss";
</style>