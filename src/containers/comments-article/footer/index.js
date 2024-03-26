import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import FormComments from "../../../components/comments/form-comments";
import AuthAlert from "../../../components/comments/auth-alert";
import { Link, useLocation, useParams } from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../../hooks/use-translate";
import useSelector from "../../../hooks/use-selector";
import shallowEqual from "shallowequal";
import commentsActions from "./../../../store-redux/comments/actions";
import FooterLayout from "../../../components/comments/footer-layout";
function FooterComments() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslate();
  const isAuth = useSelector((state) => state.session.user?.username);
  const selectRedux = useSelectorRedux(
    (state) => ({
      type: state.comments.typeComments,
    }),
    shallowEqual
  );
  const callbacks = {
    addComment: useCallback(
      (text) => {
        dispatch(
          commentsActions.add({
            text: text,
            parent: {
              _id: id,
              _type: "article",
            },
          })
        );
      },
      [id]
    ),
  };

  const link = useMemo(
    () => (
      <Link to={"/login"} state={{ back: pathname }}>
        {t("comment.textLink")}
      </Link>
    ),
    [pathname]
  );
  return (
    <FooterLayout>
      {selectRedux.type == "article" &&
        (isAuth ? (
          <FormComments
            cb={callbacks.addComment}
            labelBtn={t("comment.send")}
            label={t("comment.new")}
          />
        ) : (
          <AuthAlert text={t("comment.textAuthAlert")}> {link}</AuthAlert>
        ))}
    </FooterLayout>
  );
}

export default memo(FooterComments);
