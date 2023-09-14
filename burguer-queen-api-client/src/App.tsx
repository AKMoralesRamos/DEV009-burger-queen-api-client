import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css';
import ROUTES  from '../routes/routes'



const App = () => {
  const router = createBrowserRouter (ROUTES) ;
 
  return (
 
    <div>
  
     <RouterProvider 
     router={router}
     />
  
    </div>
   )
}

export default App ;





