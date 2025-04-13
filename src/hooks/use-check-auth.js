import useSelector from './use-selector';

const useCheckAuth = () => {
    const { isLoggedIn, authToken } = useSelector(state => state.auth);

    return { status: isLoggedIn, token: authToken };
}

export default useCheckAuth;