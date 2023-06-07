import {memo} from "react";
import PropTypes from 'prop-types';
import useTranslate from "../../hooks/use-translate";
import {Link} from 'react-router-dom'
import './style.css';
import {cn as bem} from "@bem-react/classname";

function ProfileTool({username, link = '', onSign, onLogout}) {

   const cn = bem('Profile-tool');
   const {t} = useTranslate();

   if (username) {
      return(
         <div className={cn()}>
            <Link to={link}><div className={cn('name')}>{username}</div></Link>
            <button onClick={() => onLogout()}>{t('log-out.button')}</button>
         </div>
      )
   } else{
      return(
         <div className={cn()}>
            <button onClick={() => onSign()}>{t('log-in.button')}</button>
         </div>
      )
   }
}

ProfileTool.propTypes = {
   username: PropTypes.string,
   link: PropTypes.string,
   onSign: PropTypes.func,
   onLogout:  PropTypes.func
};

ProfileTool.defaultProps = {
   onSign: () => {},
   onLogout: () => {}
}

export default memo(ProfileTool);