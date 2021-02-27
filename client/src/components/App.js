import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Explore from "./explore/Explore";
import Shop from "./shop/Shop";
import Chatbot from "./chatbot/Chatbot";
import ItemDetails from "./shop/ItemDetails";
import NotFound from "./pages/NotFound";
import LoginForm from "./pages/LoginForm";
import Compare from "./pages/Compare";
import NodeContext from "./context/nodeContext";

class App extends Component {
  state = { selectedNode: { name: "hello" } };
  render() {
    return (
      <div>
        <BrowserRouter>
          <NodeContext.Provider value={this.state.selectedNode}>
            <div>
              <Header />
              <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/shop/:id" component={ItemDetails} />
                <Route path="/shop" component={Shop} />
                <Route path="/explore" component={Explore} />
                <Route path="/compare" component={Compare} />
                <Route path="/not-found" component={NotFound} />

                <Redirect from="/" to="/explore" />
                <Redirect to="/not-found" />
              </Switch>
              <Chatbot />
            </div>
          </NodeContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

//<Route exact path="/" component={Landing} />
