import './RegistarBagagem.css'
import { useState } from 'react'
import { TbLuggage } from 'react-icons/tb'
import { FiPlus } from "react-icons/fi"
import { useCheckin } from '../../context/CheckinContext'

const LIMITE = 30

const RegistrarBagagem = ({ peso, setPeso, adicionarBagagem, totalBagagens }) => {
    const { passageiros } = useCheckin()

    const [passageiroId, setPassageiroId] = useState('')
    const [rota, setRota]                 = useState('')
    const [tipo, setTipo]                 = useState('Mala de porão')
    const [erro, setErro]                 = useState('')

    const restante     = LIMITE - peso
    const dentroLimite = peso <= LIMITE

    const handlePassageiro = (e) => {
        const id = Number(e.target.value)
        setPassageiroId(id)
        const p = passageiros.find(p => p.id === id)
        if (p) setRota(`${p.voo} · LDA → ${p.destino?.slice(0,3).toUpperCase()}`)
    }

    const registrarBagagem = () => {
        setErro('')

        if (!passageiroId) {
            setErro('Selecione um passageiro')
            return
        }
        if (peso <= 0) {
            setErro('Digite um peso válido')
            return
        }

        const passageiro = passageiros.find(p => p.id === Number(passageiroId))
        const codigo     = `BAG-${String(totalBagagens + 1).padStart(3, '0')}`

        adicionarBagagem({
            id:           totalBagagens + 1,
            passageiroId: Number(passageiroId),
            nome:         passageiro.nome,
            peso:         peso,
            tipo:         tipo,
            rota:         rota,
            codigo:       codigo
        })

        setPassageiroId('')
        setPeso('')
        setRota('')
        setErro('')
    }

    return (
        <div className="registrar-bagagem">
            <div className="registrar-header">
                <h2><FiPlus/> Registar nova bagagem</h2>
            </div>

            {erro && <div className='erro-registo'>{erro}</div>}

            <div className="form-group">
                <label>Passageiro</label>
                <div className="duplo-input">
                    <select value={passageiroId} onChange={handlePassageiro}>
                        <option value="">Selecionar passageiro...</option>
                        {passageiros.map(p => (
                            <option key={p.id} value={p.id}>
                                {p.nome} · {p.voo} · {p.destino}
                            </option>
                        ))}
                    </select>
                    <select value={rota} onChange={e => setRota(e.target.value)} disabled>
                        <option>{rota || 'Rota automática'}</option>
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Tipo</label>
                <div className="duplo-input">
                    <select value={tipo} onChange={e => setTipo(e.target.value)}>
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
                            onChange={e => setPeso(Number(e.target.value))}
                        />
                    </div>
                </div>
            </div>

            <div className={`peso-card ${dentroLimite ? 'ok' : 'erro'}`}>
                <h1>{peso || 0}<span>kg</span></h1>
                <p>
                    Limite: {LIMITE} kg.{' '}
                    {dentroLimite
                        ? `Restam ${restante} kg`
                        : `Excesso de ${Math.abs(restante)} kg`
                    }
                </p>
                <strong>
                    {dentroLimite ? '✓ Dentro do limite' : '✕ Peso excedido'}
                </strong>
            </div>

            <button className="btn-registrar" onClick={registrarBagagem}>
                <TbLuggage/>
                <p>Registar bagagem</p>
            </button>
        </div>
    )
}

export default RegistrarBagagem