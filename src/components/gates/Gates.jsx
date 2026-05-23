// Gates.jsx
import './Gates.css'
import { voos } from '../../data/dashboardData'

const Gates = () => {
    const gates = ['A1', 'A2', 'A3', 'B1', 'B2', 'C1']

    const obterEstadoGate = (gate) => {
        const voo = voos.find(voo => voo.gate === gate)
        if (!voo)                       return { estado: 'Livre',    classe: 'livre'    }
        if (voo.estado === 'Atrasado')  return { estado: 'Atrasado', classe: 'atrasado' }
        if (voo.estado === 'Embarque')  return { estado: 'Embarque', classe: 'embarque' }
        return                                 { estado: 'Ocupado',  classe: 'ocupado'  }
    }

    return (
        <div className='gates-container'>
            <div className='gates-header'>
                <h2>Estado dos Gates</h2>
                <span className='gates-count'>{gates.length} gates</span>
            </div>
            <div className='gates-grid'>
                {gates.map((gate) => {
                    const info = obterEstadoGate(gate)
                    return (
                        <div key={gate} className='gate-card'>
                            <div className={`gate-avatar ${info.classe}`}>{gate}</div>
                            <div className='gate-info'>
                                <span className='gate-name'>Gate {gate}</span>
                                <span className={`gate-estado ${info.classe}`}>{info.estado}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Gates