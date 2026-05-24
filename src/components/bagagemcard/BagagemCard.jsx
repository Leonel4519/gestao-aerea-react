import './BagagemCard.css'
import { TbLuggage } from 'react-icons/tb'
import { useBagagem } from '../../context/BagagemContext'

const BagagemCard = ({ passageiro }) => {
    const { bagagensDoPassageiro } = useBagagem()
    const bagagens = bagagensDoPassageiro(passageiro?.id)

    return (
        <div className="bagagem-card">
            <div className="bagagem-header">
                <h3><TbLuggage/> Bagagem</h3>
            </div>
            <div className="bagagem-lista">
                {bagagens.length === 0 ? (
                    <div className="bagagem-vazia">Nenhuma bagagem registada</div>
                ) : (
                    bagagens.map((b, index) => (
                        <div className="bagagem-item" key={index}>
                            <div className="bagagem-info">
                                <div className="bagagem-icon"><TbLuggage/></div>
                                <div>
                                    <h4>{b.tipo}</h4>
                                    <p>{b.peso} kg · {b.codigo}</p>
                                </div>
                            </div>
                            <span className={`bagagem-status ${b.peso > 30 ? 'excesso' : 'ok'}`}>
                                {b.peso > 30 ? '⚠ Excesso' : 'OK'}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default BagagemCard