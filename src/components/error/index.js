import { useContext } from "react"
import { LanguageContext } from "../../languageContext"

const ErrorPage = () => {

    const [language, setLanguage] = useContext(LanguageContext)

    const text = {
        ru: 'Ошибка! Попробуйте открыть другую страницу!',
        eng: 'Error! Try another page!'
    }

    return(
        <span>{text[language]}</span>
    )
}

export default ErrorPage