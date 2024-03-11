import { useContext } from "react"
import { localeContext, localeDict } from "./locale-context"

export const useLocale = () => {
    const {locale} = useContext(localeContext)
    return localeDict[locale]
}