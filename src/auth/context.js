import { createContext, useMemo, useState } from "react";

/**
 * @type {React.Context<{}>}
 */
export const AuthContext = createContext({});

/**
 * Обертка над провайдером контекста, чтобы управлять изменениями в контексте
 * @param children
 * @return {JSX.Element}
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState({
    data: null,
    error: "",
    waiting: false,
    isLoading: true,
  });

  const value = useMemo(
    () => ({
      user,
      signIn: async (newUser, cb) => {
        setUser({ ...user, waiting: true });
        try {
          const response = await fetch(
            "/api/v1/users/sign?fields=_id,email,profile(name,phone)",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
            }
          );

          const data = await response.json();

          if (!response.ok) {
            setUser({ ...user, error: data.error.data.issues[0].message });
            return;
          }

          setUser({
            data: data.result.user,
            error: "",
            waiting: false,
          });
          localStorage.setItem("token", data.result.token);
          cb && cb();
        } catch (error) {
          console.error("Ошибка:", error);
          setUser({
            error: error,
            waiting: false,
            data: null,
          });
        }
      },

      authMe: async (cb) => {
        const token = localStorage.getItem("token");
        setUser({ ...user, isLoading: false });
        if (!token) return;
        setUser({ ...user, waiting: true });
        try {
          let response = await fetch(
            `/api/v1//users/self?fields=_id,email,profile(name,phone)`,
            {
              method: "GET",
              headers: {
                "X-Token": token,
              },
            }
          );

          const data = await response.json();

          setUser({
            data: data.result,
            error: "",
            waiting: false,
            isLoading: false,
          });
          cb && cb();
        } catch (error) {
          console.error("Ошибка:", error);
          setUser({
            error: error,
            waiting: false,
            data: null,
            isLoading: false,
          });
        }
      },

      signOut: () => {
        setUser({ ...user, data: null });
        localStorage.removeItem("token");
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
