import React from 'react'
import ReactDOM from 'react-dom'

import Candies from '../components/Candies'

document.addEventListener('DOMContentLoaded', function (event) {
  ReactDOM.render(<Candies max={28} min={12} reverse={true} />, document.getElementById('Header-Left'))
  ReactDOM.render(<Candies max={28} min={12} />, document.getElementById('Header-Right'))
})

export default function () {
}
