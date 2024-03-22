import {memo, useCallback} from 'react';
import {useDispatch, useSelector, useStore} from 'react-redux';
import useTranslate from '../../hooks/use-translate';
import Spinner from '../../components/spinner';
import commentsActions from '../../store-redux/comments/actions';
import Comments from '../../components/comments';
import Comment from '../../components/comment';
import useInit from '../../hooks/use-init';
import shallowEqual from 'shallowequal';
import { formatDate } from '../../utils/format-date';

function CatalogList() {
  const store = useStore();
  const dispatch = useDispatch();

  useInit(() => {
    dispatch(commentsActions.load());
  }, []);

  const select = useSelector(state => ({
    comments: state.comments.data,
    waiting: state.comments.waiting,
  }), shallowEqual); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект

  const {t} = useTranslate();

  const renders = {
    comment: useCallback(comment => (
      <Comment author={comment.author.profile.name} text={comment.text} dateCreate={formatDate(comment.dateCreate)} />
    ), [t]),
  };
  return (
    <Spinner active={select.waiting}>
      <Comments list={select.comments} renderItem={renders.comment}/>
    </Spinner>
  );
}

export default memo(CatalogList);
