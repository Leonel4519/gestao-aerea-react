import { createContext, useContext, useState } from 'react'
import { voos as voosIniciais } from '../data/dashboardData'

const VooContext = createContext()

export const VooProvider = ({ children }) => {
    const [voos, setVoos] = useState(voosIniciais)
    return (
        <VooContext.Provider value={{ voos, setVoos }}>
            {children}
        </VooContext.Provider>
    )
}

export const useVoos = () => useContext(VooContext)