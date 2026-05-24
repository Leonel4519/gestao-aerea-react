import logo from '../../image/logoair.png'
import './Logo.css'


const Logo = () =>{
    return (
        <div className='container-logo'>
            <img src={logo} alt='Logo' className="logo"/>
            <div className='logo-text'>
                <h1>AirLightGestão</h1>
                <h2>GESTÃO AEROPORTUÁRIA</h2>
            </div>
        </div>
    )
}
export default Logo
