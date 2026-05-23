import './HeatmapOperacional.css'

const HeatmapOperacional = () => {

    const gates = [

        {
            gate: 'A1',
            estado: 'livre'
        },

        {
            gate: 'A2',
            estado: 'ocupado'
        },

        {
            gate: 'A3',
            estado: 'atrasado'
        },

        {
            gate: 'B1',
            estado: 'embarque'
        },

        {
            gate: 'B2',
            estado: 'livre'
        },

        {
            gate: 'B3',
            estado: 'ocupado'
        }

    ]

    return(

        <div className='heatmap-operacional'>

            <div className='heatmap-header'>

                <h2>

                    Heatmap Operacional

                </h2>

                <p>

                    Estado em tempo real dos gates

                </p>

            </div>

            <div className='heatmap-grid'>

                {gates.map((item, index) => (

                    <div
                        key={index}
                        className={`heatmap-gate ${item.estado}`}
                    >

                        <span>

                            {item.gate}

                        </span>

                    </div>

                ))}

            </div>

            <div className='heatmap-legenda'>

                <div className='legenda-item'>

                    <div className='legenda-cor livre'></div>

                    <span>Livre</span>

                </div>

                <div className='legenda-item'>

                    <div className='legenda-cor ocupado'></div>

                    <span>Ocupado</span>

                </div>

                <div className='legenda-item'>

                    <div className='legenda-cor embarque'></div>

                    <span>Embarque</span>

                </div>

                <div className='legenda-item'>

                    <div className='legenda-cor atrasado'></div>

                    <span>Atrasado</span>

                </div>

            </div>

        </div>
    )
}

export default HeatmapOperacional