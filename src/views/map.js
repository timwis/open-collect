import View from 'ampersand-view'
import L from 'leaflet'

import Template from '../templates/map.html'

const defaultLocation = [37.09024, -95.712891] // Center of USA

export default View.extend({
  template: Template,
  render: function () {
    this.renderWithTemplate(this)
    this.initMap(this.query('#map'))
    return this
  },
  initMap: function (container) {
    const map = L.map(container).setView(defaultLocation, 4)
    L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    }).addTo(map)

    map.locate({setView: true, maxZoom: 16})

    map.on('locationfound', this.addLocationRadius(map), this)
  },
  addLocationRadius: function (map) {
    return (e) => {
      const radius = e.accuracy / 2
      L.circle(e.latlng, radius).addTo(map)
    }
  }
})
