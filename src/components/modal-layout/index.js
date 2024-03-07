import React from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import Head from "../../components/head";

function ModalLayout({title, children, onClose}) {
    const [mainContent, totalBlock] = React.Children.toArray(children);
    const cn = bem('ModalLayout')
  
    return (
      <div className={cn()}>
      <div className={cn('container')}>
        <Head title={title} />
        <button className={cn('close')} onClick={onClose}>
          Закрыть
        </button>

        <div className={cn('content')}>
          {mainContent}
        </div>

        <div className={cn('total')}>
          {totalBlock}
        </div>
      </div>
    </div>
    );
  }
  
  ModalLayout.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  }
  
  export default React.memo(ModalLayout);