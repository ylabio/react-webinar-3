import React from 'react'

function CommentsList(props) {
  return (
    <>
    {props.list.map(item => (
        <React.Fragment key={item._id}>
        {props.defRender(item)}
        {props.searchId === item._id &&
        props.conditonRender(item)}
        </React.Fragment>
    ))
    }
    </>
  )
}

export default CommentsList