import { memo } from "react"
import "./style.css"

function WelcomeText({ t, onSignIn }) {
  return <div className="WelcomeText">
    <button onClick={onSignIn} className="WelcomeText-button" >{t("welcome.sign")}</button>
    <p className="WelcomeText-paragraph">{t("welcome.message")}</p>
  </div>
}

export default memo(WelcomeText)