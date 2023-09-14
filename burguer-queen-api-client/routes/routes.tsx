import Home from '../src/components/home'
import Login from '../src/components/login'
import Orders from '../src/components/orders'
import Admin from '../src/components/admin'
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
    }

  ];

export default ROUTES;