import React, { useCallback, memo, useEffect, useState } from 'react'
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

function Comments() {
  const dispatch = useDispatch();
  const params = useParams();
  const {t} = useTranslate();

  const [replyForm, setReplyForm] = useState({
    isOpen: false,
    commentId: null
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
    onReplyClick: useCallback((commentId) => {
      setReplyForm({
        isOpen: true,
        commentId
      })
    }, [replyForm]),

    onCancel: useCallback(() => {
      setReplyForm({
        isOpen: false,
        commentId: null
      })
    }, [replyForm]),

    renderComments: useCallback(() => {
      if (select.commentsData?.items) {
        return treeToList(listToTree(select.commentsData.items), (item, level) => {
          const isMyComment = selector.currentUserId == item.author._id;

          // много пропсов конечно.....
          return <Comment 
            replyForm={replyForm} 
            commentId={`${item._id}${level}`} 
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
      })
      }
    }, [select, t, replyForm]),
  }

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