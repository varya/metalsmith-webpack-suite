import React, { Component } from 'react'

import Sidebar from '../Sidebar'

import style from './style.css'

export default class Layout extends Component {

  render() {
    return (
      <div className={style.layout}>
        <section className={style.main}>
          { this.props.children }
        </section>
        <Sidebar {...this.props}/>
      </div>
    )

  }

}
