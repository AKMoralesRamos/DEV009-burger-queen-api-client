import Home from '../src/components/home'
import Login from '../src/components/login'
import Orders from '../src/components/orders'
import Admin from '../src/components/admin'
import GestionMesero from '../src/components/gestionMesero'
import MenuOrders from '../src/components/menuOrders'
import JefeDeCocina from '../src/components/jefeDeCocina'
import Trabajadores from '../src/components/gestionTrabajadores'
import Productos from '../src/components/gestionProductos'

const ROUTES = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/orders",
      element: <Orders />
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/gestionMesero",
      element: <GestionMesero />,
    },
    {
      path: "/jefeDeCocina",
      element: <JefeDeCocina />,
    },
    {
      path: "/gestionProductos",
      element: <Productos />,
    },
    {
      path: "/gestionTrabajadores",
      element: <Trabajadores />,
    },
  ];

export default ROUTES;