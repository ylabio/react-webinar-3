import {useCallback, memo} from 'react'
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import shallowequal from 'shallowequal';
import commentsActions from '../../store-redux/comments/actions';
import CommentsList from '../../components/comments-list';
import AddComment from '../../components/add-comment';
import Spinner from '../../components/spinner';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import { useLocation, useNavigate } from 'react-router-dom';
import CommentsLayout from '../../components/comments-layout';
import Comment from '../../components/comment'
import PropTypes from 'prop-types';

const Comments = ({articleId}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector(state => state.session.exists)

  const {comments, waitingComments, selectedComment} = useSelectorRedux(state => ({
    comments: state.comments.data,
    waitingComments: state.comments.waiting,
    selectedComment: state.comments.selectedComment
  }), shallowequal);

  const callbacks = {
    selectComment: useCallback(_id => dispatch(commentsActions.selectComment(_id)), [dispatch]),
    unselectComment: () => dispatch(commentsActions.unselectComment()),
    addComment: useCallback(text => dispatch(commentsActions.addComment({
      text,
      parent: {
        _id: articleId,
        _type: "article",
      }
    })), [dispatch]),
    replyToComment: useCallback((text, _id) => dispatch(commentsActions.addComment({
      text,
      parent: {
        _id,
        _type: "comment",
      }
    })), [dispatch]),
    noAuthNavigate: useCallback(() => {navigate('/login', {state: {back: location.pathname}})},[])
  }

  const renders = {
    comment: useCallback(
      (comment) => (
        <Comment
          commentData={comment}
          commentToReplyId={selectedComment}
          handleOpenReply={callbacks.selectComment}
          unselectComment={callbacks.unselectComment}
          replyToComment={callbacks.replyToComment}
          isLoggedIn={isLoggedIn}
          noAuthNavigate={callbacks.noAuthNavigate}
        />
      ),
      [selectedComment, isLoggedIn, callbacks]
    ),
  };

  useInit(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId]);

  return (
  <Spinner active={waitingComments}>
    <CommentsLayout>
      <CommentsList comments={comments} renderComment={renders.comment} />
      {isLoggedIn && selectedComment === null && (
        <AddComment
          isLoggedIn={isLoggedIn}
          submitAction={callbacks.addComment}
          label={'Новый комментарий'}
        />
      )}
    </CommentsLayout>
  </Spinner>
)
}

Comments.propTypes = {
  articleId: PropTypes.string.isRequired,
};

export default memo(Comments)