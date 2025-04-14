import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Form(props) {

  const cn = bem("Form");

  const callbacks = {
    onSubmit: (e) => {
      e.preventDefault();
      props.handleSubmit(props.data);
    },
  };

  return (
    <div className={cn()}>
      <span>{props.t("entry")}</span>
      <form className={cn("form")} onSubmit={callbacks.onSubmit}>
        <div>
          <label htmlFor={"login"}>{props.t("login")}</label>
          <input name="login" type="text" placeholder="Введите логин" onChange={props.handleChange} />
        </div>
        <div>
          <label htmlFor={"password"}>{props.t("password")}</label>
          <input name="password" type="password" placeholder="Введите пароль" onChange={props.handleChange} />
        </div>
        {props.error &&
          props.error.map((err, i) => {
            return (
              <div className={cn("error")} key={i}>
                {err}
              </div>
            );
          })}
        <button type="submit" onSubmit={callbacks.onSubmit}>
          {props.t("enter")}
        </button>
      </form>
    </div>
  );
}

Form.propTypes = {
  t: PropTypes.func,
  handleSubmit: PropTypes.func.isRequired,
};

export default memo(Form);
