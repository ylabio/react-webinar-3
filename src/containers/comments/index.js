import {memo, useCallback, useState, useRef} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import useInit from '../../hooks/use-init';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import Spinner from '../../components/spinner';
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import commentsActions from '../../store-redux/comments/actions';
import NewCommentForm from '../../components/new-comment-form';
import CommentsList from '../../components/comments-list';
import Comment from '../../components/comment';
import shallowequal from 'shallowequal';
import {useSelectorTranslate} from '../../hooks/use-selector-translate';

function Comments({articleId}) {

  const {t} = useTranslate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const replyFormRef = useRef(null);

  const [currentCommentId, setCurrentCommentId] = useState(articleId);
  const [commentText, setCommentText] = useState('');
  const [idAndSpaceForForm, setIdAndSpaceForForm] = useState({space: 0, id: ''});

  const select = useSelectorRedux(state => ({
    comments: state.comments.comments,
    countComments: state.comments.count,
    waitingComments: state.comments.waiting,
  }), shallowequal);

  const selectTranslate = useSelectorTranslate(state => ({
    language: state.translate.language
  }));

  const selectStore = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  useInit(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId, selectTranslate.language]);

  const renders = {
    comment: useCallback(comment => (
      <Comment comment={comment} t={t} exists={selectStore.exists} user={selectStore.user}/>
    ), [t]),
  };

  const maxCommentLevel = 20;
  const commentMargin = 30;
  const list = {
    comments: [
      ...treeToList(listToTree(select.comments), (item, level) => (
        {...item, space: level <= maxCommentLevel ? (commentMargin*(level - 1)) : commentMargin*maxCommentLevel}
      ))
    ],
  }
  list.comments.shift();

  const callbacks = {
    onChange: useCallback((e) => {
      e.preventDefault();
      setCommentText(e.target.value);
    }, [commentText]),

    onSubmit: useCallback((parentType) => (e) => {
      e.preventDefault();
      if (!commentText.trim()) {
        return;
      }
      dispatch(commentsActions.createNewComment(currentCommentId, parentType, commentText, selectStore.user.profile.name));
      setCommentText('');
      setIdAndSpaceForForm({space: idAndSpaceForForm.space, id: articleId});
      setCurrentCommentId(articleId);
    }, [commentText, currentCommentId]),

    onAnswer: useCallback((comment, lastComment) => {
      setTimeout(() => {
        if (replyFormRef.current) {
          replyFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      setCurrentCommentId(comment._id);
      setIdAndSpaceForForm({ space: lastComment.depth, id: lastComment.id })
    }, []),

    onCancel: useCallback((e) => {
      e.preventDefault();
      setIdAndSpaceForForm({space: idAndSpaceForForm.space, id: articleId});
      setCurrentCommentId(articleId);
    }, []),

    onSignIn: useCallback(() => {
      navigate('/login', {state: {back: location.pathname}});
    }, [location.pathname]),
  }

  return (
    <Spinner active={select.waitingComments}>
      <CommentsList
        t={t}
        articleId={articleId}
        onAnswer={callbacks.onAnswer}
        comments={list.comments}
        renderComment={renders.comment}
        countComments={select.countComments}
        idAndSpaceForForm={idAndSpaceForForm}
      >
        <div ref={replyFormRef}>
          <NewCommentForm
            space={idAndSpaceForForm.space}
            t={t}
            exists={selectStore.exists}
            title={t('createComment.newAnswer')}
            onSignIn={callbacks.onSignIn}
            onSubmit={callbacks.onSubmit('comment')}
            onChange={callbacks.onChange}
            onCancel={callbacks.onCancel}
            commentText={commentText}
            isComment={true}
          />
        </div>
      </CommentsList>
      {articleId === currentCommentId &&
        <NewCommentForm
          space={idAndSpaceForForm.space}
          t={t}
          exists={selectStore.exists}
          title={t('createComment.newComment')}
          onSignIn={callbacks.onSignIn}
          onSubmit={callbacks.onSubmit('article')}
          onChange={callbacks.onChange}
          onCancel={callbacks.onCancel}
          commentText={commentText}
          isComment={false}
        />
      }
    </Spinner>
  );
}

export default memo(Comments);
