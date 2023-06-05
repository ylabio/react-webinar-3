import { memo } from "react"
import './style.css'
import PropTypes from "prop-types";

function InputLogin({name, onChange, value, type, placeholder="", t}){

  const onChangeHandler = e =>{
    const target = e.target;
    const name = target.name;
    const value = target.value;
    onChange(prev => ({...prev, [name]: value}))
  }

  return (
  <label htmlFor={name} className="Input-label">
  {t(name)}
  <input 
    className="Input-auth" 
    value={value.name} 
    onChange={onChangeHandler} 
    name={name} 
    type={type} 
    placeholder={placeholder}
  />
  </label>)
}

InputLogin.propTypes = {
  name: PropTypes.string,
  value: PropTypes.object,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  t: PropTypes.func
}

InputLogin.defaultProps = {
  onChange: () => {},
  type: 'text'
}

export default memo(InputLogin)