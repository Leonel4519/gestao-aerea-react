import './TabelaVoo.css'

import { IoAirplaneOutline } from 'react-icons/io5'

const TabelaVoo = () => {

    const voos = [
        {
            codigo: "DT650",
            destino: "luanda",
            hora: "8:00",
            status: "Embarcando",
            embarque: "150/150",
            progresso: "100%"
        },
        {
            codigo: "DT650",
            destino: "luanda",
            hora: "8:00",
            status: "Embarcando",
            embarque: "150/150",
            progresso: "56%"
        },
        {
            codigo: "DT650",
            destino: "luanda",
            hora: "8:00",
            status: "Embarcando",
            embarque: "150/150",
            progresso: "56%"
        }
       
    ]

    return(
        <div className="tabela-voo">
            <div  className="tabela-header">
                <h2>< IoAirplaneOutline/>Voos de Hoje</h2>
                 <a href="/" className="ver-todos">
        Ver todos →
    </a>
            </div>

            <table>

                <thead>

                    <tr>
                        <th>Voo</th>
                        <th>Destino</th>
                        <th>Hora</th>
                        <th>Status</th>
                        <th>Embarque</th>
                    </tr>
                </thead>
                <tbody>
                    {voos.map((voo, index) =>(
                        <tr key={index}>
                            <td>{voo.codigo}</td>
                            <td>{voo.destino}</td>
                            <td>{voo.hora}</td>

                            <td>
                                <span className={`status ${voo.status.toLowerCase()}`}>
                                    {voo.status}
                                </span>
                            </td>
                             <td>

                        <div className="embarque-info">

                            <span>{voo.embarque}</span>

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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TabelaVoo;