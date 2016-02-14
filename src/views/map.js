import View from 'ampersand-view'
import L from 'leaflet'

import detectStorage from '../util/detect-storage'
import Template from '../templates/map.html'

const storageAvailable = detectStorage('localStorage')
const storedLocation = getStoredLocation()
const initialLocation = storedLocation || [37.09024, -95.712891] // Center of USA
const initialZoom = storedLocation ? 16 : 4

function getStoredLocation () {
  const locationString = storageAvailable && window.localStorage.getItem('lastLocation')
  return locationString && JSON.parse(locationString)
}

export default View.extend({
  template: Template,
  render: function () {
    this.renderWithTemplate(this)
    setTimeout(() => this.initMap(this.query('#map')), 100) // TODO: This delay shouldn't be necessary
    return this
  },
  initMap: function (container) {
    const map = L.map(container).setView(initialLocation, initialZoom)
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    }).addTo(map)

    map.locate({setView: true, maxZoom: 16, enableHighAccuracy: true})

    map.on('locationfound', (e) => {
      this.createLocationIndicator(e).addTo(map)
      this.saveLocation(e.latlng)
    })
  },
  createLocationIndicator: function (e) {
    const radius = e.accuracy / 2
    return L.circle(e.latlng, radius)
  },
  saveLocation: function (latlng) {
    if (storageAvailable) window.localStorage.setItem('lastLocation', JSON.stringify(latlng))
  }
})
