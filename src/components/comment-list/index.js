import { memo, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { useDispatch } from 'react-redux';
import useSelector from '../../hooks/use-selector';
import { useLocation, useNavigate } from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';
import { useParams } from 'react-router-dom';
import CommentCard from '../comment-card';
import CommentForm from '../comment-form';
import debounce from 'lodash.debounce';

function CommentList(props) {
  const { comments: initialComments, commentCount, t = text => text } = props;
  // Устанавливаем идентификатор текущего комментария
  const [authMessageCommentId, setAuthMessageCommentId] = useState(null);
  // Активна ли форма ответа
  const [isReplyActive, setIsReplyActive] = useState(false);
  // Передаем ID для ответа
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [newComment, setNewComment] = useState({
    parent: {
      _id: '',
      _type: '',
    },
    text: '',
  });
  const [comments, setComments] = useState(initialComments);

  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  
  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const isAuthenticated = select.exists;
  
  const parent = useMemo(
    () => ({
      _id: replyToCommentId || params.id,
      _type: replyToCommentId ? 'comment' : 'article',
    }),
    [replyToCommentId, params.id],
  );

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  const callbacks = {
    onChange: useCallback(
      debounce(
        e => {
        setNewComment({
          parent,
          text: e.target.value.trim().replace(/\s+/g, ' '),
        });
      }, 
      100),
      [setNewComment, replyToCommentId]
    ),

    handleAddComment: useCallback(
      async e => {
        e.preventDefault();
        
        if (!newComment.text) {
          setErrorMessage('Комментарий не может быть пустым.');
          return
        }
        try {
          const { data } = await dispatch(commentsActions.create(newComment));
          const updatedComments = addCommentToTree(comments, data);
          setComments(updatedComments);
          setErrorMessage('');
          setIsReplyActive(false);
          setReplyToCommentId(null);
        } catch (e) {
          setErrorMessage('Не удалось добавить комментарий. Попробуйте еще раз.');
        }
      }, [dispatch, newComment, params.id]
    )
  };

  const getMaxDepth = (comments) => {
    let max = 0;
    const traverse = (comments, depth) => {
      if (depth > max) {
        max = depth;
      }
      comments.forEach(comment => {
        if (comment.children && comment.children.length > 0) {
          traverse(comment.children, depth + 1);
        }
      });
    };
    traverse(comments, 0);
    return max;
  };

  let maxDepth = getMaxDepth(comments);
  // if (maxDepth > 5) maxDepth = 5;

  const handleLogin = () => {
    navigate('/login', { state: { back: location.pathname } });
  }

  // Функция для добавления нового комментария в дерево
    const addCommentToTree = (comments, newComment) => {
      // Если у нового комментария нет родителя, добавляем его на верхний уровень
      if (parent._type === "article") {
        return [...comments, newComment];
      }
      // Рекурсивная функция для поиска родителя и добавления нового комментария
      const findAndAdd = (comments) => {
        for (let comment of comments) {
          if (comment._id === parent._id) {
            // Если нашли родителя, добавляем новый комментарий в его children
            if (!comment.children) {
              comment.children = [];
            }
            comment.children.push(newComment);
            return true;
          }
          // Если у текущего комментария есть дочерние элементы, продолжаем поиск
          if (comment.children && findAndAdd(comment.children)) {
            return true;
          }
        }
        return false;
      };

      const updatedComments = [...comments];
      findAndAdd(updatedComments);

      return updatedComments; 
    };

    const cn = bem('CommentList');

  return (
    <div className={cn()}>
      <p className={cn('title')}>Комментарии ({typeof commentCount === 'number' ? commentCount : 0})</p>
    
      {comments ? 
        comments.map(comment =>
          <div key={comment._id}>
            <CommentCard 
              key={comment._id} 
              comment={comment}
              isAuthenticated={isAuthenticated}
              handleAddComment={callbacks.handleAddComment}
              setAuthMessageCommentId={setAuthMessageCommentId}
              authMessageCommentId={authMessageCommentId}
              replyToCommentId={replyToCommentId}
              setReplyToCommentId={setReplyToCommentId}
              isReplyActive={isReplyActive}
              setIsReplyActive={setIsReplyActive}
              onChange={callbacks.onChange}
              depth={0}
              maxDepth={maxDepth}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
              handleLogin={handleLogin}
            />
          </div>
        ) : (
          <p>Комментарии недоступны</p>
        )
      }

      {isAuthenticated && 
      !isReplyActive && 
      (
        <CommentForm
          commentTitle="Новый комментарий"
          type="comment"
          setIsReplyActive={setIsReplyActive}
          setReplyToCommentId={setReplyToCommentId}
          onSubmit={callbacks.handleAddComment}
          onChange={callbacks.onChange}
          errorMessage={errorMessage}
        />
      )}

      {!isAuthenticated && !authMessageCommentId && (
        <div className={cn('authcaution')}>
          <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={handleLogin}>Войдите</span>, чтобы иметь возможность комментировать
        </div>
      )}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    dateCreate: PropTypes.string,
    author: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    children: PropTypes.array,
    parent: PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      _type: PropTypes.string
    }),
  }).isRequired,
  commentCount: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  t: PropTypes.func,
};

export default memo(CommentList);
