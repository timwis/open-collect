import Router from 'ampersand-router'

import BikeRackModel from './models/bikerack'
import BikeRackCollection from './collections/bikeracks'
import BikeRackListView from './views/bikerack-list'
import BikeRackFormView from './views/bikerack-form'
import BikeRackItemView from './views/bikerack-item'
import MapView from './views/map'

export default Router.extend({
  routes: {
    '': 'list',
    'view/:item': 'view',
    'add': 'add',
    'map': 'map'
  },
  initialize: function (opts) {
    opts || (opts = {})
    this.pageSwitcher = opts.pageSwitcher
    this.collection = new BikeRackCollection()
    this.collection.fetch()
  },
  list: function () {
    const view = new BikeRackListView({collection: this.collection})
    this.pageSwitcher.set(view)
  },
  view: function (item) {
    this.collection.getOrFetch(item, (err, model) => {
      if (err) console.error(err)
      this.showItemView(model)
    })
  },
  add: function () {
    const model = new BikeRackModel()
    this.showFormView(model)
  },
  showItemView: function (model) {
    const itemView = new BikeRackItemView({model: model})
    this.pageSwitcher.set(itemView)

    itemView.on('clickEdit', () => this.showFormView(model))

    itemView.on('clickDelete', (deletedModel) => {
      this.collection.remove(deletedModel)
      deletedModel.destroy()
      this.redirectTo('')
    })
  },
  showMapView: function (model) {
    const mapView = new MapView({model: model})
    this.pageSwitcher.set(mapView)

    mapView.on('moved', (center) => model.geometry = center)
    mapView.on('close', () => this.showFormView(model))
  },
  showFormView: function (model) {
    const formView = new BikeRackFormView({model: model})
    this.pageSwitcher.set(formView)

    formView.on('submit', (formData) => {
      formView.setLoading(true)
      if (!model.collection) this.collection.add(model)
      model.save(formData, {
        // success: (model) => this.redirectTo(`view/${model._id}`),
        success: (model) => this.showItemView(model),
        error: console.error
      })
    })

    formView.on('clickThumbnail', () => {
      model.set(formView.data)
      this.showMapView(model)
    })
  }
})
