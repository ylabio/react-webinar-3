import { memo, useEffect, useRef, useState } from "react"
import CommentItem from "../comment-item";
import { cn as bem } from '@bem-react/classname';
import './style.css'
import CommentForm from "../comment-form";
import PleaseLogin from "../please-login";
import { useParams } from "react-router-dom";
function CommentsList({onSubmit=()=>{}, comments, isExist}){
    const cn = bem('CommentsList')
    const [answerTo, setAnswerTo] = useState(null);
    const handleCloseForm = () => {
        setAnswerTo(null);
      };
    const params = useParams();
    let commentContent = (isExist ? <CommentForm action={(e, id)=>onSubmit(e ,params.id)} title={'Комментарий'}/>  : <PleaseLogin text={'чтобы иметь возможность комментировать'}/>)
    return(
        <>
        <div className="Comments">
                <h2>Комментарии {`(${comments ? comments.length : 0})`} </h2>
            <ul className={cn()}>
                {comments && comments.map((comment)=> (<li  
                className={cn('item')}
                key={comment.value}> <CommentItem 
                level={comment.level} 
                clickToAnswer={()=>setAnswerTo(prev => prev === comment.value ? null : comment.value)}
                isActive={answerTo === comment.value}
                userName={comment.author} 
                date={comment.date} 
                description={comment.text} 
                onCloseForm={handleCloseForm}
                isExist={isExist}
                onSubmit={(e,id,type)=>onSubmit(e,comment.value,comment.parent)}
                />            
                </li>
            ))}
            </ul>
        </div>
        {answerTo === null ? commentContent : null}
        </>
    )
}

export default memo(CommentsList)