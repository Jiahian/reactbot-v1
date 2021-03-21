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
import ExploreDetail from "./explore/ExploreDetails";
import RelatedCareer from "./shop/RelatedCareer";
import IndustryTrack from "./admin/IndustryTrack";
import AddIndustryTrack from "./admin/AddIndustryTrack";
import Career from "./admin/Career";
import CareerPathway from "./admin/CareerPathway";
import CreatePathway from "./admin/CreatePathway";

class App extends Component {
  state = { selectedNode: { name: "hello" } };
  componentDidMount() {
    document.title = "Careerpedia";
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <NodeContext.Provider value={this.state.selectedNode}>
            <div>
              <Header />
              <Switch>
                <Route path="/login" component={LoginForm} />
                <Route path="/career-pathway/:id" component={CreatePathway} />
                <Route path="/career-pathway" component={CareerPathway} />
                <Route path="/career/:id?" component={Career} />
                <Route
                  path="/industry-track/add/:id?"
                  component={AddIndustryTrack}
                />
                <Route path="/industry-track/" component={IndustryTrack} />
                <Route path="/shop/career/:id" component={RelatedCareer} />
                <Route path="/shop/:id" component={ItemDetails} />
                <Route path="/shop" component={Shop} />
                <Route
                  path="/explore/detail/:id?/:subid?"
                  component={ExploreDetail}
                />
                <Route path="/explore/:id?" component={Explore} />
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
    document.getElementById("container");
  }
}

export default App;

//<Route exact path="/" component={Landing} />
