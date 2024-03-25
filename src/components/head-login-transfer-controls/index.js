import { memo } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import './style.css'

const HeadLoginTransferControls = ({exists, user, onSignIn, onSignOut, t}) => {
  const callbacks = {
    onSignIn: () => onSignIn(),
    onSignOut: () => onSignOut()
  }
  
  return (
    <>
      {exists ? <Link className='HeadLoginTransferControls-profile-link' to='/profile'>{user.profile.name}</Link> : ''}
      {exists
        ? <button 
            className='HeadLoginTransferControls-logout-btn' 
            onClick={callbacks.onSignOut}
          >
            {t('session.signOut')}
          </button>
        : <button 
            className='HeadLoginTransferControls-signin-btn' 
            onClick={callbacks.onSignIn}
          >
            {t('session.signIn')}
          </button>
      }
    </>
  )
}

HeadLoginTransferControls.propTypes = {
  exists: PropTypes.bool,
  user: PropTypes.shape({
    profile: PropTypes.shape({
      name: PropTypes.string
    })
  }),
  onSignIn: PropTypes.func,
  onSignOut: PropTypes.func,
}

export default memo(HeadLoginTransferControls)