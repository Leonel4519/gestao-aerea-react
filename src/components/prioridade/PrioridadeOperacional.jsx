// PrioridadeOperacional.jsx
import './PrioridadeOperacional.css'
import { FiAlertTriangle } from "react-icons/fi"
import { useVoos } from '../../context/VooContext'
import { useCheckin } from '../../context/CheckinContext'

const PrioridadeOperacional = () => {
    const { voos } = useVoos()
    const { passageirosSemCheckin } = useCheckin()

    const prioridades = []

    // Voos atrasados — alta
    voos.forEach(voo => {
        if (voo.estado === 'Atrasado') {
            prioridades.push({
                tipo: 'alta',
                mensagem: `${voo.codigo} atrasado ${voo.atrasoMinutos ?? '—'} min — ${voo.passageiros} passageiros afectados`
            })
        }

        // Embarque activo — média
        if (voo.estado === 'Embarque') {
            const restantes = voo.passageiros - (voo.embarcados ?? 0)
            prioridades.push({
                tipo: 'media',
                mensagem: `${voo.codigo} em embarque — ${restantes} passageiros por embarcar`
            })
        }
    })

    // Gates duplicados — alta
    const gatesDuplicados = voos.filter(
        (voo, index, array) =>
            array.findIndex(v => v.gate === voo.gate) !== index
    )
    gatesDuplicados.forEach(voo => {
        prioridades.push({
            tipo: 'alta',
            mensagem: `Conflito de gate — ${voo.codigo} no gate ${voo.gate}`
        })
    })

    // Passageiros sem check-in — média ou alta
    if (passageirosSemCheckin.length > 0) {
        prioridades.push({
            tipo: passageirosSemCheckin.length > 2 ? 'alta' : 'media',
            mensagem: `${passageirosSemCheckin.length} passageiro${passageirosSemCheckin.length > 1 ? 's' : ''} sem check-in`
        })
    }

    if (prioridades.length === 0) {
        return (
            <div className='prioridade-operacional'>
                <div className='prioridade-header'>
                    <div className='prioridade-icon'><FiAlertTriangle/></div>
                    <div>
                        <h2>Prioridade Operacional</h2>
                        <p>Sem eventos críticos activos</p>
                    </div>
                </div>
                <div className='prioridade-vazia'>
                    <span>✓ Todas as operações normais</span>
                </div>
            </div>
        )
    }

    return (
        <div className='prioridade-operacional'>
            <div className='prioridade-header'>
                <div className='prioridade-icon'><FiAlertTriangle/></div>
                <div>
                    <h2>Prioridade Operacional</h2>
                    <p>{prioridades.length} evento{prioridades.length > 1 ? 's' : ''} crítico{prioridades.length > 1 ? 's' : ''} em tempo real</p>
                </div>
            </div>

            <div className='prioridade-lista'>
                {prioridades.map((item, index) => (
                    <div key={index} className={`prioridade-item ${item.tipo}`}>
                        <div className='prioridade-bola'></div>
                        <span>{item.mensagem}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PrioridadeOperacional