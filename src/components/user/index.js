import { memo } from 'react'
import { cn as bem } from '@bem-react/classname'
import PropTypes from 'prop-types';
import './style.css'

function User(props) {
  const cn = bem('User')
  return <div className={cn()}>
    <h2>Профиль</h2>
    <p>Имя: <b>{props.name}</b></p>
    <p>Телефон: <b>{props.phone}</b></p>
    <p>email: <b>{props.email}</b></p>
  </div>
}

User.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string
};
export default memo(User)
