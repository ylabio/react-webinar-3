import {memo} from "react";
import {Outlet} from "react-router-dom";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({head, footer}) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <header className={cn('head')}>
        {head}
      </header>
      <main className={cn('center')}>
        <Outlet />
      </main>
      <footer className={cn('footer')}>
        {footer}
      </footer>
    </div>
  );
}

export default memo(PageLayout);
