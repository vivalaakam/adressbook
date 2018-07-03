/**
 * Created by vivalaakam on 03.07.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class Form extends PureComponent {
  render() {
    return [
      <h2 key="title">Form</h2>,
      <Link key="link" to="/">На главную</Link>
    ]
  }
}
