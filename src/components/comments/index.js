import React,{memo, useEffect} from 'react';
import {cn as bem} from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css'
import CommentArea from '../comment-area';

const Comments = ({count, isAuth, list, createFirstComment, createAnswerComment, load}) => {

    let formatter = new Intl.DateTimeFormat("ru",{
        day:"numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
    
      });   
    
    useEffect(() => {
        const buttons = document.querySelectorAll('.ArticleCard-comments-item-btn');
        const areas = document.querySelectorAll('.CommentArea');
        const active = 'CommentArea--active';
        if (areas[areas.length -1]){
            areas[areas.length -1].classList.add(active);
        }
        
        buttons.forEach((n,i) => {
            
            n.addEventListener('click', () => {
                areas.forEach((item,index) => {
                    if (index != areas.length -1){
                     item.classList.remove(active)
                    } 
                });
                areas[i].classList.add(active);
            })
        })
    })
    const cn = bem('ArticleCard');

    return (
        <div className={cn('comments')}>
            <div className={cn('comments-count')}>Комментарии ({count})</div>
            <div className={cn('comments-list')}>
                    {
                    list.map(item => 
                        <div key={item.id} className={cn('comments-item')} style={{marginLeft:`${item.lvl == 1 ? 0 : item.lvl * 15}px`}}>
                        <div className={cn(`comments-item-top`)}>
                            <div className={cn(`comments-item-name`)}>{item.name}</div>
                            <div className={cn(`comments-item-date`)}>{formatter.format(item.date)}</div>
                        </div>
                        <div className={cn(`comments-item-bottom`)}>
                            <div className={cn(`comments-item-text`)}>{item.text}</div>
                            <button className={cn(`comments-item-btn`)}>Ответить</button>
                            <CommentArea title='Новый ответ' cancel={true} createAnswerComment={createAnswerComment} itemId={item.id} load={load} isAuth={isAuth}/>
                        </div>
                        </div>
                        )
                    }
                </div>
                <CommentArea title='Новый комментарий' createFirstComment={createFirstComment} load={load} isAuth={isAuth}/>
        </div>
    );
};

export default memo(Comments);