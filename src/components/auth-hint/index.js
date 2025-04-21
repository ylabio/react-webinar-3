import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';

function AuthHint() {
  const navigate = useNavigate();
  const { t } = useTranslate();

  const handleLoginRedirect = () => navigate('/login');

  return (
    <p>
      <span
        onClick={handleLoginRedirect}
        style={{ cursor: 'pointer', color: 'var(--primary)' }}
      >
        {t('authHint.login')}
      </span>{', '}
      {t('authHint.continue')}
    </p>
  );
}

export default memo(AuthHint);
