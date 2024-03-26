import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentLoginPrompt({onLogin, onCloseReply, translate}) {

  const cn = bem('LoginPrompt');
  
  return <div className={cn()}>
    <button className={cn("button")} onClick={onLogin}>
      {translate("comments.login")}
    </button>
    {translate("comments.loginPrompt")}
    <button className={cn("button")} onClick={onCloseReply}>
      {translate("comments.cancel")}
    </button>
  </div>
}

export default memo(CommentLoginPrompt);

