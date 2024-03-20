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
    name: state.session.name,
  }));

  useEffect(() => {
    if (token && !select.name) {
      store.actions.session.getName();
    }
  }, [store]);

  const callbacks = {
    toLoginForm: useCallback(() => {
      store.actions.session.clearError();
      navigate("/login");
    }, [store]),

    onLogout: useCallback(() => {
      // Нужно удалять сессию через DELETE api реквест?
      localStorage.removeItem("token");
      store.actions.user.clearData();
      store.actions.session.clearData();
      navigate("/");
    }, [store]),
  };

  return (
    <div className={cn("")}>
      <SideLayout padding="medium10x20" side={"end"}>
        {select.name ? (
          <div>
            <Link className={cn("link")} to="/profile">
              {select.name}
            </Link>
            <button className={cn("btn")} onClick={callbacks.onLogout}>
              {t("auth.close")}
            </button>
          </div>
        ) : (
          <button onClick={callbacks.toLoginForm}>{t("auth.open")}</button>
        )}
      </SideLayout>
    </div>
  );
}

export default memo(Authorization);
