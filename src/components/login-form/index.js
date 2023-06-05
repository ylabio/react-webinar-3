import {memo, useState, useCallback} from "react";
import PropTypes from "prop-types";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import {cn as bem} from '@bem-react/classname';
import Input from "../input";
import './style.css';


function LoginForm(props){

    const { t } = props;

    const cn = bem('LoginForm');

    return (
    <div className={cn()}>

        <h2 className={cn("title")}>
            {t(props.title)}
        </h2>

        <form className={cn("form")} action="" onSubmit={(e) => props.onSubmit(e, props.loginValue, props.passwordValue)}>
            <Input value={props.loginValue}
                    type={"text"}
                    onChange={props.onLoginChange} 
                    label={t("auth.login")}
                    theme={"medium"}/>

            <Input value={props.passwordValue}
                    type={"password"}
                    onChange={props.onPasswordChange}
                    label={t("auth.password")}
                    theme={"medium"}/>

            {props.serverError && <div className={cn("error")}>{props.serverError}</div>}

            <button className={cn("submit")} type="submit">{t("auth.submit")}</button>
        </form>

    </div>
    )
}

LoginForm.propTypes = {
  title: PropTypes.string,
  loginValue: PropTypes.string,
  passwordValue: PropTypes.string,
  onPasswordChange: PropTypes.func,
  serverError: PropTypes.string,
  onSubmit: PropTypes.func
};

LoginForm.defaultProps = {
    onPasswordChange: () => {},
    onSubmit: () => {}
  };

export default memo(LoginForm);
