const html = require('choo/html')
const style = require('typestyle').style

const Map = require('../components/map')

const sectionClass = style({
  height: 'calc(100% - 50px)'
})

module.exports = (state, prev, send) => {
  return html`
    <section class=${sectionClass}>
      ${Map(state.records[0].location)}
    </section>
  `
}
