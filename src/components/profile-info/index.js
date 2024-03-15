import {memo} from "react";
import PropTypes from 'prop-types';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ProfileInfo(props) {
  const cn = bem( 'ProfileInfo' );

  return (
    <div className={ cn() }>
      <h2 className={ cn( 'title' ) }>Профиль</h2>
      <div className={ cn( 'prop' ) }>
        <div className={ cn( 'label' ) }>{props.name}:</div>
        <div className={ cn( 'value' ) }>{ props.profile?.profile?.name }</div>
      </div>
      <div className={ cn( 'prop' ) }>
        <div className={ cn( 'label' ) }>{props.phone}:</div>
        <div className={ cn( 'value' ) }>{ props.profile?.profile?.phone }</div>
      </div>
      <div className={ cn( 'prop' ) }>
        <div className={ cn( 'label' ) }>email:</div>
        <div className={ cn( 'value' ) }>{ props.profile?.email }</div>
      </div>
    </div>
  )
}

ProfileInfo.propTypes = {
  profile: PropTypes.object.isRequired,
  name: PropTypes.string,
  phone: PropTypes.string,
};

export default memo( ProfileInfo );
