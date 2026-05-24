import './ProgressoCheckin.css'

const ProgressoCheckin = ({ etapa = 0 }) => {
    const etapas = [
        { titulo: 'Bilhete' },
        { titulo: 'Documento' },
        { titulo: 'Bagagem' },
        { titulo: 'Assento' },
        { titulo: 'Embarque' }
    ]

    return (
        <div className="progresso-checkin">
            {etapas.map((e, index) => {
                const status = index < etapa ? 'concluido' : index === etapa ? 'ativo' : 'pendente'
                return (
                    <div className="etapa-container" key={index}>
                        <div className={`etapa ${status}`}>
                            <div className="etapa-circulo">
                                {index < etapa ? '✓' : index + 1}
                            </div>
                            <span>{e.titulo}</span>
                        </div>
                        {index < etapas.length - 1 && (
                            <div className={`linha ${status}`}></div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default ProgressoCheckin