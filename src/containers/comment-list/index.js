import {memo, useCallback, useRef, useState} from 'react';
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
  const {lang} = useTranslate();
  const navigate = useNavigate()

  const ref = useRef(null)
  let comments = list ? treeToList(listToTree(list), (item, level) => (
    {_id: item._id, level: level, text: item.text, dateCreate: item.dateCreate, author: item.author, status: item.status}
  )) : []
  const onSelect = (id) => {
    setSelect(id);
    const refNode = ref.current;
    // console.log(comments.findIndex(item => item._id == id  && item.author === undefined),' / ',refNode.querySelectorAll('item > div').length)
    // console.log(refNode.querySelectorAll('item > div')[comments.findIndex(item => item._id == id  && item.author === undefined)])
    const divNode = refNode.querySelectorAll('item')[comments.findIndex(item => item._id == id  && item.author === undefined)-3];
    divNode.scrollIntoView({inline: 'start'});

  }

  const onComment = (text, _id, type, level, index) => { 
    
    if (_id && text){    
      setSelect(id)
      let result = text.replace(/\s+/g,' ') != ' ' ? dispatch(commentsActions.saveComment(text, _id, type, level)) : {} // Сохраняю комментарий
      console.log(result)
      comments = comments.splice(index,1,result);
      //dispatch(commentsActions.load(params.id)); // Обновляю список комментариев
    } else setSelect(id)
    //text.replace(' ','') // Это надо справить, он удаляет только первый найденный символ

  }
  console.log(comments)
  const onSignIn = () => navigate('/login', {state: {back: location.pathname}});

  return (
    <>
    <h2 className='Comments-h2'>{t("comments.title")} ({count})</h2>
    <div className='Comments-List' ref={ref}>  
    {comments 
      ? comments.map((item,index) =>
      <item key={index}>
        <Comment item={item} onSelect={onSelect} Select={Select} onComment={onComment} onSignIn={onSignIn} auth={auth} t={t} lang={lang} user={user} index={index}/>
      </item>    
        ) 
      : ('')}
    {Select === id ? (<CommentInput type={'article'} id={id} onComment={onComment} onSignIn={onSignIn} auth={auth} t={t}/> ):('')} 
    </div>
    
    </>
  )
}

export default memo(CommentList);