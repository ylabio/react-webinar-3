import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function Loading (props) {

  const cn = bem('Loading');

  return (
    <div className={cn()}>{props.langText}...</div>
  );

}

Loading.propTypes = {
  langText: PropTypes.string
};

export default Loading;