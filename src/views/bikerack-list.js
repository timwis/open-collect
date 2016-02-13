import View from 'ampersand-view'

import BikeRackItemView from './bikerack-item'
import Template from '../templates/bikerack-list.html'

export default View.extend({
  template: Template,
  render: function (opts) {
    this.renderWithTemplate(this)

    const collectionContainer = this.queryByHook('items')
    this.renderCollection(this.collection, BikeRackItemView, collectionContainer, opts)

    return this
  }
})
