import { cn as bem } from "@bem-react/classname";
import React, { memo, useMemo, useState } from "react";
import useTranslate from "../../hooks/use-translate";
import { DEEP_LIMIT } from "../../utils/create-comment-tree";
import Button from "../button";
import Comment from "../comment";
import TextareaBlock from "../textarea-block";

const replyButtonStyles = {
  theme: "none",
  color: "primary",
};

const cancelReplyButtonStyles = {
  theme: "underline",
  color: "dark",
};

// const CommentList = (props) => {
//   const [unauthMess, setUnauthMess] = useState(false);
//   const [replyBlock, setReplyBlock] = useState(false);
//   const cn = bem("Comment");
//   const { t } = useTranslate();

  // const handleReplySubmit = (text) => {
  //   props.onReplySubmit(text, props.item.id);
  //   props.onReplyOpen(undefined);
  // };

  // const handleReplyClick = (callback) => {
  //   if (props.isLast) return;
  //   if (props.userId) {
  //     props.onReplyOpen(() => setReplyBlock(false));
  //     setReplyBlock(true);
  //   } else {
  //     setUnauthMess(true);
  //   }
  // };

//   const commentsMemo = useMemo(
//     () => props.item.children,
//     [props.item.children]
//   );

//   console.log("props.deep :>> ", props.deep);

//   return (
//     <Comment {...props}>
      // <Button onClick={handleReplyClick} styles={replyButtonStyles}>
      //   {t("comments.reply")}
      // </Button>
//       {commentsMemo.map((el) => {
//         const isLast = props.deep === DEEP_LIMIT - 1;
// 				console.log('isLast :>> ', isLast);
//         return (
//           <CommentList
//             {...props}
//             key={el.id}
//             deep={props.deep + 1}
//             isNested={true}
//             isLast={isLast}
//             onReplyOpen={isLast ? handleReplyClick : props.onReplyOpen }
//             item={el}
//           />
//         );
//       })}
//       {unauthMess && (
//         <p className={cn("mess")}>
//           <Button
//             type="link"
//             to="/login"
//             state={{ back: location.pathname }}
//             styles={replyButtonStyles}
//           >
//             {t("comments.login")}
//           </Button>
//           {", "}
//           <span>{t("comments.loginToReply")}</span>
//           {". "}
//           <Button
//             styles={cancelReplyButtonStyles}
//             onClick={() => setUnauthMess(false)}
//           >
//             {t("comments.cancelReply")}
//           </Button>
//         </p>
//       )}
//       {props.userId && replyBlock && (
//         <TextareaBlock
//           className={cn("textarea")}
//           title={t("comments.textareaHeader")}
//           buttonText={t("comments.sendComment")}
//           onSubmin={handleReplySubmit}
//         >
//           <Button onClick={() => props.onReplyOpen(undefined)}>
//             {t("comments.cancelReply")}
//           </Button>
//         </TextareaBlock>
//       )}
//     </Comment>
//   );
// };
const CommentList = (props) => {
  return (
    <Comment {...props}>
      {props.item.children.map((el) => (
        <CommentList key={el.id} {...props} isNested={true} item={el} />
      ))}
    </Comment>
  );
};

export default memo(CommentList);
