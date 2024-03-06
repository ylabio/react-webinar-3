import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import Head from "../head";
import Button from "../button";

function Modal(props) {

  const cn = bem('Modal');

  return (
    <div className={cn()}>
      <div className={cn('dialog')}>
        <Head title={props.title}>
          <Button title='Закрыть' onClick={props.onClose} />
        </Head>
        {props.children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  onClose: PropTypes.func
};

Modal.defaultProps = {
  onClose: () => {
  },
}

export default React.memo(Modal);
