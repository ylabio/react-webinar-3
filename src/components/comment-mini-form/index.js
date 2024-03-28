import React, { useEffect, useRef } from 'react'
import {cn as bem} from "@bem-react/classname"
import "./style.css"
import { Link, useLocation, useNavigate } from 'react-router-dom'

function CommentMiniForm(props) {
  const cn = bem("Mini-Comment")
  const elementRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
      const form = e.target;
      const text  = form.text.value;
      if(text.trim().length !== 0){

        const body  = {
          text : text,
          parent :{
            _id : props.item._id,
            _type : props.item._type
          },
        }
        props.addComment(body)
        props.onClose()
        form.text.value = ""
      }
  }
  const saveLevel = (window.innerWidth * 0.60)
  return (
    <>
    {props.isLogin ?
      <div className = {cn()} style = {{paddingLeft:  (props.item.level+1) > saveLevel/30 ? (saveLevel/30+1)*30 : (props.item.level+1) * 30}}ref={elementRef}>
         <form onSubmit={onSubmit} className={cn("form")}>
      <label htmlFor="replyInput"><b>Новый ответ</b></label>
      <br />
      <textarea
        name = "text"
        defaultValue={props.value}
        id="replyInput"
        // value={replyText}
        onChange={(event) => props.onChange(event.target.value)}
        />
      <br />
      <button type="submit">Отправить</button>
      <button type="button" onClick={props.onClose}>Отмена</button>
    </form>
    </div>
    :
    <div style = {{paddingLeft:   (props.item.level+1) > saveLevel/30 ? saveLevel/30*30 :  (props.item.level+1) * 30}}ref={elementRef}>
        <p  ><Link to = "/login" state = {{back : location.pathname}}>Войдите</Link>, чтобы иметь возможность ответить. 
        <button className={cn("cancel-btn")} onClick={props.onClose}>Отмена</button></p>
    </div>
      }
  </>
  ) 
}

export default CommentMiniForm