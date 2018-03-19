import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//Import each component here
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile.js';
import Upgrade from './components/Upgrade/Upgrade';
import Inventory from './components/Inventory/Inventory';
import Search from './components/Search/Search';
import TestComp from './components/TestComp/TestComp';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        

      
        <HashRouter>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/profile' component={Profile} />
            <Route path='/upgrade' component={Upgrade} />
            <Route path='/testcomp' component={TestComp} />
            <Route path='/search' component={Search} />
            <Route path='/inventory' component={Inventory} />
          </Switch>
        </HashRouter>

      </div>
    );
  }
}

export default App;
