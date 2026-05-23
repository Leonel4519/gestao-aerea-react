// Alerta.jsx
import './Alerta.css'

const Alerta = ({ titulo, mensagem, icon, variante = 'warning' }) => (
    <div className={`alerta ${variante}`}>
        <div className='alerta-icon'>{icon}</div>
        <div className='alerta-texto'>
            <strong>{titulo}</strong>
            <p>{mensagem}</p>
        </div>
    </div>
)

export default Alerta