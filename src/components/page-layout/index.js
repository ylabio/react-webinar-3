import {memo} from "react";
import Menu from "../menu";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function PageLayout({head, footer, children, ...props}) {

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('nav')}>
        <Menu onOpen={props.onOpen} amount={props.amount}
          sum={props.sum} localeDict={props.localeDict}/>
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
