import AmpersandView from 'ampersand-view'
import AmpersandInputView from 'ampersand-input-view'
import AmpersandSelectView from 'ampersand-select-view'

import InputTemplate from '../templates/form-elements/input.html'
import SelectTemplate from '../templates/form-elements/select.html'
import SubmitTemplate from '../templates/form-elements/submit.html'

export const InputView = AmpersandInputView.extend({ template: InputTemplate })
export const SelectView = AmpersandSelectView.extend({ template: SelectTemplate })
export const SubmitView = AmpersandView.extend({ template: SubmitTemplate, valid: true })
