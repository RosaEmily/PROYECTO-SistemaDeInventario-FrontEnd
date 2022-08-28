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
                        text: "Listar",
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
            path: "/inventario/productos/listar",
            name: "inventario-lista-index",
            component: () => import("@/views/inventario/producto/lista/index.vue"),
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
            path: "/inventario/productos/agregar",
            name: "inventario-agregar-index",
            component: () => import("@/views/inventario/producto/agregar/index.vue"),
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
            path: "/inventario/productos/editar/:id",
            name: "inventario-editar-index",
            component: () => import("@/views/inventario/producto/editar/index.vue"),
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
            path: "/inventario/categorias/listar",
            name: "inventario-categoria-listar-index",
            component: () => import("@/views/inventario/categoria/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Categorías",
                breadcrumb: [
                    {
                        text: "Inventario",
                        active: true,
                    },
                    {
                        text: "Categorías",
                        to: { name: "inventario-categoria-listar-index" },
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
            path: "/inventario/categorias/agregar",
            name: "inventario-categoria-agregar-index",
            component: () => import("@/views/inventario/categoria/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Categoría",
                breadcrumb: [
                    {
                        text: "Inventario",
                        active: true,
                    },
                    {
                        text: "Categorías",
                        to: { name: "inventario-categoria-listar-index" },
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
            path: "/inventario/categorias/editar/:id",
            name: "inventario-categoria-editar-index",
            component: () => import("@/views/inventario/categoria/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Categoría",
                breadcrumb: [
                    {
                        text: "Inventario",
                        active: true,
                    },
                    {
                        text: "Categorías",
                        to: { name: "inventario-categoria-listar-index" },
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
            path: "/seguridad/usuarios/listar",
            name: "usuario-lista-index",
            component: () => import("@/views/seguridad/usuarios/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Usuarios",
                breadcrumb: [
                    {
                        text: "Seguridad",
                        active: true,
                    },
                    {
                        text: "Usuarios",
                        to: { name: "usuario-lista-index" },
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
            path: "/seguridad/usuarios/agregar",
            name: "usuario-agregar-index",
            component: () => import("@/views/seguridad/usuarios/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Usuario",
                breadcrumb: [
                    {
                        text: "Seguridad",
                        active: true,
                    },
                    {
                        text: "Usuarios",
                        to: { name: "usuario-lista-index" },
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
            path: "/seguridad/usuarios/editar/:id",
            name: "usuario-editar-index",
            component: () => import("@/views/seguridad/usuarios/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Usuario",
                breadcrumb: [
                    {
                        text: "Seguridad",
                        active: true,
                    },
                    {
                        text: "Usuarios",
                        to: { name: "usuario-lista-index" },
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
            path: "/seguridad/roles/listar",
            name: "rol-lista-index",
            component: () => import("@/views/seguridad/roles/listar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Lista de Roles",
                breadcrumb: [
                    {
                        text: "Seguridad",
                        active: true,
                    },
                    {
                        text: "Roles",
                        to: { name: "rol-lista-index" },
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
            path: "/seguridad/roles/agregar",
            name: "rol-agregar-index",
            component: () => import("@/views/seguridad/roles/agregar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Agregar Rol",
                breadcrumb: [
                    {
                        text: "Seguridad",
                        active: true,
                    },
                    {
                        text: "Roles",
                        to: { name: "rol-lista-index" },
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
            path: "/seguridad/roles/editar/:id",
            name: "rol-editar-index",
            component: () => import("@/views/seguridad/roles/editar/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Editar Usuario",
                breadcrumb: [
                    {
                        text: "Seguridad",
                        active: true,
                    },
                    {
                        text: "Roles",
                        to: { name: "rol-lista-index" },
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
            path: "/usuario-perfil",
            name: "usuario-perfil",
            component: () => import("@/views/seguridad/perfil/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Perfil de Usuario",
                breadcrumb: [
                    {
                        text: "Pefil",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/Graficos",
            name: "producto-reporte",
            component: () => import("@/views/reportes/reporte1/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Gráficos",
                breadcrumb: [
                    {
                        text: "Gráficos",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/reporte2",
            name: "producto-reporte2",
            component: () => import("@/views/reportes/reporte2/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Dashboard",
                breadcrumb: [
                    {
                        text: "Dashboard",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/reporte3",
            name: "producto-reporte3",
            component: () => import("@/views/reportes/reporte3/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Productos",
                breadcrumb: [
                    {
                        text: "Productos en Reposición",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/reporte4",
            name: "producto-reporte4",
            component: () => import("@/views/reportes/reporte4/index.vue"),
            meta: {
                middleware: auth,
                pageTitle: "Productos",
                breadcrumb: [
                    {
                        text: "Análisis ABC",
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
