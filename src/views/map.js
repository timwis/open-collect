import View from 'ampersand-view'
import L from 'leaflet'
import 'leaflet-easybutton'

import detectStorage from '../util/detect-storage'
import Template from '../templates/map.html'

const storageAvailable = detectStorage('localStorage')
const storedLocation = getStoredLocation()
const defaultLocation = [37.09024, -95.712891] // Center of USA
const defaultZoom = 4

function getStoredLocation () {
  const locationString = storageAvailable && window.localStorage.getItem('lastLocation')
  return locationString && JSON.parse(locationString)
}

export default View.extend({
  template: Template,
  initialize: function (opts) {
    // if model has geometry set, use that. otherwise, if storage has a location set, use that. otherwise, use center of usa
    // if model has geometry set, turn off set-after-locate
    // if user pans map while locating, turn off set-after-locate
    if (this.model.geometry) {
      this.initialLocation = this.geojsonToLatLng(this.model.geometry)
      this.initialZoom = 16
      this.setViewAfterLocate = false
    } else if (storedLocation) {
      this.initialLocation = storedLocation
      this.initialZoom = 16
      this.setViewAfterLocate = true
    } else {
      this.initialLocation = defaultLocation
      this.initialZoom = defaultZoom
      this.setViewAfterLocate = true
    }
  },
  render: function () {
    this.renderWithTemplate(this)
    setTimeout(() => this.initMap(this.query('.map')), 100) // TODO: This delay shouldn't be necessary
    return this
  },
  initMap: function (container) {
    const map = L.map(container)

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    }).addTo(map)

    map.on('moveend', () => {
      const centerGeojson = this.latlngToGeojson(map.getCenter())
      this.trigger('moved', centerGeojson)
    }, this)

    // If user starts panning the map before locating is done, don't setView after locate
    map.on('dragstart', () => this.setViewAfterLocate = false, this)

    map.setView(this.initialLocation, this.initialZoom)

    map.locate({enableHighAccuracy: true, maximumAge: 60000})

    map.on('locationfound', (e) => {
      if (this.setViewAfterLocate) map.setView(e.latlng, 16)
      this.createLocationIndicator(e).addTo(map)
      this.saveLocation(e.latlng)
    })

    this.createSaveButton().addTo(map)
  },
  createLocationIndicator: function (e) {
    const radius = e.accuracy / 2
    return L.circle(e.latlng, radius)
  },
  createSaveButton: function () {
    return L.easyButton('<span>Save</span>', () => this.trigger('close'), {position: 'topright', id: 'save-button'})
  },
  saveLocation: function (latlng) {
    if (storageAvailable) window.localStorage.setItem('lastLocation', JSON.stringify(latlng))
  },
  latlngToGeojson: function (latlng) {
    return {type: 'Point', coordinates: [latlng.lng, latlng.lat]}
  },
  geojsonToLatLng: function (geojson) {
    return [geojson.coordinates[1], geojson.coordinates[0]]
  }
})
