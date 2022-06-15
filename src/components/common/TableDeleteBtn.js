import React from "react";

function TableDeleteBtn({ id, deleteBtnClicked }) {
  return (
    <button onClick={() => deleteBtnClicked(id)} className="btn text-danger">
      <i className="fa fa-trash"></i>
    </button>
  );
}

export default TableDeleteBtn;
