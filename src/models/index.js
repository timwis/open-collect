const append = require('ramda/src/append')

module.exports = {
  state: {
    records: [
      { name: 'Default', capacity: 1, location: [39.9526, -75.1652] }
    ]
  },
  reducers: {
    add: (data, state) => {
      const newRecords = append(data, state.records)
      return { records: newRecords }
    }
  },
  effects: {
    redirect: (path, state, send, done) => {
      // window.history.pushState({}, null, path)
      // send('location:setLocation', { location: path }, done)
      window.location.hash = path
      done()
    }
  }
}
