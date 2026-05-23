// PainelImpacto.jsx
import './PainelImpacto.css'

const PainelImpacto = ({ voosAtrasados = [], passageirosAfectados = 0, gatesDuplicados = [] }) => {
    return (
        <div className='painel-impacto'>
            <div className='painel-impacto-header'>
                <h2>Impacto Operacional</h2>
                {voosAtrasados.length > 0 && (
                    <span className='impacto-badge'>⚠ activo</span>
                )}
            </div>

            <div className='impacto-card critico'>
                <div className='impacto-card-left'>
                    <span>Voos atrasados</span>
                    <small>operação afectada</small>
                </div>
                <strong>{voosAtrasados.length}</strong>
            </div>

            <div className='impacto-card normal'>
                <div className='impacto-card-left'>
                    <span>Passageiros afectados</span>
                    <small>aguardam resolução</small>
                </div>
                <strong>{passageirosAfectados}</strong>
            </div>

            <div className='impacto-card alerta'>
                <div className='impacto-card-left'>
                    <span>Conflitos de gate</span>
                    <small>requer atenção</small>
                </div>
                <strong>{gatesDuplicados.length}</strong>
            </div>

            {gatesDuplicados.length > 0 && (
                <>
                    <span className='impacto-divider'>Detalhes</span>
                    <div className='lista-gates'>
                        {gatesDuplicados.map((voo) => (
                            <div key={voo.id} className='gate-alerta'>
                                <div className='gate-alerta-dot'/>
                                {voo.codigo} conflito no gate {voo.gate}
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default PainelImpacto