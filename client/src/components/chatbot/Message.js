import React from "react";

const Message = (props) => {
  return (
    <div className="col-12 my-1">
      <div className="">
        <div className="row">
          {props.speaks === "bot" && (
            <div className="p-1">
              <a href="/" className="badge rounded-pill bg-primary">
                {props.speaks}
              </a>
            </div>
          )}
          <div
            className="flex-fill m-0 p-1 alert alert-primary"
            style={{ whiteSpace: "pre-line" }}
          >
            <span>{props.text}</span>
          </div>
          {props.speaks === "user" && (
            <div className="p-1">
              <a href="/" className="badge rounded-pill bg-primary">
                {props.speaks}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
