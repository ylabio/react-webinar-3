import { useMemo } from 'react';
import { getTranslate } from './index';
import useSelector from '../store/use-selector';

export function useTranslate() {

    const select = useSelector(state => ({
        lang: state.locale.lang,
    }));

    const t = useMemo(() => {
        return getTranslate(select.lang);
    }, [select.lang]);

    return t;
}