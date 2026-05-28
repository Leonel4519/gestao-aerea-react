import { createContext, useContext, useState } from 'react'

const NotificacaoContext = createContext()

export const NotificacaoProvider = ({ children }) => {
    const [notificacoes, setNotificacoes] = useState([])

    const adicionarNotificacao = (notificacao) => {
        const nova = {
            id:   Date.now(),
            hora: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
            lida: false,
            ...notificacao
        }
        setNotificacoes(prev => [nova, ...prev])
    }

    const marcarLida = (id) => {
        setNotificacoes(prev =>
            prev.map(n => n.id === id ? { ...n, lida: true } : n)
        )
    }

    const marcarTodasLidas = () => {
        setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })))
    }

    const naoLidas = notificacoes.filter(n => !n.lida).length

    return (
        <NotificacaoContext.Provider value={{
            notificacoes,
            adicionarNotificacao,
            marcarLida,
            marcarTodasLidas,
            naoLidas
        }}>
            {children}
        </NotificacaoContext.Provider>
    )
}

export const useNotificacao = () => useContext(NotificacaoContext)