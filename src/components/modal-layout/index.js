import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ModalLayout(props) {

  const cn = bem('ModalLayout');

  return (
    <div className={cn()}>
      <div className={cn('frame')} ref={props.frame} style={(props.heightFrame ? {height: props.heightFrame} : {})}>
        <div className={cn('head')}>
          <h1 className={cn('title')}>{props.title}</h1>
          <button className={cn('close')} onClick={props.onClose}>{props.labelClose}</button>
        </div>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

ModalLayout.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
  labelClose: PropTypes.string,
  heightFrame: PropTypes.number,
  frame: PropTypes.oneOfType([
    PropTypes.func, 
    PropTypes.shape({ current: PropTypes.any })
  ]),
};

ModalLayout.defaultProps = {
  title: 'Модалка',
  onClose: () => {}
};

export default memo(ModalLayout);
