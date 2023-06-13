import {useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

function Reply({user, exists, id, postAnswer, setSelectedReplyId}) {
    const cn = bem("Reply");
    const navigate = useNavigate();

    const [text, setText] = useState("");


    const handleChange = (e) => {
        const value = e.target.value;
        setText(value);
    };

    const handlePostAnswer = () => {
        postAnswer(text, id, "comment");
        setText("");
        setSelectedReplyId("");
    }

    return (
        <div className={cn()}>
            {exists? 
            <>
                <div className={cn("title")}>Новый ответ</div>
                <textarea className={cn("textarea")} placeholder={`Мой ответ для ${user}`} value={text} onChange={handleChange}></textarea>
                <div className={cn("container")}>
                    <button className={cn("button")} onClick={handlePostAnswer}>Отправить</button>
                    <button className={cn("button-cancel")} onClick={() => setSelectedReplyId("")}>Отмена</button>
                </div>
            </>
            : 
            <div>
                <div className={cn("entrance")}>
                    <div className={cn("enter")} onClick={() => navigate("/login")}>Войдите</div> 
                    <div>
                        , чтобы иметь возможность комментировать.
                    </div>
                    <div className={cn("cancel")} onClick={() => setSelectedReplyId("")}>Отмена</div>
                </div> 
            </div>
            } 
        </div>    
    )
}

    Reply.propTypes = {
        user: PropTypes.string,
        exists: PropTypes.bool,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        postAnswer: PropTypes.func,
        setSelectedReplyId:PropTypes.func
    };
  
    Reply.defaultProps = {
        exists: false,
        postAnswer: () => {},
        setSelectedReplyId: () => {}
  }

export default Reply;