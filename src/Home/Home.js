/**
 * Created by vivalaakam on 03.07.2018.
 *
 * @flow
 */

import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.scss'

export default class Home extends PureComponent {
  constructor(props) {
    super(props)

    console.log(props)

    const json = localStorage.getItem('addressbook') || '{}'
    this.state = {
      contacts: Object.values(JSON.parse(json))
    }
  }

  onClick = (contact) => () => {
    this.props.history.push(`/${contact.id}`)
  }

  render() {
    return (
      <div className={styles.Home}>
        <h2 key="title">Home</h2>
        <Link key="link" to="/new">Создать новый</Link>
        <table className={styles.contacts}>
          <thead className={styles.head}>
          <tr>
            <th>ФИО</th>
            <th>Телефон</th>
          </tr>
          </thead>
          <tbody>
          {this.renderRows()}
          </tbody>
        </table>
      </div>
    )
  }

  renderRows() {
    return this.state.contacts.map(contact => (
      <tr onClick={this.onClick(contact)} key={contact.id}>
        <td>
          {contact.name}
        </td>
        <td>
          {contact.phone}
        </td>
      </tr>
    ))
  }
}
