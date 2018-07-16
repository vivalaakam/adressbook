/**
 * Created by vivalaakam on 03.07.2018.
 *
 * @flow
 */
import { Link } from 'react-router-dom'
import React, { PureComponent } from 'react'
import styles from './Home.scss'

export default class Home extends PureComponent {
  constructor(props) {
    super(props)
    const json = localStorage.getItem('addressbook') || '{}'
    this.state = {
      contacts: Object.values(JSON.parse(json))
    }
  }

  onClick = (contact) => () => {
    this.props.history.push(`/${contact.id}`)
  }

  onRemove = (contact) => (e) => {
    e.preventDefault()
    e.stopPropagation()
    const remove = confirm(`Удалить ${contact.name}`) // eslint-disable-line

    if (remove) {
      const json = localStorage.getItem('addressbook') || '{}'
      const c = JSON.parse(json)
      delete c[contact.id]
      this.setState({
        contacts: Object.values(c)
      }, () => {
        localStorage.setItem('addressbook', JSON.stringify(c))
      })
    }
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
            <th></th>
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
        <td>
          <button onClick={this.onRemove(contact)} className={styles.button}>Удалить</button>
        </td>
      </tr>
    ))
  }
}
