import { memo, useCallback, useMemo, useState } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Comment from '../comment'
import useInit from '../../hooks/use-init';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import listToTree from '../../utils/list-to-tree'
import treeToList from '../../utils/tree-to-list'
import commentsActions from '../../store-redux/comments/actions'
import shallowequal from 'shallowequal';
import useSelector from '../../hooks/use-selector'
import LoginMessage from '../login-message'
import CommentForm from '../comment-form'


function CommentsList() {
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();
  const [newComment, setNewComment] = useState({text: '', parentId: params.id, parentType: 'article'})
  const [currentComment, setCurrentComment] = useState(params.id)

  useInit(() => {
    dispatch(commentsActions.load(params.id))
  }, [params.id]);

  const select = useSelector(state => ({
    exist: state.session.exists
  }))
  
  const selectRedux = useSelectorRedux(
    state => ({
      waiting: state.comments.waiting,
      comments: state.comments.data
    }),
    shallowequal,
  ); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const options = {
    comments: useMemo(
      () => [
        ...treeToList(listToTree(selectRedux.comments.items, '_id', '_type'), (comment, level) => ({
          id: comment._id,
          level: level * 40,
          text: comment.text,
          dateCreate: comment.dateCreate,
          author: comment.author?.profile.name,
          parent: comment.parent?._type,
          parentId: comment.parent?._id
        }))
      ],
      [selectRedux.comments]
    ),
  }

  const callbacks = {
    onSubmit: useCallback((e) => {
      e.preventDefault()
      dispatch(commentsActions.post(newComment))
      setNewComment({ text: '', parentId: params.id, parentType: 'article' });
      setCurrentComment(params.id)
      dispatch(commentsActions.load(params.id))
    }, [newComment, params.id, dispatch]),
    onChange: useCallback((value) => {
      setNewComment(prev => ({...prev, text: value}))
    }),
    onCancel: useCallback(() => {
      setNewComment({text: '', parentId: params.id, parentType: 'article'})
      setCurrentComment(params.id)
    }),
    onAnswer: useCallback((commentId) => {
      setNewComment(prev => ({...prev, parentId: commentId, parentType: 'comment'}))
      setCurrentComment(commentId)
    })
  }
  
  const cn = bem('CommentsList');
  return (
    <div className={cn()}>
      <h2>Комментарии ({selectRedux.comments.count})</h2>
      {<ul className={cn('list')}>
        {options.comments.map(comment => (
          <li 
            className={cn('item')} 
            key={comment.id} 
            style={{marginLeft: 1 * comment.level}}
          >
            <Comment 
              comment={comment} 
              onAnswer={() => callbacks.onAnswer(comment.id) } />
              {currentComment === comment.id && (select.exist 
                ? <CommentForm 
                    title={'ответ'} 
                    submitTitle={'Отправить'} 
                    value={newComment.text}
                    onSubmit={callbacks.onSubmit}
                    onChange={callbacks.onChange}
                    onCancel={callbacks.onCancel}
                  />
                : <LoginMessage />
              )}
          </li>
        )
      )}
      </ul>}
      {currentComment === params.id && (select.exist 
        ? <CommentForm 
            title={'комментарий'} 
            submitTitle={'Отправить'} 
            value={newComment.text}
            onSubmit={callbacks.onSubmit}
            onChange={callbacks.onChange}
            onCancel={callbacks.onCancel}
          />
        : <LoginMessage />
      )}
    </div>
  );
}

export default memo(CommentsList);
