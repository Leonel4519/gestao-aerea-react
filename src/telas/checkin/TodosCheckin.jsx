import './TodosCheckin.css'
import ProgressoCheckin from "../../components/progressocheckin/ProgressoCheckin"
import DadosDoPassageiro from "../../components/DadosDoPassageiro/DadosDoPassageiro"
import BagagemCard from "../../components/bagagemcard/BagagemCard"
import AssentoCard from "../../components/assentocard/AssentoCard"
import CartaoEmbarque from "../../components/cartaoembarque/CartaoEmbarque"

const TodosCheckin = () => (
    <div className="seccao_todoscheckin">
        <ProgressoCheckin/>

        <div className="checkin-area">
            <DadosDoPassageiro/>

            <div className="checkin-direita">
                <div className="checkin-linha">
                    <BagagemCard/>
                    <AssentoCard/>
                </div>
                <CartaoEmbarque/>
            </div>
        </div>
    </div>
)

export default TodosCheckin