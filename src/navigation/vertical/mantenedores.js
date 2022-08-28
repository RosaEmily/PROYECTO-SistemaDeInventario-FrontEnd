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
  },
  {
    title: 'Compras',
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
    title: 'Ventas',
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
    title: 'Productos',
    route:
    {
      name: 'inventario-lista-index',
    },
  },
  {
    title: 'Categorias',
    route:
    {
      name: 'inventario-categoria-listar-index',
    },
  },   
 
  {
    header: 'Módulo De Seguridad',
  },
  {
    title: 'Usuarios',
    route:
    {
      name: 'usuario-lista-index',
    },
  },
  {
    title: 'Roles',
    route:
    {
      name: 'rol-lista-index',
    },
  },
  {
    header: 'Módulo De Reporte',
  },
  {
    title: 'Gráficos',
    route:
    {
      name: 'producto-reporte',
    },
  },
  {
    title: 'P. Reposición',
    route:
    {
      name: 'producto-reporte3',
    },
  },
  {
    title: 'Análisis ABC',
    route:
    {
      name: 'producto-reporte4',
    },
  }
]
