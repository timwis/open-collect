const html = require('choo/html')
const style = require('typestyle').style

module.exports = (field, handleClick) => {
  return html`
    <div class="control">
      <label class="label">
        Location
      </label>
      <div class=${mapThumbnailClass} onclick=${onclick}></div>
    </div>
  `
  function onclick (evt) {
    if (handleClick) handleClick()
    evt.preventDefault()
  }
}

const mapThumbnailClass = style({
  height: '125px',
  position: 'relative',
  backgroundColor: '#d4d4d4',
  cursor: 'pointer',
  '&:empty:after': {
    content: '"+"',
    fontSize: '550%',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: 'center'
  }
})
