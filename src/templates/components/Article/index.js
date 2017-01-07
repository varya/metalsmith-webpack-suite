import React, { Component } from 'react'

import style from './style.css'

export default class Article extends Component {

  render() {
    const { title, share } = this.props

    return (
      <div className={style.article} role="main">
        <div className={style.body}>
          <h1 className={style.header}>{title}</h1>
        </div>
        <div className={style.text}>
          {this.props.children}
        </div>
      </div>
    )

  }

}

export class ArticleDetails extends Component {

  render() {

    const blockClass = style.details + ' author vcard'

    return (
      <span className={blockClass}>
        {this.props.children}
      </span>
    )

  }

}
