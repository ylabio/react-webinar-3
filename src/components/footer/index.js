import { memo } from 'react';

import './style.css';

function Footer({ children }) {
  return (
    <footer className="Footer">
      <div className="Footer-container">{children}</div>
    </footer>
  );
}

export default memo(Footer);
