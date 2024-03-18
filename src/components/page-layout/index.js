import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Link } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function PageLayout({footer, children}) {

  const cn = bem('PageLayout');

  const {t} = useTranslate();

  return (
    <div className={cn()}>
      <div className={cn('head')}>
      <Link to="/login"><button className={cn('login-btn')}>{t('login.btn')}</button></Link>
      </div>
      <div className={cn('center')}>
        {children}
      </div>
      <div className={cn('footer')}>
        {footer}
      </div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PageLayout);
