import { useState } from 'react' 
//import reactLogo from '../assets/react.svg'
import burger from '../images/burger.png'
import '../App.css'
import Header from './header'

function Home() {
    const [count, setCount] = useState(0);
  
    return (
      <>
      <Header /> 
        <div>
          <a href="https://img.freepik.com/fotos-premium/caricatura-hamburguesa-papas-fritas_891977-695.jpg?w=2000" target="_blank" rel="noopener noreferrer">
            <img src={burger} className="logo" alt="Vite logo" />
          </a>
          {/* <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a> */}
        </div>
        <h1>Burger Queen</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    );
  }

  export default Home;