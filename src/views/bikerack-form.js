import FormView from 'ampersand-form-view'
import {InputView, SelectView, SubmitView} from './form-elements'

export default FormView.extend({
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
      }),
      new SubmitView()
    ]
  },
  submitCallback: function (formData) {
    this.model.save(formData)
    console.log(this.model.collection.toJSON())
  }
})
