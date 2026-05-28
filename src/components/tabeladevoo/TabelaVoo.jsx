// TabelaVoo.jsx
import './TabelaVoo.css'
import { FaArrowRight } from "react-icons/fa6"
import { IoAirplaneOutline } from 'react-icons/io5'
import { useVoos } from '../../context/VooContext'
import { useCheckin } from '../../context/CheckinContext'

const obterClasse = (estado) => {
    const mapa = {
        'Atrasado':   'atrasado',
        'No horário': 'confirmado',
        'Embarque':   'embarcando',
        'Programado': 'programado',
    }
    return mapa[estado] ?? 'programado'
}

const TabelaVoo = () => {
    const { voos }        = useVoos()
    const { passageiros } = useCheckin()

    return (
        <div className="tabela-voo">
            <div className="tabela-header">
                <h2><IoAirplaneOutline/> Voos de Hoje</h2>
                <a href="/voo" className="ver-todos">Ver todos <FaArrowRight/></a>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Voo</th>
                        <th>Destino</th>
                        <th>Hora</th>
                        <th>Status</th>
                        <th>Gate</th>
                        <th>Embarque</th>
                    </tr>
                </thead>
                <tbody>
                    {voos.map((voo) => {
                        const cls = obterClasse(voo.estado)

                        // passageiros deste voo com check-in feito
                        const paxDoVoo       = passageiros.filter(p => p.voo === voo.codigo)
                        const totalPax       = paxDoVoo.length > 0 ? paxDoVoo.length : voo.passageiros
                        const checkinsFeitos = paxDoVoo.filter(p => p.checkinFeito).length
                        const embarcados     = paxDoVoo.length > 0 ? checkinsFeitos : (voo.embarcados ?? 0)
                        const pct            = totalPax > 0 ? (embarcados / totalPax) * 100 : 0

                        return (
                            <tr key={voo.id}>
                                <td>
                                    <div className="voo-info-cell">
                                        <strong>{voo.codigo}</strong>
                                        <span>{voo.companhia}</span>
                                    </div>
                                </td>
                                <td>{voo.destino}</td>
                                <td>{voo.hora ?? '—'}</td>
                                <td>
                                    <span className={`status ${cls}`}>
                                        {voo.estado}
                                    </span>
                                </td>
                                <td>{voo.gate}</td>
                                <td>
                                    <div className="embarque-info">
                                        <span className="embarque-nums">
                                            {embarcados} / {totalPax}
                                        </span>
                                        <div className="barra">
                                            <div
                                                className={`progresso ${cls}`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TabelaVoo