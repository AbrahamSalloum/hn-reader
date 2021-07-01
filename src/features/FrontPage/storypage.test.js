import React from 'react';
import { render, screen } from '@testing-library/react';
import StoryPage from './storypage';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import { createStore, combineReducers} from 'redux'
import counterReducer from './hnreducers'




describe('storypage renders', () => {
  test('renders storyid`', async () => {

    const initialState = {
      counter: {
        details: {
          by: 'gmays',
          descendants: 10,
          id: 27694222,
          kids: [27695494, 27695285, 27695382, 27695282, 27695294],
          score: 24,
          time: 1625092117,
          title: 'Success in Reversing Dementia in Mice Sets the Stage for Human Clinical Trials',
          type: 'story',
          url: 'https://www.tohoku.ac.jp/en/press/eversing_dementia_stage_set_for_human_clinical_trials.html'
        },
        currstory: "27690570"
      }
    };

    const reducers = combineReducers({ counter: counterReducer})
    const store = createStore(reducers, initialState);

    const history = createMemoryHistory()
    history.push("/")
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/">
            <StoryPage/>
          </Route>
        </Router>
      </Provider>
    );
    expect(await screen.findByText("Success in Reversing Dementia in Mice Sets the Stage for Human Clinical Trials")).toBeInTheDocument();
    //screen.debug()
  })

})