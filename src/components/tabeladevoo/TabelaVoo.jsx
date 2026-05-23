// TabelaVoo.jsx
import './TabelaVoo.css'
import { FaArrowRight } from "react-icons/fa6"
import { IoAirplaneOutline } from 'react-icons/io5'
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

const TabelaVoo = () => (
    <div className="tabela-voo">
        <div className="tabela-header">
            <h2><IoAirplaneOutline/> Voos de Hoje</h2>
            <a href="/" className="ver-todos">Ver todos <FaArrowRight/></a>
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
                    const embarcados = voo.embarcados ?? 0
                    const pct = voo.passageiros > 0
                        ? (embarcados / voo.passageiros) * 100
                        : 0

                    return (
                        <tr key={voo.id}>
                            <td>{voo.codigo}</td>
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
                                        {embarcados} / {voo.passageiros}
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

export default TabelaVoo