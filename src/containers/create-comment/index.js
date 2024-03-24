import {memo, useCallback, useState} from 'react';
import useTranslate from '../../hooks/use-translate';
import useSelector from '../../hooks/use-selector';
import {useDispatch} from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';
import NewCommentForm from '../../components/new-comment-form';

function CreateComment(props) {

  const {t} = useTranslate();
  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState('');

  const select = useSelector(state => ({
    user: state.session.user,
    exists: state.session.exists,
  }));

  const callbacks = {
    onChange: useCallback((e) => {
      e.preventDefault();
      setCommentText(e.target.value);
    }, [commentText]),

    onSubmit: useCallback((e) => {
      e.preventDefault();
      if (!commentText.trim()) {
        return;
      }
      dispatch(commentsActions.createNewComment(props.currentCommentId, props.parentType, commentText, select.user.profile.name));
      setCommentText('');
      props.setCurrentCommentId(props.articleId);
    }, [commentText, props.currentCommentId]),

    onCancel: useCallback((e) => {
      e.preventDefault();
      props.setCurrentCommentId(props.articleId);
    }, []),
  }

  return (
    <NewCommentForm
      exists={select.exists}
      title={props.title}
      link='/login'
      onSubmit={callbacks.onSubmit}
      onChange={callbacks.onChange}
      onCancel={callbacks.onCancel}
      commentText={commentText}
      isComment={props.isComment}
    />
  );
}

export default memo(CreateComment);
