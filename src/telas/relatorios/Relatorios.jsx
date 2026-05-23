import './Relatorios.css'
import Metricas from '../../components/metricas/Metricas'

const Relatorios = () => {
    return (
        <div className='relatorios'>
            <div className='relatorios-header'>
                <h1>Relatórios Operacionais</h1>
                <p>Monitorização de desempenho e eficiência operacional aeroportuária.</p>
            </div>
            <Metricas />
        </div>
    )
}

export default Relatorios