import PropTypes from 'prop-types';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function DualAlign({ leftComponent, rightComponent }) {

  const cn = bem('DualAlign');

  return (
    <div className={cn()}>
      {leftComponent}
      {rightComponent}
    </div>
  );
}

DualAlign.propTypes = {
  leftComponent: PropTypes.element,
  rightComponent: PropTypes.element,
};

export default DualAlign;
