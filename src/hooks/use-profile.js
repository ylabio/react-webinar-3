import useSelector from "../hooks/use-selector";

/**
 * Хук возвращает профиль пользователя
 */
export default function useProfile() {
  const profile = useSelector(state => ({
    data: state.profile.user,
    waiting: state.profile.waiting,
    isChecked: state.profile.isChecked,
    message: state.profile.message
  }));

  return profile;
}
