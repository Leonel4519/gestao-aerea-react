// Voo.jsx
import './Voo.css'
import { useState } from 'react'
import StatsCard from '../../components/statscard/StatsCard'
import TabelaTodosVoos from '../../components/Tabelatodososvoos/TabelaTodosVoos'
import PainelImpacto from '../../components/painelimpacto/PainelImpacto'
import { voos as voosIniciais } from '../../data/dashboardData'

const Voo = () => {
    const [voos, setVoos] = useState(voosIniciais)

    const voosAtrasados   = voos.filter(voo => voo.estado === 'Atrasado')
    const voosEmbarque    = voos.filter(voo => voo.estado === 'Embarque')
    const voosPontuais    = voos.filter(voo => voo.estado === 'No horário')
    const voosProgramados = voos.filter(voo => voo.estado === 'Programado')

    const passageirosAfectados = voosAtrasados.reduce(
        (total, voo) => total + voo.passageiros, 0
    )

    const gatesDuplicados = voos.filter(
        (voo, index, array) =>
            array.findIndex(v => v.gate === voo.gate) !== index
    )

    return (
        <div className="seccao_voo">
            <div className="voo-card-container">
                <StatsCard
                    titulo="Programados"
                    value={voosProgramados.length + voosPontuais.length}
                    subtitulo="operações hoje"
                    variante="voo_programados"
                />
                <StatsCard
                    titulo="Em andamento"
                    value={voosEmbarque.length}
                    subtitulo="embarque activo"
                    variante="voo_em_atendimento"
                />
                <StatsCard
                    titulo="No horário"
                    value={voosPontuais.length}
                    subtitulo="pontualidade operacional"
                    variante="voo_concluidos"
                />
                <StatsCard
                    titulo="Atrasados/Cancelados"
                    value={voosAtrasados.length}
                    subtitulo={`${passageirosAfectados} afectados`}
                    variante="voo_atrasados"
                />
            </div>

            <div className='area-operacional-voo'>
                <div className='tabelato_dos_voos-container'>
                    <TabelaTodosVoos voos={voos} setVoos={setVoos} />
                </div>

                <PainelImpacto
                    voosAtrasados={voosAtrasados}
                    passageirosAfectados={passageirosAfectados}
                    gatesDuplicados={gatesDuplicados}
                />
            </div>
        </div>
    )
}

export default Voo