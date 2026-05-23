// PainelEmbarque.jsx
import './PainelEmbarque.css'
import { voos } from '../../data/dashboardData'

const PainelEmbarque = () => (
    <div className='painel-embarque'>
        <div className='painel-header'>
            <h2>Centro de Embarque</h2>
            <span className='painel-badge'>{voos.length} voos</span>
        </div>

        <div className='lista-embarque'>
            {voos.map((voo) => {
                const pct = Math.round((voo.embarcados / voo.passageiros) * 100)
                const cls = voo.embarqueStatus.toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')

                return (
                    <div key={voo.id} className='embarque-card'>
                        <div className='embarque-topo'>
                            <div className='topo-left'>
                                <h3>{voo.codigo}</h3>
                                <span className='gate-pill'>{voo.gate}</span>
                            </div>
                            <span className='pct-label'>{pct}%</span>
                        </div>

                        <div className='barra-embarque'>
                            <div
                                className={`progresso-embarque prog-${cls}`}
                                style={{ width: `${pct}%` }}
                            />
                        </div>

                        <div className='embarque-meta'>
                            <span>{voo.embarcados} / {voo.passageiros} passageiros</span>
                            <span className={`embarque-status status-${cls}`}>
                                <span className={`dot dot-${cls}`} />
                                {voo.embarqueStatus}
                            </span>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>
)

export default PainelEmbarque