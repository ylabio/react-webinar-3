import React,{memo,useEffect, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css';

const CommentArea = ({title,cancel,createFirstComment,createAnswerComment, itemId,load,isAuth}) => {
    const [area,setArea] = useState('');
    const cn = bem('CommentArea');
    
    useEffect(() => {
        const buttons = document.querySelectorAll('.CommentArea-cancel-btn');
        const areas = document.querySelectorAll('.CommentArea');
        const active = 'CommentArea--active';
        
        buttons.forEach((n,i) => {
            n.addEventListener('click', () => {
                areas[i].classList.remove(active);
            })
        })
    })
    
    function onSend(e){
        if (itemId && area.length != 0){
            const currentArea = document.querySelector('.CommentArea--active');
            currentArea.classList.remove('CommentArea--active');
            createAnswerComment(itemId,area,'comment');
            setArea('');
            load()
        }

        else if (area.length != 0){
            createFirstComment(area,'article');
            setArea('');
            load()
        }

        load()
    }

    return (
        <div className={cn()}>
            {isAuth
            ?
            <>
                <div className={cn('title')}>{title}</div>
                <textarea className={cn('area')} onChange={e => setArea(e.target.value)} value={area}/>
                <button className={cn('send-btn')} onClick={e => onSend(e)}>Отправить</button>
                {cancel
                ?
                <button className={cn('cancel-btn')}>Отмена</button>
                :
                ''
                }
            </>
            :
            
            <div className={cn('not-logged-in')}><Link to={'/login'}>Войдите</Link>, чтобы иметь возможность комментировать <span className={cn('cancel-btn')}>{cancel ? 'Отмена':''}</span></div>
            
            }
            
        </div>
    );
};

export default memo(CommentArea);