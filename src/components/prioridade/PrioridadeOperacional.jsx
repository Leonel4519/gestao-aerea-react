import './PrioridadeOperacional.css'

import { FiAlertTriangle } from "react-icons/fi"

const PrioridadeOperacional = () => {

    const prioridades = [

        {
            tipo: 'alta',
            mensagem: 'DT201 encerra embarque em 8 min'
        },

        {
            tipo: 'media',
            mensagem: 'Gate A2 bloqueado por atraso'
        },

        {
            tipo: 'alta',
            mensagem: '2 passageiros sem check-in'
        },

        {
            tipo: 'baixa',
            mensagem: 'Bagagem com excesso aguardando taxa'
        }

    ]

    return(

        <div className='prioridade-operacional'>

            <div className='prioridade-header'>

                <div className='prioridade-icon'>

                    <FiAlertTriangle/>

                </div>

                <div>

                    <h2>

                        Prioridade Operacional

                    </h2>

                    <p>

                        Eventos críticos em tempo real

                    </p>

                </div>

            </div>

            <div className='prioridade-lista'>

                {prioridades.map((item, index) => (

                    <div
                        key={index}
                        className={`prioridade-item ${item.tipo}`}
                    >

                        <div className='prioridade-bola'></div>

                        <span>

                            {item.mensagem}

                        </span>

                    </div>

                ))}

            </div>

        </div>
    )
}

export default PrioridadeOperacional