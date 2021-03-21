import React from "react";

const QuickReply = (props) => {
  if (props.reply.structValue.fields.payload) {
    return (
      <a
        className="btn btn-outline-primary m-1"
        onClick={(event) =>
          props.click(
            event,
            props.reply.structValue.fields.payload.stringValue,
            props.reply.structValue.fields.text.stringValue
          )
        }
      >
        {props.reply.structValue.fields.text.stringValue}
      </a>
    );
  } else {
    return (
      <a
        style={{ margin: 3 }}
        href={props.reply.structValue.fields.link.stringValue}
        target="_blank"
        className="btn btn-outline-primary m-1"
      >
        {props.reply.structValue.fields.text.stringValue}
      </a>
    );
  }
};

export default QuickReply;
