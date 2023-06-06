import './style.css'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import {memo} from "react";
import {cn as bem} from '@bem-react/classname'

function ProfileBar({ action, name, link, t }) {
  const cn = bem('profile');

  return (
    <div className={cn()}>
      {name ?
        <>
          <Link className={cn('name')} to={link}>{name}</Link>
          <button className={cn('button')} onClick={action}>{t('profileBar.out')}</button>
        </>
        : <button className={cn('button')} onClick={action}>{t('profileBar.in')}</button>
      }
    </div>
  );
}

ProfileBar.propTypes = {
  action: PropTypes.func.isRequired,
  name: PropTypes.string,
  link: PropTypes.string,
  t: PropTypes.func
}

ProfileBar.defaultProps = {
  action: () => { },
  t: (text) => text
}


export default memo(ProfileBar);
