import { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function MainMenu({ to, title, children }) {
  return (
    <div className="Product-Back-Container">
      <Link className="Product-Back" to={to}>
        <span>{title}</span>
      </Link>
      {children}
    </div>
  );
}

export default memo(MainMenu);
