import {memo} from "react";
import useTranslate from "../../hooks/use-translate";

function LoginButton({token, onSignIn, onSignOut}) {
  const {t} = useTranslate();

  const callbacks = {
    onSignIn: (event) => {
      event.preventDefault();
      onSignIn();
    },
    onSignOut: (event) => {
      event.preventDefault();
      onSignOut()
    },
  }

  if (token) return <button onClick={callbacks.onSignOut}>{t('signout')}</button>

  return <button onClick={callbacks.onSignIn}>{t('signin')}</button>
}

export default memo(LoginButton);
