import React from 'react';
import {FrontPage}  from './features/FrontPage/FrontPage';
import  UserInfo  from './features/FrontPage/UserInfo';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;