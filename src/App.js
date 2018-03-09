import React, { Component } from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
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
       <nav class="nav">

<div class="nav-wrapper">

    <div class="logo">
        Logo here
    </div>

    <ul class="links">
        <li class="link"><a href="/#/search"><div class="link">Search</div></a></li>
        <li class="link"><a href="/#/upgrade"><div class="link">Upgrade</div></a></li>
        <li class="link"><a href="/#/dashboard"><div class="link">Dashboard</div></a></li>
        <li class="link"><a href="/#/profile"><div class="link">Edit Profile</div></a></li>
        <li class="link"><a href="/#/inventory"><div class="link">Inventory</div></a></li>
        <li class="link"><a href="http://localhost:3535/auth/logout"><div class="link">Logout</div></a></li>
    </ul>

    <div class="nav-mobile">
        MENU <span>|||</span>
    </div>
</div>
</nav>

        <HashRouter>
          <Switch>
            <Route exact path = '/' component = {Login} />
            <Route path = '/dashboard' component = {Dashboard} />
            <Route path = '/profile' component = {Profile} />
            <Route path = '/upgrade' component = {Upgrade} />
            <Route path = '/testcomp' component = {TestComp} />
            <Route path = '/search' component = {Search} />
            <Route path = '/inventory' component = {Inventory} />
          </Switch>
          </HashRouter>
      </div>
    );
  }
}

export default App;
