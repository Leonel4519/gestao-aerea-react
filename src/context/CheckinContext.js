import { createContext, useContext, useState } from 'react'

const passageirosIniciais = [
    {
        id: 1,
        iniciais: 'LD',
        nome: 'Leonel Domingos',
        passaporte: 'N3445098',
        nascimento: '15 ago 2007',
        nacionalidade: 'Angolana',
        email: 'leonel@gmail.com',
        telefone: '+244 958866190',
        voo: 'LA408',
        assento: '14A',
        classe: 'Económica',
        tipo: 'Janela',
        refeicao: 'Padrão',
        gate: 'A1',
        hora: '15:10',
        destino: 'Lisboa',
        checkinFeito: false,
        etapa: 0,
    },
    {
        id: 2,
        iniciais: 'MF',
        nome: 'Manuel Ferreira',
        passaporte: 'N1234567',
        nascimento: '20 mar 1985',
        nacionalidade: 'Angolana',
        email: 'manuel@gmail.com',
        telefone: '+244 921234567',
        voo: 'LA408',
        assento: '22B',
        classe: 'Económica',
        tipo: 'Corredor',
        refeicao: 'Vegetariana',
        gate: 'A1',
        hora: '15:10',
        destino: 'Lisboa',
        checkinFeito: false,
        etapa: 0,
    },
    {
        id: 3,
        iniciais: 'AS',
        nome: 'Ana Silva',
        passaporte: 'N9876543',
        nascimento: '05 jun 1990',
        nacionalidade: 'Portuguesa',
        email: 'ana@gmail.com',
        telefone: '+351 912345678',
        voo: 'DT201',
        assento: '5C',
        classe: 'Executiva',
        tipo: 'Janela',
        refeicao: 'Padrão',
        gate: 'B1',
        hora: '16:45',
        destino: 'Joanesburgo',
        checkinFeito: true,
        etapa: 4,
    }
]

const CheckinContext = createContext()

export const CheckinProvider = ({ children }) => {
    const [passageiros, setPassageiros]         = useState(passageirosIniciais)
    const [passageiroAtivo, setPassageiroAtivo] = useState(null)

    const avancarEtapa = (id) => {
        setPassageiros(prev => prev.map(p =>
            p.id === id
                ? {
                    ...p,
                    etapa:       Math.min(p.etapa + 1, 4),
                    checkinFeito: p.etapa >= 4
                }
                : p
        ))
        setPassageiroAtivo(prev =>
            prev?.id === id
                ? {
                    ...prev,
                    etapa:       Math.min(prev.etapa + 1, 4),
                    checkinFeito: prev.etapa >= 4
                }
                : prev
        )
    }

    const passageirosSemCheckin = passageiros.filter(p => !p.checkinFeito)

    return (
        <CheckinContext.Provider value={{
            passageiros,
            setPassageiros,
            passageiroAtivo,
            setPassageiroAtivo,
            avancarEtapa,
            passageirosSemCheckin
        }}>
            {children}
        </CheckinContext.Provider>
    )
}

export const useCheckin = () => useContext(CheckinContext)