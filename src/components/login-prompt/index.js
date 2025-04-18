import { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function LoginPrompt({ text }) {
  return (
    <div className="LoginPrompt">
      <Link to="/login">Войдите</Link>, <span>{text}</span>
    </div>
  );
}

export default memo(LoginPrompt);
