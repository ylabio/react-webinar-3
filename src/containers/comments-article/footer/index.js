import { useDispatch, useSelector as useSelectorRedux } from "react-redux";
import FormComments from "../../../components/comments/form-comments";
import AuthAlert from "../../../components/comments/auth-alert";
import {
  Link,
  useLocation,
  useNavigationType,
  useParams,
} from "react-router-dom";
import { memo, useCallback, useMemo } from "react";
import useTranslate from "../../../hooks/use-translate";
import useSelector from "../../../hooks/use-selector";
import shallowEqual from "shallowequal";
import commentsActions from "./../../../store-redux/comments/actions";
import FooterLayout from "../../../components/comments/footer-layout";
import AutoScroll from "../../auto-scroll";
function FooterComments() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { t, lang } = useTranslate();
  const isAuth = useSelector((state) => state.session.user?.username);
  const typeNavigation = useNavigationType();

  const selectRedux = useSelectorRedux(
    (state) => ({
      type: state.comments.typeComments,
      idAfterRedirect: state.comments.idAfterRedirect,
      waiting: state.comments.waiting,
      clickedId: state.comments.showFormController.clickedId,
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
      <Link
        to={"/login"}
        state={{ back: pathname }}
        onClick={() => dispatch(commentsActions.setIdAfterRedirect(id))}
      >
        {t("comment.textLink")}
      </Link>
    ),
    [lang]
  );
  return (
    <AutoScroll
      isScroll={
        typeNavigation === "REPLACE" &&
        selectRedux.idAfterRedirect === id &&
        !selectRedux.waiting &&
        !selectRedux.clickedId
      }
    >
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
    </AutoScroll>
  );
}

export default memo(FooterComments);
