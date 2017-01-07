import React, { Component } from 'react'

import style from './style.css'

export default class Share extends Component {

  render() {

    const { lang } = this.props

    const blockClass = style.share + ' yashare-auto-init'

    let shareParams = 'twitter,facebook,gplus'
    if ( lang === 'ru' ) {
      shareParams += ',vkontakte'
    }

    return (
      <div>
        <script type="text/javascript" src="//yandex.st/share/share.js" charset="utf-8"></script>
        <div
          className={blockClass}
          data-yashareQuickServices={shareParams}
          data-yashareL10n={lang}
          data-yashareTheme="counter"
        />
      </div>
    )

  }

}
