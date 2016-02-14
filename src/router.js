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
    'edit/:item': 'edit',
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
      const view = new BikeRackItemView({model: model})
      view.on('clickDelete', (deletedModel) => {
        this.collection.remove(deletedModel)
        deletedModel.destroy()
        this.redirectTo('')
      })
      this.pageSwitcher.set(view)
    })
  },
  edit: function (item) {
    this.collection.getOrFetch(item, (err, model) => {
      if (err) console.error(err)
      const view = new BikeRackFormView({model: model})
      view.on('submit', (formData) => {
        view.setLoading(true)
        model.save(formData, {
          success: (model) => this.redirectTo(`view/${model._id}`),
          error: console.error
        })
      })
      this.pageSwitcher.set(view)
    })
  },
  add: function () {
    const model = new BikeRackModel()

    const formView = new BikeRackFormView({model: model})
    formView.on('submit', (formData) => {
      formView.setLoading(true)
      model.set(formData)
      this.collection.create(model, {
        success: (model) => this.redirectTo(`view/${model._id}`),
        error: console.error
      })
    })

    const mapView = new MapView()
    mapView.on('moved', (center) => model.geometry = center)
    mapView.on('close', () => this.pageSwitcher.set(formView))

    this.pageSwitcher.set(mapView)
  },
  map: function () {
    const view = new MapView()
    view.on('moved', (center) => console.log(center))
    this.pageSwitcher.set(view)
  }
})
