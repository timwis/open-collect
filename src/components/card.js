const html = require('choo/html')

module.exports = (data) => {
  return html`
    <div class="column">
      <div class="card">
        <div class="card-content">
          <p class="title is-5">
            <a href="#/${data._id}">${data.name}</a>
          </p>
          <div class="content">
            Capacity: ${data.capacity}
          </div>
        </div>
      </div>
    </div>
  `
}
