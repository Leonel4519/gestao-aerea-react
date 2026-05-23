import Navbar from './components/navibar/Navbar';
import './App.css';
import Painel from './telas/painel/Painel';
import Header from './header/Header';
import { Route,Routes } from 'react-router-dom';
import Voo from './telas/voo/Voo';
import TodosCheckin from './telas/checkin/TodosCheckin';
import Bagagem from './telas/bagagem/Bagagem';
import Relatorios from './telas/relatorios/Relatorios';

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
        <Route path="/todoscheckin" element={<TodosCheckin/>}/>
        <Route path="/bagagem" element={<Bagagem/>}/>
        <Route path="/relatorios" element={<Relatorios/>}/>
       </Routes>
    </div>
  );
}
export default App;
