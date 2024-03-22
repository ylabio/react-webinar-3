import { memo } from 'react';
import './style.css'
import {cn as bem} from '@bem-react/classname';
function CommentForm({}){
    const cn = bem('CommentForm');

    return(
        <div className={cn()}>
            <div className={cn("title")}>Новый комментарий</div>
            <div 
            placeholder='Текст'
            className={cn("body")}
            contentEditable
            suppressContentEditableWarning={true}
            >
            Текст
            </div>
            <button>Отправить</button>
        </div>
    )
}

export default memo(CommentForm)