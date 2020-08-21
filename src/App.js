import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './App.scss';
import '@material/react-material-icon/dist/material-icon.css';

import Art from './views/Art';
import Web from './views/Web';
import Home from './views/Home';
import Nav from './components/Nav';
import { Provider } from './contexts';

function App() {
  return (
    <Provider>
      <Router>
        <Nav />
        <Route path='/art-works'>
          {({ match }) => <Art show={match !== null} />}
        </Route>
        <Route path='/web-works'>
          {({ match }) => <Web show={match !== null} />}
        </Route>
        <Route path='/' exact>
          {({ match }) => <Home show={match !== null} />}
        </Route>
      </Router>
    </Provider>
  );
}

export default App;
