import React, { Component } from 'react'

import Page from './components/Page'
import Article from './components/Article'

export default class Post extends Component {

  render() {

    const { title, contents } = this.props

    return (
      <Page {...this.props}>
        <Article {...this.props} title={title} share={true}>
          {contents}
        </Article>
      </Page>
    )

  }

}
