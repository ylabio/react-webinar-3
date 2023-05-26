import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState } from "react";
import ru from '../../languages/ru.json';

const storageLang = window.localStorage.getItem('lang')

const TranslationContext = createContext()

export const TranslataionProvider = ({children}) => {
	const [transl, setTransl] = useState(ru)
	const [currentLang, setCurrentLang] = useState(storageLang ?? 'ru')

	useEffect(() => {
		window.localStorage.setItem('lang', currentLang)
		import(`../../languages/${currentLang}.json`).then((t) => setTransl(t))
	}, [currentLang])

	const value = useMemo(() => ({t: (key) => transl[key], set: setCurrentLang}), [transl])

	return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
}

export const useTranslation = () => useContext(TranslationContext)