import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import useTranslate from "../../hooks/use-translate";
import './style.css';
import LoginTab from "../../containers/login-tab";


function PageLayout({footer, children}) {

  const cn = bem('PageLayout');

  const {t} = useTranslate();

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        <LoginTab />
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
