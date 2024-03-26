import React from 'react'
import "./style.css"
import {cn as bem} from "@bem-react/classname"
import { Link, useLocation } from 'react-router-dom';

function CommentFooterForm(props) {
    const cn = bem("Comments-Frooter-Form");
    const location = useLocation(); 
    const onSubmit = (e) =>{
        e.preventDefault();
        const form = e.target;
        const text  = form.text.value;
        if(text.trim().length !== 0){
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
            <Link to = "/login" state = {{back : location.pathname}}>Войдите</Link>, чтобы иметь возможность комментировать
        </p>
    }
    </>
)
}

export default CommentFooterForm