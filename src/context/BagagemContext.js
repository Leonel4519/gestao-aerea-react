// BagagemContext.js
import { createContext, useContext, useState } from 'react'

const BagagemContext = createContext()

export const BagagemProvider = ({ children }) => {
    const [bagagens, setBagagens] = useState([]) // ← array vazio

    const adicionarBagagem = (novaBagagem) => {
        setBagagens(prev => [...prev, {
            ...novaBagagem,
            passageiroId: Number(novaBagagem.passageiroId)
        }])
    }

    const bagagensDoPassageiro = (passageiroId) =>
        bagagens.filter(b => Number(b.passageiroId) === Number(passageiroId))

    return (
        <BagagemContext.Provider value={{ bagagens, setBagagens, adicionarBagagem, bagagensDoPassageiro }}>
            {children}
        </BagagemContext.Provider>
    )
}

export const useBagagem = () => useContext(BagagemContext)