import React from 'react'

function CommentsList(props) {
  return (
    <>
    {props.list.map((item,index) => (
        <React.Fragment key={item._id}>
        {props.defRender(item,index)}
        {props.searchWhereFormToPut === item._id  && 
        props.conditonRender(index)}
        </React.Fragment>
    ))
    }
    </>
  )
}

export default CommentsList