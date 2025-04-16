import { memo, useState } from "react"
import { cn as bem } from '@bem-react/classname';
import './style.css'
import { formatDate } from "../../utils/formatDate";
import CommentForm from "../comment-form";
import PleaseLogin from "../please-login";
function CommentItem({onSubmit=()=>{} , isExist, userName, isActive,date, description, level, clickToAnswer=()=>{},onCloseForm=()=>{}}){
    let commentContent = (isExist ? <CommentForm action={onSubmit} onCancel={onCloseForm} cancel={true} title={'Ответ'} placeholder={`Мой ответ для ${userName}`}/> : <PleaseLogin text={'чтобы иметь возможность комментировать'}/>)
    const cn = bem('Comment')
    const formatedDate = formatDate(date);
    return (
        <>
        <div className={cn()} style={{marginLeft: 1 * level}}>
            <div className={cn('info')}>
                <p>{userName} <span className={cn('date')}>{formatedDate}</span></p>
            </div>
            <div className={cn('text')}>
                {description}
            </div>
            <div>
                 {!isActive? <div className={cn('actions')}> <button onClick={clickToAnswer}>Ответить</button></div>: 
                 <div className={cn('form')}>
                    {commentContent}
                </div>}
            </div>
        </div>
        </>
    )
}
export default memo(CommentItem)