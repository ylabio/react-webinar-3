import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

function UserDetails(props) {
  return (
    <div className="User-profile">
      <h2>Профиль</h2>
      <div className='User-name'>
        <p>Имя: <b>{props.user?.profile.name}</b></p>
      </div>
      <div className='User-phone'>
        <p>Телефон: <b>{props.user?.profile.phone}</b></p>
      </div>
      <div className='User-email'>
        <p>Email: <b>{props.user?.email}</b></p>
      </div>
    </div>
  )
}

UserDetails.propTypes = {}

export default UserDetails
