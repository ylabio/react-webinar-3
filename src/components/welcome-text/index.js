import { memo } from "react"
import { Link } from "react-router-dom"
import "style.css"

function WelcomeText() {
  return <p><Link to="/login">Войдите</Link>, чтобы иметь возможность комментировать.</p>
}

export default memo(WelcomeText)