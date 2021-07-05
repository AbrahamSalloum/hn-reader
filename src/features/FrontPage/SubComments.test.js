import React from 'react';
import { render, screen } from '@testing-library/react';
import SubComments from './SubComments';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux'
import counterReducer from './hnreducers'


describe('test comments', () => {
  test('test comments`', async () => {

    const initialState = {
      counter: {
        top: [27694537, 27722333, 27695181, 27695658],
        currstory: 27722333,
        listpending: false,
        storyloading: false,
        details: {
          by: 'vackosar',
          descendants: 18,
          id: 27722333,
          kids: [
            27722546,
            27726842,
            27723664,
            27723340,
            27722971
          ],
          score: 134,
          time: 1625326745,
          title: 'Wav2vec Overview: Semi and Unsupervised Speech Recognition',
          type: 'story',
          url: 'https://vaclavkosar.com/ml/Wav2vec2-Semi-and-Unsupervised-Speech-Recognition'
        }
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
          <SubComments comments={[27722546,27726842,27723664,27723340,27722971]} />
          </Route>
        </Router>
      </Provider>
    );


    expect(await screen.findAllByText(/Expand[\s]{1,}[\d]{1,}[\s]{1,}Comments/)).toBeTruthy()
  })
})


