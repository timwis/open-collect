const html = require('choo/html')

module.exports = (data) => {
  return html`
    <div class="card">
      <div class="card-content">
        <p class="title is-5">${data.name}</p>
        <div class="content">
          Capacity: ${data.capacity}
        </div>
      </div>
    </div>
  `
}
