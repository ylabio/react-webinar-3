import React, { useEffect } from 'react'
import {cn as bem} from "@bem-react/classname"
import "./style.css"
import getFormattedDateTime from '../../utils/get-formatted-date-time'
import { memo } from 'react'

function CommentCard(props) {
  const cn = bem("Comment")
  useEffect(() => {
    console.log("Ререндер комментария")
  });
  return (
    <div className={cn()} style = {{paddingLeft: props.item.level * 30}}>
        <div className={cn("head")}>
            <span className={cn("user-name")}><b>{props.item.author?.profile.name}</b></span>
            <span>{getFormattedDateTime(props.item.dateCreate)}</span>
        </div>
        <div>
        {props.item.text}
        </div>
        <div className={cn("button")}>
            <button onClick = {() => props.onClick(props.item._id)}>
                Ответить
            </button>
        </div>
    </div>
  )
}

export default memo(CommentCard)