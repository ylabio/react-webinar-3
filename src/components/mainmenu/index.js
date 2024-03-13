import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

export function MainMenu({langData}) {
  return (
    <>
      <Link className='Link_head' to={'/'} ><p  className="p-chapter">{langData.main.page}</p></Link>
    </>
  )
}

MainMenu.propTypes = {
  langData: PropTypes.object,
}

export default MainMenu;