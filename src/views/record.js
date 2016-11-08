const html = require('choo/html')

module.exports = (state, prev, send) => {
  const id = state.params.id
  const record = state.records[id]

  return record ? html`
    <section class="section">
      <div class="container">
        <div class="card">
          <div class="card-content">
            <p class="title">${record.name}</p>
          </div>
        </div>
      </div>
    </section>
  ` : html`<div></div>`
}
