import React from "react";

const Card = (props) => {
  return (
    <div style={{ width: 270, paddingRight: 20, float: "left" }}>
      <div className="card">
        <img
          className="card-img-top"
          alt={props.payload.fields.header.stringValue}
          src={props.payload.fields.image.stringValue}
        />
        <div className="card-body">
          <h5 className="card-title">
            {props.payload.fields.header.stringValue}
          </h5>
          <p>
            {props.payload.fields.description.stringValue}
            <a> {props.payload.fields.price.stringValue}</a>
          </p>
          <a
            class="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            href={props.payload.fields.link.stringValue}
          >
            Get now!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
