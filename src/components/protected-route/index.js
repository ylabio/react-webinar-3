import { Navigate, useLocation } from 'react-router-dom';
import useSelector from '../../hooks/use-selector';

function ProtectedRoute({ children }) {
  const { user, isAuthChecked } = useSelector(state => state.auth);
  const location = useLocation();

  // Пока проверяем токен, показываем лоадер
  if (!isAuthChecked) {
    return <div>Загрузка...</div>; // Или компонент <Spinner />
  }

  // Если проверка завершена, но пользователя нет — редирект
  if (!user) {
    return <Navigate to={`/login?from=${encodeURIComponent(location.pathname)}`} replace />;
  }

  // Если user есть — рендерим children
  return children;
}

export default ProtectedRoute;
