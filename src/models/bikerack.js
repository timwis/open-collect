import PouchModel from 'ampersand-pouch-model'

export default PouchModel.extend({
  idAttribute: '_id',
  props: {
    _id: 'string',
    _rev: 'string',
    name: 'string',
    capacity: 'number',
    condition: {
      type: 'string',
      values: ['Poor', 'Good', 'Great']
    },
    geometry: 'object'
  },
  pouch: {
    dbName: 'bikeracks'
  }
})
