import { memo } from "react"
import { Link } from "react-router-dom"
import "style.css"

function WelcomeText({ t }) {
  return <p className="WelcomeText"><Link to="/login">{t("welcome.sign")}</Link>{t("welcome.message")}</p>
}

export default memo(WelcomeText)