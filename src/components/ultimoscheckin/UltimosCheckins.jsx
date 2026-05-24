// UltimosCheckins.jsx
import './UltimosCheckins.css'
import { useCheckin } from '../../context/CheckinContext'
import { useNavigate } from 'react-router-dom'

const variantes = ['azul', 'verde', 'roxo', 'laranja', 'vermelho']

const UltimosCheckins = () => {
    const { passageiros } = useCheckin()
    const navigate = useNavigate()

    const concluidos = passageiros.filter(p => p.checkinFeito)
    const pendentes  = passageiros.filter(p => !p.checkinFeito)

    return (
        <div className="ultimos-checkins">
            <div className="checkins-header">
                <h2>Últimos check-ins</h2>
                <span>{concluidos.length} hoje</span>
            </div>

            <div className="checkins-lista">
                {concluidos.length === 0 ? (
                    <div className="checkins-vazio">
                        Nenhum check-in concluído ainda
                    </div>
                ) : (
                    concluidos.map((p, index) => (
                        <div className="checkin-item" key={p.id}>
                            <div className={`checkin-avatar ${variantes[index % variantes.length]}`}>
                                {p.iniciais}
                            </div>
                            <div className="checkin-info">
                                <h3>{p.nome}</h3>
                                <p>{p.voo} · {p.assento} · {p.bagagens?.length ?? 0} bag</p>
                            </div>
                            <span className="checkin-time">{p.hora}</span>
                        </div>
                    ))
                )}
            </div>

            {pendentes.length > 0 && (
                <div className="checkins-pendentes">
                    <span>⚠ {pendentes.length} passageiro{pendentes.length > 1 ? 's' : ''} pendente{pendentes.length > 1 ? 's' : ''}</span>
                    <button onClick={() => navigate('/todoscheckin')}>Ver</button>
                </div>
            )}
        </div>
    )
}

export default UltimosCheckins