import React, { Component } from 'react'

import style from './style.css'

export default class Comments extends Component {

  render() {
    const { title, link } = this.props
    const tumblr = !!this.props.tumblr

    const header = link ? (
      <h2 className={style.header}>
        <a href={link} className={style.link}>
          {title}
        </a>
      </h2>
    ) : (
      <h1 className={style.header}>{title}</h1>
    )

    const insertScript = (ifTumblr) => {
      const disqusId = ifTumblr ? 'varyadaily' : 'varya'
      return {
        '__html': `<script type="text/javascript">
                      /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
                      var disqus_shortname = '${disqusId}'; // required: replace example with your forum shortname

                      /* * * DON'T EDIT BELOW THIS LINE * * */
                      (function() {
                          var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                          dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
                      })();
                  </script>`
      }
    }

    const Disqus = (
      <div>
        <div id="disqus_thread"></div>
        <div dangerouslySetInnerHTML={insertScript(tumblr)}/>
      </div>
    )

    return (
      <div className={style.comments}>
        { Disqus }
      </div>
    )

  }

}
