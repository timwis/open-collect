import View from 'ampersand-view'

import MapThumbnailView from './map-thumbnail'
import Template from '../templates/bikerack-item.html'

const setHref = (before) => (el, value, previousValue) => el.setAttribute('href', before + value)

export default View.extend({
  template: Template,
  bindings: {
    'model.name': '[data-hook~=name]',
    'model.capacity': '[data-hook~=capacity]',
    'model.condition': '[data-hook~=condition]',
    'model._id': {
      hook: 'name',
      type: setHref('#/view/')
    },
    'model.geometry': {
      hook: 'geometry',
      type: function (el, value, previousValue) {
        if (value && value.coordinates) el.innerText = JSON.stringify(value.coordinates)
      }
    }
  },
  events: {
    'click [data-hook~=edit-link]': 'onClickEdit',
    'click [data-hook~=delete-link]': 'onClickDelete',
    'click [data-hook~=thumbnail]': 'onClickThumbnail'
  },
  onClickEdit: function (e) {
    this.trigger('clickEdit', this.model)
    e.preventDefault()
  },
  onClickDelete: function (e) {
    this.trigger('clickDelete', this.model)
    e.preventDefault()
  },
  onClickThumbnail: function (e) {
    this.trigger('clickThumbnail', this.model)
    e.preventDefault()
  },
  subviews: {
    thumbnail: {
      hook: 'thumbnail',
      waitFor: 'model.geometry',
      prepareView: function () {
        return new MapThumbnailView({geometry: this.model.geometry})
      }
    }
  }
})
