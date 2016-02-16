import View from 'ampersand-view'

import MapThumbnailView from './map-thumbnail'
import Template from '../templates/form-elements/location.html'

export default View.extend({
  props: {
    name: 'string',
    label: 'string',
    value: 'object'
  },
  session: {
    valid: ['boolean', false, true],
    parent: 'state'
  },
  bindings: {
    'label': [
      {
        hook: 'label'
      },
      {
        type: 'toggle',
        hook: 'label'
      }
    ],
    'message': {
      type: 'text',
      hook: 'message-text'
    },
    'showMessage': {
      type: 'toggle',
      hook: 'message-container'
    }
  },
  template: Template,
  initialize: function (opts) {
    opts || (opts = {})
    if (opts.value) this.value = opts.value
  },
  subviews: {
    thumbnail: {
      hook: 'thumbnail',
      waitFor: 'value',
      prepareView: function () {
        return new MapThumbnailView({geometry: this.value})
      }
    }
  }
})
