import View from 'ampersand-view'

import Template from '../templates/bikerack-item.html'

export default View.extend({
  template: Template,
  bindings: {
    'model.address': '[data-hook~=address]',
    'model.capacity': '[data-hook~=capacity]',
    'model.condition': '[data-hook~=condition]',
    'model._id': {
      hook: 'address',
      type: function (el, value, previousValue) {
        el.setAttribute('href', `#/view/${value}`)
      }
    }
  }
})
