import Pagination from '../pagination';
import ItemsSelector from '../items-selector';

import './style.css';

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer-container">
        <ItemsSelector />
        <Pagination />
      </div>
    </footer>
  );
}

export default Footer;
