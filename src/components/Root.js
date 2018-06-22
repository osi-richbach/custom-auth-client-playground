import React, { Component } from 'react';
import { MemoryRouter } from 'react-router';
import App from './App';

export default class Root extends Component {
  render() {
    return (
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  }
}
