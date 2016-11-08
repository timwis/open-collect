const html = require('choo/html')
const widget = require('cache-element/widget')
const L = require('leaflet')
const style = require('typestyle').style


module.exports = widget((handleUpdates) => {
  let map
  let currentCoords
  const defaultZoom = 12

  // Called on construction & at every state update
  handleUpdates((newCoords) => {
    if (newCoords && (!currentCoords || !coordsMatch(newCoords, currentCoords))) {
      currentCoords = newCoords
      if (map) map.setView(newCoords)
    }
  })

  return html`
    <div class=${mapContainerClass}>
      <div id="map" class="${mapClass} ${crosshairsClass}" onload=${onload} onunload=${onunload}></div>
    </div>
  `

  function onload (el) {
    map = L.map(el).setView(currentCoords, defaultZoom)

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map)
  }

  function onunload (el) {
    if (map) {
      map.remove()
      map = null
    }
  }
})

function coordsMatch (a, b) {
  return a[0] === b[0] && a[1] === b[1]
}

const mapContainerClass = style({
  position: 'relative',
  height: '100%'
})

const mapClass = style({
  position: 'absolute !important',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0
})

const crosshairsClass = style({
  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    pointerEvents: 'none',
    zIndex: 999
  },
  '&:before': {
    bottom: '50%',
    borderBottom: '1px #777 solid'
  },
  '&:after': {
    right: '50%',
    borderRight: '1px #777 solid'
  }
})
