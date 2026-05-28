// TabelaPassageiros.jsx

import { useState } from 'react'

import {
    FaArrowRight,
    FaPassport
} from 'react-icons/fa6'

import { useCheckin } from '../../context/CheckinContext'

import { useBagagem } from '../../context/BagagemContext'

import './TabelaPassageiros.css'

const obterEstado = (p) => {

    if (p.embarcou)

        return {
            label: 'Embarcado',
            cls: 'embarcado'
        }

    if (p.checkinFeito)

        return {
            label: 'Check-in ✓',
            cls: 'checkin'
        }

    return {
        label: 'Pendente',
        cls: 'pendente'
    }
}

const TabelaPassageiros = () => {

    const [search, setSearch] = useState('')

    // PASSAGEIROS
    const { passageiros } = useCheckin()

    // BAGAGENS
    const { bagagens } = useBagagem()

    // SOMENTE CHECK-IN CONCLUÍDO
    const passageirosConcluidos = passageiros.filter(
        p => p.checkinFeito
    )

    // PESQUISA
    const filtrados = passageirosConcluidos.filter(p =>

        p.nome.toLowerCase().includes(search.toLowerCase())

        ||

        p.voo.toLowerCase().includes(search.toLowerCase())

        ||

        p.passaporte.toLowerCase().includes(search.toLowerCase())
    )

    return (

        <div className='tabela-passageiros'>

            {/* HEADER */}

            <div className='tabela-header'>

                <h2>
                    Passageiros
                </h2>

                <button
                    className='ver-todos'
                    onClick={() => setSearch('')}
                >

                    Ver todos

                    <FaArrowRight />

                </button>

            </div>

            {/* PESQUISA */}

            <div className='tabela-search'>

                <input
                    type='text'
                    placeholder='Pesquisar por nome, voo ou passaporte...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

            </div>

            {/* TABELA */}

            <table>

                <thead>

                    <tr>

                        <th>Passageiro</th>

                        <th>Voo</th>

                        <th>Assento</th>

                        <th>Passaporte</th>

                        <th>Bagagem</th>

                        <th>Estado</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filtrados.map((p, index) => {

                            const estado = obterEstado(p)

                            // BAGAGENS DO PASSAGEIRO
                            const totalBagagens = bagagens.filter(
                                b => b.passageiroId === p.id
                            ).length

                            return (

                                <tr key={p.id}>

                                    {/* PASSAGEIRO */}

                                    <td>

                                        <div className='passageiro-info'>

                                            <div className='avatar'>

                                                {
                                                    p.nome
                                                        .split(' ')
                                                        .map(n => n[0])
                                                        .slice(0, 2)
                                                        .join('')
                                                }

                                            </div>

                                            <div>

                                                <div className='passageiro-nome'>

                                                    {p.nome}

                                                </div>

                                                <div className='passageiro-id'>

                                                    #

                                                    {
                                                        String(index + 1)
                                                            .padStart(3, '0')
                                                    }

                                                </div>

                                            </div>

                                        </div>

                                    </td>

                                    {/* VOO */}

                                    <td>

                                        <span className='voo-badge'>

                                            {p.voo}

                                        </span>

                                    </td>

                                    {/* ASSENTO */}

                                    <td>

                                        <span className='assento'>

                                            {p.assento}

                                        </span>

                                    </td>

                                    {/* PASSAPORTE */}

                                    <td>

                                        <div className='passaporte'>

                                            <FaPassport size={12} />

                                            {p.passaporte}

                                        </div>

                                    </td>

                                    {/* BAGAGEM */}

                                    <td>

                                        <div className='bagagem'>

                                            {totalBagagens}

                                        </div>

                                    </td>

                                    {/* ESTADO */}

                                    <td>

                                        <span className={`status ${estado.cls}`}>

                                            {estado.label}

                                        </span>

                                    </td>

                                </tr>
                            )
                        })
                    }

                    {

                        filtrados.length === 0 && (

                            <tr>

                                <td
                                    colSpan={6}
                                    className='sem-resultados'
                                >

                                    Nenhum passageiro encontrado.

                                </td>

                            </tr>
                        )
                    }

                </tbody>

            </table>

            {/* FOOTER */}

            <div className='tabela-footer'>

                <span>

                    {

                        passageirosConcluidos.filter(
                            p => p.checkinFeito
                        ).length

                    }

                    {' '}com check-in

                </span>

                <span>·</span>

                <span>

                    {

                        passageirosConcluidos.filter(
                            p => p.embarcou
                        ).length

                    }

                    {' '}embarcados

                </span>

                <span>·</span>

                <span>

                    {

                        passageiros.filter(
                            p => !p.checkinFeito
                        ).length

                    }

                    {' '}pendentes

                </span>

            </div>

        </div>
    )
}

export default TabelaPassageiros