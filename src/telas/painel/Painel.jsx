import './Painel.css'
import { useVoos } from '../../context/VooContext'
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
import PrioridadeOperacional from '../../components/prioridade/PrioridadeOperacional'
import { checkinsHoje, bagagens, excessoBagagem, atendimentos } from '../../data/dashboardData'

const Painel = () => {
    const { voos } = useVoos()

    const voosAtrasados = voos.filter(voo => voo.estado === 'Atrasado')

    const impactoAtrasos = voosAtrasados.map(
        voo => `${voo.codigo}: ${voo.passageiros} passageiros afectados`
    ).join(' • ')

    const gatesDuplicados = voos.filter(
        (voo, index, array) =>
            array.findIndex(v => v.gate === voo.gate) !== index
    )

    const mensagemGate = gatesDuplicados.map(
        voo => `${voo.codigo} no gate ${voo.gate}`
    ).join(', ')

    return (
        <div className='painel'>

            {voosAtrasados.length > 0 && (
                <div className='container-overbooking-alerta'>
                    <Alerta
                        titulo="Impacto operacional"
                        mensagem={impactoAtrasos}
                        icon={<FiAlertTriangle/>}
                        variante="impacto"
                    />
                </div>
            )}

            {gatesDuplicados.length > 0 && (
                <div className='container-overbooking-alerta'>
                    <Alerta
                        titulo="Conflito de gates"
                        mensagem={mensagemGate}
                        icon={<FiAlertTriangle/>}
                        variante="conflito"
                    />
                </div>
            )}
            
            <div className='container-prioridade-operacional'>
            <PrioridadeOperacional/>
            </div>

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
                    variante="bagagens"
                />

                <StatsCard
                    titulo="Atendimentos abertos"
                    value={atendimentos}
                    subtitulo="1 urgente pendente"
                    icon={<RiCustomerServiceLine/>}
                    variante="atendimento"
                />
            </div>

            <div className='tabela-area'>
                <div className='painel-esquerdo'>
                    <TabelaVoo/>
                    <Gates/>
                    <PainelEmbarque/>
                </div>
                <div className="painel-direito">
                    <FluxoCheckin/>
                    <UltimosCheckins/>
                </div>
            </div>

        </div>
    )
}

export default Painel