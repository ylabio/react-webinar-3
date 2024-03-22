import { memo, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

function openDisplay(id) {
  document.getElementById(id).style.display = "block";
}

function closeDisplay(id) {
  document.getElementById(id).style.display = "none";
}

function WritePannel({ id, session }) {
  return (
    <>
      {id != null ? (
        <>
          <div className="Show-Write-Panel" onClick={() => openDisplay(id)}>
            Ответить
          </div>
          {session ? (
            <div className="Write-Panel" id={id} style={{ display: "none" }}>
              <div className="Write-Panel-Header">Новый ответ </div>
              <textarea className="Write-Panel-Textarea" placeholder="Текст" />
              <button>Отправить</button>{" "}
              <button onClick={() => closeDisplay(id)}>Отмена</button>
            </div>
          ) : (
            <div className="Write-Panel" id={id} style={{ display: "none" }}>
              <>
                <Link className="Write-Panel-Login" to="/login">
                  Войдите
                </Link>
                , чтобы иметь возможность ответить.{" "}
                <div className="Write-Panel-Cancel" onClick={() => closeDisplay(id)}>Отмена</div>
              </>
            </div>
          )}
        </>
      ) : (
        <>
          {session ? (
            <div className="Write-Panel">
              <div className="Write-Panel-Header">Новый ответ </div>
              <textarea className="Write-Panel-Textarea" placeholder="Текст" />
              <button>Отправить</button>
            </div>
          ) : (
            <div className="Write-Panel">
              <>
                <Link className="Write-Panel-Login" to="/login">Войдите</Link>, чтобы иметь возможность комментировать.
              </>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default memo(WritePannel);
