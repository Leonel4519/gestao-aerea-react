import './Relatorios.css'
import Metricas from '../../components/metricas/Metricas'

const Relatorios = () => (
    <div className='relatorios'>
        <div className='relatorios-header'>
            <h2>Relatórios Operacionais</h2>
            <p>Monitorização de desempenho e eficiência operacional aeroportuária.</p>
        </div>
        <Metricas/>
    </div>
)

export default Relatorios