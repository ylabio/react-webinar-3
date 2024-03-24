import {memo, useCallback, useState} from 'react';
import {cn as bem} from '@bem-react/classname';
import './style.css';
import {Link, useParams} from "react-router-dom";
import formatDate from "../../utils/format-data";
import CommentForm from "../comment-form";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import useSelector from "../../hooks/use-selector";
import shallowequal from "shallowequal";
import useStore from "../../hooks/use-store";
import useInit from "../../hooks/use-init";
import commentsActions from "../../store-redux/comments/actions";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import useTranslate from "../../hooks/use-translate";
import LoginMessage from "../login-message";


function CommentsBlock() {
  const [showFormId, setShowFormId] = useState(null)
  const store = useStore();
  const text = useSelector(state => state.comments.text)
  const loggedUserId = useSelector(state => state.session.user._id)



  const dispatch = useDispatch();
  // Параметры из пути /articles/:id

  const params = useParams();

  useInit(() => {
    setShowFormId(null)
    dispatch(commentsActions.loadComments(params.id));
  }, [params.id, text]);


  const cn = bem('CommentsBlock');

  const loggedIn = useSelector(state => state.session.user._id)

  const select = useSelectorRedux(state => ({
    comments: state.comments.data
  }), shallowequal); // Нужно указать функцию для сравнения свойства объекта, так как хуком вернули объект


  const sortedList = treeToList(listToTree(Object.values(select.comments)), (item, level) => (
    {_id: item._id, text: item.text, level: level, dateCreate: item.dateCreate, author: item.author}
  )).filter(item => item._id !== undefined);


  const callbacks = {
    onComment: useCallback((text) => store.actions.comments.addComment(text, params.id), [store]),
    onAnswer: useCallback((text, _id) => store.actions.comments.addAnswer(text, _id), [store]),
  }

  const {t} = useTranslate();

  return (
    <div className={cn()}>
      <h4>Комментарии ({sortedList.length})</h4>
      {sortedList.map(comm => {
          return (
            <div key={comm._id} className={cn('layout')}
                 style={{paddingLeft: `${(comm.level - 1) * 30}px`}}>
              <div className={cn('nameDate')}>
                <span className={loggedUserId !== comm.author._id ? cn('name') : ''}>{comm.author?.profile?.name}</span>
                <span>{formatDate(comm.dateCreate)}</span>
              </div>
              <div className={cn('text')}>{comm.text}</div>
              <Link onClick={() => setShowFormId(comm._id)} className={cn('button')}>Ответить</Link>
              {showFormId === comm._id && loggedIn &&
                <CommentForm setShowFormId={setShowFormId} showFormId={comm._id} title={'Новый ответ'}
                             callback={(text) => callbacks.onAnswer(text, comm._id)}/>}
              {!loggedIn && showFormId === comm._id &&
                <LoginMessage link={'/login'} callback={() => setShowFormId(null)} id={comm._id}
                              text={' чтобы иметь возможность ответить. '}/>}
            </div>
          )
        }
      )}
      {!loggedIn && !showFormId && <LoginMessage link={'/login'} text={' чтобы иметь возможность комментировать.'}/>}
      {loggedIn && !showFormId && <CommentForm title={'Новый комментарий'} callback={callbacks.onComment}/>}
    </div>
  );
}


export default memo(CommentsBlock);

