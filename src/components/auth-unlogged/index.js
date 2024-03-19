import { memo } from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function AuthUnlogged({path, buttonText}){
    const url = path ?? "/login"
    return(
        <div className='AuthUnlogged'>
            <Link to={url}>
                    <button>{buttonText}</button>
            </Link>
        </div>
    )
}

export default memo(AuthUnlogged)