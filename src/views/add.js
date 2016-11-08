const html = require('choo/html')
const getFormData = require('get-form-data')

const MapThumbnail = require('../components/map-thumbnail')

module.exports = (state, prev, send) => {
  return html`
    <section class="section">
      <div class="container">
        <form onsubmit=${onsubmit}>
          ${MapThumbnail({}, navLocate)}

          <div class="control">
            <label class="label" for="name">
              Name
            </label>
            <input class="input" id="name" required>
          </div>

          <div class="control">
            <label class="label" for="capacity">
              Capacity
            </label>
            <input class="input" id="capacity" type="number">
          </div>

          <div class="control">
            <button class="button is-primary">Submit</button>
          </div>
        </form>
      </div>
    </section>
  `
  function onsubmit (evt) {
    const formData = getFormData(evt.target)
    send('create', formData)
    evt.target.reset()
    evt.preventDefault()
  }

  function navLocate (evt) {
    send('redirect', '/add/locate')
  }
}
