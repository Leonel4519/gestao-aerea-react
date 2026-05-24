import './CartaoEmbarque.css'
import { PiIdentificationCard } from "react-icons/pi"
import { FiPrinter } from "react-icons/fi"
import { IoCheckmarkOutline } from "react-icons/io5"
import { useCheckin } from '../../context/CheckinContext'

const CartaoEmbarque = ({ passageiro }) => {
    const { avancarEtapa, setPassageiroAtivo } = useCheckin()

    const handleConfirmar = () => {
        avancarEtapa(passageiro.id)
        if (passageiro.etapa + 1 >= 4) {
            setTimeout(() => setPassageiroAtivo(null), 500)
        }
    }

    return (
        <div className="cartao-embarque">
            <div className="cartao-header">
                <h3><PiIdentificationCard/> Cartão de embarque</h3>
                <span className="cartao-status">Pronto para emitir</span>
            </div>
            <div className="cartao-info">
                <div className="cartao-item">
                    <span>Voo</span>
                    <strong>{passageiro?.voo}</strong>
                    <p>TAAG Angola</p>
                </div>
                <div className="cartao-item">
                    <span>Rota</span>
                    <strong>LDA → {passageiro?.destino?.slice(0,3).toUpperCase()}</strong>
                    <p>Luanda · {passageiro?.destino}</p>
                </div>
                <div className="cartao-item">
                    <span>Partida</span>
                    <strong>{passageiro?.hora}</strong>
                    <p>Gate {passageiro?.gate}</p>
                </div>
            </div>
            <div className="cartao-botoes">
                <button className="btn-imprimir" onClick={() => window.print()}>
                    <FiPrinter/> Imprimir
                </button>
                <button className="btn-confirmar" onClick={handleConfirmar}>
                    <IoCheckmarkOutline/> Confirmar check-in
                </button>
            </div>
        </div>
    )
}

export default CartaoEmbarque