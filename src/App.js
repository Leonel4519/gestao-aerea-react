import './App.css'

import { Routes, Route } from 'react-router-dom'

import Navbar from './components/navibar/Navbar'

import Header from './header/Header'

import Painel from './telas/painel/Painel'

import Voo from './telas/voo/Voo'

import TodosCheckin from './telas/checkin/TodosCheckin'

import Bagagem from './telas/bagagem/Bagagem'

import Relatorios from './telas/relatorios/Relatorios'

import TabelaPassageiros from './telas/passageiro/TabelaPassageiros'

import Embarque from './telas/embarque/Embarque'

import Login from './telas/login/Login'

import { VooProvider } from './context/VooContext'

import { CheckinProvider } from './context/CheckinContext'

import { BagagemProvider } from './context/BagagemContext'

import { NotificacaoProvider } from './context/NotificacaoContext'

function App() {

  const usuario = localStorage.getItem('usuario')

  /* SE NÃO ESTIVER LOGADO */

  if(!usuario){

    return <Login/>
  }

  return (

    <VooProvider>

      <CheckinProvider>

        <BagagemProvider>
          <NotificacaoProvider>

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

              <Route path="/passageiros" element={<TabelaPassageiros/>}/>

              <Route path="/embarque" element={<Embarque/>}/>

            </Routes>

          </div>

           </NotificacaoProvider>
        </BagagemProvider>

      </CheckinProvider>

    </VooProvider>
  )
}

export default App