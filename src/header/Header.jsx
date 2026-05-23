import { icons } from 'lucide-react'
import './header.css'
import {MdOutlineDashboard} from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { IoAirplaneOutline } from "react-icons/io5";
import {FaRegCalendarCheck} from 'react-icons/fa'
import {TbLuggage} from 'react-icons/tb'
import {TfiBarChartAlt} from 'react-icons/tfi'

const Header = ()=> {
     const location = useLocation()

    const paginas = {

        "/": {
           titulo:"Painel de opções",
            icon: <MdOutlineDashboard/>
        },
        "/voo":{
            titulo:"Painel de opções",
            icon: <IoAirplaneOutline/>
        },
        "/todoscheckin":{
            titulo:"Check-in de passageiro",
            icon: <FaRegCalendarCheck/>
        },
        "/bagagem":{
            titulo:"Bagagem de passageiro",
            icon: <TbLuggage/>
        },
        "/relatorios":{
            titulo:"Relatorios",
            icon: <TfiBarChartAlt/>
        }
    }
    return(
        <div className="header">
            <h2>
               
                {paginas[location.pathname].icon}
                {paginas[location.pathname].titulo}
             
            </h2>
        </div>
    )
}

export default Header;