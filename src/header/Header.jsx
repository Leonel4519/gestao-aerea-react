import { icons } from 'lucide-react'
import './header.css'
import {MdOutlineDashboard} from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import { IoAirplaneOutline } from "react-icons/io5";

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