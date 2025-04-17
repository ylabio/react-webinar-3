import { memo, useCallback, useMemo } from 'react';
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


function CommentsList() {
  const dispatch = useDispatch();
  // Параметры из пути /articles/:id
  const params = useParams();

  useInit(() => {
    dispatch(commentsActions.load(params.id))
  }, [params.id]);

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
          parent: comment.parent?._type
        }))
      ],
      [select.comments]
    )
  }
  
  const cn = bem('CommentsList');
  return (
    <div className={cn()}>
      <h2>Комментарии ({selectRedux.comments.count})</h2>
      {<ul className={cn('list')}>
        {options.comments.map(comment => (
          <li className={cn('item')} key={comment.id}>
            <Comment comment={comment} />
          </li>
        )
      )}
      </ul>}
      
    </div>
  );
}

export default memo(CommentsList);
