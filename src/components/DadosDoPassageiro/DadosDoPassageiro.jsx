import './DadosDoPassageiro.css'

const DadosDoPassageiro = ({ passageiro }) => {
    if (!passageiro) return null
    return (
        <div className='dados-do-passageiro'>
            <div className='dados-do-passageiro-header'>
                <h2>Dados do passageiro</h2>
                <div className='estado'>
                    <p>Validado</p>
                </div>
            </div>
            <div className='dados-do-passageiro-lista'>
                <div className='dados-do-passageiro-item'>
                    <div className='dados_passageirp-avatar verde'>
                        <div className='item-avatar'>{passageiro.iniciais}</div>
                        <div className='dados-do-passagerio-info'>
                            <h3>{passageiro.nome}</h3>
                            <p>Passaporte · {passageiro.passaporte}</p>
                        </div>
                    </div>
                    <div className='dados-do-passageiro-outars-info'>
                        <p>Data de nascimento</p>
                        <h3>{passageiro.nascimento}</h3>
                        <p>Nacionalidade</p>
                        <h3>{passageiro.nacionalidade}</h3>
                        <p>Email</p>
                        <p>{passageiro.email}</p>
                        <p>Telefone</p>
                        <p>{passageiro.telefone}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DadosDoPassageiro