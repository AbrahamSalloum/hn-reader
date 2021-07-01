import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryList from './StoryList';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import counterReducer from './hnreducers'




describe('storylist renders', () => {
  test('renders storylist`', async () => {

    const initialState = {
      counter: {
        top: [27694537, 27695181, 27695658]
      }
    };

    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500)
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500)

    const reducers = combineReducers({ counter: counterReducer })
    const store = createStore(reducers, initialState);



    const history = createMemoryHistory()
    history.push("/")
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/">
            <StoryList cat={"Top"} />
          </Route>
        </Router>
      </Provider>
    );
    screen.debug()
    expect(await screen.findByText(/The most precious resource is agency/)).toBeInTheDocument();
  })
})

describe('bogus storylist renders', () => {
  test('does not renders storylist`', async () => {

    const initialState = {
      counter: {
        top: [27694537, "ICANTBE", 27695181, 27695658]
      }
    };

    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500)
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500)

    const reducers = combineReducers({ counter: counterReducer })
    const store = createStore(reducers, initialState);



    const history = createMemoryHistory()
    history.push("/")
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/">
            <StoryList cat={"Top"} />
          </Route>
        </Router>
      </Provider>
    );

    expect(await screen.findByText(/The most precious resource is agency/)).toBeInTheDocument();
    expect(await screen.findByText("Loading...ICANTBE")).toBeInTheDocument();
    screen.debug()
  })
})