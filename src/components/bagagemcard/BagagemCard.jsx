import './BagagemCard.css'

import { TbLuggage } from 'react-icons/tb'

const BagagemCard = () => {
    
    const bagagens = [

        {
            titulo: "Mala de porão",
            peso: "21 kg",
            referencia: "Ref. BAG. 005"
        },

        {
            titulo: "Bagagem de mão",
            peso: "8 kg",
            referencia: "Ref. BAG. 003"
        }

    ]

    return(

        <div className="bagagem-card">

            <div className="bagagem-header">

                <h3>

                    <TbLuggage/>

                    Bagagem

                </h3>

            </div>

            <div className="bagagem-lista">

                {bagagens.map((bagagem, index) => (

                    <div className="bagagem-item" key={index}>

                        <div className="bagagem-info">

                            <div className="bagagem-icon">

                                <TbLuggage/>

                            </div>

                            <div>

                                <h4>{bagagem.titulo}</h4>

                                <p>
                                    {bagagem.peso} {bagagem.referencia}
                                </p>

                            </div>

                        </div>

                        <span className="bagagem-status">
                            OK
                        </span>

                    </div>

                ))}

            </div>

        </div>

    )
}

export default BagagemCard