import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';
import './style.css';

function CommentsLink() {
  const location = useLocation();
  const { t } = useTranslate();

  return (
    <div className="comments-link">
      <Link to="/login" state={{ back: location.pathname + location.search + location.hash }}>
        {t('comments.sighIn')}
      </Link>
      {t('comments.beAble')}
    </div>
  );
}

export default memo(CommentsLink);
