import { useEffect, useRef, useState } from 'react'
import './Metricas.css'

// Hook que anima um número de 0 até o valor final
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

// Score com contagem animada
function ScoreCirculo({ valor }) {
    const count = useCountUp(valor, 1400)
    return (
        <div className='score-circulo'>
            <span>{count}</span>
        </div>
    )
}

// KPI com contagem + barra de progresso animada
function KpiCard({ label, valor, cor, delay = 0 }) {
    const [started, setStarted] = useState(false)
    const count = useCountUp(started ? valor : 0, 1200)

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay)
        return () => clearTimeout(t)
    }, [delay])

    return (
        <div className='kpi-card'>
            <span>{label}</span>
            <strong>{count}%</strong>
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
        </div>
    )
}

const kpis = [
    { label: 'Pontualidade', valor: 92, cor: '#10b981' },
    { label: 'Check-in',     valor: 88, cor: '#0ea5e9' },
    { label: 'Embarque',     valor: 81, cor: '#f59e0b' },
    { label: 'Gates activos',valor: 76, cor: '#8b5cf6' },
]

const Metricas = () => {
    return (
        <div className='metricas'>

            <div className='score-operacional'>
                <ScoreCirculo valor={87} />
                <div className='score-info'>
                    <h2>Score Operacional</h2>
                    <strong>Excelente desempenho</strong>
                    <p>Operação dentro dos padrões internacionais de eficiência aeroportuária.</p>
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
                    />
                ))}
            </div>

        </div>
    )
}

export default Metricas