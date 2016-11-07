const html = require('choo/html')

const Card = require('../components/card')

module.exports = (state, prev, send) => {
  return html`
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          ${state.records.map(Card)}
        </div>
      </div>
    </section>
  `
}
