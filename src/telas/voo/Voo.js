import './Voo.css'
import StatsCard from '../../components/statscard/StatsCard';
import TabelaTodosVoos from '../../components/Tabelatodososvoos/TabelaTodosVoos';
import Header from '../../header/Header';

const Voo = () =>{
    return(
        
            <div className="seccao_voo">
                <div className="voo-card-container">
                    <StatsCard
                    titulo="Programados"
                    value="18"
                    variante="voo_programados"               
                    />

                    <StatsCard
                    titulo="Em andamento"
                    value="8"
                    variante="voo_em_atendimento"                
                    />

                    <StatsCard
                    titulo="Concluídos"
                    value="5"
                    variante="voo_concluidos"                 
                    />

                    <StatsCard
                    titulo="Atrasados/Canselados"
                    value="4" 
                    variante="voo_atrasados"               
                    />
                </div>

                <div className='tabelato_dos_voos-container'>
                    <TabelaTodosVoos/>
                </div>

            </div>

        
    )
}

export default Voo;