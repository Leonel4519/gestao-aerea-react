import './Navibar.css'

import Logo from "../logo/Logo"

import { IoMdTime } from 'react-icons/io'
import { MdOutlineDashboard } from 'react-icons/md'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { TbLuggage } from 'react-icons/tb'
import { MdFlightTakeoff } from 'react-icons/md'
import { IoPersonOutline } from 'react-icons/io5'
import { TfiBarChartAlt } from 'react-icons/tfi'
import { FiLogOut } from 'react-icons/fi'

import { Link } from "react-router-dom"

const Navbar = () => {

    const usuario = JSON.parse(
        localStorage.getItem('usuario')
    )

    const perfil = usuario?.perfil

    const sair = () => {

        localStorage.removeItem('usuario')

        window.location.reload()
    }

    return (

        <div className="sidenav">

            <Logo/>

            <div className="container-lista">

                <ul>

                    {/* PRINCIPAL */}

                    <h1 className="title-ul">
                        PRINCIPAL
                    </h1>

                    <li>

                        <Link to="/">

                            <MdOutlineDashboard/>

                            <span>Painel</span>

                        </Link>

                    </li>

                    {

                        perfil === 'supervisor'

                        &&

                        <li>

                            <Link to="/voo">

                                <IoMdTime/>

                                <span>Voos</span>

                            </Link>

                        </li>
                    }

                    {/* OPERAÇÕES */}

                    <h1 className="title-ul">
                        OPERAÇÕES
                    </h1>

                    {

                        (

                            perfil === 'supervisor'

                            ||

                            perfil === 'checkin'

                        )

                        &&

                        <li>

                            <Link to="/todoscheckin">

                                <FaRegCalendarCheck/>

                                <span>Check-in</span>

                            </Link>

                        </li>
                    }

                    {

                        (

                            perfil === 'supervisor'

                            ||

                            perfil === 'bagagem'

                        )

                        &&

                        <li>

                            <Link to="/bagagem">

                                <TbLuggage/>

                                <span>Bagagem</span>

                            </Link>

                        </li>
                    }

                    {

                        (

                            perfil === 'supervisor'

                            ||

                            perfil === 'embarque'

                        )

                        &&

                        <li>

                            <Link to="/embarque">

                                <MdFlightTakeoff/>

                                <span>Embarque</span>

                            </Link>

                        </li>
                    }

                    {/* ADMINISTRAÇÃO */}

                    {

                        perfil === 'supervisor'

                        &&

                        <>

                            <h1 className="title-ul">
                                ADMINISTRAÇÃO
                            </h1>

                            <li>

                                <Link to="/passageiros">

                                    <IoPersonOutline/>

                                    <span>Passageiros</span>

                                </Link>

                            </li>

                            <li>

                                <Link to="/relatorios">

                                    <TfiBarChartAlt/>

                                    <span>Relatórios</span>

                                </Link>

                            </li>

                        </>

                    }

                </ul>

                {/* UTILIZADOR */}

                <div className='logout-container'>

                    <div className='usuario-info'>

                        <span className='usuario-nome'>
                            {usuario?.nome}
                        </span>

                        <span className='usuario-perfil'>
                            {usuario?.perfil}
                        </span>

                    </div>

                    <button
                        className='btn-logout'
                        onClick={sair}
                    >

                        <FiLogOut/>

                        <span>Sair</span>

                    </button>

                </div>

            </div>

        </div>
    )
}

export default Navbar