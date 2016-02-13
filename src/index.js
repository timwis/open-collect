import Router from 'ampersand-router'
import ViewSwitcher from 'ampersand-view-switcher'

import BikeRackModel from './models/bikerack'
import BikeRackCollection from './collections/bikeracks'
import BikeRackListView from './views/bikerack-list'
import BikeRackFormView from './views/bikerack-form'

const AppRouter = Router.extend({
  routes: {
    '': 'list',
    'add': 'add'
  },
  initialize: function (opts) {
    opts || (opts = {})
    this.pageSwitcher = opts.pageSwitcher
    this.collection = new BikeRackCollection()
    this.collection.fetch({
      success: function () { console.log('fetched', arguments) }
    })
  },
  list: function () {
    // this.collection.create({address: '1234 Market St', capacity: 5, condition: 'Good'})
    const view = new BikeRackListView({collection: this.collection})
    this.pageSwitcher.set(view)
  },
  add: function () {
    const model = new BikeRackModel(null, {collection: this.collection})
    const view = new BikeRackFormView({model: model})
    this.pageSwitcher.set(view)
  }
})

const container = document.getElementById('main')
const pageSwitcher = new ViewSwitcher(container)

const appRouter = new AppRouter({pageSwitcher: pageSwitcher})
appRouter.history.start({pushState: false})
