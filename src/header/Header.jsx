import './header.css'

import { useLocation } from 'react-router-dom'

import { MdOutlineDashboard } from 'react-icons/md'
import { IoAirplaneOutline } from "react-icons/io5"
import { FaRegCalendarCheck } from 'react-icons/fa'
import { TbLuggage } from 'react-icons/tb'
import { TfiBarChartAlt } from 'react-icons/tfi'
import { IoPersonOutline } from 'react-icons/io5'
import { MdFlightTakeoff } from 'react-icons/md'
import Notificacoes from '../components/notificacoes/Notificacoes'

const Header = () => {

    const location = useLocation()

    const paginas = {

        "/": {
            titulo: "Painel Operacional",
            subtitulo: "Visão geral do sistema aeroportuário",
            icon: <MdOutlineDashboard />
        },

        "/voo": {
            titulo: "Gestão de Voos",
            subtitulo: "Monitorização dos voos activos",
            icon: <IoAirplaneOutline />
        },

        "/todoscheckin": {
            titulo: "Check-in",
            subtitulo: "Controlo de passageiros",
            icon: <FaRegCalendarCheck />
        },

        "/bagagem": {
            titulo: "Bagagens",
            subtitulo: "Gestão e rastreamento de bagagens",
            icon: <TbLuggage />
        },

        "/relatorios": {
            titulo: "Relatórios",
            subtitulo: "Indicadores e desempenho operacional",
            icon: <TfiBarChartAlt />
        },

        "/passageiros": {
            titulo: "Passageiros",
            subtitulo: "Lista geral de passageiros",
            icon: <IoPersonOutline />
        },

        "/embarque": {
            titulo: "Embarque",
            subtitulo: "Controlo de embarque dos voos",
            icon: <MdFlightTakeoff />
        }
    }

    return (

        <div className="header">

            <div className='header-left'>

                <div className='header-icon'>

                    {paginas[location.pathname].icon}

                </div>

                <div className='header-texto'>

                    <h2>

                        {paginas[location.pathname].titulo}

                    </h2>

                    <p>

                        {paginas[location.pathname].subtitulo}

                    </p>

                </div>

            </div>
            <Notificacoes/>
        </div>
    )
}

export default Header