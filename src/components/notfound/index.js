import { Link } from 'react-router-dom';
import './style.css'

function NotFound() {
  return (
    <div className='NotFound-container'>
      <h1 className='NotFound-title'>404</h1>
      <p className='NotFound-message'>Страница не найдена</p>
      <Link to="/" className='NotFound-link'>
        На главную
      </Link>
    </div>
  );
}

export default NotFound;
