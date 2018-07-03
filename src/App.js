import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import styles from './App.scss'
import Home from './Home'
import Form from './Form/Form'

export default class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <Router>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/new" component={Form} />
          </div>
        </Router>
      </div>
    )
  }
}
