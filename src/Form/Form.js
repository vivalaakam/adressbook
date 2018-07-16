/**
 * Created by vivalaakam on 03.07.2018.
 *
 * @flow
 */
import classnames from 'classnames'
import uuidv4 from 'uuid/v4'
import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import Select from '../Select/Select'
import styles from './Form.scss'
import Modal from '../Modal/Modal'

const birthDays = Array.from({ length: 31 }).map((n, i) => ({ name: i + 1, value: i + 1 }))

const birthDMonths = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
].map((n, i) => ({ name: n, value: i }))


export default class Form extends PureComponent {
  constructor(props) {
    super(props)
    console.log('props', props)
    if (props.match.params && props.match.params.id && props.match.params.id !== 'new') {
      try {
        const json = localStorage.getItem('addressbook') || '{}'
        const c = JSON.parse(json)

        this.state = c[props.match.params.id]

      } catch (e) {
        this.state = {
          name: '',
          nameError: '',
          address: '',
          city: '',
          phone: '',
          phoneError: '',
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
    nameError: '',
    address: '',
    city: '',
    phone: '',
    phoneError: '',
    birthDay: '',
    birthMonth: '',
    birthYear: ''
  }

  onName = (e) => {
    this.setState({ name: e.target.value, nameError: '' })
  }

  onBlurName = () => {
    this.setState((state) => {
      if (state.name.length === 0) {
        return {
          nameError: 'Поле не может быть пустым'
        }
      }

      if (state.name.length >= 100) {
        return {
          nameError: 'Поле слишком длинное'
        }
      }

      return {
        nameError: ''
      }
    })
  }

  onAddress = (e) => {
    this.setState({ address: e.target.value })
  }

  onCity = (e) => {
    this.setState({ city: e.target.value })
  }

  onPhone = (e) => {
    this.setState({ phone: e.target.value, phoneError: '' })
  }

  onBlurPhone = () => {
    this.setState((state) => {
      if (state.phone.length === 0) {
        return {
          phoneError: 'Поле не может быть пустым'
        }
      }

      const phone = String(state.phone).replace(/\D/g, '')

      if (!(/^((7|8)+([0-9]){10})$/gm.test(phone))) {
        return {
          phoneError: 'Только российские номера'
        }
      }

      return {
        phoneError: ''
      }
    })
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

  onRejectModal = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <Modal onReject={this.onRejectModal} className={styles.Form}>
        <form key="form" onSubmit={this.onSubmit} autoComplete="false">
          <h2 key="title">Form</h2>
          <Link key="link" to="/">На главную</Link>
          <div className={styles.row}>
            <div className={classnames(styles.item, { [styles.error]: !!this.state.nameError })}>
              <label htmlFor="name">Фамилия Имя Отчество</label>
              <input
                maxLength="100"
                type="text"
                name="name"
                id="name"
                onChange={this.onName} value={this.state.name}
                className={styles.input}
                placeholder="ФИО"
                onBlur={this.onBlurName}
              />
              <span>{this.state.nameError}</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.item}>
              <label htmlFor="city">Город</label>
              <input type="text" name="city" id="city" onChange={this.onCity} value={this.state.city}
                     placeholder="Город"
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
            <div className={classnames(styles.item, { [styles.error]: !!this.state.phoneError })}>
              <label htmlFor="phone">Телефон</label>
              <input
                type="number"
                name="phone"
                id="phone"
                onChange={this.onPhone}
                value={this.state.phone}
                placeholder="Телефон"
                onBlur={this.onBlurPhone}
                className={styles.input}
              />
              <span>{this.state.phoneError}</span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.item}>
              <label>Дата рождения</label>
              <div className={styles.row}>
                <Select value={this.state.birthDay} onChange={this.onBirthDay} placeholder="ДД" values={birthDays}
                        className={styles.day} />
                <Select value={this.state.birthMonth} onChange={this.onBirthMonth} placeholder="ММ"
                        values={birthDMonths}
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
      </Modal>
    )
  }
}
