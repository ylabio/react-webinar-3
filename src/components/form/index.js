import './style.css';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import { memo } from "react";

function Form({ title, onSubmit, values, children }) {
  const cn = bem('Form');

  return (
    <div className={cn()}>
      <h2 className={cn('title')}>{title}</h2>
      <form className={cn('form')} onSubmit={(e) => onSubmit(e, values)}>
        {children}
      </form>
    </div>
  );
}

Form.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  values: PropTypes.object,
  children: PropTypes.node,
};

Form.defaultProps = {
  onSubmit: () => {}
}

export default memo(Form);