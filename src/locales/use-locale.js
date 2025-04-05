import useSelector from '../store/use-selector';

export function useLocale() {

    const select = useSelector(state => ({
        lang: state.locale.lang,
    }));

    return select.lang;
}