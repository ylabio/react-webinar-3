import { memo, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import Button from '../button';
import NewComment from '../new-comment';
import Comment from '../comment';
import commentsActions from '../../store-redux/comments/actions';
import useInit from '../../hooks/use-init';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ArticleCommentList({ articleId }) {
  const cn = bem('ArticleCommentList');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [activeForm, setActiveForm] = useState(null);

  // Получаем данные из хранилища
  const select = useSelector(state => ({
    exists: state.session.exists,
  }));

  const exists = select.exists;
  const buildCommentTree = (comments, articleId) => {
    // Создаем хеш-таблицу для всех комментариев
    const commentMap = {};

    // Сначала создаем все узлы с пустыми children
    comments.forEach(comment => {
      commentMap[comment._id] = { ...comment, children: [] };
    });

    // Собираем дерево комментариев
    const rootComments = [];

    comments.forEach(comment => {
      const parentId = comment.parent._id;

      if (parentId === articleId) {
        // Корневой комментарий
        rootComments.push(commentMap[comment._id]);
      } else if (commentMap[parentId]) {
        // Вложенный комментарий (любого уровня)
        commentMap[parentId].children.push(commentMap[comment._id]);
      }
    });

    return rootComments;
  };
  const rootComments = useSelectorRedux(state => {
    const items = state.comments.items[articleId] || [];
    return buildCommentTree(items, articleId);
  });
  console.log('rootComments',rootComments);

  const isLoading = useSelectorRedux(state => state.comments.loadingParents.includes(articleId));
  const commentsCount = useSelectorRedux(state => state.comments.counts[articleId] || 0);

  // Загрузка комментариев
  useInit(() => {
    dispatch(commentsActions.load(articleId));
  }, [articleId]);

  const callbacks = {
    // Переход к авторизации
    onSignIn: useCallback(() => {
      navigate('/login', { state: { back: location.pathname } });
    }, [location.pathname]),

    // Отправка комментария (добавляем тип родителя)
    onSubmit: async (parentId, parentType, text) => {
      try {
        await dispatch(commentsActions.add(parentId, parentType, text));
        setActiveForm(null);
      } catch (e) {
        console.error('Ошибка при отправке комментария:', e);
      }
    },

    // Открытие формы ответа
    onReply: useCallback((commentId) => setActiveForm(commentId), []),
  };

  return (
    <section className={cn()}>
      <h2 className={cn('caption')}>Комментарии ({commentsCount})</h2>

      {isLoading ? (
        <div>Загрузка комментариев...</div>
      ) : (
        <>
          {/* Список корневых комментариев */}
          {rootComments.map(comment => (
            <Comment
            key={comment._id}
            comment={comment}
            childComments={comment.children}
            onReply={exists ? () => callbacks.onReply(comment._id) : null}
            isFormOpen={activeForm === comment._id}
            onCancel={() => setActiveForm(null)}
            onSubmit={(text) => callbacks.onSubmit(
              comment._id,
              'comment',
              text
            )}
          />
          ))}

          {/* Форма для нового комментария */}
          {exists ? (
            <NewComment
              onSubmit={(text) => callbacks.onSubmit(
                articleId,
                'article', // Для корневого комментария
                text
              )}
            />
          ) : (
            <div className={cn('stranger')}>
              <Button
                style="text"
                onClick={callbacks.onSignIn}
                title="Войдите"
              />, чтобы иметь возможность комментировать
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default memo(ArticleCommentList);
