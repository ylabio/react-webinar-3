import React, { useCallback, useMemo, useState } from 'react'
import "./style.css"
import CommentCard from '../../components/comment-card';
import { useDispatch, useSelector as useReduxSelector } from 'react-redux';
import shallowEqual from 'shallowequal';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentMiniForm from '../../components/comment-mini-form';
import CommentFooterForm from '../../components/comment-footer-form';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router-dom';
import CommentsList from '../../components/comments-list';
import Spinner from '../../components/spinner';
import useSelector from '../../hooks/use-selector';

function Comments() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const [miniAnswerId,setMiniAnswerId] = useState();
    const [miniCommentText,setminiCommentText] = useState("");
    const [footerCommentText,setFooterCommentText] = useState("");

    const reduxSelect = useReduxSelector(state => ({
      comments: state.comments.data,
      waiting : state.comments.waiting,
      commentsCount : state.comments.count,
    }), shallowEqual);

    const select = useSelector(state => ({
        exists: state.session.exists,
      }));

    const list = useMemo(() => (
        reduxSelect.comments.length ?
        treeToList(listToTree(reduxSelect.comments)[0].children, (item, level) => (
          {...item,level:level}
        )) : []
    ), [reduxSelect.comments])

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
        ), [reduxSelect.comments]),
        miniForm : useCallback(item => 
                <CommentMiniForm style = {{paddingLeft : item.level*30}} 
                onChange={setminiCommentText} 
                value={miniCommentText} 
                addComment = {callbacks.addComment}
                item = {item}
                onClose = {callbacks.onClose}
                isLogin = {select.exists}
                />
        ,[reduxSelect.comments,select.exists])

      };

        return (
            <Spinner active ={reduxSelect.waiting}>      
                <div className="Comments">
                <h2>
                Комментарии ({reduxSelect.commentsCount})
                </h2>
                <CommentsList 
                list = {list}
                defRender = {renders.item}
                conditonRender = {renders.miniForm}
                searchId = {miniAnswerId}
                />
                {

                    <CommentFooterForm value={footerCommentText} 
                                        articleId ={id}
                                        onClick = {callbacks.onClose}
                                        onChange={setFooterCommentText} 
                                        onSubmit={callbacks.addComment} 
                                        isLogin ={select.exists}
                    />
                }
                </div>
            </Spinner>
        )
}

export default Comments

