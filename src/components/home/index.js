import {Link} from 'react-router-dom';
import {cn as bem} from '@bem-react/classname';
import "./style.css";

function Home() {
  const cn = bem('Home');

  return (
    <Link className={cn('link')} to={`/`}>Главная</Link>
  );
}

export default Home;