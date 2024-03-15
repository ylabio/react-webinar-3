import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from '@bem-react/classname';
import "./style.css"

function InputLayout({ label, error, children }) {
  const cn = bem('InputLayout');
  return (
    <div className={cn()}>
      <label className={cn('label')}>{label}</label>
      <div className={cn('input')}>{children}</div>
      <div className={cn('error')}>{error}</div>
    </div>
  )
}

InputLayout.propTypes = {
  label: PropTypes.string,
  error: PropTypes.node,
  children: PropTypes.node
}

InputLayout.defaultProps = {}

export default memo(InputLayout);