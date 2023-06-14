import {memo} from "react";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import "./style.css";

function EnterRequirement({visible, chosenComment, onChoseComment, onNavigate, hasChild, answerRef}) {
  
  const cn = bem("EnterRequirement");

  return (
      <div style={{paddingLeft: !hasChild ? 30 : 0}} ref={visible ? answerRef : null}>
        <div className={cn(visible ? "" : "hidden")}>
          <a onClick={onNavigate} className={cn("link")}>Войдите</a>
          <p>, чтобы иметь возможность {chosenComment ? "ответить" : "комментировать"}.&nbsp;</p>
          {chosenComment && <p className={cn("cancel")} onClick={() => onChoseComment(null)}>Отмена</p>}
        </div>
      </div>
  );
}

EnterRequirement.propTypes = {
  visible: PropTypes.bool,
  onChoseComment: PropTypes.func,
  onNavigate: PropTypes.func,
  hasChild: PropTypes.bool,
  answerRef: PropTypes.oneOfType([PropTypes.shape({current: PropTypes.instanceOf(Element)})]),
  chosenComment: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
};

EnterRequirement.defaultProps = {
  visible: false,
  chosenComment: null,
  hasChild: true,
  onChoseComment: () => {},
  onNavigate: () => {},
};

export default memo(EnterRequirement);
