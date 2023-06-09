import {memo, useCallback, useMemo, useState} from "react";
import SideLayout from "../../components/side-layout";
import PropTypes from "prop-types";
import useInit from "../../hooks/use-init";
import {useDispatch} from "react-redux";
import commentsActions from '../../store-redux/comments/actions'
import commentsActionAdd from '../../store-redux/commentAdd/actions'
import {useSelector as useSelectorRedux} from "react-redux/es/hooks/useSelector";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import CommentListCard from "../../components/comment-list-card";
import useSelector from "../../hooks/use-selector";
import {useLocation, useNavigate} from "react-router-dom";
import CommentSessionNotExists from "../../components/comment-session-not-exists";
import CommentAnswerButton from "../../components/comment-answer-button";
import CommentForm from "../../components/comment-form";


function CommentList({articleId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [commentParent, setCommentParent] = useState(null);
  const [formResetKey, setFormResetKey] = useState(0);

  useInit(() => {
    dispatch(commentsActions.loadCommentList(articleId));

  }, [articleId])

  const selectFromRedux = useSelectorRedux(state => ({
    commentList: state.comments.data,
    commentsListLoadError: state.comments.error,
    commentAddIsWaiting: state.commentAdd.waiting
  }))

  const selectFromStore = useSelector(state => ({
    sessionExists: state.session.exists
  }))

  const commentViewList = useMemo(() => {
    if (selectFromRedux.commentList) {
      const prepareData = selectFromRedux.commentList.items.map(item => {
        if (item.parent._type === 'article') {
          return {...item, parent: null}
        }
        return item;
      })

      if (commentParent !== null) {
        prepareData.push({
          _id: 'form',
          parent: {_type: 'commentForm', _id: commentParent}
        })
      }

      const tree = listToTree(prepareData);


      const list = treeToList(tree, (item, level) => {
        if (item._id === 'form') {
          return {...item, level};
        }

        return ({
          _id: item._id,
          level,
          dateCreate: item.dateCreate,
          authorName: item.author.profile.name,
          text: item.text
        })
      });

      return list;
    }

    return null;
  }, [selectFromRedux.commentList, commentParent])

  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    onSetCommentParent: useCallback((commentId) => {
      setCommentParent(commentId);
      setFormResetKey(prev => prev + 1);

    }, []),

    onCancel: useCallback(() => {
      setCommentParent(null);
      setFormResetKey(prev => prev + 1);
    }, []),

    onAddSubCommitSubmit: useCallback((text) => {
      dispatch(commentsActionAdd.commentAdd(commentParent, 'comment', text, () => {
        dispatch(commentsActions.loadCommentList(articleId));
        setCommentParent(null);
        setFormResetKey(prev => prev + 1);
      }))
    }, [commentParent, dispatch]),

    onAddCommitSubmit: useCallback((text) => {

      dispatch(commentsActionAdd.commentAdd(articleId, 'article', text, () => {
        dispatch(commentsActions.loadCommentList(articleId));
        setCommentParent(null);
        setFormResetKey(prev => prev + 1);
      }))
    }, [commentParent, dispatch])
  }


  const renders = {

    commentChildRender: useCallback((commentId, formHide = false) => {

      if (commentId === commentParent && !selectFromStore.sessionExists && !formHide) {
        return (
          <CommentSessionNotExists
            onSignIn={callbacks.onSignIn}
            onCancel={callbacks.onCancel}
            isShowCancelBtn={true}
            scrollIntoView={true}
            key={formResetKey}

          />
        )
      }

      if (commentId === commentParent && selectFromStore.sessionExists && !formHide) {
        return (
          <CommentForm
            title={'Новый ответ '}
            isShowCancelBtn={true}
            onCancel={callbacks.onCancel}
            onSubmit={callbacks.onAddSubCommitSubmit}
            key={formResetKey}
            isWaiting={selectFromRedux.commentAddIsWaiting}
            scrollIntoView={true}
          />
        )
      }

      return <CommentAnswerButton onClick={() => {
        callbacks.onSetCommentParent(commentId)
      }
      }/>


    }, [commentParent, setCommentParent, formResetKey, selectFromStore.sessionExists, selectFromRedux.commentAddIsWaiting]),

    commentArticleRender: useCallback(() => {
      if (commentParent === null && !selectFromStore.sessionExists) {
        return (
          <CommentSessionNotExists
            onSignIn={callbacks.onSignIn}
            onCancel={callbacks.onCancel}
            isShowCancelBtn={false}
            scrollIntoView={false}
            key={formResetKey}

          />
        )
      }

      return commentParent === null ? (
        <CommentForm
          title={'Новый комментарий'}
          isShowCancelBtn={false}
          onSubmit={callbacks.onAddCommitSubmit}
          key={formResetKey}
          isWaiting={selectFromRedux.commentAddIsWaiting}
          scrollIntoView={false}
        />
      ) : null
    }, [commentParent, formResetKey, selectFromStore.sessionExists, selectFromRedux.commentAddIsWaiting])
  };


  return (
    <>
      {commentViewList &&
        <CommentListCard
          commentList={commentViewList}
          commentChildRender={renders.commentChildRender}
          commentArticleRender={renders.commentArticleRender}
        />}
    </>
  )
}

CommentList.propTypes = {
  articleId: PropTypes.string.isRequired,
}

export default memo(CommentList);
