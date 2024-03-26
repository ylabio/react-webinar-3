import {memo, useCallback, useState} from 'react';
import Comment from '../../components/comment';
import './style.css'
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentInput from '../../components/comment-input';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';
import useTranslate from '../../hooks/use-translate';


function CommentList({list, count, id, auth, t, user}) {
  const params = useParams();
  const dispatch = useDispatch();
  const [Select, setSelect] = useState(id) // Выделение нужного комментария (По умолчанию выделения нет (На товаре))
  const onSelect = (id) => setSelect(id)
  const {lang} = useTranslate();
  const navigate = useNavigate()
  let test = 'test  test test'
  let comments = list ? treeToList(listToTree(list), (item, level) => (
    {_id: item._id, level: level, text: item.text, dateCreate: item.dateCreate, author: item.author}
  )) : []


  const onComment = (text, _id, type) => { 
    text.replace(' ','') // Это надо справить, он удаляет только первый найденный символ
    text != '' ? dispatch(commentsActions.saveComment(text, _id, type)) : {} // Сохраняю комментарий
      dispatch(commentsActions.load(params.id)); // Обновляю список комментариев
    setSelect(id)
  }

  const onSignIn = () => navigate('/login', {state: {back: location.pathname}});

  return (
    <>
    <h2 className='Comments-h2'>{t("comments.title")} ({count})</h2>
    <div className='Comments-List'>  
    {comments 
      ? comments.map((item,index) => 
        <Comment key={index} item={item} onSelect={onSelect} Select={Select} onComment={onComment} onSignIn={onSignIn} auth={auth} t={t} lang={lang} user={user}/>
        ) 
      : ('')}
    {Select === id ? (<CommentInput type={'article'} id={id} onComment={onComment} onSignIn={onSignIn} auth={auth} t={t}/> ):('')} 
    </div>
    
    </>
  )
}

export default memo(CommentList);