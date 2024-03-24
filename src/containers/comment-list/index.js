import {memo, useCallback, useState} from 'react';
import Comment from '../../components/comment';
import './style.css'
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentInput from '../../components/comment-input';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import commentsActions from '../../store-redux/comments/actions';
import useTranslate from '../../hooks/use-translate';


function CommentList({list, count, id, auth, t}) {
  const params = useParams();
  const dispatch = useDispatch();
  const [Select, setSelect] = useState(id) // Выделение нужного комментария (По умолчанию выделения нет (На товаре))
  const onSelect = (id) => setSelect(id)
  const {lang} = useTranslate();
  let comments = list ? treeToList(listToTree(list), (item, level) => (
    {_id: item._id, level: level, text: item.text, dateCreate: item.dateCreate, author: item.author}
  )) : []


  const onComment = (text, _id, type) => {
      dispatch(commentsActions.saveComment(text, _id, type)); // Сохраняю комментарий
      dispatch(commentsActions.load(params.id)); // Обновляю список комментариев
    setSelect(id)
  }
  

  return (
    <>
    <h2 className='Comments-h2'>{t("comments.title")} ({count})</h2>
    <div className='Comments-List'>  
    {comments 
      ? comments.map((item,index) => 
        <Comment key={index} item={item} onSelect={onSelect} Select={Select} onComment={onComment} auth={auth} t={t} lang={lang}/>
        ) 
      : ('')}
    {Select === id ? (<CommentInput type={'article'} id={id} onComment={onComment} auth={auth} t={t}/> ):('')} 
    </div>
    
    </>
  )
}

export default memo(CommentList);