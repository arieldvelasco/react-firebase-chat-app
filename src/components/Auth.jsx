import { useState } from 'react'
import { auth, provider } from '../firebase'
import {
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth'
import Cookies from 'universal-cookie'
import { FcGoogle } from "react-icons/fc";

const cookies = new Cookies()

const Auth = ({ setIsAuth }) => {

    const [ signUp, setSignUp ] = useState(false)
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            cookies.set('auth-token', result.user.refreshToken)
            setIsAuth(true)
        } catch (error) {
            console.log(error)
        }
    }

    const signInWithMail = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            cookies.set('auth-token', result.user.refreshToken)
            setEmail('')
            setPassword('')
            setIsAuth(true)
        } catch (error) {
            console.log(error)
        }
    }

    const signUpWithMail = async () => {
        try {
            let result = await createUserWithEmailAndPassword(auth, email, password)
            result = await signInWithEmailAndPassword(auth, email, password)
            cookies.set('auth-token', result.user.refreshToken)
            setEmail('')
            setPassword('')
            setIsAuth(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='auth-form' >
            <div className='auth-form-header' >
                <h3 className='auth-form-title' >{ signUp ? 'Sign Up' : 'Sign In' }</h3>
            </div>
            <input className='auth-form-input' type="text" placeholder='Email' value={ email } onChange={ (e) => setEmail(e.target.value) } />
            <input className='auth-form-input' type="password" placeholder='Password' value={ password } onChange={ (e) => setPassword(e.target.value) } />
            {
                signUp? (
                    <div>
                        <button className='btn btn-primary' onClick={ () => signUpWithMail() } >Sign Up</button>
                        <div>
                            <span>You have an acount? </span>
                            <button className='btn btn-primary-outlined' onClick={ () => setSignUp(false) } >sign in</button>
                        </div>
                    </div>
                ) : (
                    <div>
                        <button className='btn btn-primary' onClick={ () => signInWithMail() } >Sign In</button>
                        <div>
                            <span>You don&apos;t have an acount? </span>
                            <button className='btn btn-primary-outlined' onClick={ () => setSignUp(true)} >sign up</button>
                        </div>
                    </div>
                )
            }
            <div className='auth-form-footer' >
                <p>or sign in with...</p>
                <button className='btn btn-auth-rrss' onClick={ () => signInWithGoogle() } ><FcGoogle /></button>
            </div>
            
        </div>
    )
}

export default Auth