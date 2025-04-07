import { Link } from 'react-router-dom';

import './style.css';

function Navbar({ translations }) {
  return (
    <div className="Controls">
      <Link to="/" className="Controls-title">
        {translations.home}
      </Link>
    </div>
  );
}

export default Navbar;
