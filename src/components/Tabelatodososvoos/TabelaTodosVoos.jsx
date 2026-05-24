// TabelaTodosVoos.jsx
import './TabelaTodosVoos.css'
import { useState } from 'react'
import { useVoos } from '../../context/VooContext'

const obterClasse = (estado) => {
    const mapa = {
        'Atrasado':   'atrasado',
        'No horário': 'confirmado',
        'Embarque':   'embarcando',
        'Programado': 'programado',
    }
    return mapa[estado] ?? 'programado'
}

const estadosDisponiveis = ['No horário', 'Embarque', 'Atrasado', 'Programado']

const TabelaTodosVoos = () => {
    const { voos, setVoos } = useVoos()
    const [filtro, setFiltro]           = useState('Todos')
    const [mostrarForm, setMostrarForm] = useState(false)
    const [novoVoo, setNovoVoo]         = useState({
        codigo: '', origem: '', destino: '', hora: '',
        gate: '', passageiros: '', estado: 'No horário',
        companhia: '', embarcados: 0, embarqueStatus: '', atrasoMinutos: 0
    })

    const filtros = ['Todos', 'Embarque', 'Atrasado', 'No horário', 'Programado']

    const voosFiltrados = voos.filter((voo) =>
        filtro === 'Todos' ? true : voo.estado === filtro
    )

    const handleChange = (e) => {
        setNovoVoo({ ...novoVoo, [e.target.name]: e.target.value })
    }

    const handleAdicionar = () => {
        if (!novoVoo.codigo || !novoVoo.destino) return
        setVoos([...voos, {
            ...novoVoo,
            id: Date.now(),
            passageiros:   Number(novoVoo.passageiros)   || 0,
            embarcados:    Number(novoVoo.embarcados)    || 0,
            atrasoMinutos: Number(novoVoo.atrasoMinutos) || 0,
        }])
        setNovoVoo({
            codigo: '', origem: '', destino: '', hora: '',
            gate: '', passageiros: '', estado: 'No horário',
            companhia: '', embarcados: 0, embarqueStatus: '', atrasoMinutos: 0
        })
        setMostrarForm(false)
    }

    return (
        <div className="tabela-todos-voos">
            <div className="tabela-topo">
                <h2>Centro operacional de voos</h2>
                <div className="tabela-topo-acoes">
                    <div className="filtros">
                        {filtros.map((f) => (
                            <button
                                key={f}
                                className={filtro === f ? 'ativo' : ''}
                                onClick={() => setFiltro(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <button
                        className="btn-adicionar"
                        onClick={() => setMostrarForm(!mostrarForm)}
                    >
                        {mostrarForm ? '✕ Cancelar' : '+ Novo voo'}
                    </button>
                </div>
            </div>

            {mostrarForm && (
                <div className="form-novo-voo">
                    <div className="form-grid">
                        <div className="form-grupo">
                            <label>Código *</label>
                            <input name="codigo" value={novoVoo.codigo} onChange={handleChange} placeholder="ex: LA408" />
                        </div>
                        <div className="form-grupo">
                            <label>Companhia</label>
                            <input name="companhia" value={novoVoo.companhia} onChange={handleChange} placeholder="ex: TAAG" />
                        </div>
                        <div className="form-grupo">
                            <label>Origem</label>
                            <input name="origem" value={novoVoo.origem} onChange={handleChange} placeholder="ex: Luanda" />
                        </div>
                        <div className="form-grupo">
                            <label>Destino *</label>
                            <input name="destino" value={novoVoo.destino} onChange={handleChange} placeholder="ex: Lisboa" />
                        </div>
                        <div className="form-grupo">
                            <label>Hora</label>
                            <input name="hora" value={novoVoo.hora} onChange={handleChange} placeholder="ex: 14:30" />
                        </div>
                        <div className="form-grupo">
                            <label>Gate</label>
                            <input name="gate" value={novoVoo.gate} onChange={handleChange} placeholder="ex: A1" />
                        </div>
                        <div className="form-grupo">
                            <label>Passageiros</label>
                            <input name="passageiros" type="number" value={novoVoo.passageiros} onChange={handleChange} placeholder="ex: 180" />
                        </div>
                        <div className="form-grupo">
                            <label>Estado</label>
                            <select name="estado" value={novoVoo.estado} onChange={handleChange}>
                                {estadosDisponiveis.map(e => (
                                    <option key={e} value={e}>{e}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-acoes">
                        <button className="btn-cancelar" onClick={() => setMostrarForm(false)}>Cancelar</button>
                        <button className="btn-confirmar" onClick={handleAdicionar}>Adicionar voo</button>
                    </div>
                </div>
            )}

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
                        const cls        = obterClasse(voo.estado)
                        const embarcados = voo.embarcados ?? 0
                        const pct        = voo.passageiros > 0
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
                                            <div className={`progresso ${cls}`} style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>
                                </td>
                                <td><span className={`status ${cls}`}>{voo.estado}</span></td>
                                <td>
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