import { Link } from 'react-router-dom'
import './style.css'
import { memo } from 'react'

function AuthLogged({ path, username, buttonText, onExit }) {
    const url = path ?? '/profile'
    return (
        <div className='AuthLogged'>
            <Link to={url}>
                {username}
            </Link>
            <button
            onClick={onExit}
            >
                {buttonText}
            </button>
        </div>
    )
}

export default memo(AuthLogged)