import { memo } from "react"
import './style.css'
import {cn as bem} from '@bem-react/classname';
import Comment from "../comment";

function CommentariesBlock({comments, count}){
    const cn = bem('CommentariesBlock');
    return(
        <div className="CommentariesBlock">
            <h2 className={cn('header')}>Комментарии ({count})</h2>
            {
                comments.map(comment => <Comment key={comment._id} comment={comment} />)        
            }
        </div>
    )
}

export default memo(CommentariesBlock)