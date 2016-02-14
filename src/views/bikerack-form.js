import FormView from 'ampersand-form-view'

import {InputView, SelectView} from './form-elements'
import Template from '../templates/bikerack-form.html'

export default FormView.extend({
  template: Template,
  fields: function () {
    return [
      new InputView({
        label: 'Address',
        name: 'address',
        value: this.model && this.model.address,
        required: true,
        placeholder: 'Address',
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
  setLoading: function (enabled) {
    const classList = this.query('[type=submit]').classList
    const loadingClass = 'is-loading'
    enabled ? classList.add(loadingClass) : classList.remove(loadingClass)
  }
})
