import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import './style.css';

function Form({title, onSubmit, children}) {
  const cn = bem('FormLayout');

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className={cn()} onSubmit={handleSubmit}>
      <div className={cn('title')}>{title}</div>
      {children}
    </form>
  )
}

Form.propTypes = {
  title: PropTypes.string,
  onSubmit: PropTypes.func,
  children: PropTypes.node,
}

Form.defaultProps = {
  onSubmit: () => {}
}

export default memo(Form);