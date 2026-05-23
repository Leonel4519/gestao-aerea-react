import './Painel.css'

import StatsCard from '../../components/statscard/StatsCard'

import { FaRegCalendarCheck } from 'react-icons/fa'

import { IoAirplaneOutline } from "react-icons/io5"

import { TbLuggage } from 'react-icons/tb'

import { RiCustomerServiceLine } from 'react-icons/ri'

import { IoAlertCircleOutline } from "react-icons/io5"

import { FiAlertTriangle } from "react-icons/fi"

import TabelaVoo from '../../components/tabeladevoo/TabelaVoo'

import FluxoCheckin from '../../components/fluxodechecin/FluxoCheckin'

import UltimosCheckins from '../../components/ultimoscheckin/UltimosCheckins'

import Alerta from '../../components/alerta/Alerta'

import Gates from '../../components/gates/Gates'

import PainelEmbarque from '../../components/embarque/PainelEmbarque'

import {

    voos,

    checkinsHoje,

    bagagens,

    excessoBagagem,

    atendimentos

} from '../../data/dashboardData'

import PrioridadeOperacional from '../../components/prioridade/PrioridadeOperacional'

/* Não estou a usar o heatmap */
const Painel = () => {

    /* Detectar voos atrasados */

    const voosAtrasados = voos.filter(

        voo => voo.estado === 'Atrasado'

    )

    /* Impacto operacional */

    const impactoAtrasos = voosAtrasados.map(

        voo => (

            `${voo.codigo}: ${voo.passageiros} passageiros afectados`
        )

    ).join(' • ')

    /* Detectar gates duplicados */

    const gatesDuplicados = voos.filter(

        (voo, index, array) =>

            array.findIndex(
                v => v.gate === voo.gate
            ) !== index
    )

    /* Mensagem conflito gates */

    const mensagemGate = gatesDuplicados.map(

        voo => `${voo.codigo} no gate ${voo.gate}`

    ).join(', ')

    return(

        <div className='painel'>

            {/* ALERTA ATRASOS */}

            {voosAtrasados.length > 0 && (

                <div className='container-overbooking-alerta'>

                    <Alerta
                        titulo="Impacto operacional"
                        mensagem={impactoAtrasos}
                        icon={<FiAlertTriangle/>}
                    />

                </div>

            )}

            {/* ALERTA GATES */}

            {gatesDuplicados.length > 0 && (

                <div className='container-overbooking-alerta'>

                    <Alerta
                        titulo="Conflito de gates"
                        mensagem={mensagemGate}
                        icon={<FiAlertTriangle/>}
                    />

                </div>

            )}

            <PrioridadeOperacional/>

            {/* CARDS */}
    

            <div className="cards-container">

                <StatsCard
                    titulo="Check-ins hoje"
                    value={checkinsHoje}
                    subtitulo="+12% vs ontem"
                    icon={<FaRegCalendarCheck/>}
                    variante="checkin"
                />

                <StatsCard
                    titulo="Voos em andamento"
                    value={voos.length}
                    subtitulo="voos ativos hoje"
                    icon={<IoAirplaneOutline/>}
                    variante="voo"
                />

                <StatsCard
                    titulo="Bagagens registadas"
                    value={bagagens}
                    subtitulo={`${excessoBagagem} com excesso`}
                    icon={<TbLuggage/>}
                    icon2={<IoAlertCircleOutline/>}
                    variante="bagagem"
                />

                <StatsCard
                    titulo="Atendimentos abertos"
                    value={atendimentos}
                    subtitulo="1 urgente pendente"
                    icon={<RiCustomerServiceLine/>}
                    variante="atendimento"
                />

            </div>

            {/* ÁREA PRINCIPAL */}

            <div className='tabela-area'>

                {/* ESQUERDA */}

                <div className='painel-esquerdo'>

                    <TabelaVoo/>

                    <Gates/>

                    <PainelEmbarque/>

                </div>

                {/* DIREITA */}

                <div className="painel-direito">

                    <FluxoCheckin/>

                    <UltimosCheckins/>

                </div>

            </div>

        </div>
    )
}

export default Painel