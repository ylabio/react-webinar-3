import { memo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";
function WritePannel({ id, session, postComment, token, level }) {
  function getPixels(s) {
    return Number(String(s).replace("px", ""));
  }

  function openDisplay(id) {
    for (var otherDisplay of document.getElementsByClassName("Write-Panel")) {
      if (otherDisplay.id) otherDisplay.style.display = "none";
    }
    var panel = document.getElementById("write" + id);
    panel.style.display = "block";

    var nexElement = document.getElementById(id);
    var parentPadding = getPixels(
      document.getElementById(id).style.paddingLeft
    );
    while (
      getPixels(nexElement.nextSibling.style.paddingLeft) > parentPadding
    ) {
      nexElement = nexElement.nextSibling;
    }
    panel.style.marginLeft =
      String(parentPadding + 30 - getPixels(nexElement.style.paddingLeft)) +
      "px";
      
    nexElement.appendChild(panel);
    document.getElementById('textarea' + id).style.width = String(944 - (level * 30)) + 'px';
    console.log(level);
    var topPos = panel.offsetTop;
    window.scrollTo(0, topPos - 200);
  }

  function closeDisplay(id) {
    document.getElementById(id).style.display = "none";
  }
  const navigate = useNavigate();
  function postAndClose() {
    closeDisplay("write" + id);
    document.getElementById("textarea" + id).value.replaceAll(" ", "").length >
    0
      ? postComment(
          document.getElementById("textarea" + id).value,
          { _id: id, _type: "comment" },
          token
        )
      : alert("Текст комментария не может быть пустым");
  }
  var articcleId = useParams().id;
  return (
    <>
      {id != null ? (
        <>
          <div className="Show-Write-Panel" onClick={() => openDisplay(id)}>
            Ответить
          </div>
          {session ? (
            <div
              className="Write-Panel"
              id={"write" + id}
              style={{ display: "none" }}
            >
              <div className="Write-Panel-Header">Новый ответ </div>
              <textarea
                className="Write-Panel-Textarea"
                id={"textarea" + id}
                placeholder="Текст"
              />
              <button onClick={() => postAndClose()}>Отправить</button>{" "}
              <button onClick={() => closeDisplay("write" + id)}>Отмена</button>
            </div>
          ) : (
            <div
              className="Write-Panel"
              id={"write" + id}
              style={{ display: "none" }}
            >
              <>
                <div
                  className="Write-Panel-Login"
                  onClick={() =>
                    navigate("/login", { state: { back: location.pathname } })
                  }
                >
                  Войдите
                </div>
                , чтобы иметь возможность ответить.{" "}
                <div
                  className="Write-Panel-Cancel"
                  onClick={() => closeDisplay("write" + id)}
                >
                  Отмена
                </div>
              </>
            </div>
          )}
        </>
      ) : (
        <>
          {session ? (
            <div className="Write-Panel">
              <div className="Write-Panel-Header">Новый комментарий</div>
              <textarea
                className="Write-Panel-Textarea"
                id={"textarea" + id}
                placeholder="Текст"
              />
              <button
                onClick={() =>
                  document
                    .getElementById("textarea" + id)
                    .value.replaceAll(" ", "").length > 0
                    ? postComment(
                        document.getElementById("textarea" + id).value,
                        { _id: articcleId, _type: "article" },
                        token
                      )
                    : alert("Текст комментария не может быть пустым")
                }
              >
                Отправить
              </button>
            </div>
          ) : (
            <div className="Write-Panel">
              <>
                <Link className="Write-Panel-Login" to="/login">
                  Войдите
                </Link>
                , чтобы иметь возможность комментировать.
              </>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default memo(WritePannel);
