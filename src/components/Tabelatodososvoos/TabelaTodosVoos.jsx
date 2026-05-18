import './TabelaTodosVoos.css'

const TabelaTodosVoos = () => {

    const voos = [
        {
            codigo: "LA102",
            companhia: "TAAG",
            rota: "LDA → LAD",
            cidade: "Luanda · Lubango",
            partida: "18:00",
            chegada: "22:50",
            portao: "B3",
            pax: "150/150",
            progresso: "90%",
            status: "Embarcado"
        },
        {
            codigo: "LA102",
            companhia: "TAAG",
            rota: "LDA → LAD",
            cidade: "Luanda · Lubango",
            partida: "18:00",
            chegada: "22:50",
            portao: "A7",
            pax: "180/180",
            progresso: "100%",
            status: "Check-in"
        },
        {
            codigo: "LA102",
            companhia: "TAAG",
            rota: "LDA → LAD",
            cidade: "Luanda · Lubango",
            partida: "18:00",
            chegada: "22:50",
            portao: "C2",
            pax: "25/250",
            progresso: "20%",
            status: "Programado"
        }
    ]

    return(

        <div className="tabela-todos-voos">

            <div className="tabela-topo">

                <h2>Todos os voos de hoje</h2>

                <div className="filtros">

                    <button>Todos</button>

                    <button>Em andamento</button>

                    <button>Atrasados</button>

                </div>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Voo</th>
                        <th>Rota</th>
                        <th>Partida</th>
                        <th>Chegada</th>
                        <th>Portão</th>
                        <th>Pax</th>
                        <th>Status</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {voos.map((voo, index) => (

                        <tr key={index}>

                            <td>

                                <div className="voo-info">

                                    <strong>{voo.codigo}</strong>

                                    <span>{voo.companhia}</span>

                                </div>

                            </td>

                            <td>

                                <div className="rota-info">

                                    <strong>{voo.rota}</strong>

                                    <span>{voo.cidade}</span>

                                </div>

                            </td>

                            <td>{voo.partida}</td>

                            <td>{voo.chegada}</td>

                            <td>{voo.portao}</td>

                            <td>

                                <div className="pax-info">

                                    <span>{voo.pax}</span>

                                    <div className="barra">

                                        <div
                                            className={`progresso ${voo.status.toLowerCase()}`}
                                            style={{
                                                width: voo.progresso
                                            }}
                                        ></div>

                                    </div>

                                </div>

                            </td>

                            <td>

                                <span className={`status ${voo.status.toLowerCase()}`}>
                                    {voo.status}
                                </span>

                            </td>

                            <td>

                                <button className="btn-ver">
                                    Ver
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    )
}

export default TabelaTodosVoos