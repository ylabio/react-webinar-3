import React, { useState, memo } from "react";
import './style.css'
import { cn as bem } from "@bem-react/classname";
import { Link, useLocation, useParams } from "react-router-dom";
import PropTypes from 'prop-types';

function CommentAdd({isAuth, addComment}) {

    const { id } = useParams()
    const cn = bem('CommentAdd');
    const location = useLocation()
    const [text, setText] = useState('')
    
    const onChangeText = (e) => {
        const value = e.target.value;
        setText(value)
    }

    const onSubmit = () => {
        const str = text.trim()
        if(str !== '') {
            addComment(str, id, 'article')
        }
        setText('')
    }


    return (
        <div className={cn()}>
            {
                isAuth
                 ?
                <>
                    <h2 className={cn('header')}>Новый комментарий</h2>
                    <textarea className={cn('area')} value={text} onChange={onChangeText}/>
                    <button className={cn('btn')} onClick={onSubmit}>
                        Отправить
                    </button>
                </>
                :
                <span className={cn('need')}>
                    <Link to={'/login'} className={cn('need-link')} state={{back: location.pathname}}>
                        Войдите
                    </Link>
                    <p>,чтобы иметь возможность комментировать</p>
                </span>
            }
        </div>
    )
}

export default memo(CommentAdd)