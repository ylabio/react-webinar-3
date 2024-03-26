import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CommentLoginPrompt({onLogin, onCloseReply, t}) {

  const cn = bem('LoginPrompt');
  
  return <div className={cn()}>
    <button className={cn("button")} onClick={onLogin}>
      {t.translate("comments.login")}
    </button>
    {t.translate("comments.loginPrompt")}
    <button className={cn("button")} onClick={onCloseReply}>
      {t.translate("comments.cancel")}
    </button>
  </div>
}

export default memo(CommentLoginPrompt);

