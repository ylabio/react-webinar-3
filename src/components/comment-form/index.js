import { memo } from "react";
import Button from "../button";
import { cn as bem } from '@bem-react/classname';
import './style.css'

function CommentForm({action=()=>{}, title,placeholder, cancel, onCancel=()=>{}}){
    const cn = bem('CommentForm')
    return(
        <div className={cn()}>
        <form onSubmit={action}>
                <h3>Новый {title}</h3>
                <div className={cn('area')}>
                    <textarea name="text" id="text" placeholder={placeholder} />
                </div>
                <div className={cn('actions')}>
                    <Button type="submit" style={'primary'} title='Отправить'/>
                    {cancel && <Button onClick={onCancel} type="button" style={'cancel'} title='Отмена'></Button>}
                </div>
        </form>
        </div>
    )
}
export default memo(CommentForm)