import { memo, useState } from "react";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import WritePannel from "../write-pannel";
import useSelector from "../../hooks/use-selector";
import "./style.css";

function CommentsSection({ comments, transformDate, postComment }) {
  const select = useSelector((state) => ({
    exists: state.session.exists,
    token: localStorage.getItem("token"),
    sessionUserName: Object(state.session.user.profile).name,
  }));

  return (
    <div className="Comments">
      <div className="Comments-Amount">Комментарии ({comments.length})</div>
      {comments.length > 0 ? (
        <>
          {treeToList(listToTree(comments), (item, level) => ({
            _id: item._id,
            text: item.isDeleted ? "Комментарий удален" : item.text,
            dateCreate: item.dateCreate,
            author: item.isDeleted ? "No name" : Object(item.author).profile ? JSON.parse(JSON.stringify(item)).author.profile.name : select.sessionUserName,
            level: level,
            parent:
              !item.parent || item.parent._type == "article" ? {} : item.parent,
          }))
            .slice(1)
            .map((item) => (
              <div
                key={item._id}
                className="Comments-item"
                id={item._id}
                style={{ paddingLeft: `${(item.level - 1) * 30}px` }}
              >
                <div className="Comment-Author" style={{color: (item.text =="Комментарий удален" || item.author == select.sessionUserName) ? '#666666' : 'black'}}>{item.author}</div>
                <div className="Comment-Date">
                  {transformDate(item.dateCreate)}
                </div>
                <div className="Comment-Text" style={{color: item.text =="Комментарий удален" ? '#666666' : 'black'}}>{item.text}</div>
                <WritePannel
                  id={item._id}
                  session={select.exists}
                  postComment={postComment}
                  token={select.token}
                />
              </div>
            ))}
          <WritePannel
            id={null}
            session={select.exists}
            postComment={postComment}
            token={select.token}
          />
        </>
      ) : (
        <WritePannel
          id={null}
          session={select.exists}
          postComment={postComment}
          token={select.token}
        />
      )}
    </div>
  );
}

export default memo(CommentsSection);
