import React, { Component } from 'react'

import Posts from './Posts'
import Page from './components/Page'

export default class Index extends Component {

  render() {
    const { title, contents, lang } = this.props
    const posts = this.props.metadata.collections[`posts_${lang}`]

    return (
      <Page>
        <div>
          <h1>{title}</h1>
          <div dangerouslySetInnerHTML={{ __html: contents }}/>
          <Posts
            posts={posts}
            />
        </div>
      </Page>
    )

  }

}
