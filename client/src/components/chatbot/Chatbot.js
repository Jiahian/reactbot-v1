import React, { Component } from "react";
import axios from "axios/index";
import Cookies from "universal-cookie";
import { v4 as uuid } from "uuid";
import Message from "./Message";
import Card from "./Card";
import QuickReplies from "./QuickReplies";

const cookies = new Cookies();

class Chatbot extends Component {
  messagesEnd;
  talkInput;
  constructor(props) {
    super(props);

    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this._handleQuickReplyPayload = this._handleQuickReplyPayload.bind(this);

    this.hide = this.hide.bind(this);
    this.show = this.show.bind(this);

    this.state = {
      messages: [],
      showBot: false,
    };

    if (cookies.get("userID") === undefined) {
      cookies.set("userID", uuid(), { path: "/" });
    }
    console.log(cookies.get("userID"));
  }
  async df_text_query(queryText) {
    let says = {
      speaks: "user",
      msg: {
        text: {
          text: queryText,
        },
      },
    };
    this.setState({ messages: [...this.state.messages, says] });
    const res = await axios.post("/api/df_text_query", {
      text: queryText,
      userID: cookies.get("userID"),
    });
    // const request = {
    //     queryInput: {
    //         text: {
    //             text: text,
    //             languageCode: 'en-US',
    //         },
    //     }
    // };

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
    //await this.df_client_call(request);
  }

  async df_event_query(eventName) {
    const res = await axios.post("/api/df_event_query", {
      event: eventName,
      userID: cookies.get("userID"),
    });

    for (let msg of res.data.fulfillmentMessages) {
      let says = {
        speaks: "bot",
        msg: msg,
      };
      this.setState({ messages: [...this.state.messages, says] });
    }
  }

  componentDidMount() {
    this.df_event_query("Welcome"); //greeting from the bot at the start
  }

  componentDidUpdate() {
    this.messagesEnd.scrollIntoView({ behaviour: "smooth" });
    if (this.talkInput) {
      this.talkInput.focus();
    }
  }

  show(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: true });
  }

  hide(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({ showBot: false });
  }

  _handleQuickReplyPayload(event, payload, text) {
    event.preventDefault();
    event.stopPropagation();

    switch (payload) {
      case "training_masterclass":
        this.df_event_query("MASTERCLASS");
      default:
        this.df_text_query(text);
        break;
    }
  }

  renderCards(cards) {
    return cards.map((card, i) => <Card key={i} payload={card.structValue} />);
  }

  renderOneMessage(message, i) {
    if (message.msg && message.msg.text && message.msg.text.text) {
      return (
        <Message key={i} speaks={message.speaks} text={message.msg.text.text} />
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.cards
    ) {
      return (
        <div key={i}>
          <div className="alert alert-primary" style={{ zIndex: 1 }}>
            <div style={{ overflow: "hidden" }}>
              <div className="">
                <a href="/" className="badge rounded-pill bg-primary">
                  {message.speaks}
                </a>
              </div>
              <div style={{ overflowX: "auto", overflowY: "scroll" }}>
                <div
                  style={{
                    height: 300,
                    width:
                      message.msg.payload.fields.cards.listValue.values.length *
                      270,
                  }}
                >
                  {this.renderCards(
                    message.msg.payload.fields.cards.listValue.values
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (
      message.msg &&
      message.msg.payload &&
      message.msg.payload.fields &&
      message.msg.payload.fields.quick_replies
    ) {
      return (
        <QuickReplies
          text={
            message.msg.payload.fields.text
              ? message.msg.payload.fields.text
              : null
          }
          key={i}
          replyClick={this._handleQuickReplyPayload}
          speaks={message.speaks}
          payload={message.msg.payload.fields.quick_replies.listValue.values}
        />
      );
    }
  }

  renderMessages(stateMessages) {
    if (stateMessages) {
      return stateMessages.map((message, i) => {
        return this.renderOneMessage(message, i);
      });
    } else {
      return null;
    }
  }

  //Get user input
  _handleInputKeyPress(e) {
    if (e.key === "Enter") {
      this.df_text_query(e.target.value);
      e.target.value = "";
    }
  }

  render() {
    if (this.state.showBot) {
      return (
        <div
          style={{
            height: "100vh",
            width: "40vw",
            position: "fixed",
            bottom: 0,
            right: 0,
            border: "1px solid light-grey",
            backgroundColor: "rgba(255,255,255,0.5)",
          }}
        >
          <div
            className="bg-secondary p-2 d-flex flex-nowrap justify-content-between"
            onClick={this.hide}
          >
            <i className="fas fa-robot text-white"></i>
            <i
              class="fas fa-times text-white"
              style={{ cursor: "pointer" }}
            ></i>
          </div>

          <div
            id="chatbot"
            className=""
            style={{ height: "90vh", width: "100%", overflow: "auto" }}
          >
            {this.renderMessages(this.state.messages)}
            <div
              ref={(el) => {
                this.messagesEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            ></div>
            <div className="col-12">
              <input
                className="form-control my-2"
                placeholder="Type a message"
                type="text"
                ref={(input) => {
                  this.talkInput = input;
                }}
                onKeyPress={this._handleInputKeyPress}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          style={{
            minHeight: 64,
            maxHeight: 500,
            width: 150,
            position: "fixed",
            bottom: 10,
            right: 10,
            border: "1px solid light-grey",
          }}
        >
          <div
            className="bg-secondary p-2 pt-3 d-flex flex-wrap justify-content-center text-white"
            style={{ borderRadius: "8px", cursor: "pointer" }}
            onClick={this.show}
          >
            <i
              className="fas fa-robot text-white"
              style={{ fontSize: "2rem" }}
            ></i>

            <p className="m-0">Ask me anything!</p>
          </div>

          <div
            ref={(el) => {
              this.messagesEnd = el;
            }}
            style={{ float: "left", clear: "both" }}
          ></div>
        </div>
      );
    }
  }
}

export default Chatbot;
