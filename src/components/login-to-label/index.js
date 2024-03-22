import './style.css'
import { memo } from 'react'

function LoginLabel({onClick}){
    return(
        <p className='LoginLabel'><span onClick={onClick}>Войдите</span>, чтобы иметь возможность комментировать</p>
    )
}

export default memo(LoginLabel)