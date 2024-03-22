import { memo, useState } from "react";
import treeToList from "../../utils/tree-to-list";
import listToTree from "../../utils/list-to-tree";
import WritePannel from "../write-pannel";
import useSelector from '../../hooks/use-selector';
import "./style.css";

function CommentsSection({ comments, transformDate }) {
  const select = useSelector(state => ({
    exists: state.session.exists
  }));


  return (
    <div className="Comments">
      <div className="Comments-Amount">Комментарии ({comments.length})</div>
      {comments.length > 0 ? (
        treeToList(listToTree(comments), (item, level) => ({
          _id: item._id,
          text: item.text,
          dateCreate: item.dateCreate,
          author: item.author,
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
                style= {{ paddingLeft: `${(item.level - 1) * 30}px`}}
              >
                <div className="Comment-Author">{item.author.profile.name}</div>
                <div className="Comment-Date">
                  {transformDate(item.dateCreate)}
                </div>
                <div className="Comment-Text">{item.text}</div>
                <WritePannel id={'write'+item._id} session={select.exists}/>
              </div>
          ))
      ) : (
        <WritePannel id={null} session={select.exists}/>
      )}
    </div>
  );
}

export default memo(CommentsSection);
