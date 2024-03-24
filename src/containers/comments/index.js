import React, { useCallback, useMemo, useState } from 'react'
import "./style.css"
import CommentCard from '../../components/comment-card';
import { useDispatch, useSelector } from 'react-redux';
import shallowEqual from 'shallowequal';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentMiniForm from '../../components/comment-mini-form';
import CommentFooterForm from '../../components/comment-footer-form';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router-dom';
import CommentsList from '../../components/comments-list';
import Spinner from '../../components/spinner';

function Comments() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const [miniAnswerId,setMiniAnswerId] = useState();
    const [miniCommentText,setminiCommentText] = useState("");
    const [footerCommentText,setFooterCommentText] = useState("");
    const select = useSelector(state => ({
      comments: state.comments.data,
      waiting : state.comments.waiting,
      commentsCount : state.comments.count,
    }), shallowEqual);

    const list = useMemo(() => (
        select.comments.length ?
        treeToList(listToTree(select.comments)[0].children, (item, level) => (
          {...item,level:level}
        )) : []
    ), [select.comments])

    const callbacks = {
        onClick : useCallback((id) => {
            setMiniAnswerId(id)
        },[]),
        addComment : useCallback((body) => {
            dispatch(commentsActions.addComment(body))
            setminiCommentText()
        },[]),
        onClose : useCallback(() => {
            setMiniAnswerId()
            setminiCommentText()
        },[]),
        changeFooterText : useCallback((value) => {
            setFooterCommentText(value)
        },[]),
        
    }

    const renders = {
        item: useCallback(item => (
            <CommentCard item = {item} onClick ={callbacks.onClick}/>
        ), [select.comments]),

        miniForm : useCallback(item => 
                <CommentMiniForm style = {{paddingLeft : item.level*30}} 
                onChange={setminiCommentText} 
                value={miniCommentText} 
                addComment = {callbacks.addComment}
                item = {item}
                onClose = {callbacks.onClose}/>
        ,[select.comments])

      };

        return (
            <Spinner active ={select.waiting}>      
                <div className="Comments">
                <h2>
                Комментарии ({select.commentsCount})
                </h2>
                <CommentsList 
                list = {list}
                defRender = {renders.item}
                conditonRender = {renders.miniForm}
                searchId = {miniAnswerId}
                />
                <CommentFooterForm value={footerCommentText} 
                                    articleId ={id}
                                    onClick = {callbacks.onClose}
                                    onChange={setFooterCommentText} 
                                    onSubmit={callbacks.addComment} 
                />
                </div>
            </Spinner>
        )
}

export default Comments

