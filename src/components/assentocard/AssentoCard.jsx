import './AssentoCard.css'

import { PiArmchair } from "react-icons/pi";

const AssentoCard = () => {

    return(

        <div className="assento-card">

            <div className="assento-header">

                <h3>

                    <PiArmchair/>

                    Assento

                </h3>

            </div>

            <div className="assento-grid">

                <div className="assento-item">

                    <span>Classe</span>

                    <strong>Económica</strong>

                </div>

                <div className="assento-item">

                    <span>Assento</span>

                    <strong className="assento-numero">
                        14A
                    </strong>

                </div>

                <div className="assento-item">

                    <span>Tipo</span>

                    <strong>Janela</strong>

                </div>

                <div className="assento-item">

                    <span>Refeição</span>

                    <strong>Padrão</strong>

                </div>

            </div>

        </div>

    )
}

export default AssentoCard