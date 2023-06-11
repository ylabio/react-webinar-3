import React, { useCallback, memo, useLayoutEffect, useState, useRef } from 'react'
import Comment from '../../components/comment'
import CommentsLayout from '../../components/comments-layout'
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router-dom';
import useInit from '../../hooks/use-init';
import shallowequal from "shallowequal";
import Spinner from '../../components/spinner';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import CommentsFormContainer from '../comments-form-container';

function Comments() {
  const dispatch = useDispatch();
  const params = useParams();
  const {t} = useTranslate();

  const formRef = useRef();

  const [replyForm, setReplyForm] = useState({
    isOpen: false,
    commentKey: null,
    isReply: true,
    replyObj: null
  }); 

  useInit(() => {
    dispatch(commentsActions.load(params.id));
  }, [params.id]);

  const selector = useSelector(state => ({
    currentUserId: state.session.user._id
  }))

  const select = useSelectorRedux(state => ({
    commentsData: state.comments.data,
    isLoading: state.comments.waiting
  }), shallowequal);

  const callbacks = {
    onReplyClick: useCallback((treeId, commentId, commentKey) => {
      setReplyForm({
        isOpen: true,
        commentKey,
        isReply: true,
        replyObj: {
          _id: 'reply-form',
          commentId,
          parent: {
            _id: treeId, 
            _type: 'comment'
          }
        }
      })
    }, [replyForm]),

    onCancel: useCallback(() => {
      setReplyForm({
        isOpen: false,
        commentKey: null,
        isReply: true,
        replyObj: null
      })
    }, [replyForm]),

    renderComments: useCallback(() => {
      if (select.commentsData?.items) {
        const newList = replyForm.replyObj ? [...select.commentsData.items, replyForm.replyObj] : select.commentsData.items;

        return treeToList(listToTree(newList, '_id', 'article'), (item, level) => {

          const isMyComment = selector.currentUserId == item.author?._id;
          
          // много пропсов конечно.....

            if (item._id == 'reply-form') {
              return <CommentsFormContainer formRefer={formRef} key={`${item._id}${level}`} level={level} onCancel={callbacks.onCancel} isReply={replyForm.isReply} id={replyForm.replyObj.parent._id}/>
            }

            return <Comment 
              replyForm={replyForm} 
              id={item._id}
              commentKey={`${item._id}${level}`} 
              key={`${item._id}${level}`} 
              text={item.text} 
              author={item.author} 
              date={item.dateCreate} 
              level={level} 
              isMyComment={isMyComment} 
              t={t} 
              onReplyClick={callbacks.onReplyClick}
              onCancel={callbacks.onCancel} 
          />
          
          }
        )
      }
    }, [select, t, replyForm]),
  }

  useLayoutEffect(() => {
    formRef.current?.focus();
  }, [replyForm])

  return (
    <>
      <Spinner active={select.isLoading}>
        <CommentsLayout t={t} count={select.commentsData?.count} isReply={replyForm.isOpen}>
          {callbacks.renderComments()}
        </CommentsLayout>
      </Spinner>
    </>
  )
}

export default memo(Comments)