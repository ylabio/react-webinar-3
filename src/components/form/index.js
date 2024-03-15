import { memo } from "react";
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Form({ children, onSubmit, dataForm }) {
  const cn = bem('Form');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>Вход</h2>
      <form className={cn('form')} onSubmit={(e) => onSubmit(e, dataForm)}>
        {children}
      </form>
    </div>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
  children: PropTypes.node,
};

Form.defaultProps = {
  onSubmit: () => { }
}

export default memo(Form);