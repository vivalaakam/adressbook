import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styles from './App.scss'
import Home from './Home/Home'
import Form from './Form/Form'

export default class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/new" component={Form} />
              <Route path="/:id" component={Form} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}
