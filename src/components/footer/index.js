import { memo } from 'react';

import Pagination from '../pagination';

import './style.css';

function Footer({ children }) {
  return (
    <footer className="Footer">
      <div className="Footer-container">
        <Pagination />
      </div>
    </footer>
  );
}

export default memo(Footer);
