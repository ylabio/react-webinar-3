import { memo } from 'react';
import './style.css'
import {cn as bem} from '@bem-react/classname';
import formatDate from '../../utils/format-date';


function Comment({comment}){
    const cn = bem('Comment');
    return(
        <div className={cn()}>
            <div className={cn("upper")}>
                <strong className={cn("author")}> {comment.author.profile.name} </strong>
                <span className={cn("date")}> {formatDate(comment.dateCreate)} </span>
            </div>
            <div className={cn("body")}> {comment.text} </div>
            <div className={cn("footer")}> Ответить </div>
            {comment.children.length ? <ul className={cn("answers")}>
                {
                    comment.children.map((comment) => <Comment key={comment._id} comment={comment} />)
                }
            </ul> : null
            }
        </div>
    )
}

export default memo(Comment)