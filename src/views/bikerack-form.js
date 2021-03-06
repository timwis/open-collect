import FormView from 'ampersand-form-view'

import {InputView, SelectView} from './form-elements'
import LocationFieldView from './location-field'
import Template from '../templates/bikerack-form.html'

export default FormView.extend({
  template: Template,
  fields: function () {
    return [
      new LocationFieldView({
        label: 'Location',
        name: 'location',
        value: this.model && this.model.geometry,
        required: false,
        parent: this
      }),
      new InputView({
        label: 'Name',
        name: 'name',
        value: this.model && this.model.name,
        required: true,
        placeholder: 'Name',
        parent: this
      }),
      new InputView({
        label: 'Capacity',
        name: 'capacity',
        value: this.model && this.model.capacity,
        required: false,
        placeholder: 'Capacity',
        parent: this,
        type: 'number'
      }),
      new SelectView({
        label: 'Condition',
        name: 'condition',
        value: this.model && this.model.condition,
        options: [
          'Poor',
          'Good',
          'Great'
        ],
        required: false,
        parent: this
      })
    ]
  },
  events: {
    'click [data-hook~=thumbnail]': 'onClickThumbnail'
  },
  onClickThumbnail: function (e) {
    this.trigger('clickThumbnail', this.model)
    e.preventDefault()
  },
  setLoading: function (enabled) {
    const classList = this.query('[type=submit]').classList
    const loadingClass = 'is-loading'
    enabled ? classList.add(loadingClass) : classList.remove(loadingClass)
  }
})
