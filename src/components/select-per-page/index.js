import {memo} from "react";
import './style.css';
function SelectPerPage({onChangePerPage, translation, perPage}) {
  const handlerSelectPerPage = (e) => {
    onChangePerPage(Number(e.target.value));
  };
  return (
    <form className="SelectPerPage">
      {/*<select onChange={handlerSelectPerPage} value={perPage} name="per-page">*/}
      {/*  <option value="5">5</option>*/}
      {/*  <option value="10">10</option>*/}
      {/*  <option value="25">25</option>*/}
      {/*  <option value="50">50</option>*/}
      {/*</select>*/}
      {/*<span>{translation}</span>*/}
    </form>
  );
}

export default memo(SelectPerPage);
