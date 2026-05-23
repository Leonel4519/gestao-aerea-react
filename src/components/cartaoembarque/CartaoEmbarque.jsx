import './CartaoEmbarque.css'

import { PiIdentificationCard } from "react-icons/pi";

import { FiPrinter } from "react-icons/fi";

import { IoCheckmarkOutline } from "react-icons/io5";

const CartaoEmbarque = () => {

    return(

        <div className="cartao-embarque">

            <div className="cartao-header">

                <h3>

                    <PiIdentificationCard/>

                    Cartão de embarque

                </h3>

                <span className="cartao-status">
                    Pronto pra emitir
                </span>

            </div>

            <div className="cartao-info">

                <div className="cartao-item">

                    <span>Voo</span>

                    <strong>LA360</strong>

                    <p>TAAG Angola</p>

                </div>

                <div className="cartao-item">

                    <span>Rota</span>

                    <strong>LDA → LIS</strong>

                    <p>Luanda. Lisboa</p>

                </div>

                <div className="cartao-item">

                    <span>Partida</span>

                    <strong>15:30</strong>

                    <p>Portão B7</p>

                </div>

            </div>

            <div className="cartao-botoes">

                <button className="btn-imprimir">

                    <FiPrinter/>

                    Imprimir

                </button>

                <button className="btn-confirmar">

                    <IoCheckmarkOutline/>

                    Confirmar check-in

                </button>

            </div>

        </div>

    )
}

export default CartaoEmbarque