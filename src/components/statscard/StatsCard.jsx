import './StatsCard.css'

const StatsCard = ({titulo, value, subtitulo, icon, icon2, variante}) => {
    return(
        <div className={`stats-card ${variante}`}>
            <div className="stats-titulo-icon">
                <h3>{titulo}</h3>

                <div className='stats-icon'>
                    {icon}
                </div>
            </div>

            <h1>{value}</h1>
        
                <p>
                {icon2}
                {subtitulo}
                </p>

        </div>
    )
}

export default StatsCard;