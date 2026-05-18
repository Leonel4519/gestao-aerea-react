import './Painel.css'
import StatsCard from '../../components/statscard/StatsCard';
import {FaRegCalendarCheck} from 'react-icons/fa'
import { IoAirplaneOutline } from "react-icons/io5";
import {TbLuggage} from 'react-icons/tb'
import {RiCustomerServiceLine} from 'react-icons/ri'
import TabelaVoo from '../../components/tabeladevoo/TabelaVoo';
import FluxoCheckin from '../../components/fluxodechecin/FluxoCheckin';
import UltimosCheckins from '../../components/ultimoscheckin/UltimosCheckins';
import AlertaOverbooking from '../../components/alertaoverbooking/AlertaOverbooking';
import Header from '../../header/Header';
import { IoAlertCircleOutline } from "react-icons/io5";

const Painel = () =>{
    return(
        <div className='painel'>
            
            <div className='container-overbooking-alerta'>
                <AlertaOverbooking/>
            </div>
            
            <div className="cards-container">
                                    <StatsCard
                                        titulo="check-ins hoje"
                                        value="480"
                                        subtitulo="+12% vs ontem"
                                        icon={<FaRegCalendarCheck/>}
                                    />
                                    <StatsCard
                                        titulo="Voo em andamento"
                                        value="12"
                                        subtitulo="de 50 programados"
                                        icon={<IoAirplaneOutline/>}
                                        variante="voo"
                                    />
                                    <StatsCard
                                        titulo="Bagagens registadas"
                                        value="650"
                                        subtitulo="10 com excesso"
                                        icon={<TbLuggage/>}
                                        variante="bagagem"
                                    />
                                    <StatsCard
                                        titulo="Atendimentos abertos"
                                        value="15"
                                        subtitulo="1 uergente pendente"
                                        icon={<RiCustomerServiceLine/>}
                                        icon2={<IoAlertCircleOutline/>}
                                        variante="atendimento"
                                    />
            </div>

            <div className='tabela-container'>
                <TabelaVoo/>
                <div className="painel-direito">

                    <FluxoCheckin/>

                    <UltimosCheckins/>

                </div>
            </div>
            
                            
        </div>
           
    )
    
}

export default Painel;