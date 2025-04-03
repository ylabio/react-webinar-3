import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';

import './style.css';

function Navigation() {
  const [isDisabled, setIsDisabled] = useState(true);
  const location = useLocation();

  const checkLocation = () => {
    const { pathname } = location;
    if (pathname !== '/') {
      setIsDisabled(false);
    }
  };

  useEffect(() => {
    checkLocation();
  }, []);

  return (
    <nav className="Navigation">
      <Link to={'/'} className={isDisabled ? `Navigation-link disabled` : 'Navigation-link'}>
        Главная
      </Link>
    </nav>
  );
}

export default Navigation;
