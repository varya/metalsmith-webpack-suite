import React, { Component } from 'react'

import Share from '../Share'

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
          { share && <Share {...this.props}/> }
          <div dangerouslySetInnerHTML={{ __html: this.props.children }}/>
        </div>
      </div>
    )

  }

}
