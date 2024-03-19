import React, { useEffect } from 'react'
import {cn as bem} from "@bem-react/classname"
import PropTypes from 'prop-types';
import "./style.css"

function LoginCard(props) {
    const cn = bem("Login-Card")
    const callbacks = {
        onChangeHandler : (e) => {props.onFormChange(e.target.name, e.target.value)},
        onSubmit : (e) => {e.preventDefault(); props.onSubmit()}
    }

    return (
        <div className={cn()}>
        <h2>{props.t("login.enter")}</h2>
        <form className={cn("form")} onSubmit = {callbacks.onSubmit}>
            <label>
                {props.t("login.login")}
                <input value={props.user.login } name={"login"} onChange={callbacks.onChangeHandler}/>
            </label>
            <label>
                {props.t("login.password")}
                <input value={props.user.password} name={"password"} type="password" onChange={callbacks.onChangeHandler}/>
            </label>

            {props.errors && props.errors.map((el,index) => (
                <p className={cn("error-message")} key = {index}>{el}</p>
            ))}
            <button type='submit'>
                {props.t("login.enter-button")}
            </button>
        </form>
        
        </div>
  )
}

LoginCard.propTypes = {
    user: PropTypes.shape({
        login: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
    }).isRequired,
    errors: PropTypes.arrayOf(PropTypes.string),
    onFormChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    t: PropTypes.func
};

LoginCard.defaultProps = {
    user: {
        login: '',
        password: ''
    },
    t: (text) => text
};

export default LoginCard