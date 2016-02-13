import PouchModel from 'ampersand-pouch-model'

export default PouchModel.extend({
  idAttribute: '_id',
  props: {
    _id: 'string',
    _rev: 'string',
    address: 'string',
    capacity: 'number',
    condition: {
      type: 'string',
      values: ['Poor', 'Good', 'Great']
    }
  },
  pouch: {
    dbName: 'bikeracks'
  }
})
