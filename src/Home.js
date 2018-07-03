/**
 * Created by vivalaakam on 03.07.2018.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends PureComponent {
  render() {
    return [
      <h2 key="title">Home</h2>,
      <Link key="link" to="/new">Создать новый</Link>
    ]
  }
}
