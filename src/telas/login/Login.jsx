// Login.jsx
import './Login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha]     = useState('')
    const navigate = useNavigate()

    const entrar = () => {
        const utilizadores = [
            { usuario: 'admin',    senha: '1234', perfil: 'supervisor', nome: 'Administrador'     },
            { usuario: 'checkin',  senha: '1234', perfil: 'checkin',    nome: 'Operador Check-in' },
            { usuario: 'bagagem',  senha: '1234', perfil: 'bagagem',    nome: 'Operador Bagagem'  },
            { usuario: 'embarque', senha: '1234', perfil: 'embarque',   nome: 'Operador Embarque' },
        ]

        const encontrado = utilizadores.find(
            u => u.usuario === usuario && u.senha === senha
        )

        if (encontrado) {
            localStorage.setItem('usuario', JSON.stringify(encontrado))
            navigate('/')
            window.location.reload()
        } else {
            alert('Utilizador ou senha inválidos')
        }
    }

    const handleKeyDown = (e) => { if (e.key === 'Enter') entrar() }

    return (
        <div className='login-page'>
            <div className='c1'/><div className='c2'/><div className='c3'/>
            <div className='aviao-bg'>✈</div>

            <div className='login-card'>
                <div className='card-topo'>
                    <div className='card-aviao'>
                        </div>
                    <div className='card-nome'>✈AirLightGestão</div>
                    <div className='card-aeroporto'>Aeroporto 4 de Fevereiro</div>
                    <div className='card-local'>Luanda · Angola</div>
                </div>

                <div className='divider'/>

                <div className='login-form'>
                    <div className='form-field'>
                        <label>Utilizador</label>
                        <input type='text' placeholder='ex: admin' value={usuario} onChange={e => setUsuario(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>
                    <div className='form-field'>
                        <label>Senha</label>
                        <input type='password' placeholder='••••••••' value={senha} onChange={e => setSenha(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>
                    <button className='btn-entrar' onClick={entrar}>ENTRAR NO SISTEMA</button>
                </div>

                <div className='card-footer'>Sistema de Gestão Operacional © 2025</div>
            </div>
        </div>
    )
}

export default Login