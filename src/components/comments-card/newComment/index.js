import { useState } from 'react';
import {cn as bem} from '@bem-react/classname';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

function NewComment ({postComment}) {
    const cn = bem("NewComment");
    const { id } = useParams();
    const [text, setText] = useState("");

    const handleChangeText = (e) => {
        const value = e.target.value;
        setText(value);
    }
    const handlePostComment = () => {
        postComment(text, id, "article");
        setText("");
    }

    return(
        <div className={cn("")}>
            <div className={cn("title")}>Новый комментарий</div>
            <textarea className={cn("textarea")} placeholder="Текст" onChange={handleChangeText} value={text}></textarea>
            <button className={cn("button")} onClick={handlePostComment}>Отправить</button>
        </div>
    )
}

Comment.propTypes = {
    postComment: PropTypes.func,
};

Comment.defaultProps = {
    postComment: () => {},
}

export default NewComment;