import { memo } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';


function Menu({language}) {


  return (
 <div className='menu'>
    <Link to={`/`} className='link_menu'> {language === 'ru' ? 'Главная' : 'Main'}</Link>
 </div>
  );
}

Menu.propTypes = {
  language: PropTypes.string,
};


export default memo(Menu);