import React from 'react';
import { render, screen  } from '@testing-library/react';
import UserInfo from './UserInfo';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import { store } from '../../app/store';

// why doesn't this work?
describe('user page renders userdata', ()=> {
  test('renders userdata`', async () => {
    const history = createMemoryHistory()
    history.push("/user/pygar")
    render(
        <Provider store={store}>
          <Router  history={history}>
            <Route path="/user/:user">
              <UserInfo />
            </Route>
          </Router>
        </Provider>
    );
      expect(await screen.findByText("pygar")).toBeInTheDocument();
    })
  })