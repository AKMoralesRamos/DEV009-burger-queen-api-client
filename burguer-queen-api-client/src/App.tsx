import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import ROUTES  from '../routes/routes'
import Header from '../src/components/header'

const App = () => {
  const router = createBrowserRouter (ROUTES) ;
 
  return (
   <div>
    <div> <Header/></div>
    <RouterProvider 
    router={router}
    />
   </div>
  )
}

export default App ;





