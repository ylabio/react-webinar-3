// src/hooks/useTranslate.js
import { useState, useEffect } from 'react';
import useServices from './use-services';

const useTranslate = () => {
    const { I18n } = useServices();
    const [lang, setLang] = useState(I18n.getLang()); // Инициализация состояния текущим языком

    useEffect(() => {
        const handleLanguageChange = (newLang) => {
            setLang(newLang); // Обновляем состояние при изменении языка в сервисе
        };

        I18n.addListener(handleLanguageChange); // Подписываемся на изменения языка

        return () => {
            I18n.removeListener(handleLanguageChange); // Отписываемся при размонтировании компонента
        };
    }, [I18n]);

    const t = (text, number) => I18n.translate(lang, text, number); // Функция перевода

    return t;
};

export default useTranslate;
