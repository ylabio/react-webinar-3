import {memo} from "react";
import PropTypes from "prop-types";
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";
import './style.css';

function Head({ title }) {
  
  const store = useStore();

  const language = useSelector(state => state.language);

  return (
    <div className='Head'>
      <h1>{title}</h1>
      <button
        className='Head-language'
        type="button"
        onClick={() => store.changeLanguage()}
      >
        {language?.country}
      </button>
    </div>
  )
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
