import PropTypes from 'prop-types';
import { memo, useState } from "react"
import './style.css'

const LoginForm = ({uiText, error, onSubmit}) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      const formData = new FormData(e.target)
      if(login !== '' && password !== '') {
        onSubmit(formData)
        setLogin('')
        setPassword('')
      }
    },
    onChangeLogin: (e) => setLogin(e.target.value),
    onChangePassword: (e) => setPassword(e.target.value),
  }

  return (
    <form className="Login-form" onSubmit={callbacks.onSubmit}>
      <h2 className="Login-form-title">{uiText.title}</h2>

      <div className="Login-form-input">
        <label htmlFor='login'>{uiText.login}</label>
        <input 
          value={login} 
          onChange={callbacks.onChangeLogin} 
          name='login' 
          id='login' 
          type='text' 
        />
      </div>
      
      <div className="Login-form-input">
        <label htmlFor='password'>{uiText.password}</label>
        <input 
          value={password} 
          onChange={callbacks.onChangePassword} 
          name='password' 
          id='password' 
          type='password' 
        />
      </div>

      {error && (<div className='Login-form-error'>{error}</div>)}

      <button type="submit">{uiText.signin}</button>
    </form>
  )
}

LoginForm.propTypes = {
  uiText: PropTypes.shape({
    title: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    signin: PropTypes.string.isRequired
  }).isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func,
}

export default memo(LoginForm)