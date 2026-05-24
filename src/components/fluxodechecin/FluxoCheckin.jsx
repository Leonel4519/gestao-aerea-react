// FluxoCheckin.jsx
import './FluxoCheckin.css'
import { MdOutlineChecklist } from "react-icons/md"
import { useCheckin } from '../../context/CheckinContext'
import { useNavigate } from 'react-router-dom'

const FluxoCheckin = () => {
    const { passageiros } = useCheckin()
    const navigate = useNavigate()

    const total     = passageiros.length
    const concluido = passageiros.filter(p => p.checkinFeito).length
    const ativo     = passageiros.filter(p => !p.checkinFeito && p.etapa > 0).length
    const pendente  = passageiros.filter(p => !p.checkinFeito && p.etapa === 0).length

    const etapaNomes = ['Validar bilhete', 'Verificar documento', 'Registar bagagem', 'Confirmar assento', 'Emitir cartão embarque']

    const etapas = etapaNomes.map((titulo, index) => {
        // quantos passageiros estão nesta etapa ou passaram dela
        const passados   = passageiros.filter(p => p.etapa > index || p.checkinFeito).length
        const emCurso    = passageiros.filter(p => p.etapa === index && !p.checkinFeito).length

        const estado = passados === total
            ? 'concluido'
            : emCurso > 0
                ? 'ativo'
                : 'pendente'

        return { titulo, estado, passados, emCurso }
    })

    return (
        <div className="fluxo-checkin">
            <div className="fluxo-header">
                <h2><MdOutlineChecklist /> Fluxo de check-in</h2>
                <span className="fluxo-badge">{concluido}/{total} concluídos</span>
            </div>

            {/* Resumo */}
            <div className="fluxo-resumo">
                <div className="fluxo-resumo-item concluido">
                    <strong>{concluido}</strong>
                    <span>Concluídos</span>
                </div>
                <div className="fluxo-resumo-item ativo">
                    <strong>{ativo}</strong>
                    <span>Em curso</span>
                </div>
                <div className="fluxo-resumo-item pendente">
                    <strong>{pendente}</strong>
                    <span>Pendentes</span>
                </div>
            </div>

            <div className="fluxo-lista">
                {etapas.map((etapa, index) => (
                    <div className={`fluxo-item ${etapa.estado}`} key={index}>
                        <div className="fluxo-icon">
                            {etapa.estado === 'concluido' ? '✓' : index + 1}
                        </div>
                        <div className="fluxo-conteudo">
                            <h3>{etapa.titulo}</h3>
                            <p>
                                {etapa.estado === 'concluido' && `${etapa.passados} passageiros concluídos`}
                                {etapa.estado === 'ativo'     && `${etapa.emCurso} em curso`}
                                {etapa.estado === 'pendente'  && 'pendente'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <button className="fluxo-btn" onClick={() => navigate('/todoscheckin')}>
                Gerir check-in
            </button>
        </div>
    )
}

export default FluxoCheckin