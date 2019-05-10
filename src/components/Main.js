import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Topic from './Topic'

class Main extends Component {

  render() {
    return (
      <main>
      <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Dashboard}/>
        <Route path='/topic/:topic' component={Topic}/>
      </Switch>
      </BrowserRouter>
      </main>
    )
  }
}

export default Main