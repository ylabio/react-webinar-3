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
  console.log(window.innerWidth )
  const saveLevel = (window.innerWidth * 0.40 )
  return (
    <div className={cn()} style = {{paddingLeft:  props.item.level > saveLevel/30 ? saveLevel/30*30 : props.item.level * 30}}>
        <div className={cn("head")}>
            <span className={cn("user-name")}>
              <b style = {{color: props.isOwnComment ? "#666666" : "#000000"}}>
                {props.item.author?.profile.name}
              </b>
            </span>
            <span className={cn("date")}>{getFormattedDateTime(props.item.dateCreate)}</span>
        </div>
        <div className={cn("body")}>
        {props.item.text}
        </div>
        <div className={cn("button")}>
            <button onClick = {() => props.onClick(props.item, props.currIndex)}>
                Ответить
            </button>
        </div>
    </div>
  )
}

export default memo(CommentCard)