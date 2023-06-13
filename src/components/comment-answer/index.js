import React, { useState, memo, useEffect, useRef } from "react";
import './style.css'
import { cn as bem } from "@bem-react/classname";
import { Link, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

function CommentAnswer({isAuth, addComment, id, onCancel, place}) {

    const cn = bem('CommentAnswer');
    const [text, setText] = useState('')
    const location = useLocation()
    
    const onChangeText = (e) => {
        const value = e.target.value;
        setText(value)
    }

     useEffect(()=>{
        console.log(place)
      }, [])


    const onSubmit = () => {
        const str = text.trim()
        if(str !== '') {
            addComment(str, id, 'comment')
        }
        setText('')
        onCancel()
    }

    return (
        <div className={cn()}>
            {
                isAuth
                 ?
                <div>
                    <h2 className={cn('header')}>Новый ответ</h2>
                    <textarea className={cn('area')} value={text} onChange={onChangeText}/>
                    <div className={cn('buttons')}>
                        <button className={cn('btn')} onClick={onSubmit}>
                            Отправить
                        </button>
                        <button className={cn('btn')} onClick={onCancel}>
                            Отмена
                        </button>
                    </div>
                </div>
                :
                <span className={cn('need')}>
                    <Link to={'/login'} className={cn('need-link')} state={{back: location.pathname}}>
                        Войдите
                    </Link>
                    <p>,чтобы иметь возможность комментировать.</p>
                    <button className={cn('cancel-btn')} onClick={onCancel}>
                        Отмена
                    </button>
                </span>
            }
        </div>
    )
}

CommentAnswer.propTypes = {
    isAuth: PropTypes.bool,
    addComment: PropTypes.func,
    onCancel: PropTypes.func,
  };
  
  CommentAnswer.defaultProps = {
    isAuth: false,
    addComment: () => {},
  }

export default memo(CommentAnswer)