import { memo, forwardRef } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const CommentLoginPrompt = forwardRef(function CommentLoginPrompt({
  offset,
  onLogin, 
  onCloseReply, 
  t},
  ref) {

  const cn = bem('LoginPrompt');

  const getOffsetClass = (offset) => {
    return cn(`offset-${Math.min(Math.max(offset - 1, 0), 3)}`);
  };
  
  return <div ref={ref} className={`${cn()} ${getOffsetClass(offset)}`}>
    <button className={cn("button")} onClick={onLogin}>
      {t.translate("comments.login")}
    </button>
    {t.translate("comments.loginPrompt")}
    <button className={cn("button")} onClick={onCloseReply}>
      {t.translate("comments.cancel")}
    </button>
  </div>
});

export default CommentLoginPrompt;

