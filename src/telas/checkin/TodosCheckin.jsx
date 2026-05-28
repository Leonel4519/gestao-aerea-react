import './TodosCheckin.css'
import { useState } from 'react'

import { useCheckin } from '../../context/CheckinContext'
import { useBagagem } from '../../context/BagagemContext'

import ProgressoCheckin from "../../components/progressocheckin/ProgressoCheckin"

import { FiPrinter } from "react-icons/fi"
import { IoCheckmarkOutline } from "react-icons/io5"
import { TbLuggage } from 'react-icons/tb'
import { PiArmchair } from "react-icons/pi"
import { useNotificacao } from '../../context/NotificacaoContext'

const TodosCheckin = () => {
    const { adicionarNotificacao } = useNotificacao()

    const {
        passageiros,
        passageiroAtivo,
        setPassageiroAtivo,
        avancarEtapa
    } = useCheckin()

    // BAGAGENS
    const {
        bagagens,
        bagagensDoPassageiro
    } = useBagagem()

    const [busca, setBusca] = useState('')
    const [erro, setErro]   = useState('')

    // FILTRO
    const passageirosFiltrados = passageiros.filter(p =>

        p.nome.toLowerCase().includes(busca.toLowerCase())

        ||

        p.passaporte.toLowerCase().includes(busca.toLowerCase())

        ||

        p.voo.toLowerCase().includes(busca.toLowerCase())
    )

    // BAGAGENS DO PASSAGEIRO ATIVO
    const bagagensPassageiro = passageiroAtivo
        ? bagagensDoPassageiro(passageiroAtivo.id)
        : []

    // AVANÇAR
    const handleAvancar = () => {

        setErro('')

        // ETAPA BAGAGEM
        if (
            passageiroAtivo.etapa === 2
            &&
            bagagensPassageiro.length === 0
        ) {

            setErro(
                'O passageiro não tem bagagem registada.'
            )

            return
        }

        avancarEtapa(passageiroAtivo.id)
    }

    // CONFIRMAR
    const handleConfirmar = () => {

        avancarEtapa(passageiroAtivo.id)

        adicionarNotificacao({
            tipo:     'checkin',
            titulo:   'Check-in concluído',
            mensagem: `${passageiroAtivo.nome} — ${passageiroAtivo.voo} · Gate ${passageiroAtivo.gate}`,
            destino:  'embarque'
        })
        
        setTimeout(() => {

            setPassageiroAtivo(null)

        }, 400)
    }

    // ETAPAS
    const renderEtapa = () => {

        const etapa = passageiroAtivo.etapa

        // ETAPA 0
        if (etapa === 0) return (

            <div className="etapa-conteudo">

                <h3 className="etapa-titulo">
                    Validação do bilhete
                </h3>

                <div className="etapa-card">

                    <div className="etapa-row">
                        <span>Código do voo</span>
                        <strong>{passageiroAtivo.voo}</strong>
                    </div>

                    <div className="etapa-row">
                        <span>Destino</span>
                        <strong>{passageiroAtivo.destino}</strong>
                    </div>

                    <div className="etapa-row">
                        <span>Hora</span>
                        <strong>{passageiroAtivo.hora}</strong>
                    </div>

                    <div className="etapa-row">
                        <span>Gate</span>
                        <strong>{passageiroAtivo.gate}</strong>
                    </div>

                    <div className="etapa-row">
                        <span>Passageiro</span>
                        <strong>{passageiroAtivo.nome}</strong>
                    </div>

                </div>

                <div className="etapa-badge ok">
                    ✓ Bilhete validado
                </div>

            </div>
        )

        // ETAPA 1
        if (etapa === 1) return (

            <div className="etapa-conteudo">

                <h3 className="etapa-titulo">
                    Verificação do documento
                </h3>

                <div className="etapa-card">

                    <div className="etapa-row">
                        <span>Nome</span>
                        <strong>{passageiroAtivo.nome}</strong>
                    </div>

                    <div className="etapa-row">
                        <span>Passaporte</span>
                        <strong>{passageiroAtivo.passaporte}</strong>
                    </div>

                    <div className="etapa-row">
                        <span>Nascimento</span>
                        <strong>{passageiroAtivo.nascimento}</strong>
                    </div>

                    <div className="etapa-row">
                        <span>Nacionalidade</span>
                        <strong>{passageiroAtivo.nacionalidade}</strong>
                    </div>

                </div>

                <div className="etapa-badge ok">
                    ✓ Documento verificado
                </div>

            </div>
        )

        // ETAPA 2 — BAGAGEM
        if (etapa === 2) return (

            <div className="etapa-conteudo">

                <h3 className="etapa-titulo">
                    Registo de bagagem
                </h3>

                {

                    bagagensPassageiro.length === 0

                    ? (

                        <div className="etapa-badge erro">

                            Nenhuma bagagem registada.

                        </div>
                    )

                    : (

                        <div className="etapa-lista">

                            {

                                bagagensPassageiro.map((b, i) => (

                                    <div
                                        key={i}
                                        className="etapa-bagagem-item"
                                    >

                                        <div className="etapa-bagagem-icon">

                                            <TbLuggage/>

                                        </div>

                                        <div>

                                            <strong>

                                                {b.tipo || 'Bagagem'}

                                            </strong>

                                            <span>

                                                {b.peso} kg

                                                {

                                                    b.codigo
                                                    &&
                                                    ` · ${b.codigo}`
                                                }

                                            </span>

                                        </div>

                                        <span
                                            className={`bagagem-status ${
                                                b.peso > 30
                                                ? 'excesso'
                                                : 'ok'
                                            }`}
                                        >

                                            {

                                                b.peso > 30
                                                ? 'Excesso'
                                                : 'OK'
                                            }

                                        </span>

                                    </div>
                                ))
                            }

                        </div>
                    )
                }

            </div>
        )

        // ETAPA 3
        if (etapa === 3) return (

            <div className="etapa-conteudo">

                <h3 className="etapa-titulo">
                    Confirmação do assento
                </h3>

                <div className="etapa-card">

                    <div className="etapa-row">
                        <span>Classe</span>
                        <strong>{passageiroAtivo.classe}</strong>
                    </div>

                    <div className="etapa-row">
                        <span>Assento</span>
                        <strong className="assento-numero">
                            {passageiroAtivo.assento}
                        </strong>
                    </div>

                    <div className="etapa-row">
                        <span>Tipo</span>
                        <strong>{passageiroAtivo.tipo}</strong>
                    </div>

                    <div className="etapa-row">
                        <span>Refeição</span>
                        <strong>{passageiroAtivo.refeicao}</strong>
                    </div>

                </div>

                <div className="etapa-badge ok">

                    <PiArmchair/>

                    Assento confirmado

                </div>

            </div>
        )

        // ETAPA 4
        if (etapa === 4) return (

            <div className="etapa-conteudo">

                <h3 className="etapa-titulo">
                    Cartão de embarque
                </h3>

                <div className="cartao-info">

                    <div className="cartao-item">
                        <span>Voo</span>
                        <strong>{passageiroAtivo.voo}</strong>
                        <p>TAAG Angola</p>
                    </div>

                    <div className="cartao-item">
                        <span>Rota</span>

                        <strong>
                            LDA →
                            {' '}
                            {passageiroAtivo.destino
                                ?.slice(0,3)
                                .toUpperCase()}
                        </strong>

                        <p>
                            Luanda · {passageiroAtivo.destino}
                        </p>
                    </div>

                    <div className="cartao-item">
                        <span>Partida</span>
                        <strong>{passageiroAtivo.hora}</strong>
                        <p>Gate {passageiroAtivo.gate}</p>
                    </div>

                </div>

            </div>
        )
    }

    return (

        <div className="seccao_todoscheckin">

            {

                !passageiroAtivo

                ? (

                    <div className="checkin-lista-container">

                        <div className="checkin-lista-header">

                            <div>

                                <h2>
                                    Check-in de passageiros
                                </h2>

                                <p>

                                    {

                                        passageiros.filter(
                                            p => !p.checkinFeito
                                        ).length

                                    }

                                    {' '}pendentes ·{' '}

                                    {

                                        passageiros.filter(
                                            p => p.checkinFeito
                                        ).length

                                    }

                                    {' '}concluídos

                                </p>

                            </div>

                            <input
                                className="checkin-busca"
                                placeholder="Buscar..."
                                value={busca}
                                onChange={e => setBusca(e.target.value)}
                            />

                        </div>

                        <div className="checkin-lista">

                            {

                                passageirosFiltrados.map(p => {

                                    // BAGAGEM DO PASSAGEIRO
                                    const totalBagagens = bagagens.filter(

                                        b => b.passageiroId === p.id

                                    ).length

                                    return (

                                        <div
                                            key={p.id}
                                            className={`checkin-lista-item ${
                                                p.checkinFeito
                                                ? 'concluido'
                                                : 'pendente'
                                            }`}
                                            onClick={() => {

                                                if (!p.checkinFeito) {

                                                    setErro('')

                                                    setPassageiroAtivo(p)
                                                }
                                            }}
                                        >

                                            <div className="checkin-lista-avatar">

                                                {p.iniciais}

                                            </div>

                                            <div className="checkin-lista-info">

                                                <strong>
                                                    {p.nome}
                                                </strong>

                                                <span>

                                                    {p.voo}

                                                    {' · '}

                                                    {p.destino}

                                                    {' · '}

                                                    {p.hora}

                                                </span>

                                            </div>

                                            <div className="checkin-lista-direita">

                                                <span className="checkin-lista-assento">

                                                    {p.assento}

                                                </span>

                                                <span className="checkin-bagagem-total">

                                                    {totalBagagens} bagagem(ns)

                                                </span>

                                                <span
                                                    className={`checkin-lista-status ${
                                                        p.checkinFeito
                                                        ? 'feito'
                                                        : 'pendente'
                                                    }`}
                                                >

                                                    {

                                                        p.checkinFeito
                                                        ? '✓ Feito'
                                                        : 'Pendente'
                                                    }

                                                </span>

                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>

                    </div>

                ) : (

                    <div className="checkin-fluxo">

                        <div className="checkin-fluxo-topo">

                            <button
                                className="btn-voltar"
                                onClick={() => {

                                    setErro('')

                                    setPassageiroAtivo(null)
                                }}
                            >

                                ← Voltar à lista

                            </button>

                            <span className="checkin-passageiro-nome">

                                {passageiroAtivo.nome}

                            </span>

                        </div>

                        <ProgressoCheckin
                            etapa={passageiroAtivo.etapa}
                        />

                        <div className="checkin-etapa-container">

                            {renderEtapa()}

                            {

                                erro
                                &&
                                <div className="etapa-badge erro">

                                    {erro}

                                </div>
                            }

                            <div className="etapa-botoes">

                                {

                                    passageiroAtivo.etapa < 4

                                    ? (

                                        <button
                                            className="btn-confirmar"
                                            onClick={handleAvancar}
                                        >

                                            Próximo →

                                        </button>

                                    ) : (

                                        <>

                                            <button
                                                className="btn-imprimir"
                                                onClick={() => window.print()}
                                            >

                                                <FiPrinter/>

                                                Imprimir

                                            </button>

                                            <button
                                                className="btn-confirmar"
                                                onClick={handleConfirmar}
                                            >

                                                <IoCheckmarkOutline/>

                                                Confirmar check-in

                                            </button>

                                        </>
                                    )
                                }

                            </div>

                        </div>

                    </div>
                )
            }

        </div>
    )
}

export default TodosCheckin