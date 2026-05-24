import './Painel.css'
import { useVoos } from '../../context/VooContext'
import { useBagagem } from '../../context/BagagemContext'
import { useCheckin } from '../../context/CheckinContext'
import StatsCard from '../../components/statscard/StatsCard'
import { FaRegCalendarCheck } from 'react-icons/fa'
import { IoAirplaneOutline } from "react-icons/io5"
import { TbLuggage } from 'react-icons/tb'
import { IoAlertCircleOutline } from "react-icons/io5"
import { FiAlertTriangle } from "react-icons/fi"
import TabelaVoo from '../../components/tabeladevoo/TabelaVoo'
import FluxoCheckin from '../../components/fluxodechecin/FluxoCheckin'
import UltimosCheckins from '../../components/ultimoscheckin/UltimosCheckins'
import Alerta from '../../components/alerta/Alerta'
import Gates from '../../components/gates/Gates'
import PainelEmbarque from '../../components/embarque/PainelEmbarque'
import PrioridadeOperacional from '../../components/prioridade/PrioridadeOperacional'

const LIMITE = 30

const Painel = () => {
    const { voos }        = useVoos()
    const { bagagens }    = useBagagem()
    const { passageiros } = useCheckin()

    // BAGAGEM
    const totalBagagens   = bagagens.length
    const bagagensExcesso = bagagens.filter(b => b.peso > LIMITE)

    // CHECK-IN
    const checkinsFeitos  = passageiros.filter(p => p.checkinFeito).length
    const checkinsPendentes = passageiros.filter(p => !p.checkinFeito).length

    // VOOS
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
                        variante="warning"
                    />
                </div>
            )}

            {gatesDuplicados.length > 0 && (
                <div className='container-overbooking-alerta'>
                    <Alerta
                        titulo="Conflito de gates"
                        mensagem={mensagemGate}
                        icon={<FiAlertTriangle/>}
                        variante="danger"
                    />
                </div>
            )}

            <div className='container-prioridade-operacional'>
                <PrioridadeOperacional/>
            </div>

            <div className="cards-container">
                <StatsCard
                    titulo="Check-ins hoje"
                    value={checkinsFeitos}
                    subtitulo={`${checkinsPendentes} pendentes`}
                    icon={<FaRegCalendarCheck/>}
                    variante="checkin"
                />
                <StatsCard
                    titulo="Voos em andamento"
                    value={voos.length}
                    subtitulo={`${voosAtrasados.length} atrasados`}
                    icon={<IoAirplaneOutline/>}
                    variante="voo"
                />
                <StatsCard
                    titulo="Bagagens registadas"
                    value={totalBagagens}
                    subtitulo={bagagensExcesso.length > 0
                        ? `${bagagensExcesso.length} com excesso`
                        : 'Sem excesso'
                    }
                    icon={<TbLuggage/>}
                    icon2={bagagensExcesso.length > 0 ? <IoAlertCircleOutline/> : null}
                    variante="bagagens"
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