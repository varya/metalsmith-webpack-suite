import React, { Component } from 'react'

import Menu from '../Menu'

import style from './style.css'

export default class Sidebar extends Component {

  render() {
    return (
      <nav className={style.sidebar}>
        <Menu {...this.props}/>
      </nav>
    )

  }

}
