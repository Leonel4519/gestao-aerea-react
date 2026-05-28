// Embarque.jsx
import { useState } from 'react'
import { IoAirplaneOutline } from 'react-icons/io5'
import './Embarque.css'
import { useCheckin } from '../../context/CheckinContext'
import { useVoos } from '../../context/VooContext'

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
    const { passageiros }  = useCheckin()
    const { voos }         = useVoos()
    const [embarcados, setEmbarcados] = useState([])

    const embarcar = (passageiroId) => {
        setEmbarcados(prev => [...prev, passageiroId])
    }

    // Agrupa passageiros por voo
    const voosComPassageiros = voos.map(voo => {
        const paxDoVoo = passageiros.filter(p => p.voo === voo.codigo)

        return {
            id:          voo.codigo,
            destino:     voo.destino,
            gate:        voo.gate,
            status:      voo.estado,
            passageiros: paxDoVoo.map(p => ({
                id:        p.id,
                nome:      p.nome,
                assento:   p.assento,
                checkin:   p.checkinFeito,
                embarcou:  embarcados.includes(p.id)
            }))
        }
    }).filter(v => v.passageiros.length > 0)

    return (
        <div className='seccao-embarque'>
            <div className='embarque'>
                <div className='embarque-topo'>
                    <h2><IoAirplaneOutline /> Controlo de Embarque</h2>
                </div>

                {voosComPassageiros.length === 0 && (
                    <div className='embarque-vazio'>
                        Nenhum passageiro registado nos voos activos.
                    </div>
                )}

                <div className='embarque-grid'>
                    {voosComPassageiros.map(v => {
                        const todos       = v.passageiros
                        const embarcadosList = todos.filter(p => p.embarcou)
                        const prontos     = todos.filter(p => p.checkin && !p.embarcou)
                        const semCheckin  = todos.filter(p => !p.checkin)
                        const pct         = todos.length > 0
                            ? (embarcadosList.length / todos.length) * 100
                            : 0
                        const cls = obterClasse(v.status)

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
                                        <span>{embarcadosList.length} embarcados</span>
                                        <span>{prontos.length} prontos</span>
                                        {semCheckin.length > 0 && (
                                            <span className='sem-checkin-count'>
                                                {semCheckin.length} sem check-in
                                            </span>
                                        )}
                                    </div>
                                    <div className='barra'>
                                        <div
                                            className={`progresso ${cls}`}
                                            style={{ width: `${pct}%` }}
                                        />
                                    </div>
                                    <div className='pct-label'>
                                        {Math.round(pct)}% embarcado
                                    </div>
                                </div>

                                {prontos.length > 0 && (
                                    <div className='pax-lista'>
                                        <div className='pax-lista-titulo'>
                                            Prontos para embarcar
                                        </div>
                                        {prontos.map(p => (
                                            <div key={p.id} className='pax-row'>
                                                <div className='pax-avatar'>
                                                    {p.nome.split(' ').map(n => n[0]).slice(0,2).join('')}
                                                </div>
                                                <div className='pax-info'>
                                                    <span className='pax-nome'>{p.nome}</span>
                                                    <span className='pax-detalhe'>
                                                        Assento {p.assento}
                                                    </span>
                                                </div>
                                                <button
                                                    className='btn-embarcar'
                                                    onClick={() => embarcar(p.id)}
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