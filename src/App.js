import React from 'react';
import {FrontPage}  from './features/FrontPage/FrontPage';
import  UserInfo  from './features/FrontPage/UserInfo';
import StoryPage from './features/FrontPage/storypage';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import './features/FrontPage/hn-k.css'

function App() {
  return(
    <div>
      <Router>
        <Switch>
          <Route path="/user/:user" exact>
            <UserInfo />
          </Route>
          <Redirect from="/" to="/top" exact/>
          <Route path="/:cat" exact>
            <FrontPage />
          </Route>
          <Route path="/story/:storyid" exact>
            <StoryPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;