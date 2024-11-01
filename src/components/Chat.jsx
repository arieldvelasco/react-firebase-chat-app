import { useState, useRef } from 'react'
import { signOut } from "firebase/auth"
import { auth } from '../firebase'
import Cookies from "universal-cookie"

const cookies = new Cookies()



const Chat = ({ setIsAuth }) => {

    const [ roomName, setRoomName ] = useState('')
    const roomNameInputRef = useRef()

    const logOut = async () => {
        await signOut(auth)
        cookies.remove('auth-token')
        setIsAuth(false)
    }

    return (
        <div>
            <button onClick={ () => logOut() } >Log Out</button>
            {
                roomName === '' ? (
                    <div>
                        <input type="text" placeholder='Room Name' ref={ roomNameInputRef } />
                        <button onClick={ () => setRoomName(roomNameInputRef.current.value) } >Enter Room</button>
                    </div>
                ) : (
                    <div>
                        <h1>{ roomName }</h1>
                        <button onClick={ () => setRoomName('') } >Change Room</button>
                    </div>
                )
            }
        </div>
    )
}

export default Chat