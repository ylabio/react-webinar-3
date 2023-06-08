import {memo, useCallback, useMemo, useState} from "react";
import SideLayout from "../../components/side-layout";
import PropTypes from "prop-types";
import useInit from "../../hooks/use-init";
import {useDispatch} from "react-redux";
import commentsActions from '../../store-redux/comments/actions'
import {useSelector as useSelectorRedux} from "react-redux/es/hooks/useSelector";
import listToTree from "../../utils/list-to-tree";
import treeToList from "../../utils/tree-to-list";
import List from "../../components/list";
import CommentListCard from "../../components/comment-list-card";
import useSelector from "../../hooks/use-selector";
import {useNavigate} from "react-router-dom";
import commentSessionNotExists from "../../components/comment-session-not-exists";
import CommentSessionNotExists from "../../components/comment-session-not-exists";
import CommentAnswerButton from "../../components/comment-answer-button";
import CommentForm from "../../components/comment-form";


function CommentList({articleId}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [commentParent, setCommentParent] = useState(null);

  useInit(() => {
    console.log(articleId);
    dispatch(commentsActions.loadCommentList(articleId));

  }, [articleId])

  const selectFromRedux = useSelectorRedux(state => ({
    commentList: state.comments.data,
    commentsListLoadError: state.comments.error
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
  }, [selectFromRedux.commentList])

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

    onAddCommitSubmit: useCallback((text) => {
      console.log('onAddCommitSubmit', text);
    }, []),

    onAddSubCommitSubmit: useCallback((text) => {
      console.log('onAddSubCommitSubmit', commentParent, text);
    }, [commentParent])
  }


  const renders = {

    commentChildRender: useCallback(commentId => {

      if (commentId === commentParent && !selectFromStore.sessionExists) {
        return (
          <CommentSessionNotExists
            onSignIn={callbacks.onSignIn}
            onCancel={callbacks.onCancel}
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
          />
        )
      }

      return <CommentAnswerButton onClick={() => {
        callbacks.onSetCommentParent(commentId)
      }
      }>ответить</CommentAnswerButton>


    }, [commentParent, setCommentParent]),

    commentArticleRender: useCallback(() => {
      return commentParent === null ? (
        <CommentForm
          title={'Новый комментарий'}
          isShowCancelBtn={false}
          onSubmit={callbacks.onAddCommitSubmit}
        />
      ) : null
    }, [commentParent])
  };


  return (
    <SideLayout>

      {/*<pre>{JSON.stringify(select.commentsListLoadError, null, 2)}</pre>*/}
      {/*<pre>{JSON.stringify(currentCommentList, null, 2)}</pre>*/}
      {commentViewList &&
        <CommentListCard
          commentList={commentViewList}
          commentChildRender={renders.commentChildRender}
          commentArticleRender={renders.commentArticleRender}
        />}
    </SideLayout>
  )
}

CommentList.propTypes = {
  articleId: PropTypes.string.isRequired,
}

export default memo(CommentList);
