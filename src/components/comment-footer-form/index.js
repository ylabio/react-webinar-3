import React from 'react'
import "./style.css"
import {cn as bem} from "@bem-react/classname"
import { Link } from 'react-router-dom';

function CommentFooterForm(props) {
    const cn = bem("Comments-Frooter-Form");
    const onSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const text  = form.text.value;
        const body  = {
                text : text,
                parent :{
                _id : props.articleId,
                _type : "article"
                },
            }
        props.onSubmit(body)
        form.text.value = ""
    }
    
    return (
    <>
    {props.isLogin ? 
        <form className={cn()} onSubmit={onSubmit} onClick={props.onClick}>
            <label>
                <b>Новый комментарий</b>
                <br/>
                <textarea
                    name="text"
                    defaultValue={props.value}
                    placeholder="Текст"
                />
            </label>
            <br/>
            <button type="submit">Отправить</button>
        </form>
     : 
        <p>
            <Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать
        </p>
    }
    </>
)
}

export default CommentFooterForm