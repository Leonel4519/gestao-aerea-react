import { createContext, useContext, useState } from 'react'

const bagagensIniciais = [
    { id: 1, passageiroId: 1, nome: 'Leonel Domingos', peso: 30, tipo: 'Mala de porão',  rota: 'LA408 · LDA → LIS', codigo: 'BAG-001' },
    { id: 2, passageiroId: 2, nome: 'Manuel Ferreira',  peso: 25, tipo: 'Mala de porão',  rota: 'LA408 · LDA → LIS', codigo: 'BAG-002' },
    { id: 3, passageiroId: 1, nome: 'Leonel Domingos', peso: 8,  tipo: 'Bagagem de mão', rota: 'LA408 · LDA → LIS', codigo: 'BAG-003' },
]

const BagagemContext = createContext()

export const BagagemProvider = ({ children }) => {
    const [bagagens, setBagagens] = useState(bagagensIniciais)

    const adicionarBagagem = (novaBagagem) => {
        setBagagens(prev => [novaBagagem, ...prev])
    }

    const bagagensDoPassageiro = (passageiroId) =>
        bagagens.filter(b => b.passageiroId === passageiroId)

    return (
        <BagagemContext.Provider value={{ bagagens, setBagagens, adicionarBagagem, bagagensDoPassageiro }}>
            {children}
        </BagagemContext.Provider>
    )
}

export const useBagagem = () => useContext(BagagemContext)