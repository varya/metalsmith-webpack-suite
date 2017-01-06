import React, { Component } from 'react'

import Page from './components/Page'

export default class Post extends Component {

  render() {

    const { title, contents } = this.props

    return (
      <Page>
        <div>
          <h1>{title}</h1>
          {contents}
        </div>
      </Page>
    )

  }

}
