const texts = {
  'menuTitle': {
    en: 'On this site',
    ru: 'На этом сайте'
  }
}

module.exports = function(lang) {

    let texts4Lang = {}

    for (let key in texts) {
      texts4Lang[key] = texts[key][lang]
    }

    return texts4Lang

}
