import './RegistarBagagem.css'

import { useState } from 'react'

import { TbLuggage } from 'react-icons/tb'

import { FiPlus } from "react-icons/fi";

const RegistrarBagagem = ({
    peso,
    setPeso,
    adicionarBagagem,
    totalBagagens
}) => {

    const LIMITE = 30

    const [nome, setNome] = useState('')

    const [rota, setRota] = useState('LA408 · LDA → LIS')

    const [tipo, setTipo] = useState('Mala de porão')

    const [erro, setErro] = useState('')

    const restante = LIMITE - peso

    const excesso = peso - LIMITE

    const dentroLimite = peso <= LIMITE

    const registrarBagagem = () => {

        setErro('')

        /* Validar nome vazio */

        if(nome.trim() === ''){

            setErro('Digite o nome do passageiro')

            return
        }

        /* Apenas letras */

        const nomeValido = /^[A-Za-zÀ-ÿ\s]+$/.test(nome)

        if(!nomeValido){

            setErro('O nome deve conter apenas letras')

            return
        }

        /* Validar peso */

        if(peso <= 0){

            setErro('Digite um peso válido')

            return
        }

        /* Gerar código sequencial */

        const proximoNumero = String(
            totalBagagens + 1
        ).padStart(3, '0')

        const codigoBagagem = `BAG-${proximoNumero}`

        const novaBagagem = {

            id: totalBagagens + 1,

            nome: nome,

            peso: peso,

            tipo: tipo,

            rota: rota,

            codigo: codigoBagagem
        }

        adicionarBagagem(novaBagagem)

        setNome('')

        setPeso('')

        setErro('')
    }

    return(

        <div className="registrar-bagagem">

            <div className="registrar-header">

                <h2>

                    <FiPlus/>

                    Registar nova bagagem

                </h2>

            </div>

            {erro && (

                <div className='erro-registo'>

                    {erro}

                </div>

            )}

            <div className="form-group">

                <label>Passageiro</label>

                <div className="duplo-input">

                    <input
                        type="text"
                        placeholder="Nome do passageiro"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />

                    <select
                        value={rota}
                        onChange={(e) => setRota(e.target.value)}
                    >

                        <option>LA408 · LDA → LIS</option>

                        <option>DT201 · LDA → JNB</option>

                        <option>TP450 · LDA → PAR</option>

                        <option>KL589 · LDA → BRA</option>

                    </select>

                </div>

            </div>

            <div className="form-group">

                <label>Tipo</label>

                <div className="duplo-input">

                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >

                        <option>Mala de porão</option>

                        <option>Bagagem de mão</option>

                    </select>

                    <div className="campo-peso">

                        <span>Peso (kg)</span>

                        <input
                            type="number"
                            placeholder="Peso"
                            min="0"
                            step="1"
                            value={peso}
                            onChange={(e) => setPeso(Number(e.target.value))}
                        />

                    </div>

                </div>

            </div>

            <div className={`peso-card ${dentroLimite ? 'ok' : 'erro'}`}>

                <h1>

                    {peso || 0}

                    <span>kg</span>

                </h1>

                <p>

                    Limite: {LIMITE} kg.

                    {dentroLimite
                        ? ` Restam ${restante} kg`
                        : ` Excesso de ${Math.abs(restante)} kg`
                    }

                </p>

                <strong>

                    {dentroLimite
                        ? '✓ Dentro do limite'
                        : '✕ Peso excedido'
                    }

                </strong>

            </div>

            <button
                className="btn-registrar"
                onClick={registrarBagagem}
            >

                <TbLuggage/>

                <p>Registar bagagem</p>

            </button>

        </div>

    )
}

export default RegistrarBagagem