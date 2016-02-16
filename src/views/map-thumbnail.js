import View from 'ampersand-view'
import L from 'leaflet'
import 'Leaflet.vector-markers'

import Template from '../templates/map-thumbnail.html'

export default View.extend({
  template: Template,
  initialize: function (opts) {
    opts || (opts = {})
    if (opts.geometry) this.geometry = opts.geometry
  },
  render: function () {
    this.renderWithTemplate(this)
    const latlng = this.geojsonToLatLng(this.geometry)
    setTimeout(() => this.initMap(this.query('.map'), latlng), 100) // TODO: This delay shouldn't be necessary
    return this
  },
  initMap: function (container, latlng) {
    const map = L.map(container, {
      trackResize: false,
      attributionControl: false,
      zoomControl: false,
      touchZoom: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      dragging: false,
      tap: false,
      keyboard: false
    })

    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    }).addTo(map)

    map.setView(latlng, 16)

    const icon = L.VectorMarkers.icon()
    L.marker(latlng, {icon: icon}).addTo(map)
  },
  geojsonToLatLng: function (geojson) {
    return [geojson.coordinates[1], geojson.coordinates[0]]
  }
})
