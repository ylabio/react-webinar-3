import { memo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./style.css";

function openDisplay(id) {
  document.getElementById(id).style.display = "block";
}

function closeDisplay(id) {
  document.getElementById(id).style.display = "none";
}

function WritePannel({ id, session, postComment, token }) {
  function postAndClose() {
    closeDisplay("write" + id);
    document.getElementById("textarea" + id).value
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
          <div
            className="Show-Write-Panel"
            onClick={() => openDisplay("write" + id)}
          >
            Ответить
          </div>
          {session ? (
            <div
              className="Write-Panel"
              id={"write" + id}
              style={{ display: "none", paddingLeft: '30px' }}
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
                <Link className="Write-Panel-Login" to="/login">
                  Войдите
                </Link>
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
              <div className="Write-Panel-Header">Новый ответ </div>
              <textarea
                className="Write-Panel-Textarea"
                id={"textarea" + id}
                placeholder="Текст"
              />
              <button
                onClick={() =>
                  document.getElementById("textarea" + id).value
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
