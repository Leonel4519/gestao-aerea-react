// UltimosCheckins.jsx
import './UltimosCheckins.css'

const UltimosCheckins = () => {
    const passageiros = [
        { iniciais: "MF", nome: "Manuel Ferreira", voo: "LA408 · 14A · 1 bag", hora: "14:50", variante: "azul"  },
        { iniciais: "AS", nome: "Ana Silva",        voo: "LA408 · 14A · 1 bag", hora: "14:47", variante: "verde" },
        { iniciais: "JN", nome: "João Neto",        voo: "LA408 · 14A · 1 bag", hora: "14:43", variante: "roxo"  },
    ]

    return (
        <div className="ultimos-checkins">
            <div className="checkins-header">
                <h2>Últimos check-ins</h2>
                <span>{passageiros.length} hoje</span>
            </div>
            <div className="checkins-lista">
                {passageiros.map((p, index) => (
                    <div className="checkin-item" key={index}>
                        <div className={`checkin-avatar ${p.variante}`}>{p.iniciais}</div>
                        <div className="checkin-info">
                            <h3>{p.nome}</h3>
                            <p>{p.voo}</p>
                        </div>
                        <span className="checkin-time">{p.hora}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UltimosCheckins