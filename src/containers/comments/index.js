import React, { useCallback, useMemo, useState } from 'react'
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
import CommentsLayout from '../../components/comments-layout';

function Comments() {

    const dispatch = useDispatch();
    const {id} = useParams();
    const [currCommentReplied,setCurrCommentReplied] = useState();
    const [whereToPutMiniForm,setWhereToPutMiniForm] = useState();
    const [miniCommentText,setminiCommentText] = useState("");
    const [footerCommentText,setFooterCommentText] = useState("");

    const reduxSelect = useReduxSelector(state => ({
      comments: state.comments.data,
      waiting : state.comments.waiting,
      commentsCount : state.comments.count,
    }), shallowEqual);

    const select = useSelector(state => ({
        exists: state.session.exists,
        profile_id : state.session.user._id
      }));

    const list = useMemo(() => (
        reduxSelect.comments.length ?
        treeToList(listToTree(reduxSelect.comments)[0].children, (item, level) => (
          {...item,level:level}
        )) : []
    ), [reduxSelect.comments])

    const callbacks = {
        onClick : useCallback((item,currIndex) => {
            setCurrCommentReplied(item)
            if(item.parent._type === "article" && !item.children.length){
                setWhereToPutMiniForm(item._id)
            }
            else{
                let newItemIndex = currIndex + 1
                for(let i =currIndex + 1 ; i < list.length;i++){
                    if( list[i].level <= item.level){
                        newItemIndex = i
                        break;
                    }
                    else if(i === list.length - 1){
                        newItemIndex = list.length
                    }
                }
                setWhereToPutMiniForm(list[newItemIndex -1 ]._id)
            }
        },[list]),
        addComment : useCallback((body) => {
            dispatch(commentsActions.addComment(body))
            setminiCommentText()
        },[]),
        onClose : useCallback(() => {
            setWhereToPutMiniForm()
            setminiCommentText()
        },[]),
        changeFooterText : useCallback((value) => {
            setFooterCommentText(value)
        },[]),
        
    }
    
    const renders = {
        item: useCallback((item,index) => (
            <CommentCard item = {item} onClick ={callbacks.onClick} currIndex ={index} isOwnComment = {select.profile_id === item.author._id}/>
        ), [reduxSelect.comments]),
        miniForm : useCallback(item => 
                <CommentMiniForm 
                onChange={setminiCommentText} 
                value={miniCommentText} 
                addComment = {callbacks.addComment}
                item = {currCommentReplied}
                onClose = {callbacks.onClose}
                isLogin = {select.exists}
                />
        ,[reduxSelect.comments,select.exists,currCommentReplied])

      };

        return (
            <Spinner active ={reduxSelect.waiting}>  
                <CommentsLayout
                commentsCount ={reduxSelect.commentsCount} 
                >
                <CommentsList 
                list = {list}
                defRender = {renders.item}
                conditonRender = {renders.miniForm}
                searchWhereFormToPut = {whereToPutMiniForm}
                />
                {!whereToPutMiniForm &&
                <CommentFooterForm value={footerCommentText} 
                                    articleId ={id}
                                    onClick = {callbacks.onClose}
                                    onChange={setFooterCommentText} 
                                    onSubmit={callbacks.addComment} 
                                    isLogin ={select.exists}
                />
                }
                </CommentsLayout>   
            </Spinner>
        )
}

export default Comments

