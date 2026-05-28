import './Notificacoes.css'
import { useState } from 'react'
import { useNotificacao } from '../../context/NotificacaoContext'
import { IoNotificationsOutline } from 'react-icons/io5'

const Notificacoes = () => {
    const { notificacoes, marcarLida, marcarTodasLidas, naoLidas } = useNotificacao()
    const [aberto, setAberto] = useState(false)

    return (
        <div className="notificacoes-wrapper">
            <button
                className="notif-btn"
                onClick={() => setAberto(!aberto)}
            >
                <IoNotificationsOutline/>
                {naoLidas > 0 && (
                    <span className="notif-badge">{naoLidas}</span>
                )}
            </button>

            {aberto && (
                <div className="notif-painel">
                    <div className="notif-header">
                        <span>Notificações</span>
                        {naoLidas > 0 && (
                            <button
                                className="notif-marcar-todas"
                                onClick={marcarTodasLidas}
                            >
                                Marcar todas como lidas
                            </button>
                        )}
                    </div>

                    <div className="notif-lista">
                        {notificacoes.length === 0 ? (
                            <div className="notif-vazia">
                                Sem notificações
                            </div>
                        ) : (
                            notificacoes.map(n => (
                                <div
                                    key={n.id}
                                    className={`notif-item ${n.tipo} ${n.lida ? 'lida' : ''}`}
                                    onClick={() => marcarLida(n.id)}
                                >
                                    <div className="notif-dot"/>
                                    <div className="notif-conteudo">
                                        <strong>{n.titulo}</strong>
                                        <span>{n.mensagem}</span>
                                        <p>{n.hora}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Notificacoes