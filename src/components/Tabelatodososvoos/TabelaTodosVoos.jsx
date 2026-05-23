// TabelaTodosVoos.jsx
import './TabelaTodosVoos.css'
import { useState } from 'react'
import { voos } from '../../data/dashboardData'

const obterClasse = (estado) => {
    const mapa = {
        'Atrasado':   'atrasado',
        'No horário': 'confirmado',
        'Embarque':   'embarcando',
        'Programado': 'programado',
    }
    return mapa[estado] ?? 'programado'
}

const TabelaTodosVoos = () => {
    const [filtro, setFiltro] = useState('Todos')

    const voosFiltrados = voos.filter((voo) =>
        filtro === 'Todos' ? true : voo.estado === filtro
    )

    const filtros = ['Todos', 'Embarque', 'Atrasado', 'No horário']

    return (
        <div className="tabela-todos-voos">
            <div className="tabela-topo">
                <h2>Centro operacional de voos</h2>
                <div className="filtros">
                    {filtros.map((f) => (
                        <button
                            key={f}
                            className={filtro === f ? 'ativo' : ''}
                            onClick={() => setFiltro(f)}
                        >
                            {f === 'Todos' ? 'Todos' :
                             f === 'Embarque' ? 'Embarque' :
                             f === 'Atrasado' ? 'Atrasados' : 'No horário'}
                        </button>
                    ))}
                </div>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Voo</th>
                        <th>Origem</th>
                        <th>Destino</th>
                        <th>Hora</th>
                        <th>Gate</th>
                        <th>Embarque</th>
                        <th>Status</th>
                        <th>Impacto</th>
                    </tr>
                </thead>
                <tbody>
                    {voosFiltrados.map((voo) => {
                        const cls = obterClasse(voo.estado)
                        const embarcados = voo.embarcados ?? 0
                        const pct = voo.passageiros > 0
                            ? (embarcados / voo.passageiros) * 100
                            : 0

                        return (
                            <tr key={voo.id}>
                                <td>
                                    <div className="voo-info">
                                        <strong>{voo.codigo}</strong>
                                        <span>{voo.companhia}</span>
                                    </div>
                                </td>
                                <td>{voo.origem}</td>
                                <td>{voo.destino}</td>
                                <td>{voo.hora ?? '—'}</td>
                                <td><span className="gate-badge">{voo.gate}</span></td>
                                <td>
                                    <div className="pax-info">
                                        <span className="pax-nums">{embarcados} / {voo.passageiros}</span>
                                        <div className="barra">
                                            <div
                                                className={`progresso ${cls}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className={`status ${cls}`}>{voo.estado}</span>
                                </td>
                                <td className="impacto">
                                    {voo.estado === 'Atrasado'
                                        ? <span className="impacto-atraso">{voo.atrasoMinutos} min</span>
                                        : <span className="impacto-normal">{voo.embarqueStatus ?? '—'}</span>
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TabelaTodosVoos