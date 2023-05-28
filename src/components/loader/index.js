import {cn as bem} from "@bem-react/classname";
import PropTypes from "prop-types";
import './style.css';

function Loader(props) { 

  const cn = bem('Loader'); 

  return (
    <div className={cn()}>
      <p className={cn('message')}>{props.getTranslation('LOADING', props.language)}...</p>
    </div>
  )
}

Loader.propTypes = {  
  language: PropTypes.string,
  getTranslation: PropTypes.func
};

Loader.defaultProps = {  
  getTranslation: () => {},
}



export default Loader;
