import { element } from "prop-types";
import "./style.css";
import { cn as bem } from "@bem-react/classname";
import CommentReply from "../../components/comment-reply";
import changeDate from "../../utils/change-data";
import { useState,useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Comments = ({ id, comments, addCommentArticle, addComment, isAuth, idUser }) => {
  const cn = bem("Comments");
  const [openInput, setOpenInput] = useState(false);
  const [paddingReply, setpaddingReply] = useState(0);
  const scroll = useRef();
const handleCommentReply=(idElement,paddingElement)=>{
  setOpenInput(idElement);
  setpaddingReply(paddingElement)
  
}

useEffect(() => {
if(scroll.current!=undefined)
  scroll.current.scrollIntoView({ behavior: "smooth" });
  
}, [openInput]);
  function result(comments, parentId, padding = 0) {
    let newComments = [];
    comments.forEach((element) => {
     
      if (element.parent._id && element.parent._id === parentId) {
        newComments.push(
          <div
            key={element._id}
            className={cn() + "-comment"}
            style={{ paddingLeft: padding + "px" }}
          >
            <div className={cn() + "-user "+(idUser()===element.author._id? cn()+'-iduser':'')}>
              <b>{element.author.profile.name}</b>
              <div className={cn() + "-time"}>
                {changeDate(element.dateCreate)}
              </div>
            </div>
            <div className={cn() + "-comment"}>{element.text}</div>

            <div
              className={cn() + "-answer"}
              onClick={()=>handleCommentReply(element._id,padding)}
            >
              Ответить
            </div>
          
            {!isAuth() && openInput === element._id && (
              <div className={cn() + "-wrapper-enter"}>
                <Link to={"/login"} className={cn() + "-enter"}>
                  Войдите
                </Link>
                , чтобы иметь возможность ответить.&nbsp;
                <div
                  onClick={() => setOpenInput(false)}
                  className={cn() + "-cancle"}
                >
                  Отмена
                </div>
              </div>
            )}
          </div>
        );

        newComments = [
          ...newComments,
          ...result(comments, element._id, padding + 30),
          isAuth() && openInput === element._id && (
            <div key={padding+cn()+'-reply'} ref={scroll} className={cn()+'-reply'} style={{paddingLeft:paddingReply+'px'}}><CommentReply
               element={element}
               setOpenInput={setOpenInput}
               addComment={addComment}
             /></div> 
           )
        ];
      }
    });

    return newComments;
  }

  return (
    <div className={cn()}>
      <div className={cn() + "-count"}>Комментарии: ({comments.length})</div>
      <div className={cn() + "-all"}>{result(comments, id)}</div>
      {!openInput && isAuth() ? (
        <CommentReply
          addComment={addCommentArticle}
          countBt={1}
          element={element}
          setOpenInput={setOpenInput}
        />
      ) : (
        !openInput && (
          <div className={cn() + "-wrapper-enter"}>
            <Link className={cn() + "-enter"} to={"/login"}>
              Войдите
            </Link>
            , чтобы иметь возможность комментировать.
          </div>
        )
      )}
    </div>
  );
};
export default Comments;
