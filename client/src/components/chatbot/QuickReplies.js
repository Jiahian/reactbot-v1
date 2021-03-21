import React, { Component } from "react";
import QuickReply from "./QuickReply";

class QuickReplies extends Component {
  constructor(props) {
    super(props);
    this._handleClick = this._handleClick.bind(this);
  }

  _handleClick(event, payload, text) {
    this.props.replyClick(event, payload, text);
  }

  renderQuickReply(reply, i) {
    return <QuickReply key={i} click={this._handleClick} reply={reply} />;
  }

  renderQuickReplies(quickReplies) {
    if (quickReplies) {
      return quickReplies.map((reply, i) => {
        return this.renderQuickReply(reply, i);
      });
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="col-12">
        <div className="">
          <div className="row">
            <div className="p-1">
              <a className="badge rounded-pill bg-primary">
                {this.props.speaks}
              </a>
            </div>
            <div
              id="quick-replies"
              className="flex-fill m-0 p-1 alert alert-primary"
            >
              {this.props.text && <p>{this.props.text.stringValue}</p>}
              {this.renderQuickReplies(this.props.payload)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickReplies;
