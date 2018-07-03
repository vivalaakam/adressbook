import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import logo from './logo.svg'
import styles from './App.scss'
import Home from './Home'
import Form from './Form'

export default class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <header className={styles.header}>
          <img src={logo} className={styles.logo} alt="logo" />
          <h1 className={styles.title}>Welcome to React</h1>
        </header>
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
