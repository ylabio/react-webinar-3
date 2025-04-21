import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import listToTree from '../../utils/list-to-tree';
import './style.css';
import CommentContainer from '../comment-container';
import CommentForm from '../comment-form';
import useSelector from '../../hooks/use-selector';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import commentsActions from '../../store-redux/comments/actions';

function LinkToLogin() {
  const location = useLocation();
  return (
    <span className="loginToAllowComment">
      <Link to={`/login`} state={{ back: location.pathname }}>
        Войдите
      </Link>
      , чтобы иметь возможность комментировать
    </span>
  );
}

function CommentsWrapper(props) {
  const formRef = useRef(null);
  const isLogin = useSelector(state => state.session.exists);
  const [commentIdFormVisible, setCommentIdFormVisible] = useState('');
  const { comments, _id, _type, t } = props;
  const formattedComments = useMemo(
    () => listToTree(comments.items, '_id', 'article'),
    [props.comments],
  );
  const error = useSelector(state => state.comments?.error);
  const userId = useSelector(state => state.session.user._id);

  const dispatch = useDispatch();
 

  const createComment = useCallback(async (event, { _type, _id, text }) => {
    event.preventDefault();
  
    if (!text.trim()) {
      alert('Комментарий не может быть пустым');
      return;
    }
  
    const res = await dispatch(commentsActions.createComment({ _type, _id, text }));
  
    if (res) {
      setCommentIdFormVisible('');
    }
  }, [dispatch, setCommentIdFormVisible]);

  useEffect(() => {
    if (!isLogin) {
      setCommentIdFormVisible('');
    }
  }, [isLogin]);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [commentIdFormVisible]);

  const cn = bem('CommentsWrapper');
  return (
    <div className={cn()} key={comments.items.length}>
      <span className={cn('header')}>{`${t(`product.comments`)}: (${comments.count})`}</span>
      <div className={cn('container')}>
        {formattedComments[0]?.children.map(comment => {
          return (
            <CommentContainer
              key={comment._id}
              isLogin={isLogin}
              LinkToLogin={LinkToLogin}
              setCommentIdFormVisible={setCommentIdFormVisible}
              commentIdFormVisible={commentIdFormVisible}
              comment={comment}
              userId={userId}
              error={error}
              formRef={formRef}
              createComment={createComment}
            />
          );
        })}
      </div>

      {isLogin ? (
        commentIdFormVisible === '' && (
          <CommentForm
            error={error}
            _id={_id}
            _type={_type}
            setCommentIdFormVisible={setCommentIdFormVisible}
            createComment={createComment}
          />
        )
      ) : (
        <LinkToLogin></LinkToLogin>
      )}
    </div>
  );
}

CommentsWrapper.propTypes = {
  comments: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object),
    count: PropTypes.number,
  }),
  _id: PropTypes.string,
  _type: PropTypes.string,
};

export default memo(CommentsWrapper);
