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
import ExploreDetail from "./explore/ExploreDetails";
import RelatedCareer from "./shop/RelatedCareer";
import IndustryTrack from "./admin/IndustryTrack";
import AddIndustryTrack from "./admin/AddIndustryTrack";
import Career from "./admin/Career";
import CareerPathway from "./admin/CareerPathway";
import CreatePathway from "./admin/CreatePathway";
import RegisterForm from "./pages/RegisterForm";
import AuthService from "../services/authService";
import Category from "./admin/Category";
import AddCategory from "./admin/AddCategory";
import Course from "./admin/Course";

class App extends Component {
  state = { currentUser: undefined };
  componentDidMount() {
    document.title = "Careerpedia";
    const currentUser = AuthService.getCurrentUser();

    if (currentUser) {
      this.setState({
        currentUser,
      });
    }
  }

  logOut = () => {
    AuthService.logout();
    window.location = "/";
  };

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header currentUser={this.state.currentUser} logout={this.logOut} />
            <Switch>
              <Route path="/login" component={LoginForm} />
              <Route path="/register" component={RegisterForm} />
              <Route path="/career-pathway/:id" component={CreatePathway} />
              <Route path="/career-pathway" component={CareerPathway} />
              <Route path="/career/:id?" component={Career} />
              <Route
                path="/industry-track/add/:id?"
                component={AddIndustryTrack}
              />
              <Route path="/industry-track" component={IndustryTrack} />
              <Route path="/course/:id?" component={Course} />
              <Route path="/category/add/:id?" component={AddCategory} />
              <Route path="/category" component={Category} />
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
        </BrowserRouter>
      </div>
    );
    document.getElementById("container");
  }
}

export default App;

//<Route exact path="/" component={Landing} />
