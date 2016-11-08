const html = require('choo/html')
const values = require('ramda/src/values')

const Card = require('../components/card')

module.exports = (state, prev, send) => {
  const records = values(state.records)

  return html`
    <section class="section">
      <div class="container">
        <div class="columns is-multiline">
          ${records.map(Card)}
        </div>
      </div>
    </section>
  `
}
