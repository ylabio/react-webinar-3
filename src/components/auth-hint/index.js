import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import useTranslate from '../../hooks/use-translate';

function AuthHint() {
  const navigate = useNavigate();
  const { t } = useTranslate();

  const handleLoginRedirect = () => navigate('/login');

  return (
    <p style={{ cursor: 'pointer', color: 'var(--primary)' }} onClick={handleLoginRedirect}>
      {t('authHint.message')}
    </p>
  );
}

export default memo(AuthHint);
