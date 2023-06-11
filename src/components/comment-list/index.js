import React from "react";
import Comment from "../comment";

const CommentList = (props) => {
  return (
    <Comment {...props}>
      {props.item.children.map((el) => (
        <CommentList key={el.id} {...props} isNested={true} item={el} />
      ))}
    </Comment>
  );
};

export default CommentList;
