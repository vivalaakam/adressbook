/**
 * Created by vivalaakam on 03.07.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import classnames from 'classnames'
import styles from './Select.scss'

export default class Select extends PureComponent {
  static defaultProps = {
    placeholder: 'Не выбрано'
  }

  state = {
    active: false,
    value: null
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value) {
      return {
        value: nextProps.value
      }
    }

    return null
  }

  onToggle = () => {
    this.setState((state) => ({ active: !state.active }), () => {
      console.log(this.state)
    })
  }

  onSelect = ({ value }) => (e) => {
    e.preventDefault()
    this.setState({ value, active: false }, () => {
      if (this.props.onChange) {
        this.props.onChange(value)
      }
    })
  }

  onHide = () => {
    this.setState({
      active: false
    })
  }

  render() {
    const style = classnames(styles.Select, this.props.className, { [styles.active]: this.state.active })
    return [
      this.renderBack(),
      <div key="select" className={style}>
        <div className={styles.wrapper} onClick={this.onToggle}>
          {this.renderInner()}
        </div>
        {this.renderSelect()}
      </div>
    ]
  }

  renderInner() {
    if (this.state.value === null || this.state.value === '') {
      return (
        <div className={styles.placeholder}>
          {this.props.placeholder}
        </div>
      )
    }

    const value = this.props.values.find((v) => v.value === this.state.value)

    return (
      <div className={styles.value}>
        {value.name}
      </div>
    )
  }

  renderSelect() {
    if (!this.state.active) {
      return null
    }

    const values = this.props.values.map((value) => (
      <div key={value.value} className={styles.listItem} onClick={this.onSelect(value)}>
        {value.name}
      </div>
    ))

    return (
      <div className={styles.list}>
        {values}
      </div>
    )
  }

  renderBack() {
    if (!this.state.active) {
      return null
    }

    return (
      <div key="back" className={styles.back} onClick={this.onHide}></div>
    )
  }
}
