import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

export function MainMenu({langData}) {
  return (
    <>
    <div className="chapter">
      <Link className='Link_head' to={'/'} ><p  className="p-chapter">{langData.main.page}</p></Link>
      </div>
    </>
  ) 
}

MainMenu.propTypes = {
  langData: PropTypes.object,
}

export default MainMenu;