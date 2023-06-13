import { useRef, useEffect } from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import PropTypes from 'prop-types';
import dateFormat from "../../../utils/date-format";
import Reply from '../reply';

function Comment({comment, exists, level, postAnswer, setSelectedReplyId, reply, id}) {
    const cn = bem("Comment");
    const scrollRef = useRef(null);

    useEffect(() => {
        if(scrollRef?.current) {
            scrollRef?.current?.scrollIntoView({behavior: "smooth", block: "center"}); 
        }
    }, [id])
    
    const handleSetReplyId = () => {
        setSelectedReplyId(comment._id);
    }  
    return(
       <div className={cn()} style={{paddingLeft: `${Math.min(level, 7) * 30}px`}} ref={comment._id === id ? scrollRef : undefined}>
        <div className={cn("container")}>
            <div className={cn("username")}>{comment.authorName}</div>
            <div className={cn("date")}>{dateFormat(comment.dateCreate)}</div>
        </div>
        <div className={cn("text")}>{comment.text}</div>
        <div className={cn("reply")} onClick={handleSetReplyId}>Ответить</div>
        {reply ? <Reply 
            user={comment.authorName}
            exists={exists}
            id={comment._id}
            postAnswer={postAnswer}
            setSelectedReplyId={setSelectedReplyId}
        />: null}
       </div>     
    )
}


Comment.propTypes = {
    comment: PropTypes.object,
    exists: PropTypes.bool,
    level: PropTypes.number,
    postAnswer: PropTypes.func,
    setSelectedReplyId: PropTypes.func,
    reply: PropTypes.bool
};

Comment.defaultProps = {
    exists: false,
    postAnswer: () => {},
    setSelectedReplyId: () => {}
}


export default Comment;