import React, { Component } from 'react'

import Logo from "../Logo"

import style from './style.css'

export default class Header extends Component {

  render() {
    return (
      <header className={style.header}>
        <div className={style.left}/>
        <div className={style.center}>
          <Logo/>
        </div>
        <div className={style.right}/>
      </header>
    )

  }

}
