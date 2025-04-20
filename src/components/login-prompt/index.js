import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';

function LoginPrompt({ text }) {
  const location = useLocation();
  
  return (
    <div className="LoginPrompt">
      <Link to="/login" state={{ back: location.pathname }}>Войдите</Link>, <span>{text}</span>
    </div>
  );
}

export default memo(LoginPrompt);
