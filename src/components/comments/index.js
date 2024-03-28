import React,{memo, useEffect,useState,useCallback} from 'react';
import {cn as bem} from '@bem-react/classname';
import { Link } from 'react-router-dom';
import './style.css'
import CommentArea from '../comment-area';
import Comment from '../comment';
import listToTree from '../../utils/list-to-tree';
import CommentsList from '../comments-list';

const Comments = ({count, isAuth, list, createFirstComment, createAnswerComment, load, currentName,loginNavigate}) => {
    
    
    
    const cn = bem('ArticleCard');

    let render= {
        item: useCallback(i => (
            <Comment 
            currentName={currentName}
            item={i} 
            isAuth={isAuth} 
            load={load} 
            lvl={1}
            createAnswerComment={createAnswerComment} 
            createFirstComment={createFirstComment}
            loginNavigate={loginNavigate}/>
        ),)
    }


    return (
        <div className={cn('comments')}>
            <div className={cn('comments-count')}>Комментарии ({count})</div>
            {list && list.length !== 0 &&
            <CommentsList list={list} render={render.item}/>
            }
            <CommentArea loginNavigate={loginNavigate} mainClass={'Main'} parent={1} title='Новый комментарий' createFirstComment={createFirstComment} load={load} isAuth={isAuth}/>
        </div>
    );
};

export default memo(Comments);