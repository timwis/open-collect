const append = require('ramda/src/append')
const keyBy = require('lodash/keyBy')
const shortid = require('shortid')

module.exports = (db) => ({
  state: {
    records: {} // keyed object to ensure idempotency
  },
  reducers: {
    add: (data, state) => {
      const newRecords = append(data, state.records)
      return { records: newRecords }
    },
    receive: (data, state) => {
      const newRecords = state.records.concat(data)
      return { records: newRecords }
    },
    upsert: (records, state) => {
      const keyedRecords = keyBy(records, '_id')
      const newRecords = Object.assign({}, state.records, keyedRecords)
      return { records: newRecords }
    }
  },
  effects: {
    fetch: (data, state, send, done) => {
      db.allDocs({ include_docs: true }, (err, response) => {
        if (err) return done(new Error('Database fetch failed'))
        const docs = response.rows.map((row) => row.doc)
        send('upsert', docs, done)
      })
    },
    create: (payload, state, send, done) => {
      const _id = shortid.generate()
      const data = Object.assign({}, payload, {_id})
      db.put(data, (err, response) => {
        if (err) return done(new Error('Database insert failed'))
        // send('upsert', [ data ], done) // handled by changes feed
        done()
      })
    },
    redirect: (path, state, send, done) => {
      // window.history.pushState({}, null, path)
      // send('location:setLocation', { location: path }, done)
      window.location.hash = path
      done()
    }
  },
  subscriptions: {
    changes: (send, done) => {
      db.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', (change) => {
        send('upsert', [ change.doc ], done)
      })
    }
  }
})
