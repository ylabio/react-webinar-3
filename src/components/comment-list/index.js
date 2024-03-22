import {memo} from 'react';


function CommentList({list}) {

 const showList = (list) => {
  if (list){
    return list.map((comm, index) => (
      <Comment key={index} item={comm}/>
    ));
  }
 }

console.log(list)

  return (
    <>
      <div>
        {showList(list)}
      </div>
    </>
  )
}

export default memo(CommentList);