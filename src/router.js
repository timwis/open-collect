import Router from 'ampersand-router'

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
    const view = new BikeRackFormView()
    view.on('submit', (formData) => {
      view.setLoading(true)
      this.collection.create(formData, {
        success: (model) => this.redirectTo(`view/${model._id}`),
        error: console.error
      })
    })
    this.pageSwitcher.set(view)
  },
  map: function () {
    const view = new MapView()
    this.pageSwitcher.set(view)
  }
})
