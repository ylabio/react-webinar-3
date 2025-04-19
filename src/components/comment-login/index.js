import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import { useLocation, useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentLogin() {
  const cn = bem('CommentLogin');
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslate();

  return (
    <div className={cn()}>
      <button
        className={cn('link')}
        onClick={() => {
          navigate('/login', { state: { back: location.pathname } });
        }}
      >
        {t('comments.unauth-first')}
      </button>
      <span>{t('comments.unauth-second')}</span>
    </div>
  );
  1;
}

export default memo(CommentLogin);
