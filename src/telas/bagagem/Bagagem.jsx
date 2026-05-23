import './Bagagem.css'
import Header from '../../header/Header';
import { FiAlertTriangle } from "react-icons/fi";
import StatsCard from '../../components/statscard/StatsCard';
import RegistrarBagagem from '../../components/registarbagagem/RegistarBagagem';
import Alerta from '../../components/alerta/Alerta';
import { useState } from 'react'
import UltimasRegistadas from '../../components/ultimasregistadas/UltimasRegistadas';

const Bagagem = () =>{


    const [bagagens, setBagagens] = useState([
        {
            id: 1,
            nome: 'Adilson Menakulussa',
            peso: 30,
            codigo: 'BAG-001'
        },
        {
            id: 2,
            nome: 'Fernando Alberto',
            peso: 25,
            codigo: 'BAG-002'
        },
        {
            id: 3,
            nome: 'Leonel Domingos',
            peso: 30,
            codigo: 'BAG-003'
        }
    ])

    /* Função para adicionar bagagem */

    const adicionarBagagem = (novaBagagem) => {

        setBagagens(prev => [novaBagagem, ...prev])

    }

    const LIMITE = 30

    const [peso, setPeso] = useState(0)

    /* Bagagens com excesso */

    const bagagensExcesso = bagagens.filter(
        bagagem => bagagem.peso > LIMITE
    )

    const pesoTotal = bagagens.reduce(
    (total, bagagem) => total + bagagem.peso,
    0
    )

    const totalExcesso = bagagensExcesso.length

    return(

        <div className='seccao-bagagem'>

            <div className="cards-container">

                <StatsCard
                    titulo="Total registadas"
                    value={bagagens.length}
                    variante="total-registadas"
                />

                <StatsCard
                    titulo="Excesso de peso"
                    value={totalExcesso}
                    variante="total-excesso"
                />

                <StatsCard
                    titulo="Peso total"
                    value={`${pesoTotal} kg`}
                    variante="total-peso"
                />

            </div>
            
            <div className='container-alerta'>

                {totalExcesso > 0 && (

                    <Alerta
                        titulo="Excesso de peso"
                        mensagem={`${totalExcesso} bagagens com excesso aguardam taxa adicional.`}
                        icon={<FiAlertTriangle/>}
                    />

                )}

            </div>

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