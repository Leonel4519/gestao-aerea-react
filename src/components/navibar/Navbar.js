import './Navibar.css';
import Logo from "../logo/Logo";
import {IoMdTime} from 'react-icons/io';
import {MdOutlineDashboard} from 'react-icons/md'
import {FaRegCalendarCheck} from 'react-icons/fa'
import {TbLuggage} from 'react-icons/tb'
import {MdFlightTakeoff} from 'react-icons/md'
import {RiCustomerServiceLine} from 'react-icons/ri'
import {IoPersonOutline} from 'react-icons/io5'
import {IoSettingsOutline} from 'react-icons/io5'
import {TfiBarChartAlt} from 'react-icons/tfi'
import { Link } from "react-router-dom";

const Navbar = () => {
    return(
        <div className="sidenav">
            <Logo/>
            <div className="container-lista">
                <ul>
                    <h1 className="title-ul">PRINCIPAL</h1>
                        
                        <li>
                            <Link to="/">
                            <MdOutlineDashboard/>
                            painel
                            </Link>
                        </li>
                        <li>
                        
                            <Link to="/voo">
                            <IoMdTime/>
                            Voo hoje
                            </Link>
                            
                        </li>
                            <h1 className="title-ul">OPERAÇÕES</h1>
                        <li>
                            <a href='/'>
                            <FaRegCalendarCheck/>
                            Check-in</a>
                        </li>
                        <li>
                            <a href='/'>
                            <TbLuggage/>
                            Bagagem</a>
                        </li>
                        <li>
                            <a href='/'>
                            <MdFlightTakeoff/>
                            Embarque</a>
                        </li>
                        <li>
                            <a href='/'>
                            <RiCustomerServiceLine/>
                            Atendimento</a>
                        </li>
                            <h1 className="title-ul">GESTÃO</h1>
                        <li>
                            <a href='/'>
                            <IoPersonOutline/>
                            Passageiros</a>
                        </li>
                        <li>
                            <a href='/'>
                            <TfiBarChartAlt/>
                            Relatórios</a>
                        </li>
                        <li>
                            <a href='/'>
                            <IoSettingsOutline/>
                            Configurações</a>
                        </li>
                </ul>
            </div>
        </div>
    )
}


export default Navbar