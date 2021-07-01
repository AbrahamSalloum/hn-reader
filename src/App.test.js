import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';


const x = (
  <Provider store={store}>
    <App />
  </Provider>
)

describe('App gets past `loading..` screen', ()=> {
  test('gets past: `loadinng..`', async () => {
    render(x);
    expect(screen.queryByText("Loading...")).toBeNull();
  })
})

describe('Buttons Show up', ()=> {
  test(' renders: Hide Story List', async () => {
    render(x);
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
    render(x);
    expect(await screen.findByText(/HN: \([\S]{3,5}\)/)).toBeInTheDocument();
  })
})

describe('A story shows up in they story page', ()=> {
  test('renders Story', async () => {
    render(x);
    expect(await screen.findByText("Type: story")).toBeInTheDocument();
  })
})

describe('search box shows up', ()=> {
  test('renders search box', async () => {
    render(x);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  })
})