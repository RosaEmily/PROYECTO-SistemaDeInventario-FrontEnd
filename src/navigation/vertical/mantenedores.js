/* eslint-disable */ 
export default [
  /*
  {
    header: 'Módulos',
  },
  {
        title: "Compras",
        children: [
      {
        title: 'Notas de Crédito',
      // icon: 'ShoppingBagIcon',
        route:
        {
          name: 'nota-credito-venta-lista-index',
        },
      },
        ]
  },
  {
        title: "Ventas",
        children: [
      {
        title: 'Notas de Crédito',
      // icon: 'ShoppingBagIcon',
        route:
        {
          name: 'notas-credito-compras-listar-index',
        },
      },
        ]
  },*/

  {
    header: 'Módulo Compras',
    children: [
      {
        title: 'Plan de Cuentas',
        route:
          {
            name: 'contabilidad-configuracion-plan-cuenta',
          },
      },
      {
        title: 'Tributos',
        route:
          {
            name: 'contabilidad-configuracion-tributo',
          },
      },
      {
        title: 'Proyectos',
        route:
          {
            name: 'contabilidad-configuracion-proyecto',
          },
      },
    ],
  },
  {
    title: 'Listar Compras',
    // icon: 'ShoppingBagIcon',
    route:
    {
      name: 'compras-lista-index',
    },
  },
  {
    title: 'Notas de Crédito',
    // icon: 'ShoppingBagIcon',
    route:
    {
      name: 'nota-credito-compra-lista-index',
    },
  },
  {
    title: 'Plantillas Compras',
    route:
    {
      name: 'compras-plantilla',
    },
  },
  {
    title: 'Proveedores',
    route:
    {
      name: 'compras-lista-proveedor',
    },
  },
  {
    header: 'Módulo Ventas',
  },
  {
    title: 'Listar Ventas',
    route:
    {
      name: 'ventas-lista-index',
    },
  },
  
  {
    title: 'Notas de Crédito',
    // icon: 'ShoppingBagIcon',
    route:
    {
      name: 'nota-credito-venta-lista-index',
    },
  },
  {
    title: 'Plantillas Ventas',
    route:
    {
      name: 'ventas-plantilla',
    },
  },
  {
    title: 'Clientes',
    route:
    {
      name: 'ventas-lista-cliente',
    },
  },
  {
    header: 'Módulo Inventario',
  },
  {
    title: 'Listar Productos',
    route:
    {
      name: 'inventario-lista-index',
    },
  },
  {
    title: 'Agregar Producto',
    route:
    {
      name: 'inventario-agregar-index',
    },
  },
  {
    title: 'Categorias',
    route:
    {
      name: 'inventario-categoria-index',
    },
  },
  {
    title: 'Plantillas Inventario',
    route:
    {
      name: 'inventario-plantilla',
    },
  },
  {
    header: 'Módulo Caja y Bancos',
  },
  {
        title: "Registro de C y B",
        children: [
      {
        title: 'Cobros y Pagos',
      // icon: 'ShoppingBagIcon',
        route:
        {
          name: 'caja-pago-cobro-index',
        },
      },
      {
        title: 'Otros Procesos',
      // icon: 'ShoppingBagIcon',
        route:
        {
          name: 'caja-otro-index',
        },
      },
        ]
  }, 
  {
    title: 'Plantillas de C y B',
    route:
    {
      name: 'caja-plantilla',
    },
  },
  {
    header: 'Módulo Diario',
  },
  {
    title: 'Listar Diario',
    route:
    {
      name: 'diario-lista-index',
    },
  },
  {
    title: 'Plantillas Diario',
    route:
    {
      name: 'diario-plantilla',
    },
  },
  {
    header: 'Módulo Contabilidad',
  },
  {
    title: 'Planes Contables',
    route:
    {
      name: 'contabilidad-configuracion-plan-cuenta',
    },
  },
  {
    title: 'Tributos',
    route:
    {
      name: 'contabilidad-configuracion-tributo',
    },
  },
  {
    title: 'Proyectos',
    route:
    {
      name: 'contabilidad-configuracion-proyecto',
    },
  },
  {
    title: "Reportes",
    children: [
  {
    title: 'Libro Diario',
  // icon: 'ShoppingBagIcon',
    route:
    {
      name: 'contabilidad-reportes-libro-diario',
    },
  },
  {
    title: 'Libro Mayor',
  // icon: 'ShoppingBagIcon',
    route:
    {
      name: 'contabilidad-reportes-libro-mayor',
    },
  },
    ]
}, 
  {
    header: 'Configuración',
  },
  {
    title: 'Sucursales',
    route:
    {
      name: 'configuracion-sucursal',
    },
  },
  {
    title: 'Cuenta Bancaria',
    route:
    {
      name: 'configuracion-cuenta-bancaria',
    },
  },
]
