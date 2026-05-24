import './Bagagem.css'
import { FiAlertTriangle } from "react-icons/fi"
import StatsCard from '../../components/statscard/StatsCard'
import RegistrarBagagem from '../../components/registarbagagem/RegistarBagagem'
import Alerta from '../../components/alerta/Alerta'
import UltimasRegistadas from '../../components/ultimasregistadas/UltimasRegistadas'
import { useState } from 'react'
import { useBagagem } from '../../context/BagagemContext'

const LIMITE = 30

const Bagagem = () => {
    const { bagagens, adicionarBagagem } = useBagagem()
    const [peso, setPeso] = useState(0)

    const bagagensExcesso = bagagens.filter(b => b.peso > LIMITE)
    const pesoTotal       = bagagens.reduce((total, b) => total + b.peso, 0)

    return (
        <div className='seccao-bagagem'>
            <div className="cards-container">
                <StatsCard titulo="Total registadas" value={bagagens.length}        variante="total-registadas" />
                <StatsCard titulo="Excesso de peso"  value={bagagensExcesso.length} variante="total-excesso"    />
                <StatsCard titulo="Peso total"       value={`${pesoTotal} kg`}      variante="total-peso"       />
            </div>

            {bagagensExcesso.length > 0 && (
                <div className='container-alerta'>
                    <Alerta
                        titulo="Excesso de peso"
                        mensagem={`${bagagensExcesso.length} bagagens com excesso aguardam taxa adicional.`}
                        icon={<FiAlertTriangle/>}
                        variante="warning"
                    />
                </div>
            )}

            <div className='resgistobagagem'>
                <div className='ultimas-registadas'>
                    <RegistrarBagagem
                        peso={peso}
                        setPeso={setPeso}
                        adicionarBagagem={adicionarBagagem}
                        totalBagagens={bagagens.length}

                    />
                </div>
                <div className='painel-ultimosregistadas'>
                    <UltimasRegistadas bagagens={bagagens} />
                </div>
            </div>
        </div>
    )
}

export default Bagagem