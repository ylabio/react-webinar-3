import useSelector from '../../hooks/use-selector';

function AuthCheck({ showIfTrue, showIfFalse }) {
  const exists = useSelector((state) => state.session.exists);
  return exists ? showIfTrue() : showIfFalse();
}

export default AuthCheck;
