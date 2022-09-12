import React, { Component } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router, 
  Switch,
  Route
} from 'react-router-dom';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle } from "@fortawesome/free-solid-svg-icons"



// import PortfolioContainer from './portfolio/portfolio-container';
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from './pages/portfolio-manager';
import PortfolioDetail from"./portfolio/portfolio-detail";
import Auth from "./pages/auth"
import noMatch from './pages/no-match';

library.add(faTrash, faSignOutAlt, faEdit, faSpinner, faPlusCircle);



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInStatus: "Not_Logged_In"
    };
    
    this.handleSuccessfullLogin = this.handleSuccessfullLogin.bind(this)
    this.handleUnsuccessfullLogin = this.handleUnsuccessfullLogin.bind(this)
    this.handleSuccessfullLogout = this.handleSuccessfullLogout.bind(this)
  }

  handleSuccessfullLogin() {
    this.setState({
      loggedInStatus: "Logged_In"
    })
  }

  
  handleUnsuccessfullLogin() {
    this.setState({
      loggedInStatus: "Not_Logged_In"
    })
  }

  handleSuccessfullLogout() {
    this.setState({
      loggedInStatus: "Not_Logged_In"
    })
  }

  checkLoginStatus() {
    return axios
      .get("https://api.devcamp.space/logged_in", { 
        withCredentials: true 
      })
      .then(response => {
        const loggedIn = response.data.logged_in;
        const loggedInStatus = this.state.loggedInStatus;
        
        if (loggedIn && loggedInStatus === "Logged_in") {
          return loggedIn;
        } else if (loggedIn && loggedInStatus === "Not_Logged_In") {
          this.setState({
            loggedInStatus: "Logged_In"
          });
        } else if (!loggedIn && loggedInStatus === "Logged_In") {
          this.setState({
            loggedInStatus: "Not_Logged_In"
          });
        }
      })
      .catch(error => {
        console.log("Error", error);
      });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route key="portfolio-manager" path="/portfolio-manager" component={PortfolioManager} />
    ]
  }

 
    render() {
    return (
      <div className="container">
        <Router>
          <div>
          <NavigationContainer 
          loggedInStatus={this.state.loggedInStatus} 
          handleSuccessfullLogout={this.handleSuccessfullLogout}
          />

          <Switch>
            <Route exact path="/" component={Home} />

            <Route exact path="/auth" render={props => (
              <Auth
                {...props}
                handleSuccessfullLogin={this.handleSuccessfullLogin}
                handleUnsuccessfullLogin={this.handleUnsuccessfullLogin} 
              />
            )} 
          />


            <Route exact path="/about-me" component={About} />
            <Route exact path="/contact" component={Contact} />

            <Route exact path="/blog" 
              render={props => (
                <Blog {...props} loggedInStatus={this.state.loggedInStatus} />
              )}

             />

            <Route path="/b/:slug" component={BlogDetail} />
            {this.state.loggedInStatus === "Logged_In" ? this.authorizedPages() : null}
            <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
            <Route component={noMatch} />
          </Switch>
          </div>
        </Router>

        
      </div>
    );
  }
}
