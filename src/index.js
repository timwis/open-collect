const choo = require('choo')
const log = require('choo-log')
const PouchDB = require('pouchdb')

const Layout = require('./views/layout')
const IndexView = require('./views/index')
const AddView = require('./views/add')
const LocateView = require('./views/locate')
const RecordView = require('./views/record')

const app = choo()
app.use(log())

const db = new PouchDB('open-collect')

app.model(require('./models')(db))

app.router((route) => [
  route('/', Layout(IndexView)),
  route('/add', Layout(AddView)),
  route('/add/locate', Layout(LocateView)),
  route('/:id', Layout(RecordView))
])

const tree = app.start({ hash: true })
document.body.appendChild(tree)
