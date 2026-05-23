// FluxoCheckin.jsx — icons preservados
import './FluxoCheckin.css'
import { MdOutlineChecklist } from "react-icons/md"

const FluxoCheckin = () => {
    const etapas = [
        { titulo: "Validar bilhete",         hora: "14:50", estado: "concluido" },
        { titulo: "Registrar bagagem",        hora: "15:00", estado: "concluido" },
        { titulo: "Verificar overbooking",    hora: "14:50", estado: "ativo"     },
        { titulo: "Emitir cartão embarque",   hora: "15:00", estado: "pendente"  },
        { titulo: "Liberação para embarque",  hora: "",      estado: "pendente"  },
    ]

    return (
        <div className="fluxo-checkin">
            <div className="fluxo-header">
                <h2><MdOutlineChecklist /> Fluxo de check-in</h2>
            </div>
            <div className="fluxo-lista">
                {etapas.map((etapa, index) => (
                    <div className={`fluxo-item ${etapa.estado}`} key={index}>
                        <div className="fluxo-icon">✓</div>
                        <div className="fluxo-conteudo">
                            <h3>{etapa.titulo}</h3>
                            <p>
                                {etapa.estado === "concluido" && `concluído ${etapa.hora}`}
                                {etapa.estado === "ativo"     && `em curso ${etapa.hora}`}
                                {etapa.estado === "pendente"  && "pendente"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default FluxoCheckin