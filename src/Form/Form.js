/**
 * Created by vivalaakam on 03.07.2018.
 *
 * @flow
 */
import uuidv4 from 'uuid/v4'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Select from '../Select/Select'
import styles from './Form.scss'

const birthDays = Array.from({ length: 31 }).map((n, i) => ({ name: i + 1, value: i + 1 }))

const birthDMonths = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
].map((n, i) => ({ name: n, value: i }))


export default class Form extends PureComponent {
  constructor(props) {
    super(props)
    console.log(props.match)
    if (props.match.params && props.match.params.id) {
      try {
        const json = localStorage.getItem('addressbook') || '{}'
        const c = JSON.parse(json)

        this.state = c[props.match.params.id]

      } catch (e) {
        this.state = {
          name: '',
          address: '',
          city: '',
          phone: '',
          birthDay: '',
          birthMonth: '',
          birthYear: ''
        }
      }
    }

    console.log(this.state)
  }


  state = {
    name: '',
    address: '',
    city: '',
    phone: '',
    birthDay: '',
    birthMonth: '',
    birthYear: ''
  }

  onName = (e) => {
    this.setState({ name: e.target.value })
  }

  onAddress = (e) => {
    this.setState({ address: e.target.value })
  }

  onCity = (e) => {
    this.setState({ city: e.target.value })
  }

  onPhone = (e) => {
    this.setState({ phone: e.target.value })
  }

  onBirthDay = (value) => {
    this.setState({ birthDay: value })
  }

  onBirthMonth = (value) => {
    this.setState({ birthMonth: value })
  }

  onBirthYear = (value) => {
    this.setState({ birthYear: value })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const json = localStorage.getItem('addressbook') || '{}'
    const storage = JSON.parse(json)

    const id = this.state.id || uuidv4()

    storage[id] = Object.assign({}, this.state, { id })

    localStorage.setItem('addressbook', JSON.stringify(storage))
    if (!this.state.id) {
      this.props.history.push(`/${id}`)
    }
  }

  render() {
    return [,
      <form key="form" onSubmit={this.onSubmit} className={styles.Form}>
        <h2 key="title">Form</h2>
        <Link key="link" to="/">На главную</Link>
        <div className={styles.row}>
          <div className={styles.item}>
            <label htmlFor="name">Фамилия Имя Отчество</label>
            <input type="text" name="name" id="name" onChange={this.onName} value={this.state.name}
                   className={styles.input}
                   placeholder="ФИО" />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.item}>
            <label htmlFor="city">Город</label>
            <input type="text" name="city" id="city" onChange={this.onCity} value={this.state.city} placeholder="Город"
                   className={styles.input} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.item}>
            <label htmlFor="address">Адрес</label>
            <input type="text" name="address" id="address" onChange={this.onAddress} value={this.state.address}
                   placeholder="Адрес"
                   className={styles.input} />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.item}>
            <label htmlFor="phone">Телефон</label>
            <input type="number" name="phone" id="phone" onChange={this.onPhone} value={this.state.phone}
                   placeholder="Телефон"
                   className={styles.input} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.item}>
            <label>Дата рождения</label>
            <div className={styles.row}>
              <Select value={this.state.birthDay} onChange={this.onBirthDay} placeholder="ДД" values={birthDays}
                      className={styles.day} />
              <Select value={this.state.birthMonth} onChange={this.onBirthMonth} placeholder="ММ" values={birthDMonths}
                      className={styles.month} />
              <Select value={this.state.birthYear} onChange={this.onBirthYear} placeholder="ГГГГ" values={birthDays}
                      className={styles.year} />
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <button className={styles.button}>Сохранить</button>
        </div>
      </form>
    ]
  }
}
