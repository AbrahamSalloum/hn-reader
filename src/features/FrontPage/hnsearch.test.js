import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import SearchSuggest from './hnsearch';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import counterReducer from './hnreducers'
import userEvent from '@testing-library/user-event';




describe('value is passed to search state', () => {
  test('renders value`', async () => {

    const initialState = {
      counter: {
        top: []
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
            <SearchSuggest />
          </Route>
        </Router>
      </Provider>
    );

    userEvent.type(screen.getByRole('textbox'), 'You dont know Javascript')
    expect(screen.getByRole('textbox')).toHaveValue("You dont know Javascript")
  })
})