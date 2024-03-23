import {memo, useCallback, useState} from 'react';
import Comment from '../../components/comment';
import './style.css'
import listToTree from '../../utils/list-to-tree';
import treeToList from '../../utils/tree-to-list';
import CommentInput from '../../components/comment-input';


function CommentList({list, id, addComment, auth}) {

  const [Select, setSelect] = useState(id)
  let comments
  list.items ? comments = treeToList(listToTree(list.items), (item, level) => (
    {_id: item._id, level: level, text: item.text, dateCreate: item.dateCreate, author: item.author}
  )) : {}

  const onSelect = (id) => setSelect(id)

  const onComment = (text, _id, type) => {
    if (text) addComment(text, _id, type) 
    onSelect(id)
  }


  return (
    <>
    <h2 className='Comments-h2'>Комментарии ({list?.count})</h2>
    <div className='Comments-List'>  
    {comments 
      ? comments.map((item,index) => 
        <Comment key={index} item={item} onSelect={onSelect} Select={Select} onComment={onComment} auth={auth}/>
        ) 
      : ('')}
    {Select === id ? (<CommentInput type={'комментарий'} id={id} onComment={onComment} auth={auth}/> ):('')} 
    </div>
    
    </>
  )
}

export default memo(CommentList);