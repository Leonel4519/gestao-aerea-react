// VooContext.js
import { createContext, useContext, useState } from 'react'

const voosIniciais = [
    {
        id: 1,
        codigo: 'LA408',
        companhia: 'TAAG Angola',
        origem: 'Luanda',
        destino: 'Lisboa',
        hora: '08:30',
        estado: 'No horário',
        gate: 'A1',
        passageiros: 240,
        embarcados: 180,
        atrasoMinutos: 0,
        embarqueStatus: 'A embarcar',
    },
    {
        id: 2,
        codigo: 'DT201',
        companhia: 'TAAG Angola',
        origem: 'Luanda',
        destino: 'Joanesburgo',
        hora: '09:10',
        estado: 'Embarque',
        gate: 'B1',
        passageiros: 180,
        embarcados: 87,
        atrasoMinutos: 0,
        embarqueStatus: 'Embarcando',
    },
    {
        id: 3,
        codigo: 'TP450',
        companhia: 'TAP Air Portugal',
        origem: 'Luanda',
        destino: 'Paris',
        hora: '11:00',
        estado: 'Programado',
        gate: 'C1',
        passageiros: 210,
        embarcados: 0,
        atrasoMinutos: 0,
        embarqueStatus: '',
    }
]

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