/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/middleware/auth";
Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/Home.vue"),
            meta: {
                pageTitle: "Home",
                middleware: auth,
                breadcrumb: [
                    {
                        text: "Home",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/second-page",
            name: "second-page",
            component: () => import("@/views/SecondPage.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Second Page",
                breadcrumb: [
                    {
                        text: "Second Page",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/listar/",
            name: "compras-lista-index",
            component: () => import("@/views/compras/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Compras",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/agregar/",
            name: "compras-agregar-index",
            component: () => import("@/views/compras/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Compra",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/editar/:id",
            name: "compras-editar-index",
            component: () => import("@/views/compras/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Compra",
                breadcrumb: [
                    {
                        text: "Compras",
                        active: true,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/notas-credito/listar/",
            name: "nota-credito-compra-lista-index",
            component: () => import("@/views/compras/nota-credito/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Notas de Crédito de Compras",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Notas de Crédito",
                        to: { name: "nota-credito-compra-lista-index" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/notas-credito/agregar/",
            name: "nota-credito-agregar-index",
            component: () => import("@/views/compras/nota-credito/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Nota de Crédito de Compras",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Notas de Crédito",
                        to: { name: "nota-credito-compra-lista-index" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/plantillas/listar/",
            name: "compras-plantilla",
            component: () => import("@/views/compras/plantilla/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Plantillas de Compras",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Plantillas",
                        to: { name: "compras-plantilla" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/plantillas/agregar/",
            name: "compras-plantilla-agregar",
            component: () => import("@/views/compras/plantilla/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Plantilla de Compras",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Plantillas",
                        to: { name: "compras-plantilla" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/plantillas/editar/:id",
            name: "compras-plantilla-editar",
            component: () => import("@/views/compras/plantilla/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Plantilla de Compras",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Plantillas",
                        to: { name: "compras-plantilla" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/proveedores/listar/",
            name: "compras-lista-proveedor",
            component: () => import("@/views/compras/proveedor/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Proveedores",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Proveedores",
                        to: { name: "compras-lista-proveedor" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/proveedores/agregar/",
            name: "compras-proveedor-agregar",
            component: () =>
                import("@/views/compras/proveedor/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Proveedor",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Proveedores",
                        to: { name: "compras-lista-proveedor" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/compras/proveedores/editar/:id",
            name: "compras-proveedor-editar-id",
            component: () =>
                import("@/views/compras/proveedor/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Proveedor",
                breadcrumb: [
                    {
                        text: "Compras",
                        to: { name: "compras-lista-index" },
                        active: false,
                    },
                    {
                        text: "Proveedores",
                        to: { name: "compras-lista-proveedor" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/listar/",
            name: "ventas-lista-index",
            component: () => import("@/views/ventas/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Ventas",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/agregar/",
            name: "ventas-agregar-index",
            component: () => import("@/views/ventas/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Venta",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/editar/:id",
            name: "ventas-editar-index",
            component: () => import("@/views/ventas/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Venta",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/notas-credito/listar/",
            name: "nota-credito-venta-lista-index",
            component: () => import("@/views/ventas/nota-credito/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Notas de Crédito de Ventas",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Notas de Crédito",
                        to: { name: "nota-credito-venta-lista-index" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/notas-credito/agregar/",
            name: "nota-credito-venta-agregar-index",
            component: () => import("@/views/ventas/nota-credito/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Nota de Crédito de Ventas",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Notas de Crédito",
                        to: { name: "nota-credito-venta-lista-index" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/plantillas/listar/",
            name: "ventas-plantilla",
            component: () => import("@/views/ventas/plantilla/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Plantillas de Ventas",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Plantillas",
                        to: { name: "ventas-plantilla" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/plantillas/agregar",
            name: "ventas-plantilla-agregar",
            component: () => import("@/views/ventas/plantilla/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Plantilla de Ventas",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Plantillas",
                        to: { name: "ventas-plantilla" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/plantillas/editar/:id",
            name: "ventas-plantilla-editar",
            component: () => import("@/views/ventas/plantilla/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Plantilla de Ventas",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Plantillas",
                        to: { name: "ventas-plantilla" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/clientes/listar/",
            name: "ventas-lista-cliente",
            component: () => import("@/views/ventas/cliente/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Clientes",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Clientes",
                        to: { name: "ventas-lista-cliente" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/clientes/agregar/",
            name: "ventas-cliente-agregar",
            component: () => import("@/views/ventas/cliente/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Cliente",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Clientes",
                        to: { name: "ventas-lista-cliente" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/ventas/clientes/editar/:id",
            name: "ventas-cliente-editar-id",
            component: () => import("@/views/ventas/cliente/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Cliente",
                breadcrumb: [
                    {
                        text: "Ventas",
                        to: { name: "ventas-lista-index" },
                        active: false,
                    },
                    {
                        text: "Clientes",
                        to: { name: "ventas-lista-cliente" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/contabilidad-configuracion-plan-cuenta",
            name: "contabilidad-configuracion-plan-cuenta",
            component: () =>
                import("@/views/contabilidad/plan-cuentas/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Plan de Cuentas",
                breadcrumb: [
                    {
                        text: "Contabilidad",
                        active: true,
                    },
                    {
                        text: "Plan de Cuentas",
                        to: { name: "contabilidad-configuracion-plan-cuenta" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/contabilidad-configuracion-tributo",
            name: "contabilidad-configuracion-tributo",
            component: () => import("@/views/contabilidad/tributos/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Tributo",
                breadcrumb: [
                    {
                        text: "Contabilidad",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/contabilidad-agregar",
            name: "contabilidad-agregar",
            component: () =>
                import("@/views/contabilidad/plan-cuentas/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plan de Cuentas",
                breadcrumb: [
                    {
                        text: "Contabilidad",
                        active: true,
                    },
                    {
                        text: "Plan de Cuentas",
                        to: { name: "contabilidad-configuracion-plan-cuenta" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/contabilidad/editar/:id",
            name: "contabilidad-editar-id",
            component: () =>
                import("@/views/contabilidad/plan-cuentas/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plan Contable:",
                breadcrumb: [
                    {
                        text: "Contabilidad",
                        active: true,
                    },
                    {
                        text: "Plan de Cuentas",
                        to: { name: "contabilidad-configuracion-plan-cuenta" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/contabilidad-configuracion-proyecto",
            name: "contabilidad-configuracion-proyecto",
            component: () =>
                import("@/views/contabilidad/proyectos/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Proyecto",
                breadcrumb: [
                    {
                        text: "Contabilidad",
                        active: true,
                    },
                    {
                        text: "Proyecto",
                        to: { name: "contabilidad-configuracion-proyecto" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/contabilidad/proyecto/editar/:id",
            name: "/contabilidad/proyecto/editar",
            component: () =>
                import("@/views/contabilidad/proyectos/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Proyecto",
                breadcrumb: [
                    {
                        text: "Contabilidad",
                        active: true,
                    },
                    {
                        text: "Proyecto",
                        to: { name: "contabilidad-configuracion-proyecto" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/contabilidad/reportes/libro_diario",
            name: "contabilidad-reportes-libro-diario",
            component: () =>
                import("@/views/contabilidad/reportes/libro_diario/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Libro Diario",
                breadcrumb: [
                    {
                        text: "Contabilidad",
                        active: true,
                    },
                    {
                        text: "Reportes",
                        active: true,
                    },
                    {
                        text: "Libro Diario",
                        active: false,
                    },
                ],
            },
        },
        {
            path: "/contabilidad/reportes/libro_mayor",
            name: "contabilidad-reportes-libro-mayor",
            component: () =>
                import("@/views/contabilidad/reportes/libro_mayor/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Libro Mayor",
                breadcrumb: [
                    {
                        text: "Contabilidad",
                        active: true,
                    },
                    {
                        text: "Reportes",
                        active: true,
                    },
                    {
                        text: "Libro Mayor",
                        active: false,
                    },
                ],
            },
        },
        {
            path: "/proyecto-agregar-index",
            name: "proyecto-agregar-index",
            component: () =>
                import("@/views/contabilidad/proyectos/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Proyecto",
                breadcrumb: [
                    {
                        text: "Contabilidad",
                        active: true,
                    },
                    {
                        text: "Proyecto",
                        to: { name: "contabilidad-configuracion-proyecto" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/inventario-lista-index",
            name: "inventario-lista-index",
            component: () => import("@/views/inventario/lista/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Productos",
                breadcrumb: [
                    {
                        text: "Inventario",
                        active: true,
                    },
                    {
                        text: "Productos",
                        to: { name: "inventario-lista-index" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/inventario-agregar-index",
            name: "inventario-agregar-index",
            component: () => import("@/views/inventario/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Producto",
                breadcrumb: [
                    {
                        text: "Inventario",
                        active: true,
                    },
                    {
                        text: "Productos",
                        to: { name: "inventario-lista-index" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/inventario/editar/index/:id",
            name: "inventario-editar-index",
            component: () => import("@/views/inventario/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Producto",
                breadcrumb: [
                    {
                        text: "Inventario",
                        active: true,
                    },
                    {
                        text: "Productos",
                        to: { name: "inventario-lista-index" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/inventario-plantilla",
            name: "inventario-plantilla",
            component: () => import("@/views/inventario/plantilla/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plantilla",
                breadcrumb: [
                    {
                        text: "Inventario",
                        active: true,
                    },
                    {
                        text: "Plantilla",
                        active: true,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/inventario-categoria-index",
            name: "inventario-categoria-index",
            component: () => import("@/views/inventario/categoria/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Categoria",
                breadcrumb: [
                    {
                        text: "Inventario",
                        active: true,
                    },
                    {
                        text: "Categoria",
                        to: { name: "inventario-categoria-index" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/inventario-plantilla-agregar",
            name: "inventario-plantilla-agregar",
            component: () => import("@/views/inventario/plantilla/agregar.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plantilla",
                breadcrumb: [
                    {
                        text: "Inventario",
                        active: true,
                    },
                    {
                        text: "Plantilla",
                        active: true,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/caja-pago-cobro-index",
            name: "caja-pago-cobro-index",
            component: () => import("@/views/caja/pago_cobro/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Caja",
                breadcrumb: [
                    {
                        text: "Caja",
                        active: true,
                    },
                    {
                        text: "Cobro y Pago",
                        active: true,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/caja-pago-cobro-agregar",
            name: "caja-pago-cobro-agregar",
            component: () => import("@/views/caja/pago_cobro/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar de Caja",
                breadcrumb: [
                    {
                        text: "Caja",
                        active: true,
                    },
                    {
                        text: "Cobro y Pago",
                        active: true,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/caja/pago_cobro/ver/:id",
            name: "caja-pago-cobro-ver",
            component: () => import("@/views/caja/pago_cobro/ver/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Caja",
                breadcrumb: [
                    {
                        text: "Caja",
                        active: true,
                    },
                    {
                        text: "Cobro y Pago",
                        active: true,
                    },
                    {
                        text: "Ver",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/caja-otro-index",
            name: "caja-otro-index",
            component: () => import("@/views/caja/otro/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Caja",
                breadcrumb: [
                    {
                        text: "Caja",
                        active: true,
                    },
                    {
                        text: "Otro Procesos",
                        active: true,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/caja-otro-agregar",
            name: "caja-otro-agregar",
            component: () => import("@/views/caja/otro/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar de Caja",
                breadcrumb: [
                    {
                        text: "Caja",
                        active: true,
                    },
                    {
                        text: "Otro Procesos",
                        active: true,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/caja/otro/ver/:id",
            name: "caja-otro-ver",
            component: () => import("@/views/caja/otro/ver/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Caja",
                breadcrumb: [
                    {
                        text: "Caja",
                        active: true,
                    },
                    {
                        text: "Otro Procesos",
                        active: true,
                    },
                    {
                        text: "Ver",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/caja-plantilla",
            name: "caja-plantilla",
            component: () => import("@/views/caja/plantilla/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plantilla",
                breadcrumb: [
                    {
                        text: "Caja",
                        active: true,
                    },
                    {
                        text: "Plantilla",
                        to: { name: "caja-plantilla" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/caja-plantilla-agregar",
            name: "caja-plantilla-agregar",
            component: () => import("@/views/caja/plantilla/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plantilla",
                breadcrumb: [
                    {
                        text: "Caja",
                        active: true,
                    },
                    {
                        text: "Plantilla",
                        to: { name: "caja-plantilla" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/caja/plantilla/editar/:id",
            name: "caja-plantilla-editar",
            component: () => import("@/views/caja/plantilla/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plantilla",
                breadcrumb: [
                    {
                        text: "Caja",
                        active: true,
                    },
                    {
                        text: "Plantilla",
                        to: { name: "caja-plantilla" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/diario-lista-index",
            name: "diario-lista-index",
            component: () => import("@/views/diario/lista/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Diario",
                breadcrumb: [
                    {
                        text: "Diario",
                        to: { name: "diario-lista-index" },
                        active: false,
                    },  
                    {
                        text: "Lista",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/diario-agregar-index",
            name: "diario-agregar-index",
            component: () => import("@/views/diario/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Diario",
                breadcrumb: [
                    {
                        text: "Diario",
                        to: { name: "diario-lista-index" },
                        active: false,
                    },  
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/diario/ver/:id",
            name: "diario-ver-index",
            component: () => import("@/views/diario/ver/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Diario",
                breadcrumb: [
                    {
                        text: "Diario",
                        to: { name: "diario-lista-index" },
                        active: false,
                    },                 
                    {
                        text: "Ver",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/diario-plantilla",
            name: "diario-plantilla",
            component: () => import("@/views/diario/plantilla/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plantilla",
                breadcrumb: [
                    {
                        text: "Diario",
                        active: true,
                    },
                    {
                        text: "Plantilla",
                        to: { name: "diario-plantilla" },
                        active: false,
                    },
                    {
                        text: "Listar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/diario-plantilla-agregar",
            name: "diario-plantilla-agregar",
            component: () => import("@/views/diario/plantilla/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plantilla",
                breadcrumb: [
                    {
                        text: "Diario",
                        active: true,
                    },
                    {
                        text: "Plantilla",
                        to: { name: "diario-plantilla" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/diario/plantilla/editar/:id",
            name: "diario-plantilla-editar",
            component: () => import("@/views/diario/plantilla/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Plantilla",
                breadcrumb: [
                    {
                        text: "Diario",
                        active: true,
                    },
                    {
                        text: "Plantilla",
                        to: { name: "diario-plantilla" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/configuracion-sucursal",
            name: "configuracion-sucursal",
            component: () => import("@/views/configuracion/sucursal/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Sucursal",
                breadcrumb: [
                    {
                        text: "Configuración",
                        active: true,
                    },
                    {
                        text: "Sucursal",
                        to: { name: "configuracion-sucursal" },
                        active: false,
                    },
                ],
            },
        },
        {
            path: "/configuracion-sucursal-agregar",
            name: "configuracion-sucursal-agregar",
            component: () =>
                import("@/views/configuracion/sucursal/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Sucursal",
                breadcrumb: [
                    {
                        text: "Configuración",
                        active: true,
                    },
                    {
                        text: "Sucursal",
                        to: { name: "configuracion-sucursal" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        to: { name: "configuracion-sucursal-agregar" },
                        active: false,
                    },
                ],
            },
        },
        {
            path: "/configuracion/sucursal/editar/:id",
            name: "configuracion-sucursal-editar",
            component: () =>
                import("@/views/configuracion/sucursal/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Sucursal",
                breadcrumb: [
                    {
                        text: "Configuración",
                        active: true,
                    },
                    {
                        to: { name: "configuracion-sucursal" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/configuracion-cuenta-bancaria",
            name: "configuracion-cuenta-bancaria",
            component: () => import("@/views/configuracion/cuenta_bancaria/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Cuenta Bancaria",
                breadcrumb: [
                    {
                        text: "Configuración",
                        active: true,
                    },
                    {
                        text: "Cuenta Bancaria",
                        to: { name: "configuracion-cuenta-bancaria" },
                        active: false,
                    },
                ],
            },
        },
        {
            path: "/configuracion-cuenta-bancaria-agregar",
            name: "configuracion-cuenta-bancaria-agregar",
            component: () =>
                import("@/views/configuracion/cuenta_bancaria/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Cuenta Bancaria",
                breadcrumb: [
                    {
                        text: "Configuración",
                        active: true,
                    },
                    {
                        text: "Cuenta Bancaria",
                        to: { name: "configuracion-cuenta-bancaria" },
                        active: false,
                    },
                    {
                        text: "Agregar",
                        active:true,
                    },
                ],
            },
        },
        {
            path: "/configuracion/cuenta_bancaria/editar/:id",
            name: "configuracion-cuenta-bancaria-editar",
            component: () =>
                import("@/views/configuracion/cuenta_bancaria/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Cuenta Bancaria",
                breadcrumb: [
                    {
                        text: "Configuración",
                        active: true,
                    },                   
                    {
                        text: "Cuenta Bancaria",
                        to: { name: "configuracion-cuenta-bancaria" },
                        active: false,
                    },
                    {
                        text: "Editar",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/configuracion-index",
            name: "configuracion-index",
            component: () => import("@/views/configuracion/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Configuracion",
                breadcrumb: [
                    {
                        text: "Configuracion",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/Login.vue"),
            meta: {
                layout: "full",
            },
        },
        {
            path: "/error-404",
            name: "error-404",
            component: () => import("@/views/error/Error404.vue"),
            meta: {
                layout: "full",
            },
        },
        {
            path: "*",
            redirect: "error-404",
        },
    ],
});

router.afterEach(() => {
    const appLoading = document.getElementById("loading-bg");
    if (appLoading) {
        appLoading.style.display = "none";
    }
});

function nextFactory(context, middleware, index) {
    const subsequentMiddleware = middleware[index];
    // If no subsequent Middleware exists,
    // the default `next()` callback is returned.
    if (!subsequentMiddleware) return context.next;

    return (...parameters) => {
        // Run the default Vue Router `next()` callback first.
        context.next(...parameters);
        // Then run the subsequent Middleware with a new
        // `nextMiddleware()` callback.
        const nextMiddleware = nextFactory(context, middleware, index || 1);
        subsequentMiddleware({ ...context, next: nextMiddleware });
    };
}

router.beforeEach((to, from, next) => {
    if (to.meta.middleware) {
        const middleware = Array.isArray(to.meta.middleware)
            ? to.meta.middleware
            : [to.meta.middleware];

        const context = {
            from,
            next,
            router,
            to,
        };
        const nextMiddleware = nextFactory(context, middleware, 1);
        return middleware[0]({ ...context, next: nextMiddleware });
    }
    return next();
});
export default router;
