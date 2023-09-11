import Home from '../src/components/home'
import Login from '../src/components/login';

const ROUTES = [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />
    }

  ];

export default ROUTES;