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
    console.log(articleId);
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

      const tree = listToTree(prepareData);

      return treeToList(tree, (item, level) => ({
        _id: item._id,
        level,
        dateCreate: item.dateCreate,
        authorName: item.author.profile.name,
        text: item.text
      }));
    }

    return null;
  }, [selectFromRedux.commentList, commentParent])

  const callbacks = {
    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),

    onSetCommentParent: useCallback((commentId) => {
      setCommentParent(commentId);
    }, []),

    onCancel: useCallback(() => {
      setCommentParent(null);
    }, []),

    onAddSubCommitSubmit: useCallback((text) => {
      // console.log('onAddCommitSubmit', text);
      dispatch(commentsActionAdd.commentAdd(commentParent, 'comment', text, () => {
        dispatch(commentsActions.loadCommentList(articleId));
        setCommentParent(null);
        setFormResetKey(prev => prev + 1);
      }))
    }, [commentParent, dispatch]),

    onAddCommitSubmit: useCallback((text) => {
      // console.log('onAddSubCommitSubmit', commentParent, text);

      dispatch(commentsActionAdd.commentAdd(articleId, 'article', text, () => {
        dispatch(commentsActions.loadCommentList(articleId));
        setCommentParent(null);
        setFormResetKey(prev => prev + 1);
      }))
    }, [commentParent, dispatch])
  }


  const renders = {

    commentChildRender: useCallback(commentId => {

      if (commentId === commentParent && !selectFromStore.sessionExists) {
        return (
          <CommentSessionNotExists
            onSignIn={callbacks.onSignIn}
            onCancel={callbacks.onCancel}
            isShowCancelBtn={true}
          />
        )
      }

      if (commentId === commentParent && selectFromStore.sessionExists) {
        return (
          <CommentForm
            title={'Новый ответ '}
            isShowCancelBtn={true}
            onCancel={callbacks.onCancel}
            onSubmit={callbacks.onAddSubCommitSubmit}
            key={formResetKey}
            isWaiting={selectFromRedux.commentAddIsWaiting}
          />
        )
      }

      return <CommentAnswerButton onClick={() => {
        callbacks.onSetCommentParent(commentId)
      }
      }>ответить</CommentAnswerButton>


    }, [commentParent, setCommentParent, formResetKey, selectFromStore.sessionExists, selectFromRedux.commentAddIsWaiting]),

    commentArticleRender: useCallback(() => {
      if (commentParent === null && !selectFromStore.sessionExists) {
        return (
          <CommentSessionNotExists
            onSignIn={callbacks.onSignIn}
            onCancel={callbacks.onCancel}
            isShowCancelBtn={false}

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
