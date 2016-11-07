const html = require('choo/html')

module.exports = (View) => (state, prev, send) => {
  return html`
    <main>
      <nav class="nav has-shadow">
        <div class="container">
          <a href="#/" class="nav-item is-tab">Home</a>
          <a href="#/add" class="nav-item is-tab">Add</a>
        </div>
      </nav>
      ${View(state, prev, send)}
    </main>
  `
}
