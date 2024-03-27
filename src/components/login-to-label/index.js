import './style.css'
import { memo } from 'react'

function LoginLabel({onClick, type, cancel, t}){
    return(
        <>
            { type === "article" ?
                <p className='LoginLabel'><span onClick={onClick}> {t("comments.enter")} </span>, {t("comment.abilityToComment")} </p>
                :
                <p className='LoginLabel'><span onClick={onClick}> {t("comments.enter")} </span>, {t("comment.abilityToAnswer")} <span onClick={cancel} className='LoginLabel-cancel'> {t("comments.cancel")} </span></p>
            }
        </>
    )
}

export default memo(LoginLabel)