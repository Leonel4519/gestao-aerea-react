import './DadosDoPassageiro.css'

const DadosDoPassageiro = () =>{

    const dados_passageiros =[
        {
            iniciais: "LD",
            nome: "Leonel Domingos",
            passaporte: "N3445098",
            nascimento: "15 ago 2007",
            nacionalidade: "Angolana",
            email: "leonel@gmail.com",
            telefine: "+244 958866190",
            variante: "verde"
        }
   
    ]
    return(
        <div  className='dados-do-passageiro'>
           <div className='dados-do-passageiro-header'>
                <h2> Dados do passageiro</h2> 
                <div className='estado'>
                        <p>Validado</p>
                </div>
           </div>
            <div className='dados-do-passageiro-lista' >
               {dados_passageiros.map((dados_passageiro, index) =>(

                <div className='dados-do-passageiro-item'key={index} >

                    <div className={`dados_passageirp-avatar ${dados_passageiro.variante}`} >
                        <div className='item-avatar'>
                        {dados_passageiro.iniciais}
                        </div>

                        <div className='dados-do-passagerio-info' >
                            <h3>{dados_passageiro.nome}</h3>
                            <p>passaporte -{dados_passageiro.passaporte}</p>    
                        </div> 
                    </div>    
                        <div className='dados-do-passageiro-outars-info'>
                            <p>Data de nascimento</p>
                            <h3>{dados_passageiro.nascimento}</h3>
                            <p>Nacionalidade</p>
                            <h3>{dados_passageiro.nacionalidade}</h3>
                            <p>Email</p>
                            <p>{dados_passageiro.email}</p>
                            <p>Telefone</p>
                            <p>{dados_passageiro.telefine}</p>
                        </div>
                    
                </div>
               ))} 
            </div>
        </div>
    )
}

export default DadosDoPassageiro;