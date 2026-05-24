// Embarque.jsx
import { useState } from 'react'
import { IoAirplaneOutline } from 'react-icons/io5'
import { FaArrowRight } from 'react-icons/fa6'
import './Embarque.css'

const voos = [
    { id: 'LA408', destino: 'Lisboa',      gate: 'A2', status: 'Embarque',   passageiros: [
        { id: 'P001', nome: 'Ana Ferreira',    assento: '14A', bagagem: 1, checkin: true,  embarcou: false },
        { id: 'P003', nome: 'Joana Silva',     assento: '22C', bagagem: 0, checkin: false, embarcou: false },
        { id: 'P007', nome: 'Rui Cardoso',     assento: '5B',  bagagem: 2, checkin: true,  embarcou: true  },
    ]},
    { id: 'DT201', destino: 'Joanesburgo', gate: 'A2', status: 'No horário', passageiros: [
        { id: 'P002', nome: 'Carlos Mbemba',  assento: '3B',  bagagem: 2, checkin: true,  embarcou: true  },
        { id: 'P005', nome: 'Fátima Neto',    assento: '41F', bagagem: 1, checkin: true,  embarcou: true  },
    ]},
    { id: 'TP450', destino: 'Paris',       gate: 'B1', status: 'Atrasado',   passageiros: [
        { id: 'P004', nome: 'Manuel Cardoso', assento: '8D',  bagagem: 2, checkin: true,  embarcou: false },
        { id: 'P006', nome: 'Pedro Lopes',    assento: '5A',  bagagem: 1, checkin: false, embarcou: false },
    ]},
]

const obterClasse = (status) => {
    const mapa = {
        'Embarque':   'embarcando',
        'No horário': 'confirmado',
        'Atrasado':   'atrasado',
        'Programado': 'programado',
    }
    return mapa[status] ?? 'programado'
}

const Embarque = () => {
    const [voosState, setVoosState] = useState(voos)

    const embarcar = (vooId, paxId) => {
        setVoosState(prev => prev.map(v =>
            v.id !== vooId ? v : {
                ...v,
                passageiros: v.passageiros.map(p =>
                    p.id === paxId ? { ...p, embarcou: true } : p
                )
            }
        ))
    }

    return (
        <div className='seccao-embarque'>
            <div className='embarque'>
                <div className='embarque-topo'>
                    <h2><IoAirplaneOutline /> Controlo de Embarque</h2>
                    <a href='/' className='ver-todos'>Ver todos <FaArrowRight /></a>
                </div>

                <div className='embarque-grid'>
                    {voosState.map(v => {
                        const todos      = v.passageiros
                        const embarcados = todos.filter(p => p.embarcou)
                        const prontos    = todos.filter(p => p.checkin && !p.embarcou)
                        const semCheckin = todos.filter(p => !p.checkin)
                        const pct        = todos.length > 0 ? (embarcados.length / todos.length) * 100 : 0
                        const cls        = obterClasse(v.status)

                        return (
                            <div key={v.id} className={`voo-card ${cls}`}>

                                <div className='voo-card-header'>
                                    <div className='voo-card-info'>
                                        <span className='voo-codigo'>{v.id}</span>
                                        <span className='voo-destino'>{v.destino}</span>
                                        <span className='voo-gate'>Gate {v.gate}</span>
                                    </div>
                                    <span className={`status ${cls}`}>{v.status}</span>
                                </div>

                                <div className='voo-progresso'>
                                    <div className='voo-progresso-nums'>
                                        <span>{embarcados.length} embarcados</span>
                                        <span>{prontos.length} prontos</span>
                                        {semCheckin.length > 0 && (
                                            <span className='sem-checkin-count'>{semCheckin.length} sem check-in</span>
                                        )}
                                    </div>
                                    <div className='barra'>
                                        <div className={`progresso ${cls}`} style={{ width: `${pct}%` }} />
                                    </div>
                                    <div className='pct-label'>{Math.round(pct)}% embarcado</div>
                                </div>

                                {prontos.length > 0 && (
                                    <div className='pax-lista'>
                                        <div className='pax-lista-titulo'>Prontos para embarcar</div>
                                        {prontos.map(p => (
                                            <div key={p.id} className='pax-row'>
                                                <div className='pax-avatar'>
                                                    {p.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                                </div>
                                                <div className='pax-info'>
                                                    <span className='pax-nome'>{p.nome}</span>
                                                    <span className='pax-detalhe'>Assento {p.assento} · {p.bagagem} </span>
                                                </div>
                                                <button
                                                    className='btn-embarcar'
                                                    onClick={() => embarcar(v.id, p.id)}
                                                >
                                                    ✈ Embarcar
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {semCheckin.length > 0 && (
                                    <div className='alerta-sem-checkin'>
                                        ⚠ Sem check-in: {semCheckin.map(p => p.nome).join(', ')}
                                    </div>
                                )}

                                {prontos.length === 0 && semCheckin.length === 0 && todos.length > 0 && (
                                    <div className='todos-embarcados'>
                                        ✓ Todos os passageiros embarcados
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Embarque