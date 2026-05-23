import './UltimasRegistadas.css'

import { useState } from 'react'

import { TbLuggage } from 'react-icons/tb'

import { FiList } from "react-icons/fi";

const UltimasRegistadas = ({ bagagens }) => {

    const [minimizado, setMinimizado] = useState(false)

    return (

        <div className='ultimas-registadas'>

            <div className='ultimas-header'>

                <div
                    className='ultimas-header-icon'
                    onClick={() => setMinimizado(!minimizado)}
                >

                    <FiList />

                </div>

                <h2>Últimas registadas</h2>

            </div>

            {!minimizado && (

                <div className='lista-bagagens'>

                    {bagagens.map((bagagem) => (

                        <div
                            key={bagagem.id}
                            className={`bagagem-item ${
                                bagagem.peso > 30 ? 'excesso' : ''
                            }`}
                        >

                            <div className='bagagem-icon'>

                                <TbLuggage />

                            </div>

                            <div className='bagagem-info'>

                                <h3>{bagagem.nome}</h3>

                                <p>
                                    Porão · {bagagem.peso} kg · {bagagem.codigo}
                                </p>

                            </div>

                            <div
                                className={`estado-bagagem ${
                                    bagagem.peso > 30 ? 'erro' : 'ok'
                                }`}
                            >

                                {bagagem.peso > 30 ? 'Excesso' : 'OK'}

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>

    )
}

export default UltimasRegistadas