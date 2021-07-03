import React from 'react';
import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'


describe('App gets past `loading..` screen', ()=> {
  test('gets past: `loadinng..`', async () => {

    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500)
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500)
    
    render(  
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(screen.queryByText("Loading...")).toBeNull();

  })
})

describe('Buttons Show up', ()=> {
  test(' renders: Hide Story List', async () => {

    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500)
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500)
    
    render(  
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    expect(await screen.findByText("Hide Story List")).toBeInTheDocument();
    expect(await screen.findByText("Hide Story")).toBeInTheDocument();
    expect(await screen.findByText("Top (100)")).toBeInTheDocument();
    expect(await screen.findByText("New (100)")).toBeInTheDocument();
    expect(await screen.findByText("Ask (100)")).toBeInTheDocument();
    expect(await screen.findByText("Show (100)")).toBeInTheDocument();
    expect(await screen.findByText("Jobs (100)")).toBeInTheDocument();

  })
})

describe('title loads', ()=> {
  test(' renders: title', async () => {

    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500)
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500)

    render(  
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText(/HN: \([\S]{3,5}\)/)).toBeInTheDocument();

  })
})

describe('A story shows up in they story page', ()=> {
  test('renders Story', async () => {

    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500)
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500)

    render(  
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText(/Type:/)).toBeInTheDocument();

  })
})

describe('search box shows up', ()=> {
  test('renders search box', async () => {

    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500)
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500)

    render(  
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    
  })
})

describe('list shows up', () => {
  test('list shows up', async () => {

    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500)
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500)

    render(  
      <Provider store={store}>
        <App />
      </Provider>
    );
    
    expect(await screen.findAllByText(/Comments:/));
    
  })
})


describe('value is passed to search state', () => {
  test('renders value`', async () => {

    jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(1500)
    jest.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockReturnValue(500)


    const history = createMemoryHistory()
    history.push("/")
    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path="/">
            <App />
          </Route>
        </Router>
      </Provider>
    );
    
    userEvent.type(screen.getByRole('textbox'), "You dont know Javascript");
    userEvent.keyboard('{Enter}')
    expect(screen.getByRole('textbox')).toHaveValue("You dont know Javascript")
    expect(await screen.findByText(/Book Series/)).toBeInTheDocument();
    
  })
})