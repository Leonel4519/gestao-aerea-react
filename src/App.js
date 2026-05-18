import Navbar from './components/navibar/Navbar';
import './App.css';
import Painel from './telas/painel/Painel';
import Header from './header/Header';
import { Route,Routes } from 'react-router-dom';
import Voo from './telas/voo/Voo';

function App() {
  return (
    <div className="App">
       <Navbar/>
       <div className='container-header'>
        <Header/>
       </div>
  
       <Routes>
        <Route path="/" element={<Painel/>}/>
        <Route path="/voo" element={<Voo/>}/>
       </Routes>
    </div>
  );
}
export default App;
