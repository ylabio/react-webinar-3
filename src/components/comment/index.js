import React,{memo,useEffect,useCallback,useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import CommentArea from '../comment-area';
import './style.css'
import Comments from '../comments';
import CommentsList from '../comments-list';

const Comment = ({item,createAnswerComment,load,isAuth,createFirstComment,lvl, currentName,loginNavigate}) => {
    const [replyId, setReplyId] = useState();
    const cn = bem('ArticleCard');
    
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
        
        buttons.forEach((n,i) => {
            n.addEventListener('click', () => {
                areas.forEach((item,index) => {
                    item.classList.remove(active);
                });
                for (let area of areas){
                    if (area?.dataset?.id == n?.dataset?.id){
                        area.classList.add(active,'CommentArea--margin');
                        document.querySelector('.Main').style.display = "none";
                        area.scrollIntoView({
                            block:"end",
                            behavior:"smooth"
                        })
                    }
                }
            })
        })
        
    })

    let render = {
        item: useCallback(i => (
            <Comment 
            currentName={currentName}
            item={i} 
            isAuth={isAuth} 
            load={load} 
            lvl={lvl+1}
            createAnswerComment={createAnswerComment} 
            createFirstComment={createFirstComment}/>
        ),)
    }


    let margin = lvl >= 10 ? 10 : lvl == 1 ? 0 : lvl * 15;
    

    return (
        <>
        {item.text != undefined && item.text.trim() !== ''
        ?
        <>
            <div className={cn('comments-item')} style={{marginLeft:`${margin}px`}}>
            <div className={cn(`comments-item-top`)}>
                <div className={cn(`comments-item-name ${currentName == item?.author?.profile?.name || item?.author?.profile?.name == undefined ? 'currentName' : ''}`)}>{item?.author?.profile?.name ? item?.author?.profile.name : currentName}</div>
                <div className={cn(`comments-item-date`)}>{formatter.format(new Date(item.dateCreate))}</div>
            </div>
            <div className={cn(`comments-item-bottom`)}>
                <div className={cn(`comments-item-text`)}>{item.text}</div>
                <button className={cn(`comments-item-btn`)} data-id={item?._id} onClick={(e) => setReplyId(e.target.dataset.id)}>Ответить</button>
            </div>
            </div>
            <CommentsList list={item.children} render={render.item}/>
            <CommentArea loginNavigate={loginNavigate} margin={margin} parent={item._id} title='Новый ответ' cancel={true} createAnswerComment={createAnswerComment} createFirstComment={createFirstComment} itemId={replyId} load={load} isAuth={isAuth} lvl={lvl}/>
        </>
        :
        ''
        }
        </>
        
        
    );
};

export default memo(Comment);