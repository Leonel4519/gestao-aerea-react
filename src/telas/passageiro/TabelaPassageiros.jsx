// TabelaPassageiros.jsx
import { useState } from 'react'
import { FaArrowRight, FaPassport, FaSuitcaseRolling } from 'react-icons/fa6'
import { IoPeopleOutline } from 'react-icons/io5'
import './TabelaPassageiros.css'

const passageiros = [
    { id: 'P001', nome: 'Ana Ferreira',   voo: 'LA408', assento: '14A', passaporte: 'AO123456', bagagem: 1, checkin: true,  embarcou: false },
    { id: 'P002', nome: 'Carlos Mbemba',  voo: 'DT201', assento: '3B',  passaporte: 'AO789012', bagagem: 2, checkin: true,  embarcou: true  },
    { id: 'P003', nome: 'Joana Silva',    voo: 'LA408', assento: '22C', passaporte: 'PT456789', bagagem: 0, checkin: false, embarcou: false },
    { id: 'P004', nome: 'Manuel Cardoso', voo: 'TP450', assento: '8D',  passaporte: 'AO334455', bagagem: 2, checkin: true,  embarcou: false },
    { id: 'P005', nome: 'Fátima Neto',    voo: 'DT201', assento: '41F', passaporte: 'AO667788', bagagem: 1, checkin: true,  embarcou: true  },
    { id: 'P006', nome: 'Pedro Lopes',    voo: 'TP450', assento: '5A',  passaporte: 'PT998877', bagagem: 1, checkin: false, embarcou: false },
]

const obterEstado = (p) => {
    if (p.embarcou)  return { label: 'Embarcado',  cls: 'embarcado'  }
    if (p.checkin)   return { label: 'Check-in ✓', cls: 'checkin'    }
    return               { label: 'Pendente',    cls: 'pendente'   }
}

const TabelaPassageiros = () => {
    const [search, setSearch] = useState('')

    const filtrados = passageiros.filter(p =>
        p.nome.toLowerCase().includes(search.toLowerCase()) ||
        p.voo.toLowerCase().includes(search.toLowerCase()) ||
        p.passaporte.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='tabela-passageiros'>
        
            
            <div className='tabela-header'>
                <h2><IoPeopleOutline /> Passageiros</h2>
                <a href='/' className='ver-todos'>Ver todos <FaArrowRight /></a>
            </div>

            {/* Pesquisa */}
            <div className='tabela-search'>
                <input
                    type='text'
                    placeholder='Pesquisar por nome, voo ou passaporte...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            {/* Tabela */}
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
                    {filtrados.map(p => {
                        const estado = obterEstado(p)
                        return (
                            <tr key={p.id}>
                                {/* Avatar + Nome */}
                                <td>
                                    <div className='passageiro-info'>
                                        <div className='avatar'>
                                            {p.nome.split(' ').map(n => n[0]).slice(0, 2).join('')}
                                        </div>
                                        <div>
                                            <div className='passageiro-nome'>{p.nome}</div>
                                            <div className='passageiro-id'>{p.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className='voo-badge'>{p.voo}</span>
                                </td>
                                <td>
                                    <span className='assento'>{p.assento}</span>
                                </td>
                                <td>
                                    <div className='passaporte'>
                                        <FaPassport size={12} />
                                        {p.passaporte}
                                    </div>
                                </td>
                                <td>
                                    <div className='bagagem'>
                                        <FaSuitcaseRolling size={13} />
                                        {p.bagagem}
                                    </div>
                                </td>
                                <td>
                                    <span className={`status ${estado.cls}`}>
                                        {estado.label}
                                    </span>
                                </td>
                            </tr>
                        )
                    })}

                    {filtrados.length === 0 && (
                        <tr>
                            <td colSpan={6} className='sem-resultados'>
                                Nenhum passageiro encontrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Rodapé com contagens */}
            <div className='tabela-footer'>
                <span>{passageiros.filter(p => p.checkin).length} com check-in</span>
                <span>·</span>
                <span>{passageiros.filter(p => p.embarcou).length} embarcados</span>
                <span>·</span>
                <span>{passageiros.filter(p => !p.checkin).length} pendentes</span>
            </div>
        </div>
    )
}

export default TabelaPassageiros