import { memo, useCallback, useEffect, useState } from "react";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import { useNavigate } from "react-router-dom";
import useTranslate from "../../hooks/use-translate";

function LoginFormContainer() {
  const store = useStore();

  const select = useSelector((state) => ({
    userData: state.user.userData,
    errorMessage: state.user.errorMessage,
  }));

  const [authData, setAuthData] = useState({
    login: "",
    password: "",
  });

  const { t } = useTranslate();

  const navigate = useNavigate();

  useEffect(() => {
    if (select.userData) {
      navigate("/profile");
    }
  }, [select.userData]);

  const callbacks = {
    onInputChange: (event) => {
      setAuthData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    },
    sendUserData: useCallback(
      (event) => {
        event.preventDefault();
        store.actions.user.authUser(authData);
        setAuthData((prevState) => ({ ...prevState, login: "", password: "" }));
      },
      [authData]
    ),
  };

  return (
    <LoginForm
      onChange={callbacks.onInputChange}
      values={authData}
      onSubmit={callbacks.sendUserData}
      errorMessage={select.errorMessage}
      t={t}
    />
  );
}

export default memo(LoginFormContainer);
