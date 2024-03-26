import React from 'react'
import {cn as bem} from "@bem-react/classname"
import "./style.css"
function CommentsLayout(props) {
  const cn = bem("Comments-Layout")
  return (
    <div className={cn()}>
      <div className={cn("head")}>
        <h2>
            Комментарии ({props.commentsCount})
        </h2>
      </div>
      <div className={cn("info")}>
        {props.children}
      </div>
    </div> 
  )
}

export default CommentsLayout