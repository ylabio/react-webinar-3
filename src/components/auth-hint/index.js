import { memo } from 'react';
import {useNavigate} from "react-router-dom";

function AuthHint() {
  const navigate = useNavigate();
  const handleLoginRedirect = () => navigate('/login');
  return (
    <>
      <p>
          <span
            onClick={handleLoginRedirect}
            style={{cursor: 'pointer', color: 'var(--primary)'}}
          >
            Войдите
          </span>
        , чтобы иметь возможность комментировать
      </p>
    </>
  );
}

export default memo(AuthHint);
