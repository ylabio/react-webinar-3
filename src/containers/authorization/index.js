import { memo, useCallback, useEffect } from "react";
import useTranslate from "../../hooks/use-translate";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import SideLayout from "../../components/side-layout";
import { useNavigate, Link } from "react-router-dom";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function Authorization() {
  const store = useStore();
  const cn = bem("Auth");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { t } = useTranslate();

  const select = useSelector((state) => ({
    username: state.user.username,
  }));

  useEffect(() => {
    if (token && !select.username) {
      store.actions.user.getSelf();
    }
  }, [store]);

  const callbacks = {
    toLoginForm: useCallback(() => {
      store.actions.user.clearError();
      navigate("/login");
    }, [store]),

    onLogout: useCallback(() => {
      // Нужно удалять сессию через DELETE api реквест?
      localStorage.removeItem("token");
      store.actions.user.clearData();
      navigate("/");
    }, []),
  };

  return (
    <SideLayout padding="medium10x20" side={"end"}>
      {select.username ? (
        <>
          <Link className={cn("link")} to="/profile">
            {select.username}
          </Link>
          <button className={cn("btn")} onClick={callbacks.onLogout}>
            {t("auth.close")}
          </button>
        </>
      ) : (
        <button onClick={callbacks.toLoginForm}>{t("auth.open")}</button>
      )}
    </SideLayout>
  );
}

export default memo(Authorization);
