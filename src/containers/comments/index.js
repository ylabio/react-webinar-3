import {memo, useState, useCallback, useMemo, useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector as useSelectorRedux} from 'react-redux';
import {recurseList} from "../../utils/recurse-list";
import shallowequal from 'shallowequal';
import useSelector from "../../hooks/use-selector";
import useInit from "../../hooks/use-init";
import useTranslate from "../../hooks/use-translate";
import commentsActions from "../../store-redux/comments/actions";
import CommentsLayout from "../../components/comments-layout";
import Spinner from "../../components/spinner";
import CommentsList from "../../components/comments-list";
import CommentCard from "../../components/comment-card";
import CommentNav from "../../components/comment-nav";
import CommentForm from "../../components/comment-form";

function Comments() {
  const dispatch = useDispatch();
  const params = useParams();
  const {t} = useTranslate();

  const {exists, token, user} = useSelector(state => state.session);
  const [commentValue, setCommentValue] = useState('');
  const [activeForm, setActiveForm] = useState('');

  useInit(() => {
    // Загрузка списка комментариев
    dispatch(commentsActions.load(params.id));
  }, [params.id])

  const select = useSelectorRedux(state => ({
    count: state.comments.count,
    items: state.comments.items,
    data: state.comments.result,
    waiting: state.comments.waiting,
    success_create: state.comments.success_create,
  }), shallowequal);

  useEffect(() => {
    // При успешном создании нового комментария отслеживается изменение переменной success_create на true
    if (select.success_create) {
      const newComment = {...select.data, author: {profile: {name: user.profile.name} }};
      // Функция динамического добавления нового комментария в массив состояния
      dispatch(commentsActions.add(newComment));
    }
  }, [select.success_create, select.data])

  const callbacks = {
    // Создание нового комментария
    createNewComment: useCallback(() => {
      if (commentValue.trim()) {
        dispatch(commentsActions.create(token, {text: commentValue, parent: {_id: params.id, _type: "article"}}));
        setCommentValue('');
      }
    }, [token, commentValue, params.id]),
    // Ответ на комментарий
    onReplyComment: useCallback((_id) => {
      if (commentValue.trim()) {
        dispatch(commentsActions.create(token, {text: commentValue, parent: {_id, _type: "comment"}}));
        setCommentValue('');
      }
    }, [token, commentValue])
  }

  // Список комментариев
  const comments = useMemo(() => recurseList(select.items, params.id), [select.items, params.id]);

  const renders = {
    item: useCallback(item => (
      <CommentCard 
        item={item} nestedLevel={1} exists={exists} user={user} t={t} activeForm={activeForm} setActiveForm={setActiveForm} 
        commentValue={commentValue} setCommentValue={setCommentValue} replyComment={callbacks.onReplyComment}
      />
    ), [exists, user, t, activeForm, commentValue, callbacks.onReplyComment])
  }

  return (
    <Spinner active={select.waiting}>
      <CommentsLayout count={select.count}>
        <CommentsList list={comments} renderItem={renders.item} />
        {!activeForm.length && (
          <>
            {!exists
              ? <CommentNav link={'/login'} description={'комментировать'} t={t} />
              : <CommentForm 
                  text={'комментарий'} t={t} value={commentValue} 
                  onChange={setCommentValue} onClick={callbacks.createNewComment} 
                />
            }
          </>
        )}
      </CommentsLayout>
    </Spinner>
  )
}

export default memo(Comments);