import { memo } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function HomeLink() {
  return (
    <Link to={`/`} className="HomeLink">Главная</Link>
  );
}

export default memo(HomeLink);
