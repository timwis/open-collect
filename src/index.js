const choo = require('choo')
const log = require('choo-log')

const Layout = require('./views/layout')
const IndexView = require('./views/index')
const AddView = require('./views/add')
const LocateView = require('./views/locate')

const app = choo()
app.use(log())

app.model(require('./models'))

app.router((route) => [
  route('/', Layout(IndexView)),
  route('/add', Layout(AddView)),
  route('/add/locate', Layout(LocateView))
])

const tree = app.start({ hash: true })
document.body.appendChild(tree)
