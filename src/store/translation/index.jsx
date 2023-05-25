import { createContext, useContext, useEffect, useMemo, useState } from "react";
import ru from '../../languages/ru.json';

const TranslationContext = createContext()

export const TranslataionProvider = ({children}) => {
	const [transl, setTransl] = useState(ru)
	const [currentLang, setCurrentLang] = useState('ru')

	useEffect(() => {
		import(`../../languages/${currentLang}.json`).then((t) => setTransl(t))
	}, [currentLang])

	const value = useMemo(() => ({t: (key) => transl[key], set: setCurrentLang}), [transl])

	return <TranslationContext.Provider value={value}>{children}</TranslationContext.Provider>
}

export const useTranslation = () => useContext(TranslationContext)