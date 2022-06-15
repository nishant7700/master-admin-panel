import React from "react";

export default function SingleItem({ children, title, value }) {
  return (
    <div
      className="row"
      style={{ borderBottom: "1px solid #f1f1f1", padding: "10px" }}
    >
      <div className="col-md-6">
        <div className="title"> {title} </div>
      </div>
      <div className="col-md-6">
        {" "}
        {value} {children}{" "}
      </div>
    </div>
  );
}
