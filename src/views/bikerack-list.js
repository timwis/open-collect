import View from 'ampersand-view'

import BikeRackListItemView from './bikerack-list-item'
import Template from '../templates/bikerack-list.html'

export default View.extend({
  template: Template,
  render: function (opts) {
    this.renderWithTemplate(this)

    const collectionContainer = this.queryByHook('items')
    this.renderCollection(this.collection, BikeRackListItemView, collectionContainer, opts)

    return this
  }
})
