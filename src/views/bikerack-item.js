import View from 'ampersand-view'

import Template from '../templates/bikerack-item.html'

export default View.extend({
  template: Template,
  bindings: {
    'model.address': '[data-hook~=address]',
    'model.capacity': '[data-hook~=capacity]',
    'model.condition': '[data-hook~=condition]'
  }
})
