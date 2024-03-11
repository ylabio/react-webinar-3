import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import { Outlet } from 'react-router-dom';
import useSelector from '../../store/use-selector';
import Basket from '../../app/basket';

function PageLayout({head, footer, children}) {
  const activeModal = useSelector(state => state.modals.name);

  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>
        {head}
      </div>
      <div className={cn('center')}>
        <Outlet />
      </div>
      <div className={cn('footer')}>
        {footer}
      </div>
      {activeModal === 'basket' && <Basket/>}
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node
}

export default memo(PageLayout);
