import './AlertaOverbooking.css'
import { FiAlertTriangle } from "react-icons/fi";


const AlertaOverbooking = () =>{
    return(
        <div className='alerta-overbooking'>
            <div className='alerta-icon'>
                <FiAlertTriangle/>
            </div>

            <p>
                <strong>Overbooking detectado</strong>
                — Voo LA408 (Luanda → Lisboa) com 3 passageiros em excesso.
                Emitir voucher de compensação.
            </p>
        </div>
    )
}

export default AlertaOverbooking;