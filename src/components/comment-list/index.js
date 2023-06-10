import React, { memo } from "react";
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
// const CommentList = (props) => {
//   return (
//     <Comment {...props}>
//       {props.item.children.map((el) => (
//         <CommentList key={el.id} {...props} isNested={true} item={el} />
//       ))}
//     </Comment>
//   );
// };

export default memo(CommentList);
