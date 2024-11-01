import { useState } from 'react'
import Auth from './components/Auth'
import Cookies from 'universal-cookie'
import Chat from './components/Chat'
import './App.css'

const cookies = new Cookies()

const App = () => {

    const [ isAuth, setIsAuth ] = useState(cookies.get('auth-token'))

    if (isAuth) {
        return (
            <div className='container' >
                <Chat setIsAuth={ setIsAuth } />
            </div>
        )
    } else {
        return (
            <div className='container' >
                <Auth setIsAuth={ setIsAuth } />
            </div>
        )
    }
}

export default App