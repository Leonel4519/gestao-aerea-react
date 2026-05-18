import './UltimosCheckins.css'

const UltimosCheckins = () =>{
    const passageiros =[
        {
            iniciais: "MF",
            nome: "Manuel Ferreira",
            voo: "LA408. 14A. 1 bag",
            variante: "azul"
        },
        {
            iniciais: "AS",
            nome: "Ana silva",
            voo: "LA408. 14A. 1 bag",
            variante: "verde"  
        },
        {
            iniciais: "JN",
            nome: "João Neto",
            voo: "LA408. 14A. 1 bag",
            variante: "roxo"  
        }
    ]

    return(
        <div className="ultimos-checkins">
            <div className="checkins-header">
                <h2>Últimos check-ins</h2>
            </div>

            <div className="checkins-lista">
                {passageiros.map((passageiro, index) => (
                    <div className="checkin-item" key={index}>
                        <div className= {`checkin-avatar ${passageiro.variante}`}>
                            {passageiro.iniciais}
                        </div>
                         <div className="checkin-info">

                            <h3>{passageiro.nome}</h3>

                            <p>{passageiro.voo}</p>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export default UltimosCheckins;