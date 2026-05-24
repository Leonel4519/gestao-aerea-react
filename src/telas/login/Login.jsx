import './Login.css'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const Login = () => {

    const [usuario, setUsuario] = useState('')

    const [senha, setSenha] = useState('')

    const navigate = useNavigate()

    const entrar = () => {

        const utilizadores = [

            {
                usuario: 'admin',
                senha: '1234',
                perfil: 'supervisor',
                nome: 'Administrador'
            },

            {
                usuario: 'checkin',
                senha: '1234',
                perfil: 'checkin',
                nome: 'Operador Check-in'
            },

            {
                usuario: 'bagagem',
                senha: '1234',
                perfil: 'bagagem',
                nome: 'Operador Bagagem'
            },

            {
                usuario: 'embarque',
                senha: '1234',
                perfil: 'embarque',
                nome: 'Operador Embarque'
            }
        ]

        const utilizadorEncontrado = utilizadores.find(

            user =>

                user.usuario === usuario

                &&

                user.senha === senha
        )

        if(utilizadorEncontrado){

            localStorage.setItem(

                'usuario',

                JSON.stringify(utilizadorEncontrado)
            )

            navigate('/')

            window.location.reload()

        }else{

            alert('Utilizador ou senha inválidos')
        }
    }

    return(

        <div className='login-page'>

            <div className='login-card'>

                <h1>

                    Aeroporto 4 de Fevereiro

                </h1>

                <p>

                    Sistema Operacional Aeroportuário

                </p>

                <div className='login-form'>

                    <input
                        type='text'
                        placeholder='Utilizador'
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />

                    <input
                        type='password'
                        placeholder='Senha'
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button onClick={entrar}>

                        Entrar

                    </button>

                </div>

            </div>

        </div>
    )
}

export default Login