import './style.css'
import { memo } from 'react'

function LoginLabel({onClick, type, cancel}){
    return(
        <>
            { type === "article  " ?
                <p className='LoginLabel'><span onClick={onClick}>Войдите</span>, чтобы иметь возможность комментировать</p>
                :
                <p className='LoginLabel'><span onClick={onClick}>Войдите</span>, чтобы иметь возможность ответить <span onClick={cancel} className='LoginLabel-cancel'>Отмена</span></p>
            }
        </>
    )
}

export default memo(LoginLabel)