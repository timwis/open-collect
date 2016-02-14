import View from 'ampersand-view'

import Template from '../templates/bikerack-item.html'

const setHref = (before) => (el, value, previousValue) => el.setAttribute('href', before + value)

export default View.extend({
  template: Template,
  bindings: {
    'model.address': '[data-hook~=address]',
    'model.capacity': '[data-hook~=capacity]',
    'model.condition': '[data-hook~=condition]',
    'model._id': [
      { hook: 'address', type: setHref('#/view/') },
      { hook: 'edit-link', type: setHref('#/edit/') }
    ],
    'model.geometry': {
      hook: 'geometry',
      type: function (el, value, previousValue) {
        if (value && value.coordinates) el.innerText = JSON.stringify(value.coordinates)
      }
    }
  },
  events: {
    'click [data-hook~=delete-link]': 'onClickDelete'
  },
  onClickDelete: function (e) {
    this.trigger('clickDelete', this.model)
    e.preventDefault()
  }
})
