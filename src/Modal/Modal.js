/**
 * Created by vivalaakam on 04.07.2018.
 *
 * @flow
 */
import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import styles from './Modal.scss'

const modalRoot = document.getElementById('modal')

export default class Modal extends PureComponent {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
  }

  componentDidMount() {
    modalRoot.appendChild(this.el)
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(
      this.renderWrapper(),
      this.el
    )
  }

  onClick = (e) => {
    e.stopPropagation()
  }

  renderWrapper() {
    const style = classnames(styles.wrapper, this.props.className)
    return (
      <div className={styles.Modal} onClick={this.props.onReject}>
        <div className={style} onClick={this.onClick}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
