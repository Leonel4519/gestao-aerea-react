import './ProgressoCheckin.css'

const ProgressoCheckin = () => {

    const etapas = [

        {
            numero: "✓",
            titulo: "Bilhete",
            status: "concluido"
        },

        {
            numero: "✓",
            titulo: "Documento",
            status: "concluido"
        },

        {
            numero: "3",
            titulo: "Bagagem",
            status: "ativo"
        },

        {
            numero: "4",
            titulo: "Assento",
            status: "pendente"
        },

        {
            numero: "5",
            titulo: "Embarque",
            status: "pendente"
        }

    ]

    return(

        <div className="progresso-checkin">

            {etapas.map((etapa, index) => (

                <div className="etapa-container" key={index}>

                    <div className={`etapa ${etapa.status}`}>

                        <div className="etapa-circulo">

                            {etapa.numero}

                        </div>

                        <span>
                            {etapa.titulo}
                        </span>

                    </div>

                    {index < etapas.length - 1 && (

                        <div className={`linha ${etapa.status}`}></div>

                    )}

                </div>

            ))}

        </div>

    )
}

export default ProgressoCheckin