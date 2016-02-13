import PouchCollection from 'ampersand-pouch-collection'

import BikeRackModel from '../models/bikerack'

export default PouchCollection.extend({
  model: BikeRackModel,
  props: {
    id: 'string'
  },
  pouch: {
    dbName: 'bikeracks'
  }
})
