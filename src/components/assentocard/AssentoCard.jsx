import './AssentoCard.css'
import { PiArmchair } from "react-icons/pi"

const AssentoCard = ({ passageiro }) => (
    <div className="assento-card">
        <div className="assento-header">
            <h3><PiArmchair/> Assento</h3>
        </div>
        <div className="assento-grid">
            <div className="assento-item"><span>Classe</span><strong>{passageiro?.classe}</strong></div>
            <div className="assento-item"><span>Assento</span><strong className="assento-numero">{passageiro?.assento}</strong></div>
            <div className="assento-item"><span>Tipo</span><strong>{passageiro?.tipo}</strong></div>
            <div className="assento-item"><span>Refeição</span><strong>{passageiro?.refeicao}</strong></div>
        </div>
    </div>
)

export default AssentoCard