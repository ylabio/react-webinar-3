import { memo, useState } from 'react'
import './style.css'

function AuthForm({error,onAuth, onSuccess, title, login, password, enter}){
    const [loginValue, setLoginValue] = useState("")
    const [passwordValue, setPasswordValue] = useState("")
    return(
        <form 
        onSubmit={async (e) => {
            e.preventDefault()
            const response = await onAuth(loginValue, passwordValue)
            setLoginValue('');
            setPasswordValue('');
            if(response){
                onSuccess()
            }
        }}
        className='AuthForm'>
            <h2> {title} </h2>
            <div className='AuthForm-field'>
                <p>{login}</p>
                <input
                required
                value={loginValue}
                onChange={e => setLoginValue(e.target.value)}
                type='text' />
            </div>
            <div className='AuthForm-field'>
                <p>{password}</p>
                <input
                required
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                type='password' />
            </div>
            {error && <p className='AuthForm-error'> {error} </p>}
            <button
            
            > {enter} </button>
        </form>
    )
}

export default memo(AuthForm)