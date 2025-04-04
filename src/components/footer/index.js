import { memo } from 'react';

import Pagination from '../pagination';

import './style.css';
import ItemsSelector from '../items-selector';

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
