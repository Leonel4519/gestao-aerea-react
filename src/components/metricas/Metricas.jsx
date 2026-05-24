// Metricas.jsx
import { useEffect, useRef, useState } from 'react'
import './Metricas.css'
import { useVoos } from '../../context/VooContext'
import { useCheckin } from '../../context/CheckinContext'
import { useBagagem } from '../../context/BagagemContext'

function useCountUp(target, duration = 1200) {
    const [value, setValue] = useState(0)
    const raf = useRef(null)

    useEffect(() => {
        let start = null
        const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = Math.min((timestamp - start) / duration, 1)
            const ease = 1 - Math.pow(1 - progress, 4)
            setValue(Math.floor(ease * target))
            if (progress < 1) raf.current = requestAnimationFrame(step)
        }
        raf.current = requestAnimationFrame(step)
        return () => cancelAnimationFrame(raf.current)
    }, [target, duration])

    return value
}

function ScoreCirculo({ valor }) {
    const count = useCountUp(valor, 1400)
    return (
        <div className='score-circulo'>
            <span>{count}</span>
        </div>
    )
}

function KpiCard({ label, valor, cor, delay = 0, detalhe }) {
    const [started, setStarted] = useState(false)
    const count = useCountUp(started ? valor : 0, 1200)

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(t)
    }, [delay])

    return (
        <div className='kpi-card'>
            <div className='kpi-topo'>
                <span>{label}</span>
                <strong>{count}%</strong>
            </div>
            <div className='kpi-progress-track'>
                <div
                    className='kpi-progress-fill'
                    style={{
                        width: started ? `${valor}%` : '0%',
                        background: cor,
                        transitionDelay: `${delay}ms`,
                    }}
                />
            </div>
            {detalhe && <p className='kpi-detalhe'>{detalhe}</p>}
        </div>
    )
}

const Metricas = () => {
    const { voos }        = useVoos()
    const { passageiros } = useCheckin()
    const { bagagens }    = useBagagem()

    const LIMITE = 30

    // Cálculos reais
    const totalVoos       = voos.length
    const voosNoHorario   = voos.filter(v => v.estado !== 'Atrasado').length
    const pontualidade    = totalVoos > 0 ? Math.round((voosNoHorario / totalVoos) * 100) : 0

    const totalPassageiros  = passageiros.length
    const checkinsFeitos    = passageiros.filter(p => p.checkinFeito).length
    const taxaCheckin       = totalPassageiros > 0 ? Math.round((checkinsFeitos / totalPassageiros) * 100) : 0

    const totalBagagens     = bagagens.length
    const bagagensDentroLimite = bagagens.filter(b => b.peso <= LIMITE).length
    const taxaBagagem       = totalBagagens > 0 ? Math.round((bagagensDentroLimite / totalBagagens) * 100) : 100

    const gatesDuplicados   = voos.filter(
        (voo, index, array) => array.findIndex(v => v.gate === voo.gate) !== index
    ).length
    const gatesOk           = totalVoos > 0 ? Math.round(((totalVoos - gatesDuplicados) / totalVoos) * 100) : 100

    // Score geral — média dos 4 indicadores
    const score = Math.round((pontualidade + taxaCheckin + taxaBagagem + gatesOk) / 4)

    const descricaoScore = score >= 90 ? 'Excelente desempenho'
        : score >= 75 ? 'Bom desempenho'
        : score >= 60 ? 'Desempenho razoável'
        : 'Requer atenção'

    const kpis = [
        {
            label:   'Pontualidade',
            valor:   pontualidade,
            cor:     '#10b981',
            detalhe: `${voosNoHorario} de ${totalVoos} voos no horário`
        },
        {
            label:   'Check-in',
            valor:   taxaCheckin,
            cor:     '#0ea5e9',
            detalhe: `${checkinsFeitos} de ${totalPassageiros} passageiros`
        },
        {
            label:   'Bagagem',
            valor:   taxaBagagem,
            cor:     '#f59e0b',
            detalhe: `${bagagensDentroLimite} de ${totalBagagens} dentro do limite`
        },
        {
            label:   'Gates sem conflito',
            valor:   gatesOk,
            cor:     '#8b5cf6',
            detalhe: `${gatesDuplicados} conflito${gatesDuplicados !== 1 ? 's' : ''} detectado${gatesDuplicados !== 1 ? 's' : ''}`
        },
    ]

    return (
        <div className='metricas'>
            <div className='score-operacional'>
                <ScoreCirculo valor={score} />
                <div className='score-info'>
                    <h2>Score Operacional</h2>
                    <strong>{descricaoScore}</strong>
                    <p>Baseado em pontualidade, check-in, bagagem e gestão de gates em tempo real.</p>
                </div>
            </div>

            <div className='kpi-grid'>
                {kpis.map((k, i) => (
                    <KpiCard
                        key={k.label}
                        label={k.label}
                        valor={k.valor}
                        cor={k.cor}
                        delay={i * 120}
                        detalhe={k.detalhe}
                    />
                ))}
            </div>
        </div>
    )
}

export default Metricas